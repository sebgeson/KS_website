<template>
  <section class="section trust-section" aria-labelledby="trust-title">
    <div class="section__inner">
      <p class="section__eyebrow">Tillit</p>
      <h2 id="trust-title" class="section__title">Trygg leveranse fra teknisk underlag til stabil drift.</h2>

      <div class="trust-section__grid">
        <article v-for="item in stats" :key="item.label" class="trust-section__card">
          <strong>{{ item.value }}</strong>
          <span>{{ item.label }}</span>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const companyStartYear = 2001
const yearsOfExperience = String(new Date().getFullYear() - companyStartYear)

const stats = [
  {
    value: yearsOfExperience,
    label: 'års erfaring',
    text: 'Praktisk kompetanse fra sprinklerprosjekter med høye krav til samordning og kvalitet.',
  },
  {
    value: 'Alle',
    label: 'typer bygg',
    text: 'Løsninger for bolig, næring, offentlig miljø, lager og teknisk krevende lokaler.',
  },
  {
    value: '24/7',
    label: 'beredskap',
    text: 'Med døgnbemanning og rask responstid er vi tilgjengelige 24/7 for akutte oppdrag og kritiske hendelser.',
  },
  {
    value: 'Hele',
    label: 'Norden',
    text: 'Vi utfører arbeid i Norge, Sverige & Danmark.'

  }
]
</script>

<style scoped>
.trust-section {
  background:
    linear-gradient(135deg, rgba(211, 111, 61, 0.12), transparent 32%),
    var(--color-bg);
}

.trust-section__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-top: 44px;
}

.trust-section__card {
  padding: 24px;
  border: 1px solid var(--color-line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.045);
}

strong {
  display: block;
  color: var(--color-accent-strong);
  font-size: clamp(2rem, 4vw, 3.6rem);
  line-height: 1;
  overflow-wrap: anywhere;
}

span {
  display: block;
  margin-top: 10px;
  color: white;
  font-size: 1.12rem;
  font-weight: 900;
}

p {
  margin: 14px 0 0;
  color: var(--color-muted);
}

@media (max-width: 980px) {
  .trust-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .trust-section__grid {
    grid-template-columns: 1fr;
  }
}
</style>
