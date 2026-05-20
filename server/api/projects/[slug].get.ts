import { getGoogleDriveProjectBySlug } from '~/utils/googleDriveProjects'

export default defineEventHandler(async (event) => {
  const options = getGoogleDriveRuntimeOptions()
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
        apiKey: options.apiKey,
        accessToken: options.accessToken,
        serviceAccountJson: options.serviceAccountJson,
        folderId: options.folderId,
        publicMode: options.publicMode,
      },
      options.cacheSeconds,
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

    const data = getGoogleDriveErrorData(error, options)

    console.error(`Failed to load Google Drive project "${slug}"`, data, error)

    throw createError({
      statusCode: 502,
      statusMessage: 'Could not load project from Google Drive',
      data,
    })
  }
})
