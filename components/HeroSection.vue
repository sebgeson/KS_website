<template>
  <section class="hero-section" aria-labelledby="hero-title">
    <div class="hero-section__media" aria-hidden="true" />
    <div class="hero-section__inner">
      <p class="hero-section__eyebrow">Teknisk brannsikringspartner</p>
      <h1 id="hero-title">Sprinklerløsninger for bygg der drift og sikkerhet må fungere.</h1>
      <p>
        Komplett Sprinkler AS hjelper eiendomsbesittere, entreprenører og prosjektledere med
        prosjektering, installasjon, kontroll og langsiktig service av sprinkleranlegg.
      </p>
      <div class="hero-section__actions">
        <NuxtLink class="button button--primary" to="/contact">Kontakt oss</NuxtLink>
        <NuxtLink class="button button--secondary" to="#tjenester">Våre tjenester</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  display: grid;
  min-height: 92vh;
  align-items: center;
  padding: 150px 24px 96px;
  overflow: hidden;
}

.hero-section__media {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(7, 15, 24, 0.76) 0%, rgba(7, 15, 24, 0.48) 48%, rgba(7, 15, 24, 0.16) 100%),
    linear-gradient(0deg, rgba(13, 21, 28, 0.54), rgba(13, 21, 28, 0.04) 40%),
    url('~/assets/images/KS_Hero.png') center / cover;
  transform: scale(1.02);
}

.hero-section__inner {
  position: relative;
  width: min(100%, var(--container));
  margin: 0 auto;
}

.hero-section__eyebrow {
  margin: 0 0 18px;
  color: var(--color-accent-strong);
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  max-width: 870px;
  margin: 0;
  font-size: clamp(2.65rem, 6vw, 5.8rem);
  line-height: 0.98;
}

p:not(.hero-section__eyebrow) {
  max-width: 680px;
  margin: 28px 0 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: clamp(1.05rem, 2vw, 1.3rem);
}

.hero-section__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 34px;
}

@media (max-width: 720px) {
  .hero-section {
    min-height: 86vh;
    padding: 130px 18px 64px;
  }

  .hero-section__media {
    background:
      linear-gradient(180deg, rgba(7, 15, 24, 0.72), rgba(7, 15, 24, 0.5)),
      url('~/assets/images/KS_Hero.png') center / cover;
  }

  .hero-section__actions {
    flex-direction: column;
  }
}
</style>
