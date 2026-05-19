export default defineEventHandler(() => {
  const config = useRuntimeConfig()

  return {
    googleClientId: config.public.googleClientId,
    driveFolderId: config.public.googleDriveFolderId,
    cacheSeconds: config.public.projectsCacheSeconds,
    publicMode: config.public.projectsPublicMode,
    hasServerApiKey: Boolean(config.googleDriveApiKey),
    hasAccessToken: Boolean(config.googleDriveAccessToken),
    hasServiceAccountConfig: Boolean(config.googleServiceAccountJson),
  }
})
