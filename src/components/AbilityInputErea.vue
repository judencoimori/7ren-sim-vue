<script setup lang="ts">
import { computed } from 'vue';
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

let key = 0;

const abilitys = computed(
    () => partnerAnimas.value[props.animaNum].abilitys
);

</script>

<template>
    <div>
        <div class="title">アビリティ入力エリア
            <button @click="addAbility(props.animaNum, key + 1), key++">Add ability</button>
        </div>
        <TransitionGroup tag="div">
            <AbilityInputForm v-for="(ability, index) in abilitys" :key="ability.key" :abilityNum="index"
                :animaNum="props.animaNum">
            </AbilityInputForm>
        </TransitionGroup>
    </div>
</template>

<style>
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0 0 0;
    font-weight: bold;
}

.title button {
    background-color: transparent;
    border: none;
}

.title button:hover {
    color: gray;
    background-color: pink;
    cursor: pointer;
}

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

.v-leave-active {
    position: absolute;
}
</style>