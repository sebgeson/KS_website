<template>
  <article class="project-markdown" v-html="html" />
</template>

<script setup>
defineProps({
  html: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.project-markdown {
  color: #33424d;
  font-size: 1.08rem;
}

.project-markdown :deep(h1),
.project-markdown :deep(h2),
.project-markdown :deep(h3) {
  color: var(--color-ink);
  line-height: 1.16;
}

.project-markdown :deep(h1) {
  margin: 0 0 22px;
  font-size: clamp(2rem, 4vw, 3rem);
}

.project-markdown :deep(h2) {
  margin: 34px 0 14px;
  font-size: clamp(1.55rem, 3vw, 2.1rem);
}

.project-markdown :deep(h3) {
  margin: 28px 0 10px;
  font-size: 1.25rem;
}

.project-markdown :deep(p) {
  margin: 0 0 18px;
}

.project-markdown :deep(ul) {
  display: grid;
  gap: 8px;
  margin: 0 0 22px;
  padding-left: 1.2rem;
}

.project-markdown :deep(a) {
  color: #aa552f;
  font-weight: 800;
}
</style>
