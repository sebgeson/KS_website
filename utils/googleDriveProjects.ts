import { createSign } from 'node:crypto'

type DriveFile = {
  id: string
  name: string
  mimeType: string
  modifiedTime?: string
  webContentLink?: string
  webViewLink?: string
  thumbnailLink?: string
}

export type ProjectImage = {
  id: string
  name: string
  url: string
  alt: string
}

export type ProjectSummary = {
  slug: string
  name: string
  excerpt: string
  description: string
  descriptionHtml: string
  heroImage: ProjectImage
  gallery: ProjectImage[]
  modifiedTime?: string
}

type GoogleDriveOptions = {
  apiKey?: string
  accessToken?: string
  serviceAccountJson?: string
  folderId?: string
  publicMode?: boolean
}

type CacheEntry = {
  expiresAt: number
  projects: ProjectSummary[]
}

type TokenCache = {
  accessToken: string
  expiresAt: number
}

const FOLDER_MIME = 'application/vnd.google-apps.folder'
const GOOGLE_DOC_MIME = 'application/vnd.google-apps.document'
const MARKDOWN_FILE = 'projektbeskrivning.md'
const DESCRIPTION_DOC_NAMES = ['projektbeskrivning', 'prosjektbeskrivelse', 'project description']
const HERO_FOLDER_NAMES = ['huvudbild', 'hovedbilde']
const GALLERY_FOLDER_NAMES = ['bilder', 'images', 'galleri']
const fallbackImage = '/images/Hero.png'

let projectsCache: CacheEntry | null = null
let serviceAccountTokenCache: TokenCache | null = null

export const createSlug = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const clearProjectsCache = () => {
  projectsCache = null
}

export const renderProjectMarkdown = (markdown: string) => {
  const blocks = markdown
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)

  return blocks
    .map((block) => {
      if (block.startsWith('### ')) return `<h3>${inlineMarkdown(block.slice(4))}</h3>`
      if (block.startsWith('## ')) return `<h2>${inlineMarkdown(block.slice(3))}</h2>`
      if (block.startsWith('# ')) return `<h1>${inlineMarkdown(block.slice(2))}</h1>`

      if (block.startsWith('- ')) {
        const items = block
          .split('\n')
          .filter((line) => line.startsWith('- '))
          .map((line) => `<li>${inlineMarkdown(line.slice(2))}</li>`)
          .join('')

        return `<ul>${items}</ul>`
      }

      return `<p>${inlineMarkdown(block.replace(/\n/g, ' '))}</p>`
    })
    .join('')
}

export const createExcerpt = (markdown: string, maxLength = 150, projectName = '') => {
  const text = stripHtml(markdown)
    .replace(/[#*_`>\-[\]()]/g, ' ')
    .replace(new RegExp(`^${escapeRegExp(projectName)}\\s*`, 'i'), '')
    .replace(/^.{0,80}\s+projektinformation\s*/i, ' ')
    .replace(/\b(beskriv projektet her|beskriv projektet här|skriv prosjektbeskrivelse her|skriv projektbeskrivning här|ange plats her|ange plats här|ange sted her)\b/gi, ' ')
    .replace(/\b(projektinformation|kort beskrivning|utført arbeid|utført arbete|utfört arbete|plats|sted|år)\b/gi, ' ')
    .replace(/\b(19|20)\d{2}\b/g, ' ')
    .replace(/^[\s.,:;]+|[\s.,:;]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  const services = Array.from(
    new Set(
      text
        .match(/\b(prosjektering|projektering|installasjon|installation|service|kontroll|prefab)\b/gi)
        ?.map((service) => normalizeServiceName(service)) || [],
    ),
  )
  const readableText =
    services.length && (text.length < 90 || !/[.!?]/.test(text))
      ? `Utført arbeid: ${formatList(services)}.`
      : text
  const excerpt = readableText || 'Les mer om prosjektet.'

  if (excerpt.length <= maxLength) return excerpt

  return `${excerpt.slice(0, maxLength).trim()}...`
}

export const getGoogleDriveProjects = async (
  options: GoogleDriveOptions,
  cacheSeconds = 900,
): Promise<ProjectSummary[]> => {
  const now = Date.now()

  if (projectsCache && projectsCache.expiresAt > now) {
    return projectsCache.projects
  }

  if (!options.folderId || (!options.apiKey && !options.accessToken && !options.serviceAccountJson)) {
    const projects = getFallbackProjects()
    projectsCache = { expiresAt: now + cacheSeconds * 1000, projects }
    return projects
  }

  const rootFolders = await listFolderChildren(options.folderId, options)
  const projectFolders = rootFolders.filter((file) => file.mimeType === FOLDER_MIME)

  const projects = await Promise.all(
    projectFolders.map((folder) => readProjectFolder(folder, options)),
  )

  const sortedProjects = projects
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name, 'no')) as ProjectSummary[]

  projectsCache = { expiresAt: now + cacheSeconds * 1000, projects: sortedProjects }

  return sortedProjects
}

export const getGoogleDriveProjectBySlug = async (
  slug: string,
  options: GoogleDriveOptions,
  cacheSeconds = 900,
) => {
  const projects = await getGoogleDriveProjects(options, cacheSeconds)

  return projects.find((project) => project.slug === slug)
}

const readProjectFolder = async (
  folder: DriveFile,
  options: GoogleDriveOptions,
): Promise<ProjectSummary | null> => {
  const children = await listFolderChildren(folder.id, options)
  const folders = children.filter((file) => file.mimeType === FOLDER_MIME)
  const files = children.filter((file) => file.mimeType !== FOLDER_MIME)
  const descriptionFile = findDescriptionFile(files)
  const descriptionContent = descriptionFile
    ? await readDescriptionFile(descriptionFile, options)
    : {
        text: `# ${folder.name}\n\nProsjektbeskrivelse mangler. Legg til et Google Docs-dokument med navnet "projektbeskrivning" i prosjektmappen.`,
        html: '',
      }
  const descriptionHtml =
    descriptionContent.html || renderProjectMarkdown(descriptionContent.text)

  const heroFolder = folders.find((file) => HERO_FOLDER_NAMES.includes(file.name.toLowerCase()))
  const galleryFolder = folders.find((file) => GALLERY_FOLDER_NAMES.includes(file.name.toLowerCase()))
  const heroFiles = heroFolder ? await listFolderChildren(heroFolder.id, options) : []
  const galleryFiles = galleryFolder ? await listFolderChildren(galleryFolder.id, options) : []
  const heroImageFile = heroFiles.find(isImageFile)
  const gallery = galleryFiles.filter(isImageFile).map((file) => toProjectImage(file, folder.name))

  return {
    slug: createSlug(folder.name),
    name: folder.name,
    excerpt: createExcerpt(descriptionContent.text || descriptionHtml, 150, folder.name),
    description: descriptionContent.text,
    descriptionHtml,
    heroImage: heroImageFile
      ? toProjectImage(heroImageFile, folder.name)
      : { id: 'fallback', name: 'Fallback', url: fallbackImage, alt: `${folder.name} prosjektbilde` },
    gallery,
    modifiedTime: folder.modifiedTime,
  }
}

const listFolderChildren = async (folderId: string, options: GoogleDriveOptions) => {
  const query = `'${folderId}' in parents and trashed = false`
  const params = new URLSearchParams({
    q: query,
    fields:
      'files(id,name,mimeType,modifiedTime,webContentLink,webViewLink,thumbnailLink),nextPageToken',
    orderBy: 'folder,name',
    pageSize: '1000',
    supportsAllDrives: 'true',
    includeItemsFromAllDrives: 'true',
  })

  if (options.apiKey) params.set('key', options.apiKey)

  const response = await googleFetch<{ files: DriveFile[] }>(
    `https://www.googleapis.com/drive/v3/files?${params.toString()}`,
    options,
  )

  return response.files || []
}

const readTextFile = async (fileId: string, options: GoogleDriveOptions) => {
  const params = new URLSearchParams({ alt: 'media', supportsAllDrives: 'true' })
  if (options.apiKey) params.set('key', options.apiKey)

  return googleFetch<string>(
    `https://www.googleapis.com/drive/v3/files/${fileId}?${params.toString()}`,
    options,
    'text',
  )
}

export const readDriveMediaFile = async (fileId: string, options: GoogleDriveOptions) => {
  const params = new URLSearchParams({ alt: 'media', supportsAllDrives: 'true' })
  if (options.apiKey) params.set('key', options.apiKey)

  const headers: Record<string, string> = {}
  const accessToken = options.accessToken || (await getServiceAccountAccessToken(options))

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?${params.toString()}`,
    { headers },
  )

  if (!response.ok) {
    throw new Error(`Google Drive media request failed with ${response.status}`)
  }

  return {
    body: Buffer.from(await response.arrayBuffer()),
    contentType: response.headers.get('content-type') || 'application/octet-stream',
  }
}

const readDescriptionFile = async (file: DriveFile, options: GoogleDriveOptions) => {
  if (file.mimeType === GOOGLE_DOC_MIME) {
    const html = await exportGoogleDoc(file.id, options)

    return {
      text: stripHtml(html),
      html: sanitizeGoogleDocHtml(html),
    }
  }

  const text = await readTextFile(file.id, options)

  return {
    text,
    html: renderProjectMarkdown(text),
  }
}

const exportGoogleDoc = async (fileId: string, options: GoogleDriveOptions) => {
  const params = new URLSearchParams({ mimeType: 'text/html' })
  if (options.apiKey) params.set('key', options.apiKey)

  return googleFetch<string>(
    `https://www.googleapis.com/drive/v3/files/${fileId}/export?${params.toString()}`,
    options,
    'text',
  )
}

const googleFetch = async <T>(
  url: string,
  options: GoogleDriveOptions,
  responseType: 'json' | 'text' = 'json',
) => {
  const headers: Record<string, string> = {}
  const accessToken = options.accessToken || (await getServiceAccountAccessToken(options))

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  return $fetch<T>(url, {
    headers,
    responseType,
  })
}

const getServiceAccountAccessToken = async (options: GoogleDriveOptions) => {
  if (!options.serviceAccountJson) return ''

  const now = Date.now()
  if (serviceAccountTokenCache && serviceAccountTokenCache.expiresAt > now + 60_000) {
    return serviceAccountTokenCache.accessToken
  }

  const account = parseServiceAccountJson(options.serviceAccountJson)
  const issuedAt = Math.floor(now / 1000)
  const expiresAt = issuedAt + 3600
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claim = base64Url(
    JSON.stringify({
      iss: account.client_email,
      scope: 'https://www.googleapis.com/auth/drive.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      exp: expiresAt,
      iat: issuedAt,
    }),
  )
  const signatureInput = `${header}.${claim}`
  const signer = createSign('RSA-SHA256')
  signer.update(signatureInput)
  signer.end()

  const signature = signer.sign(account.private_key, 'base64url')
  const assertion = `${signatureInput}.${signature}`
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })

  if (!tokenResponse.ok) {
    const data = await readGoogleErrorResponse(tokenResponse)
    const message = data?.error_description || data?.error || tokenResponse.statusText
    const error = new Error(`Google service account token request failed: ${message}`)

    Object.assign(error, {
      statusCode: tokenResponse.status,
      data: { error: data },
    })

    throw error
  }

  const response = await tokenResponse.json() as { access_token: string; expires_in: number }

  serviceAccountTokenCache = {
    accessToken: response.access_token,
    expiresAt: now + response.expires_in * 1000,
  }

  return response.access_token
}

const readGoogleErrorResponse = async (response: Response) => {
  const text = await response.text()

  try {
    return JSON.parse(text)
  } catch {
    return { error: text || response.statusText }
  }
}

const isImageFile = (file: DriveFile) => file.mimeType.startsWith('image/')

const findDescriptionFile = (files: DriveFile[]) =>
  files.find((file) => {
    const name = file.name.toLowerCase().replace(/\.(md|txt)$/i, '').trim()

    return file.mimeType === GOOGLE_DOC_MIME && DESCRIPTION_DOC_NAMES.includes(name)
  }) ||
  files.find((file) => file.mimeType === GOOGLE_DOC_MIME) ||
  files.find((file) => file.name.toLowerCase() === MARKDOWN_FILE)

const toProjectImage = (file: DriveFile, projectName: string): ProjectImage => ({
  id: file.id,
  name: file.name,
  url: `/api/drive-image/${file.id}`,
  alt: `${projectName} - ${file.name.replace(/\.[^.]+$/, '')}`,
})

const inlineMarkdown = (value: string) =>
  escapeHtml(value)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    )

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const base64Url = (value: string) => Buffer.from(value).toString('base64url')

const stripHtml = (value: string) =>
  decodeHtmlEntities(value)
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()

const decodeHtmlEntities = (value: string) => {
  const namedEntities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&auml;': 'ä',
    '&Auml;': 'Ä',
    '&ouml;': 'ö',
    '&Ouml;': 'Ö',
    '&aring;': 'å',
    '&Aring;': 'Å',
    '&oslash;': 'ø',
    '&Oslash;': 'Ø',
    '&aelig;': 'æ',
    '&AElig;': 'Æ',
  }

  return value
    .replace(/&(?:amp|lt|gt|quot|#039|apos|nbsp|auml|Auml|ouml|Ouml|aring|Aring|oslash|Oslash|aelig|AElig);/g, (entity) => namedEntities[entity] || entity)
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const normalizeServiceName = (value: string) => {
  const service = value.toLowerCase()

  if (service === 'projektering') return 'prosjektering'
  if (service === 'installation') return 'installasjon'

  return service
}

const formatList = (items: string[]) => {
  if (items.length <= 1) return items[0] || ''

  return `${items.slice(0, -1).join(', ')} og ${items.at(-1)}`
}

const sanitizeGoogleDocHtml = (html: string) => {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  const body = bodyMatch?.[1] || html

  return body
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\sclass="[^"]*"/gi, '')
    .replace(/\sstyle="[^"]*"/gi, '')
    .replace(/\sid="[^"]*"/gi, '')
    .replace(/<span[^>]*>/gi, '<span>')
}

const parseServiceAccountJson = (value: string) => {
  const parsed = JSON.parse(value)

  return typeof parsed === 'string' ? JSON.parse(parsed) : parsed
}

const getFallbackProjects = (): ProjectSummary[] => {
  const description = `# Eksempelprosjekt\n\nKoble til Google Drive for å vise ferdige prosjekter automatisk. Hver undermappe i hovedmappen blir lest som et eget prosjekt med hovedbilde, bildegalleri og prosjektbeskrivelse.`

  return [
    {
      slug: 'eksempelprosjekt',
      name: 'Eksempelprosjekt',
      excerpt: createExcerpt(description),
      description,
      descriptionHtml: renderProjectMarkdown(description),
      heroImage: {
        id: 'fallback',
        name: 'Eksempelbilde',
        url: fallbackImage,
        alt: 'Eksempelprosjekt sprinkleranlegg',
      },
      gallery: [],
    },
  ]
}
