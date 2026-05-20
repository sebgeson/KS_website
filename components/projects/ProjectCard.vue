<template>
  <article class="project-card">
    <NuxtLink :to="`/projects/${project.slug}`" class="project-card__image">
      <img :src="project.heroImage.url" :alt="project.heroImage.alt" loading="lazy" />
    </NuxtLink>
    <div class="project-card__content">
      <h3>{{ project.name }}</h3>
      <p>{{ project.excerpt }}</p>
      <NuxtLink class="project-card__link" :to="`/projects/${project.slug}`">Les mer</NuxtLink>
    </div>
  </article>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.project-card {
  display: grid;
  overflow: hidden;
  border: 1px solid rgba(15, 31, 43, 0.12);
  border-radius: 8px;
  background: white;
  box-shadow: 0 18px 50px rgba(20, 35, 46, 0.08);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.project-card:hover {
  box-shadow: 0 24px 70px rgba(20, 35, 46, 0.14);
  transform: translateY(-4px);
}

.project-card__image {
  display: block;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #cbd4d8;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 240ms ease;
}

.project-card:hover img {
  transform: scale(1.04);
}

.project-card__content {
  display: grid;
  gap: 14px;
  padding: 26px;
  align-content: start;
}

h3,
p {
  margin: 0;
}

h3 {
  color: var(--color-ink);
  font-size: 1.3rem;
  line-height: 1.2;
}

p {
  color: #5e6b73;
  display: -webkit-box;
  overflow: hidden;
  line-height: 1.45;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.project-card__link {
  color: #aa552f;
  font-weight: 900;
  text-decoration: none;
}
</style>
