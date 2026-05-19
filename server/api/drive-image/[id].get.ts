import { readDriveMediaFile } from '~/utils/googleDriveProjects'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing Google Drive file id',
    })
  }

  try {
    const image = await readDriveMediaFile(id, {
      apiKey: config.googleDriveApiKey,
      accessToken: config.googleDriveAccessToken,
      serviceAccountJson: config.googleServiceAccountJson,
      folderId: config.public.googleDriveFolderId,
      publicMode: config.public.projectsPublicMode,
    })

    setHeader(event, 'content-type', image.contentType)
    setHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=86400')

    return image.body
  } catch (error) {
    console.error(`Failed to load Google Drive image "${id}"`, error)

    throw createError({
      statusCode: 502,
      statusMessage: 'Could not load image from Google Drive',
    })
  }
})
