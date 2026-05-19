// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    googleDriveApiKey: process.env.GOOGLE_DRIVE_API_KEY || '',
    googleDriveAccessToken: process.env.GOOGLE_DRIVE_ACCESS_TOKEN || '',
    googleServiceAccountJson: process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '',
    public: {
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      googleDriveFolderId: process.env.NUXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID || '',
      projectsCacheSeconds: Number(process.env.NUXT_PUBLIC_PROJECTS_CACHE_SECONDS || 900),
      projectsPublicMode: process.env.NUXT_PUBLIC_PROJECTS_PUBLIC_MODE !== 'false',
    },
  },
})
