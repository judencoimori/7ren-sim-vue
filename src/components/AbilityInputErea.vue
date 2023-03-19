<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import AbilityInputForm from './AbilityInputForm.vue'
import { useAnimaStore } from '@/stores/animaStore';
import { storeToRefs } from 'pinia';

interface Props {
    animaNum: number;
}
const props = defineProps<Props>();

const animaStore = useAnimaStore();
const { partnerAnimas } = storeToRefs(animaStore);
const { addAbility } = animaStore;

const key = ref(0);

const abilitys = computed(
    () => partnerAnimas.value[props.animaNum].abilitys
);

</script>

<template>
    <div>
        <button @click="addAbility(props.animaNum), key++">Add ability</button>
        <TransitionGroup tag="div">
            <AbilityInputForm v-for="(ability, index) in abilitys" :key="key" 
                :abilityNum="index" :animaNum="props.animaNum">
            </AbilityInputForm>
        </TransitionGroup>
    </div>
</template>

<style>
.v-move,
.v-enter-active,
.v-leave-active {
    transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>