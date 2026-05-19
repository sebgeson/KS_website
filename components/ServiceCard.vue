<template>
  <article class="service-card">
    <div class="service-card__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="img">
        <path :d="iconPath" />
      </svg>
    </div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <button type="button" class="service-card__link" @click="$emit('open')">Les mer</button>
  </article>
</template>

<script setup>
defineEmits(['open'])

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  iconPath: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.service-card {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  padding: 28px;
  border: 1px solid rgba(15, 31, 43, 0.12);
  border-radius: 8px;
  background: white;
  box-shadow: 0 18px 50px rgba(20, 35, 46, 0.08);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease;
}

.service-card:hover {
  border-color: rgba(211, 111, 61, 0.42);
  box-shadow: 0 24px 70px rgba(20, 35, 46, 0.14);
  transform: translateY(-4px);
}

.service-card__icon {
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  border-radius: 8px;
  background: #13232e;
  color: var(--color-accent-strong);
}

.service-card__icon svg {
  width: 26px;
  height: 26px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

h3 {
  margin: 24px 0 10px;
  color: var(--color-ink);
  font-size: 1.2rem;
  line-height: 1.25;
}

p {
  margin: 0;
  color: #5e6b73;
}

.service-card__link {
  align-self: flex-start;
  margin-top: auto;
  padding-top: 22px;
  border: 0;
  background: transparent;
  color: #aa552f;
  cursor: pointer;
  font: inherit;
  font-weight: 900;
  text-decoration: none;
}

.service-card__link:hover {
  color: #7e3d22;
}
</style>
