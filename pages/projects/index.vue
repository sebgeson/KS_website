<template>
  <main class="projects-page">
    <section class="projects-page__hero">
      <div class="projects-page__inner">
        <p class="section__eyebrow">Ferdige prosjekter</p>
        <h1>Referanser fra sprinkler- og brannsikringsprosjekter.</h1>
      </div>
    </section>

    <section class="section section--light">
      <div class="section__inner">
        <div v-if="pending" class="projects-page__grid">
          <div v-for="item in 6" :key="item" class="projects-page__skeleton" />
        </div>

        <div v-else-if="error" class="projects-page__state">
          <h2>Kunne ikke hente prosjekter</h2>
          <p>Kontroller Google Drive-konfigurasjonen og prøv igjen.</p>
        </div>

        <div v-else-if="!projects.length" class="projects-page__state">
          <h2>Ingen prosjekter funnet</h2>
          <p>Legg prosjektmapper i valgt Google Drive-mappe for å vise dem her.</p>
        </div>

        <template v-else>
          <div v-if="!data?.configured" class="projects-page__notice">
            Viser eksempeldata. Legg til Google Drive-konfigurasjon i miljøvariablene for å hente
            ekte prosjekter.
          </div>
          <div class="projects-page__grid">
            <ProjectsProjectCard v-for="project in projects" :key="project.slug" :project="project" />
          </div>
        </template>
      </div>
    </section>
  </main>
</template>

<script setup>
const { data, pending, error } = await useProjects()

const projects = computed(() => data.value?.projects || [])

useSeoMeta({
  title: 'Ferdige prosjekter | Komplett Sprinkler AS',
  description:
    'Se ferdige sprinkler- og brannsikringsprosjekter fra Komplett Sprinkler AS.',
})
</script>

<style scoped>
.projects-page__hero {
  padding: 150px 24px 86px;
  background:
    linear-gradient(90deg, rgba(8, 17, 24, 0.95), rgba(8, 17, 24, 0.72)),
    url('~/assets/images/KS_Hero.png') center / cover;
}

.projects-page__inner {
  width: min(100%, var(--container));
  margin: 0 auto;
}

h1 {
  max-width: 880px;
  margin: 0;
  font-size: clamp(2.5rem, 6vw, 5.2rem);
  line-height: 1;
}

.projects-page__hero p:not(.section__eyebrow) {
  max-width: 720px;
  margin: 22px 0 0;
  color: var(--color-muted);
  font-size: 1.14rem;
}

.projects-page__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.projects-page__notice,
.projects-page__state {
  margin-bottom: 28px;
  padding: 22px;
  border: 1px solid rgba(211, 111, 61, 0.28);
  border-radius: 8px;
  background: rgba(211, 111, 61, 0.08);
  color: var(--color-ink);
}

.projects-page__state {
  margin-bottom: 0;
  text-align: center;
}

.projects-page__state h2,
.projects-page__state p {
  margin: 0;
}

.projects-page__state p {
  margin-top: 8px;
  color: #5e6b73;
}

.projects-page__skeleton {
  min-height: 360px;
  border-radius: 8px;
  background:
    linear-gradient(90deg, #dfe6ea 25%, #eef3f5 50%, #dfe6ea 75%) 0 0 / 200% 100%;
  animation: shimmer 1.2s linear infinite;
}

@keyframes shimmer {
  to {
    background-position: -200% 0;
  }
}

@media (max-width: 980px) {
  .projects-page__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .projects-page__grid {
    grid-template-columns: 1fr;
  }
}
</style>
