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
      <TransitionGroup name="main">
        <SideView v-if="openSideView" ></SideView>
        <RouterView class="routerview" />
      </TransitionGroup>
    </div>
  </div>
  <nav>
    <button id="sidebarOpenButton" @click="changeSideView">OpCl</button>
    <div class="routerLink">
      <RouterLink to="/" class="navLink">InputPartner</RouterLink>
      <RouterLink to="/select" class="navLink">SelectBattle</RouterLink>
      <RouterLink to="/" class="navLink">Result</RouterLink>
    </div>
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
  overflow-x: hidden;
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
  align-items: center;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.8);
}

.routerLink {
  display:flex;
  justify-content: center;
  flex-grow:1;
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
  margin-left: 6px;
  height: 40px;
  background-color: darkred;
  color: white;
  z-index: 10;
  font-size: x-small;
  flex-grow:0;
}

.main-move,
.main-enter-active,
.main-leave-active {
  transition: all 1s ease;
}

.main-enter-from,
.main-leave-to {
  opacity: 0;
  transform: translateX(-500px);
}

.main-leave-active {
  position:absolute;
}

</style>