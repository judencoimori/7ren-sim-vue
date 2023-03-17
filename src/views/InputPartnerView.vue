<script setup lang="ts">
import { ref } from "vue";
import InputPartner from "../components/InputPartner.vue";
import { useAnimaStore } from '@/stores/animaStore';


const useAnima = useAnimaStore();
const { addPartner } = useAnima;
const animaCount = ref(1);

function increaceAnima() {
    animaCount.value++;
    addPartner();
}
</script>

<template>
    <div>
        <div v-for="n in animaCount">
            <p>{{ n }}体目</p>
            <InputPartner :animaNum="n - 1"></InputPartner>
        </div>
        <button @click="increaceAnima">Add Anima</button>
    </div>
</template>

<style scoped>
p {
    font-weight:bold;
    border-bottom:1px solid gray;
}
</style>