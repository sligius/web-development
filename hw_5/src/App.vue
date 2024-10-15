<script setup>
import CharacterList from './components/CharacterList.vue'
</script>

<template>
  <div id="app">
    <div id="page-name-box">
      <h1 id="page-name">Disney characters</h1>
    </div>
    <CharacterList />
  </div>
</template>

<style>
body {
  background-color: rgba(224, 216, 255, 0.63);
  text-align: center;
  font-family: 'Disney';
}

#page-name-box {
  height: 250px;
  background-image: url(./assets/images/wallpaperflare.com_wallpaper.jpg);
  background-size: cover;
  background-position: center;
  border-radius: 25px;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.349);
  background-blend-mode: overlay;
}

#page-name {
  font-size: 100px;
  flex: auto;
  color: white;
  text-shadow:
    -3px -3px 0 black,
    1px -1px 0 black,
    -1px 1px 0 black,
    1px 1px 0 black;
}

@font-face {
  font-family: 'Disney';
  src: local('fonts'),
    url('./assets/fonts/NewWaltDisneyFontRegular-BPen.ttf') format('truetype');
  font-weight: normal;
}
</style>
