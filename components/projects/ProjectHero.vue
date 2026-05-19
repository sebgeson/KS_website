<template>
  <section class="project-hero">
    <img :src="image.url" :alt="image.alt" />
    <div class="project-hero__overlay" />
    <div class="project-hero__content">
      <NuxtLink class="project-hero__back" to="/projects">Tilbake til prosjekter</NuxtLink>
      <p>Ferdig prosjekt</p>
      <h1>{{ title }}</h1>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.project-hero {
  position: relative;
  display: grid;
  min-height: 72vh;
  align-items: end;
  overflow: hidden;
  padding: 150px 24px 80px;
  background: #0b141c;
}

img,
.project-hero__overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

img {
  object-fit: cover;
}

.project-hero__overlay {
  background:
    linear-gradient(90deg, rgba(7, 15, 24, 0.92), rgba(7, 15, 24, 0.46)),
    linear-gradient(0deg, rgba(7, 15, 24, 0.86), transparent 52%);
}

.project-hero__content {
  position: relative;
  width: min(100%, var(--container));
  margin: 0 auto;
}

.project-hero__back {
  display: inline-flex;
  margin-bottom: 28px;
  color: rgba(255, 255, 255, 0.78);
  font-weight: 800;
  text-decoration: none;
}

.project-hero__back:hover {
  color: white;
}

p {
  margin: 0 0 12px;
  color: var(--color-accent-strong);
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  max-width: 900px;
  margin: 0;
  font-size: clamp(2.5rem, 6vw, 5.4rem);
  line-height: 1;
}
</style>
