<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import SideView from './views/SideView.vue';
import { storeToRefs } from 'pinia';
import { useAnimaStore } from '@/stores/animaStore';

const useAnima = useAnimaStore();
const { abilityData } = storeToRefs(useAnima);

const windowSize = ref(window.innerWidth);
onMounted(() => {
  window.addEventListener('resize', resizeWindowSize)
})
function resizeWindowSize() {
  windowSize.value = window.innerWidth;
}

const hasSideView = computed(
  () => windowSize.value > 700
)
const showSideView = ref(hasSideView.value);

const grayOut = computed(
  () => {
    return !hasSideView.value && showSideView.value;
  }
)

watch(hasSideView, () => {
  if (hasSideView.value === true) {
    showSideView.value = true;
    return;
  }
  showSideView.value = false;
});

function changeSideView() {
  showSideView.value = !showSideView.value;
}
</script>

<template>
  <div class="container">
    <header>
      7ren-simulator-vue
    </header>
    <div class="main">
      <SideView class="sideview" :class="{ showSideView: showSideView }"></SideView>
      <Suspense>
        <template #default>
          <RouterView class="routerview" :class="{ hasSideView: hasSideView }" />
        </template>
      </Suspense>
    </div>
  </div>
  <div class="filter" :class="{ grayOut: grayOut }"  @click="changeSideView"></div>
  <nav>
    <button id="sidebarOpenButton" @click="changeSideView" v-if="!hasSideView">OpCl</button>
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
  position: sticky;
  top: 0;
  color: white;
  height: 36px;
  padding: 10px;
  flex-shrink: 0;
  background-color: darkred;
}

@media screen and (max-width: 700px) {
  header {
    position:static;
  }
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

.hasSideView {
  margin-left: 310px;
}

.sideview {
  position: fixed;
  top: 56px;
  left: -300px;
  bottom: 0;
  width: 300px;
  padding-bottom: 200px;
  color: white;
  overflow-y: scroll;
  flex-shrink: 0;
  opacity: 0;
  z-index: -1;
  transition: all 0.2s ease;
}

@media screen and (max-width: 700px) {
  .sideview {
    top:0;
  }
}

.showSideView {
  z-index: 2;
  opacity: 1;
  transform: translateX(300px);
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
  z-index: 3;
}

.routerLink {
  display: flex;
  justify-content: center;
  flex-grow: 1;
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
  flex-grow: 0;
}

.filter {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  z-index: -1;
}

.grayOut {
  z-index: 1;
  opacity: 0.4;
  background-color: black;
}
</style>