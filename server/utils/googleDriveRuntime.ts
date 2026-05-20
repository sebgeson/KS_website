export const getGoogleDriveRuntimeOptions = () => {
  const config = useRuntimeConfig()

  return {
    apiKey: config.googleDriveApiKey || process.env.GOOGLE_DRIVE_API_KEY || '',
    accessToken: config.googleDriveAccessToken || process.env.GOOGLE_DRIVE_ACCESS_TOKEN || '',
    serviceAccountJson:
      config.googleServiceAccountJson ||
      process.env.GOOGLE_SERVICE_ACCOUNT_JSON ||
      process.env.NUXT_GOOGLE_SERVICE_ACCOUNT_JSON ||
      '',
    folderId:
      config.public.googleDriveFolderId ||
      process.env.NUXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID ||
      '',
    publicMode:
      config.public.projectsPublicMode ??
      process.env.NUXT_PUBLIC_PROJECTS_PUBLIC_MODE !== 'false',
    cacheSeconds: Number(
      config.public.projectsCacheSeconds ||
        process.env.NUXT_PUBLIC_PROJECTS_CACHE_SECONDS ||
        900,
    ),
  }
}

export const getGoogleDriveRuntimeStatus = (options = getGoogleDriveRuntimeOptions()) => ({
  hasFolderId: Boolean(options.folderId),
  hasApiKey: Boolean(options.apiKey),
  hasAccessToken: Boolean(options.accessToken),
  hasServiceAccountConfig: Boolean(options.serviceAccountJson),
})

export const getGoogleDriveErrorData = (error: any, options = getGoogleDriveRuntimeOptions()) => {
  const responseError = error?.data?.error
  const message =
    responseError?.message ||
    error?.statusMessage ||
    error?.message ||
    'Unknown Google Drive error'

  return {
    ...getGoogleDriveRuntimeStatus(options),
    googleStatus: error?.statusCode || error?.response?.status,
    googleError: responseError?.status || responseError?.code || error?.code,
    message: String(message).slice(0, 500),
  }
}
