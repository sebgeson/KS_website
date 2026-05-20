import { getGoogleDriveProjects } from '~/utils/googleDriveProjects'

export default defineEventHandler(async () => {
  const options = getGoogleDriveRuntimeOptions()

  try {
    const projects = await getGoogleDriveProjects(
      {
        apiKey: options.apiKey,
        accessToken: options.accessToken,
        serviceAccountJson: options.serviceAccountJson,
        folderId: options.folderId,
        publicMode: options.publicMode,
      },
      options.cacheSeconds,
    )

    return {
      projects,
      configured: Boolean(options.folderId && (options.apiKey || options.accessToken || options.serviceAccountJson)),
    }
  } catch (error) {
    const data = getGoogleDriveErrorData(error, options)

    console.error('Failed to load Google Drive projects', data, error)

    throw createError({
      statusCode: 502,
      statusMessage: 'Could not load projects from Google Drive',
      data,
    })
  }
})
