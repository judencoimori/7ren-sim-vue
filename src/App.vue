<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import SideView from './views/SideView.vue';
import { storeToRefs } from 'pinia';
import { useAnimaStore } from '@/stores/animaStore';

const useAnima = useAnimaStore();
const { abilityData } = storeToRefs(useAnima);

const openSideView = ref(window.innerWidth > 700);

function changeSideView() {
  openSideView.value = !openSideView.value;
}
</script>

<template>
  <div class="container">
    <header>
      7ren-simulator-vue
    </header>
    <div class="main">
      <SideView v-if="openSideView"></SideView>
      <RouterView class="routerview" />
      <button id="sidebarOpenButton" @click="changeSideView">OpCl</button>
    </div>
  </div>
  <nav>
    <RouterLink to="/" class="navLink">InputPartner</RouterLink>
    <RouterLink to="/select" class="navLink">SelectBattle</RouterLink>
    <RouterLink to="/" class="navLink">Result</RouterLink>
  </nav>
  <datalist id="abilityOptions">
    <option v-for="ability in abilityData" :key="ability.name" :value="ability.name"></option>
  </datalist>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

header {
  color: white;
  height: 36px;
  padding: 10px;
  flex-shrink: 0;
  background-color: darkred;
}

.main {
  flex-grow: 1;
  display: flex;
  align-items: stretch;
}

.routerview {
  margin: 0 10px;
  padding-bottom: 150px;
  flex: 1 1 auto;
  min-width: 300px;
}

nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 52px;
  font-size: larger;
  font-weight: bold;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.8);
}

@media screen and (max-width: 700px) {
  nav {
    font-size: small;
  }
}

.navLink {
  margin: 10px;
  color: white;
  text-decoration: none;
}

#sidebarOpenButton {
  position: fixed;
  display: block;
  bottom: 6px;
  margin-left: 6px;
  height: 40px;
  background-color: darkred;
  color: white;
  z-index: 10;
  font-size: x-small;
}
</style>
