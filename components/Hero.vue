<template>
  <section class="hero" :style="{ backgroundImage: `url(${bgImage})` }">
   <div class="overlay"></div>
    <div class="container">
      <h1 class="title">{{ title }}</h1>
      <p class="subtitle">{{ subtitle }}</p>
      <NuxtLink to="#contact" class="cta-btn">Kontakt oss</NuxtLink>
    </div>
     
  </section>
</template>

<script setup>
import ksHeroImage from '~/assets/images/KS_Hero.png'

defineProps({
  title: String,
  subtitle: String,
  bgImage: {
    type: String,
    default: ksHeroImage,
  }
})
</script>

<style scoped>
/* Gjør at teksten kan markeres igjen */
.hero,
.hero * {
  user-select: text;
  background-repeat: no-repeat;
  background-size: cover;
}

.hero {
  position: relative;
  width: 100%;
  min-height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  color: white;
  text-align: center;
}

/* Overlay fix */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.28);
  pointer-events: none;
  z-index: 1;
}

/* Content container with spacing rules */
.container {
  position: relative;
  max-width: 950px;
  padding: 0 20px;
  z-index: 2;
 
}

/* Desktop default */
.hero .title {
  font-size: 4rem; 
  font-weight: 700;
  line-height: 1.15;
  margin-bottom: 16px;
  opacity: 1;
  color: white;
}

.hero .subtitle {
  font-size: clamp(2rem, 2vw, 1.8rem);
  font-weight: 300;
  max-width: 750px;
  margin: 0 auto 30px auto;
  opacity: 0.9;
}

/* CTA button */
.cta-btn {
  display: inline-block;
  padding: clamp(12px, 2vw, 18px) clamp(20px, 4vw, 36px);
  font-size: clamp(1rem, 1.5vw, 1.4rem);
  background: transparent;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  transition: 0.3s ease;
}

.cta-btn:hover {
  background: rgb(4, 27, 48);
  transform: scale(1.05);
}

/* 📱 Tablets & iPads */
@media (max-width: 992px) {
  .hero {
    min-height: 60vh;
    padding-top: 80px;
  }
}

/* 📱 Mobile phones */
@media (max-width: 600px) {
  .hero {
    min-height: 65vh;
    padding-top: 100px;
  }

  .content {
    max-width: 90%;
  }

  .cta-btn {
    width: 100%;
    max-width: 260px;
  }
}

</style>
