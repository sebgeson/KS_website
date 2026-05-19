import { getGoogleDriveProjectBySlug } from '~/utils/googleDriveProjects'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing project slug',
    })
  }

  try {
    const project = await getGoogleDriveProjectBySlug(
      slug,
      {
        apiKey: config.googleDriveApiKey,
        accessToken: config.googleDriveAccessToken,
        serviceAccountJson: config.googleServiceAccountJson,
        folderId: config.public.googleDriveFolderId,
        publicMode: config.public.projectsPublicMode,
      },
      Number(config.public.projectsCacheSeconds || 900),
    )

    if (!project) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found',
      })
    }

    return { project }
  } catch (error: any) {
    if (error?.statusCode === 404) throw error

    console.error(`Failed to load Google Drive project "${slug}"`, error)

    throw createError({
      statusCode: 502,
      statusMessage: 'Could not load project from Google Drive',
    })
  }
})
