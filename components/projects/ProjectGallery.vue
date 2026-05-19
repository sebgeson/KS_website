<template>
  <section v-if="images?.length" class="project-gallery" aria-labelledby="gallery-title">
    <h2 id="gallery-title">Bildegalleri</h2>
    <div class="project-gallery__grid">
      <figure v-for="(image, index) in images" :key="image.id">
        <button type="button" class="project-gallery__thumb" @click="openLightbox(index)">
          <img :src="image.url" :alt="image.alt" loading="lazy" />
        </button>
      </figure>
    </div>

    <Teleport to="body">
      <div
        v-if="activeImage"
        class="project-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Bildevisning"
        tabindex="-1"
        @click.self="closeLightbox"
        @keydown.esc="closeLightbox"
        @keydown.left.prevent="showPrevious"
        @keydown.right.prevent="showNext"
      >
        <button
          type="button"
          class="project-lightbox__close"
          aria-label="Lukk bildevisning"
          @click="closeLightbox"
        >
          &times;
        </button>

        <button
          v-if="images.length > 1"
          type="button"
          class="project-lightbox__nav project-lightbox__nav--previous"
          aria-label="Forrige bilde"
          @click="showPrevious"
        >
          &lsaquo;
        </button>

        <figure class="project-lightbox__figure">
          <img :src="activeImage.url" :alt="activeImage.alt" />
          <figcaption>{{ activeIndex + 1 }} / {{ images.length }}</figcaption>
        </figure>

        <button
          v-if="images.length > 1"
          type="button"
          class="project-lightbox__nav project-lightbox__nav--next"
          aria-label="Neste bilde"
          @click="showNext"
        >
          &rsaquo;
        </button>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
})

const activeIndex = ref(-1)
const activeImage = computed(() => props.images[activeIndex.value])

const openLightbox = (index) => {
  activeIndex.value = index
}

const closeLightbox = () => {
  activeIndex.value = -1
}

const showPrevious = () => {
  activeIndex.value =
    activeIndex.value <= 0 ? props.images.length - 1 : activeIndex.value - 1
}

const showNext = () => {
  activeIndex.value =
    activeIndex.value >= props.images.length - 1 ? 0 : activeIndex.value + 1
}

watch(activeImage, async (image) => {
  if (!import.meta.client) return

  document.body.style.overflow = image ? 'hidden' : ''

  if (image) {
    await nextTick()
    document.querySelector('.project-lightbox')?.focus()
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.project-gallery {
  margin-top: 64px;
}

h2 {
  margin: 0 0 22px;
  color: var(--color-ink);
  font-size: clamp(1.7rem, 3vw, 2.4rem);
}

.project-gallery__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.project-gallery__grid figure {
  aspect-ratio: 4 / 3;
  margin: 0;
  overflow: hidden;
  border-radius: 8px;
  background: #d9e0e4;
}

.project-gallery__thumb {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: zoom-in;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-lightbox {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 72px 96px;
  background: rgba(6, 12, 18, 0.94);
  outline: none;
}

.project-lightbox__figure {
  display: grid;
  width: min(100%, 1180px);
  max-height: 100%;
  margin: 0;
  gap: 14px;
  background: transparent;
  overflow: visible;
}

.project-lightbox__figure img {
  display: block;
  width: 100%;
  height: auto;
  max-height: calc(100vh - 160px);
  object-fit: contain;
}

figcaption {
  color: rgba(255, 255, 255, 0.78);
  font-weight: 800;
  text-align: center;
}

.project-lightbox__close,
.project-lightbox__nav {
  position: fixed;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  cursor: pointer;
}

.project-lightbox__close:hover,
.project-lightbox__nav:hover {
  background: rgba(255, 255, 255, 0.22);
}

.project-lightbox__close {
  top: 24px;
  right: 24px;
  width: 46px;
  height: 46px;
  font-size: 2rem;
  line-height: 1;
}

.project-lightbox__nav {
  top: 50%;
  width: 54px;
  height: 54px;
  font-size: 3rem;
  line-height: 1;
  transform: translateY(-50%);
}

.project-lightbox__nav--previous {
  left: 24px;
}

.project-lightbox__nav--next {
  right: 24px;
}

@media (max-width: 840px) {
  .project-gallery__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .project-lightbox {
    padding: 70px 22px 86px;
  }

  .project-lightbox__figure img {
    max-height: calc(100vh - 190px);
  }

  .project-lightbox__nav {
    top: auto;
    bottom: 18px;
    transform: none;
  }
}

@media (max-width: 560px) {
  .project-gallery__grid {
    grid-template-columns: 1fr;
  }
}
</style>
