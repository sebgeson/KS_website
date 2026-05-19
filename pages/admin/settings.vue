<template>
  <main class="settings-page">
    <section class="settings-page__hero">
      <div class="settings-page__inner">
        <p class="section__eyebrow">Admin</p>
        <h1>Google Drive-innstillinger for ferdige prosjekter.</h1>
        <p>
          Verdiene settes via miljøvariabler. Hemmelige nøkler vises aldri i frontend.
        </p>
      </div>
    </section>

    <section class="section section--light">
      <div class="section__inner settings-page__grid">
        <article class="settings-page__panel">
          <h2>Aktiv konfigurasjon</h2>
          <dl>
            <div>
              <dt>Google Client ID</dt>
              <dd>{{ settings?.googleClientId || 'Ikke satt' }}</dd>
            </div>
            <div>
              <dt>Drive Folder ID</dt>
              <dd>{{ settings?.driveFolderId || 'Ikke satt' }}</dd>
            </div>
            <div>
              <dt>Cache-tid</dt>
              <dd>{{ settings?.cacheSeconds || 900 }} sekunder</dd>
            </div>
            <div>
              <dt>Offentlig modus</dt>
              <dd>{{ settings?.publicMode ? 'Ja' : 'Nei' }}</dd>
            </div>
            <div>
              <dt>Server API key</dt>
              <dd>{{ settings?.hasServerApiKey ? 'Konfigurert' : 'Ikke satt' }}</dd>
            </div>
            <div>
              <dt>Access token</dt>
              <dd>{{ settings?.hasAccessToken ? 'Konfigurert' : 'Ikke satt' }}</dd>
            </div>
            <div>
              <dt>Service account</dt>
              <dd>{{ settings?.hasServiceAccountConfig ? 'Konfigurert' : 'Ikke satt' }}</dd>
            </div>
          </dl>
        </article>

        <article class="settings-page__panel">
          <h2>Miljøvariabler</h2>
          <p>Legg disse i `.env` lokalt og i hostingmiljøet ved deploy.</p>
          <pre><code>NUXT_PUBLIC_GOOGLE_CLIENT_ID=
NUXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID=
NUXT_PUBLIC_PROJECTS_CACHE_SECONDS=900
NUXT_PUBLIC_PROJECTS_PUBLIC_MODE=true
GOOGLE_DRIVE_API_KEY=
GOOGLE_DRIVE_ACCESS_TOKEN=
GOOGLE_SERVICE_ACCOUNT_JSON=</code></pre>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
const { data: settings } = await useFetch('/api/project-settings')

useSeoMeta({
  title: 'Prosjektinnstillinger | Komplett Sprinkler AS',
  description: 'Admininnstillinger for Google Drive-baserte prosjekter.',
})
</script>

<style scoped>
.settings-page__hero {
  padding: 150px 24px 86px;
  background:
    linear-gradient(90deg, rgba(8, 17, 24, 0.95), rgba(8, 17, 24, 0.72)),
    url('~/assets/images/KS_Hero.png') center / cover;
}

.settings-page__inner {
  width: min(100%, var(--container));
  margin: 0 auto;
}

h1 {
  max-width: 880px;
  margin: 0;
  font-size: clamp(2.5rem, 6vw, 5.2rem);
  line-height: 1;
}

.settings-page__hero p:not(.section__eyebrow) {
  max-width: 720px;
  margin: 22px 0 0;
  color: var(--color-muted);
  font-size: 1.14rem;
}

.settings-page__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.settings-page__panel {
  padding: 30px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 18px 50px rgba(20, 35, 46, 0.08);
}

h2 {
  margin: 0 0 22px;
  color: var(--color-ink);
}

dl {
  display: grid;
  gap: 14px;
  margin: 0;
}

dl div {
  display: grid;
  gap: 4px;
  padding-bottom: 14px;
  border-bottom: 1px solid #dfe6ea;
}

dt {
  color: #5e6b73;
  font-weight: 800;
}

dd {
  margin: 0;
  color: var(--color-ink);
  overflow-wrap: anywhere;
}

pre {
  overflow-x: auto;
  margin: 18px 0 0;
  padding: 18px;
  border-radius: 8px;
  background: #101b24;
  color: #eaf0f2;
}

@media (max-width: 860px) {
  .settings-page__grid {
    grid-template-columns: 1fr;
  }
}
</style>
