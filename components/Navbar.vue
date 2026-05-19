<template>
  <nav :class="['navbar', scrolled ? 'scrolled' : '']">
    <div class="nav-content">
      <h1 class="logo">Komplett Sprinkler AS</h1>
      <ul class="nav-links">
        <li><NuxtLink to="/">Forside</NuxtLink></li>
        <li class="dropdown" @mouseenter="open = true" @mouseleave="open = false">
          <a class="dropdown-toggle">Tjenester ▾</a>
          <div v-show="open" class="dropdown-wrapper">
            <ul class="dropdown-menu">
              <li><NuxtLink to="#sprinkler">Sprinklerinstallasjon</NuxtLink></li>
              <li><NuxtLink to="#service">Service & vedlikehold</NuxtLink></li>
              <li><NuxtLink to="#prosjektering">Prosjektering</NuxtLink></li>
              <li><NuxtLink to="#anlegg">Totalentreprise av anlegg</NuxtLink></li>
            </ul>
          </div>
        </li>
        <li><NuxtLink to="/contact">Kontakt</NuxtLink></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const open = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>


<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 16px 0;
  z-index: 1000;
  transition: background 0.3s ease, backdrop-filter 0.3s ease;
  background: transparent; /* start transparent */
  color: white;
}

.navbar.scrolled {
  background: rgb(4, 27, 48); /* solid blå bakgrund */
  backdrop-filter: blur(6px); /* modern effekt */
  opacity: 0.95;
}

.nav-content {
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.logo {
  font-weight: bold;
  color: inherit;
}

.nav-links {
  display: flex;
  gap: 20px;
  list-style: none;
}

.nav-links a {
  color: inherit;
  text-decoration: none;
  padding: 8px 12px;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #ff4444;
}

/* Dropdown */
.dropdown {
  position: relative;
}

.dropdown-toggle {
  cursor: pointer;
}

.dropdown-wrapper {
  position: absolute;
  top: 35px;
  left: 0;
  background: white;
  border-radius: 10px;
  padding: 10px 0;
  min-width: 220px;
  box-shadow: 0px 8px 20px rgba(0,0,0,0.2);
  pointer-events: auto;
  z-index: 2000;
}

.dropdown-menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu li a {
  display: block;
  padding: 10px 20px;
  color: #333;
  text-decoration: none;
  transition: 0.2s;
}

.dropdown-menu li a:hover {
  background: #f2f2f2;
  color: #d32f2f;
}

</style>
