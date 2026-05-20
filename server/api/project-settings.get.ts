export default defineEventHandler(() => {
  const config = useRuntimeConfig()
  const options = getGoogleDriveRuntimeOptions()
  const status = getGoogleDriveRuntimeStatus(options)

  return {
    googleClientId: config.public.googleClientId,
    driveFolderId: options.folderId,
    cacheSeconds: options.cacheSeconds,
    publicMode: options.publicMode,
    hasServerApiKey: status.hasApiKey,
    hasAccessToken: status.hasAccessToken,
    hasServiceAccountConfig: status.hasServiceAccountConfig,
  }
})
