<template>
  <form @submit.prevent="submitForm" class="contact-form">
    <input type="text" placeholder="Navn" v-model="name" required />
    <input type="email" placeholder="E-post" v-model="email" required />
    <textarea placeholder="Melding" v-model="message" required></textarea>
    <button type="submit">Send</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

function submitForm() {
  alert(`Takk, ${name.value}! Vi vil kontakte deg snart.`)
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: white
}
.contact-form input,
.contact-form textarea {
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
}
.contact-form button {
  padding: 1rem;
  background-color: #007BFF;
  color: white;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}
</style>
