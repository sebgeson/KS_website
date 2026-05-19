<template>
  <section id="process" class="section process-section" aria-labelledby="process-title">
    <div class="section__inner">
      <p class="section__eyebrow">Process</p>
      <h2 id="process-title" class="section__title">En tydelig arbeidsmodell reduserer risiko og friksjon.</h2>

      <ol class="process-section__list">
        <li v-for="(step, index) in steps" :key="step.title">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
const steps = [
  { title: 'Rådgivning', text: 'Vi avklarer behov, riskbilde, byggtype og praktiske forutsetninger.' },
  { title: 'Prosjektering', text: 'Tekniske løsninger utarbeides med fokus på krav, drift og byggbarhet.' },
  { title: 'Installasjon', text: 'Montasjen planlegges og utføres med orden, dokumentasjon og samordning.' },
  { title: 'Kontroll', text: 'Anlegget kontrolleres før overlevering for å sikre funksjon og kvalitet.' },
  { title: 'Serviceavtale', text: 'Videre oppfølging holder systemet vedlikeholdt og klart over tid.' },
]
</script>

<style scoped>
.process-section {
  background: #101b24;
}

.process-section__list {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0;
  margin: 48px 0 0;
  padding: 0;
  list-style: none;
}

li {
  position: relative;
  padding: 28px 24px;
  border-top: 1px solid var(--color-line);
  border-bottom: 1px solid var(--color-line);
}

li + li {
  border-left: 1px solid var(--color-line);
}

span {
  color: var(--color-accent-strong);
  font-weight: 900;
}

h3 {
  margin: 24px 0 10px;
  font-size: 1.14rem;
}

p {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.96rem;
}

@media (max-width: 1020px) {
  .process-section__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  li {
    border: 1px solid var(--color-line);
  }
}

@media (max-width: 620px) {
  .process-section__list {
    grid-template-columns: 1fr;
  }
}
</style>
