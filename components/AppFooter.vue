<template>
  <footer class="app-footer">
    <div class="app-footer__inner">
      <div class="app-footer__brand">
        <span class="app-footer__mark">KS</span>
        <h2>Komplett Sprinkler AS</h2>
        <p>Moderne sprinklerentreprise med fokus på trygghet, kvalitet og langsiktig drift.</p>
      </div>

      <nav aria-label="Hurtiglenker">
        <h3>Hurtiglenker</h3>
        <NuxtLink to="/">Forside</NuxtLink>
        <NuxtLink to="/#tjenester">Tjenester</NuxtLink>
        <NuxtLink to="/projects">Prosjekter</NuxtLink>
        <NuxtLink to="/#om-oss">Om oss</NuxtLink>
        <NuxtLink to="/contact">Kontakt</NuxtLink>
      </nav>

      <nav aria-label="Tjenester">
        <h3>Tjenester</h3>
        <NuxtLink to="/#tjenester">Prosjektering</NuxtLink>
        <NuxtLink to="/#tjenester">Installasjon</NuxtLink>
        <NuxtLink to="/#tjenester">Service og vedlikehold</NuxtLink>
        <NuxtLink to="/#tjenester">Kontroll</NuxtLink>
      </nav>

      <address>
        <h3>Kontakt</h3>
        <a href="mailto:max@komplettsprinkler.no">max@komplettsprinkler.no</a>
        <a href="tel:+4798160556">+47 98 16 05 56</a>
        <span>Norge</span>
        <a href="https://www.linkedin.com" rel="noopener noreferrer" target="_blank">LinkedIn</a>
      </address>
    </div>

    <div class="app-footer__bottom">
      <span>© {{ year }} Komplett Sprinkler AS</span>
      <span>Sprinkler · Brannsikring · Teknisk entreprise</span>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  padding: 72px 24px 28px;
  border-top: 1px solid var(--color-line);
  background: #081118;
  color: white;
}

.app-footer__inner,
.app-footer__bottom {
  width: min(100%, var(--container));
  margin: 0 auto;
}

.app-footer__inner {
  display: grid;
  grid-template-columns: 1.4fr repeat(3, 1fr);
  gap: 42px;
}

.app-footer__mark {
  display: grid;
  width: 46px;
  height: 46px;
  place-items: center;
  border: 1px solid var(--color-line);
  border-radius: 6px;
  color: var(--color-accent-strong);
  font-weight: 900;
}

h2,
h3,
p {
  margin-top: 0;
}

h2 {
  margin-bottom: 12px;
  font-size: 1.3rem;
}

h3 {
  margin-bottom: 14px;
  color: var(--color-accent-strong);
  font-size: 0.88rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

p,
span,
a {
  color: var(--color-muted);
}

nav,
address {
  display: grid;
  align-content: start;
  gap: 8px;
  font-style: normal;
}

a {
  text-decoration: none;
}

a:hover {
  color: white;
}

.app-footer__bottom {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin-top: 58px;
  padding-top: 24px;
  border-top: 1px solid var(--color-line);
  font-size: 0.9rem;
}

@media (max-width: 860px) {
  .app-footer__inner {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .app-footer__inner,
  .app-footer__bottom {
    grid-template-columns: 1fr;
  }

  .app-footer__bottom {
    flex-direction: column;
  }
}
</style>
