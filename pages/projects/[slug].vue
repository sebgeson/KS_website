<template>
  <main>
    <div v-if="pending" class="project-detail__loading">
      <div />
    </div>

    <section v-else-if="error || !project" class="project-detail__error">
      <div>
        <h1>Prosjektet ble ikke funnet</h1>
        <p>Prosjektet kan være flyttet, slettet eller mangle i Google Drive.</p>
        <NuxtLink class="button button--primary" to="/projects">Tilbake til prosjekter</NuxtLink>
      </div>
    </section>

    <template v-else>
      <ProjectsProjectHero :title="project.name" :image="project.heroImage" />

      <section class="section section--light">
        <div class="section__inner project-detail__content">
          <ProjectsProjectMarkdown :html="project.descriptionHtml" />
          <ProjectsProjectGallery :images="projectImages" />
          <NuxtLink class="project-detail__back" to="/projects">Tilbake til alle prosjekter</NuxtLink>
        </div>
      </section>
    </template>
  </main>
</template>

<script setup>
const route = useRoute()
const slug = String(route.params.slug || '')
const { data, pending, error } = await useProject(slug)
const project = computed(() => data.value?.project)
const projectImages = computed(() => {
  if (!project.value) return []

  const images = [project.value.heroImage, ...(project.value.gallery || [])]
  const seen = new Set()

  return images.filter((image) => {
    if (!image?.id || seen.has(image.id)) return false

    seen.add(image.id)
    return true
  })
})

useSeoMeta({
  title: () =>
    project.value
      ? `${project.value.name} | Komplett Sprinkler AS`
      : 'Prosjekt | Komplett Sprinkler AS',
  description: () => project.value?.excerpt || 'Ferdig prosjekt fra Komplett Sprinkler AS.',
})
</script>

<style scoped>
.project-detail__content {
  max-width: 900px;
}

.project-detail__loading,
.project-detail__error {
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 140px 24px 80px;
}

.project-detail__loading {
  background: var(--color-surface-light);
}

.project-detail__loading div {
  width: min(100%, 900px);
  height: 560px;
  border-radius: 8px;
  background:
    linear-gradient(90deg, #dfe6ea 25%, #eef3f5 50%, #dfe6ea 75%) 0 0 / 200% 100%;
  animation: shimmer 1.2s linear infinite;
}

.project-detail__error {
  background: var(--color-bg);
  text-align: center;
}

.project-detail__error h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 4rem);
}

.project-detail__error p {
  margin: 14px 0 26px;
  color: var(--color-muted);
}

.project-detail__back {
  display: inline-flex;
  margin-top: 46px;
  color: #aa552f;
  font-weight: 900;
  text-decoration: none;
}

@keyframes shimmer {
  to {
    background-position: -200% 0;
  }
}
</style>
