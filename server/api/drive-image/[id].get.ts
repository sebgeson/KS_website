import { readDriveMediaFile } from '~/utils/googleDriveProjects'

export default defineEventHandler(async (event) => {
  const options = getGoogleDriveRuntimeOptions()
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing Google Drive file id',
    })
  }

  try {
    const image = await readDriveMediaFile(id, {
      apiKey: options.apiKey,
      accessToken: options.accessToken,
      serviceAccountJson: options.serviceAccountJson,
      folderId: options.folderId,
      publicMode: options.publicMode,
    })

    setHeader(event, 'content-type', image.contentType)
    setHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=86400')

    return image.body
  } catch (error) {
    const data = getGoogleDriveErrorData(error, options)

    console.error(`Failed to load Google Drive image "${id}"`, data, error)

    throw createError({
      statusCode: 502,
      statusMessage: 'Could not load image from Google Drive',
      data,
    })
  }
})
