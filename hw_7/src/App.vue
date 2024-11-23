<script setup>
import WeatherPage from './components/WeatherPage.vue';
import ConverterPage from './components/ConverterPage.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { ref } from 'vue';

const showWeather = ref(false);
</script>

<template>
  <button id="switch-button" @click="showWeather = !showWeather">
    <FontAwesomeIcon :icon="faWandMagicSparkles" id="switch-icon"></FontAwesomeIcon>
  </button>
  <div id="page" :class="{ 'weather-background': showWeather, 'converter-background': !showWeather }">
    <div class="item" v-if="showWeather">
      <WeatherPage />
    </div>
    <div class="item" v-else>
      <ConverterPage />
    </div>
  </div>
</template>

<style scoped>
.weather-background {
  background-image: linear-gradient(rgba(75, 75, 75, 0.7), rgba(75, 75, 75, 0.7)), url('./assets/images/5625814.jpg');
  background-size: 350px;
  background-repeat: repeat;

}

.converter-background {
  background-image: linear-gradient(rgba(75, 75, 75, 0.7), rgba(75, 75, 75, 0.7)), url('./assets/images/9882174.jpg');
  background-size: 300px;
  background-repeat: repeat;
}
</style>
