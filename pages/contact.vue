<template>
  <main class="contact-page">
    <section class="contact-page__hero">
      <div class="contact-page__inner">
        <p class="section__eyebrow">Kontakt</p>
        <h1>Snakk med oss om sprinkler, brannsikring eller service.</h1>
        <p>
          Beskriv prosjektet eller servicebehovet kort, så kommer vi tilbake med neste steg.
        </p>
      </div>
    </section>

    <section class="contact-page__content">
      <div class="contact-page__inner contact-page__grid">
        <div class="contact-page__details">
          <h2>Kontaktinformasjon</h2>
          <h4>Max Borg</h4>
          <a href="mailto:max@komplettsprinkler.no">max@komplettsprinkler.no</a>
          <a href="tel:+4798160556">+47 98 16 05 56</a>
          <p>Norge</p>
          <p>
            For akutte driftsspørsmål, ring oss. For prosjektforespørsler kan du gjerne sende
            tegninger, adresse og ønsket tidsplan i meldingen.
          </p>
        </div>

        <form class="contact-form" @submit.prevent="handleSubmit">
          <label for="name">Navn</label>
          <input id="name" v-model="form.name" type="text" autocomplete="name" required />

          <label for="phone">Telefon</label>
          <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" required />

          <label for="email">E-post</label>
          <input id="email" v-model="form.email" type="email" autocomplete="email" required />

          <label for="message">Melding</label>
          <textarea id="message" v-model="form.message" rows="6" required />

          <button class="button button--primary" type="submit">Send</button>
          <p v-if="success" class="contact-form__success">Takk. Vi kommer tilbake så snart som mulig.</p>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'

useSeoMeta({
  title: 'Kontakt | Komplett Sprinkler AS',
  description: 'Kontakt Komplett Sprinkler AS for sprinkler, brannsikring, kontroll og service.',
})

const form = reactive({
  name: '',
  phone: '',
  email: '',
  message: '',
})

const success = ref(false)

const handleSubmit = () => {
  success.value = true
  form.name = ''
  form.phone = ''
  form.email = ''
  form.message = ''
}
</script>

<style scoped>
.contact-page {
  background: var(--color-bg);
}

.contact-page__hero {
  padding: 150px 24px 76px;
  background:
    linear-gradient(90deg, rgba(8, 17, 24, 0.95), rgba(8, 17, 24, 0.72)),
    url('/images/service.png') center / cover;
}

.contact-page__inner {
  width: min(100%, var(--container));
  margin: 0 auto;
}

h1 {
  max-width: 820px;
  margin: 0;
  font-size: clamp(2.3rem, 5vw, 4.8rem);
  line-height: 1.02;
}

.contact-page__hero p:not(.section__eyebrow) {
  max-width: 650px;
  margin: 20px 0 0;
  color: var(--color-muted);
  font-size: 1.14rem;
}

.contact-page__content {
  padding: 78px 24px;
  background: var(--color-surface-light);
  color: var(--color-ink);
}

.contact-page__grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
}

.contact-page__details,
.contact-form {
  border-radius: 8px;
  background: white;
  box-shadow: 0 18px 50px rgba(20, 35, 46, 0.08);
}

.contact-page__details {
  align-self: start;
  padding: 32px;
}

.contact-page__details h2 {
  margin-top: 0;
}

.contact-page__details a,
.contact-page__details p {
  display: block;
  margin: 12px 0 0;
  color: #586670;
}

.contact-form {
  display: grid;
  gap: 12px;
  padding: 32px;
}

label {
  color: #33424d;
  font-weight: 800;
}

input,
textarea {
  width: 100%;
  border: 1px solid #cfd8dd;
  border-radius: 6px;
  background: #f8fafb;
  color: var(--color-ink);
  padding: 13px 14px;
}

input:focus,
textarea:focus {
  outline: 2px solid rgba(211, 111, 61, 0.32);
  border-color: var(--color-accent);
}

.contact-form .button {
  width: fit-content;
  margin-top: 8px;
  cursor: pointer;
}

.contact-form__success {
  margin: 4px 0 0;
  color: #1f6f43;
  font-weight: 800;
}

@media (max-width: 800px) {
  .contact-page__grid {
    grid-template-columns: 1fr;
  }

  .contact-form .button {
    width: 100%;
  }
}
</style>
