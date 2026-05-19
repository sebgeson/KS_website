<template>
  <section class="contact-cta" aria-labelledby="contact-cta-title">
    <div class="contact-cta__inner">
      <p>Trenger du hjelp med sprinkler eller brannsikring?</p>
      <h2 id="contact-cta-title">Ta kontakt for rådgivning, prosjektunderlag eller service.</h2>
      <NuxtLink class="button button--primary" to="/contact">Kontakt oss</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.contact-cta {
  padding: 96px 24px;
  background:
    linear-gradient(135deg, rgba(211, 111, 61, 0.18), transparent 36%),
    #0b141c;
}

.contact-cta__inner {
  display: grid;
  width: min(100%, var(--container));
  margin: 0 auto;
  gap: 22px;
  justify-items: start;
  padding: clamp(34px, 7vw, 70px);
  border: 1px solid var(--color-line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.045);
}

p {
  margin: 0;
  color: var(--color-accent-strong);
  font-weight: 900;
}

h2 {
  max-width: 820px;
  margin: 0;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.06;
}

@media (max-width: 620px) {
  .contact-cta {
    padding: 72px 18px;
  }

  .button {
    width: 100%;
  }
}
</style>
