<template>
  <section id="om-oss" class="section section--light about-section" aria-labelledby="about-title">
    <div class="section__inner about-section__inner">
      <div>
        <p class="section__eyebrow">Om oss</p>
        <h2 id="about-title" class="section__title">En ansvarlig partner for tekniske brannsikringsprosjekter.</h2>
        <p class="section__lead">
          Komplett Sprinkler AS utfør sprinkleranlegg der detaljene betyr noe: Fra gjennomtenkt prosjektering, ryddig installasjon, tydelig dokumentasjon og til ferdigstilling av prosjektet.
        </p>
        <p>
          Vi kombinerer praktisk fagkunnskap med strukturert prosjektstyring. Det gjør oss til
          en trygg samarbeidspartner for byggherrer, entreprenører og eiendomsbesittere som ønsker
          en løsning som fungerer i reell drift.
        </p>
      </div>

      <figure class="about-section__image">
        <img :src="aboutImage" alt="Komplett Sprinkler montør under sprinklerarbeid" />
      </figure>
    </div>
  </section>
</template>

<script setup>
import aboutImage from '~/assets/images/AboutImg.png'
</script>

<style scoped>
.about-section__inner {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 56px;
  align-items: center;
}

.about-section p:not(.section__eyebrow, .section__lead) {
  max-width: 660px;
  margin: 18px 0 0;
  color: #586670;
}

.about-section__image {
  position: relative;
  min-height: 430px;
  margin: 0;
  overflow: hidden;
  border-radius: 8px;
  background: #cbd4d8;
  box-shadow: var(--shadow-soft);
}

.about-section__image::after {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 255, 255, 0.32);
  content: '';
}

.about-section__image img {
  width: 100%;
  height: 100%;
  min-height: 430px;
  object-fit: cover;
  object-position: 50% center;
}

@media (max-width: 880px) {
  .about-section__inner {
    grid-template-columns: 1fr;
  }

  .about-section__image,
  .about-section__image img {
    min-height: 320px;
  }
}
</style>
