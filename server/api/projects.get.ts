import { getGoogleDriveProjects } from '~/utils/googleDriveProjects'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  try {
    const projects = await getGoogleDriveProjects(
      {
        apiKey: config.googleDriveApiKey,
        accessToken: config.googleDriveAccessToken,
        serviceAccountJson: config.googleServiceAccountJson,
        folderId: config.public.googleDriveFolderId,
        publicMode: config.public.projectsPublicMode,
      },
      Number(config.public.projectsCacheSeconds || 900),
    )

    return {
      projects,
      configured: Boolean(
        config.public.googleDriveFolderId &&
          (config.googleDriveApiKey || config.googleDriveAccessToken || config.googleServiceAccountJson),
      ),
    }
  } catch (error) {
    console.error('Failed to load Google Drive projects', error)

    throw createError({
      statusCode: 502,
      statusMessage: 'Could not load projects from Google Drive',
    })
  }
})
