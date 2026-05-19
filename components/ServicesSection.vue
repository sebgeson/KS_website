<template>
  <section id="tjenester" class="section section--light services-section" aria-labelledby="services-title">
    <div class="section__inner">
      <p class="section__eyebrow">Tjenester</p>
      <div class="services-section__header">
        <h2 id="services-title" class="section__title">Helhetsleveranse for sprinkler og brannsikring.</h2>
        <p class="section__lead">
          Vi samler teknisk rådgivning, utførelse og ettermarked i en tydelig prosess for både
          nye anlegg og oppgraderinger.
        </p>
      </div>

      <div class="services-section__grid">
        <ServiceCard
          v-for="service in services"
          :key="service.title"
          :title="service.title"
          :description="service.description"
          :icon-path="service.iconPath"
          @open="openService(service)"
        />
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="selectedService"
        class="service-modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="serviceModalTitleId"
        tabindex="-1"
        @click.self="closeService"
        @keydown.esc="closeService"
      >
        <article class="service-modal__panel">
          <button
            type="button"
            class="service-modal__close"
            aria-label="Lukk tjenesteinformasjon"
            @click="closeService"
          >
            &times;
          </button>

          <div class="service-modal__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img">
              <path :d="selectedService.iconPath" />
            </svg>
          </div>

          <h3 :id="serviceModalTitleId">{{ selectedService.title }}</h3>
          <p class="service-modal__lead">{{ selectedService.fullText }}</p>

          <ul>
            <li v-for="item in selectedService.details" :key="item">{{ item }}</li>
          </ul>

          <NuxtLink class="button button--primary" to="/contact" @click="closeService">
            Kontakt oss
          </NuxtLink>
        </article>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
const serviceModalTitleId = 'service-modal-title'
const selectedService = ref(null)

const openService = async (service) => {
  selectedService.value = service
  await nextTick()
  document.querySelector('.service-modal')?.focus()
}

const closeService = () => {
  selectedService.value = null
}

watch(selectedService, (service) => {
  if (import.meta.client) {
    document.body.style.overflow = service ? 'hidden' : ''
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})

const services = [
  {
    title: 'Prosjektering',
    description: 'Dimensjonering, løsningsvalg og teknisk samordning fra tidlig fase til ferdig underlag.',
    fullText:
      'Vi utarbeider tekniske sprinklerløsninger som tar hensyn til byggtype, regelverk, drift, fremdrift og praktisk gjennomføring på byggeplass.',
    details: [
      'Dimensjonering og systemvalg for nye og eksisterende bygg.',
      'Teknisk koordinering mot øvrige fag og prosjektkrav.',
      'Underlag for installasjon, kontroll og dokumentasjon.',
    ],
    iconPath: 'M4 19.5V4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5Zm4-12h8m-8 4h6',
  },
  {
    title: 'Installasjon',
    description: 'Planlagt og nøyaktig montering av sprinkleranlegg i boliger, næringsbygg og industri.',
    fullText:
      'Vi utfører sprinklerinstallasjoner med fokus på ryddig fremdrift, nøyaktig montasje og løsninger som fungerer i reell drift etter overlevering.',
    details: [
      'Montasje av rør, komponenter, ventiler og sprinklerhoder.',
      'Koordinering med byggeplass, fremdriftsplan og øvrige tekniske fag.',
      'Kvalitetssikring gjennom installasjonsløpet.',
    ],
    iconPath: 'M4 14h16M7 14V8a5 5 0 0 1 10 0v6M9 20h6M12 14v6',
  },
  {
    title: 'Service og vedlikehold',
    description: 'Forebyggende service, feilsøking og vedlikehold som holder anlegget klart over tid.',
    fullText:
      'Vi følger opp sprinkleranlegg etter overlevering med service, vedlikehold og feilretting som bidrar til stabil funksjon over tid.',
    details: [
      'Forebyggende service og planlagt vedlikehold.',
      'Feilsøking, utbedringer og utskifting av komponenter.',
      'Praktisk rådgivning for trygg og forutsigbar drift.',
    ],
    iconPath: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4L15 12l-3-3Z',
  },
  {
    title: 'Kontroll / inspeksjon',
    description: 'Systematiske kontroller med tydelig dokumentasjon for kvalitet, drift og myndighetskrav.',
    fullText:
      'Vi gjennomfører kontroller og inspeksjoner som avdekker teknisk status, dokumenterer funn og gir et tydelig grunnlag for videre tiltak.',
    details: [
      'Kontroll av funksjon, synlige komponenter og anleggsstatus.',
      'Dokumentasjon av avvik, anbefalinger og nødvendige tiltak.',
      'Oppfølging mot krav til kvalitet, sikkerhet og drift.',
    ],
    iconPath: 'M9 12l2 2 4-5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  },
  {
    title: 'Ombygging og oppgradering',
    description: 'Tilpasning av eksisterende sprinkleranlegg når lokaler, risikobilde eller virksomhet endres.',
    fullText:
      'Vi tilpasser og oppgraderer eksisterende sprinkleranlegg når bygg endres, arealer bygges om eller tekniske krav må oppdateres.',
    details: [
      'Kartlegging av eksisterende anlegg og nye behov.',
      'Tilpasning ved leietakerendringer, ombygging og bruksendring.',
      'Oppgradering av løsninger for bedre drift, dekning og dokumentasjon.',
    ],
    iconPath: 'M3 12a9 9 0 0 1 15-6.7M21 12a9 9 0 0 1-15 6.7M18 3v5h-5M6 21v-5h5',
  },
]
</script>

<style scoped>
.services-section__header {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 40px;
  align-items: end;
}

.services-section__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  margin-top: 46px;
}

@media (max-width: 980px) {
  .services-section__header,
  .services-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .services-section__header,
  .services-section__grid {
    grid-template-columns: 1fr;
  }
}

.service-modal {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(6, 12, 18, 0.72);
  outline: none;
}

.service-modal__panel {
  position: relative;
  width: min(100%, 680px);
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  padding: 34px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.28);
}

.service-modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid rgba(15, 31, 43, 0.12);
  border-radius: 999px;
  background: white;
  color: var(--color-ink);
  cursor: pointer;
  font-size: 1.8rem;
  line-height: 1;
}

.service-modal__icon {
  display: grid;
  width: 58px;
  height: 58px;
  place-items: center;
  border-radius: 8px;
  background: #13232e;
  color: var(--color-accent-strong);
}

.service-modal__icon svg {
  width: 29px;
  height: 29px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.service-modal h3 {
  margin: 24px 48px 14px 0;
  color: var(--color-ink);
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.08;
}

.service-modal__lead {
  margin: 0;
  color: #5e6b73;
  font-size: 1.08rem;
  line-height: 1.65;
}

.service-modal ul {
  display: grid;
  gap: 12px;
  margin: 24px 0 28px;
  padding-left: 20px;
  color: var(--color-ink);
}

.service-modal li {
  padding-left: 4px;
}
</style>
