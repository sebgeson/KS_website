<template>
  <Layouts />
</template>

<script setup>
import Layouts from './layouts.vue'
</script>

<style>
:root {
  --color-bg: #0d151c;
  --color-bg-soft: #111f2a;
  --color-surface: #162631;
  --color-surface-light: #eef2f4;
  --color-text: #f8fafb;
  --color-muted: #aab7bf;
  --color-ink: #17212a;
  --color-accent: #d36f3d;
  --color-accent-strong: #ff8a4c;
  --color-line: rgba(255, 255, 255, 0.12);
  --shadow-soft: 0 24px 60px rgba(3, 10, 18, 0.28);
  --container: 1180px;
}

* {
  box-sizing: border-box;
}

html {
  font-size: 17px;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  line-height: 1.6;
}

body,
button,
input,
textarea {
  font: inherit;
}

a {
  color: inherit;
}

img {
  display: block;
  max-width: 100%;
}

.site-shell {
  min-height: 100vh;
  overflow-x: clip;
}

.section {
  padding: 96px 24px;
}

.section--light {
  background: var(--color-surface-light);
  color: var(--color-ink);
}

.section__inner {
  width: min(100%, var(--container));
  margin: 0 auto;
}

.section__eyebrow {
  margin: 0 0 12px;
  color: var(--color-accent-strong);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.section__title {
  max-width: 780px;
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1.08;
}

.section__lead {
  max-width: 720px;
  margin: 18px 0 0;
  color: var(--color-muted);
  font-size: 1.08rem;
}

.section--light .section__lead {
  color: #586670;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  border: 1px solid transparent;
  border-radius: 6px;
  font-weight: 800;
  text-decoration: none;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background 180ms ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button--primary {
  background: var(--color-accent);
  color: #111820;
}

.button--primary:hover {
  background: var(--color-accent-strong);
}

.button--secondary {
  border-color: rgba(255, 255, 255, 0.28);
  color: var(--color-text);
}

.button--dark {
  background: var(--color-ink);
  color: white;
}

@media (max-width: 720px) {
  html {
    font-size: 16.5px;
  }

  .section {
    padding: 72px 18px;
  }
}
</style>
