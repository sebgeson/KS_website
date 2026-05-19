<template>
  <header :class="['app-header', { 'app-header--scrolled': scrolled }]">
    <NuxtLink class="app-header__brand" to="/" aria-label="Komplett Sprinkler AS">
      <span class="app-header__mark">KS</span>
      <span>
        <strong>Komplett Sprinkler</strong>
        <small>Sprinkler og brannsikring</small>
      </span>
    </NuxtLink>

    <button
      class="app-header__toggle"
      type="button"
      :aria-expanded="menuOpen"
      aria-label="Åpne meny"
      @click="menuOpen = !menuOpen"
    >
      <span />
      <span />
      <span />
    </button>

    <nav :class="['app-header__nav', { 'app-header__nav--open': menuOpen }]">
      <NuxtLink v-for="item in navItems" :key="item.href" :to="item.href" @click="menuOpen = false">
        {{ item.label }}
      </NuxtLink>
      <NuxtLink class="app-header__cta" to="/contact" @click="menuOpen = false">Kontakt</NuxtLink>
    </nav>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const scrolled = ref(false)
const menuOpen = ref(false)

const navItems = [
  { label: 'Tjenester', href: '/#tjenester' },
  { label: 'Prosjekter', href: '/projects' },
  { label: 'Om oss', href: '/#om-oss' },
  { label: 'Prosess', href: '/#process' },
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 18px clamp(18px, 4vw, 48px);
  color: white;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    padding 180ms ease;
}

.app-header--scrolled,
.app-header:has(.app-header__nav--open) {
  border-bottom: 1px solid var(--color-line);
  background: rgba(9, 18, 26, 0.94);
  backdrop-filter: blur(14px);
}

.app-header__brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.app-header__mark {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.26);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-accent-strong);
  font-weight: 900;
}

.app-header strong,
.app-header small {
  display: block;
}

.app-header strong {
  line-height: 1.1;
}

.app-header small {
  color: var(--color-muted);
  font-size: 0.76rem;
}

.app-header__nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-header__nav a {
  padding: 10px 12px;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.82);
  font-weight: 700;
  text-decoration: none;
}

.app-header__nav a:hover {
  color: white;
  background: rgba(255, 255, 255, 0.08);
}

.app-header__cta {
  margin-left: 8px;
  background: var(--color-accent);
  color: #101820 !important;
}

.app-header__toggle {
  display: none;
  width: 44px;
  height: 44px;
  border: 1px solid var(--color-line);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
}

.app-header__toggle span {
  display: block;
  width: 20px;
  height: 2px;
  margin: 4px auto;
  background: white;
}

@media (max-width: 760px) {
  .app-header__toggle {
    display: block;
  }

  .app-header__nav {
    position: absolute;
    top: 100%;
    right: 18px;
    left: 18px;
    display: none;
    flex-direction: column;
    align-items: stretch;
    padding: 14px;
    border: 1px solid var(--color-line);
    border-radius: 8px;
    background: #0d1822;
    box-shadow: var(--shadow-soft);
  }

  .app-header__nav--open {
    display: flex;
  }

  .app-header__cta {
    margin-left: 0;
    text-align: center;
  }
}
</style>
