<template>
  <div class="feature-card">
    <img :src="icon" alt="" />
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <div class="read-more">
        <a href="">Les mer..</a>
    </div>
    
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  icon: String
})
</script>

<style scoped>
.features {
  display: flex;
  flex-wrap: wrap;           /* Lar radene brytes på små skjermer */
  justify-content: center;   /* Sentrerer kortene horisontalt */
  align-items: center;
  gap: 2rem;                 /* Avstand mellom kortene */
  margin: 4rem 0;
}

/* Om du vill att korten ska ha maxbredd */
.feature-card {
  flex: 1 1 350px;  /* flex-grow, flex-shrink, flex-basis */
  max-width: 600px;
  text-align: left;
    border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
   background-color: rgb(4, 27, 48);
  border: 1px solid  rgb(30, 40, 50);;
  color: white
}

.feature-card img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    margin-bottom: 1rem;
    background-color: transparent;
}

.read-more a {
    color: rgb(76, 124, 168);
    text-decoration: none;
    font-weight: bold;
}


@media (max-width: 768px) {
  .features {
    gap: 1.5rem;
  }

  .feature-card {
    flex: 1 1 80%;   /* kortene tar større del av skjermen på mobil */
    max-width: none;
  }
}
</style>
