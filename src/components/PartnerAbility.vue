<script setup lang="ts">
import { ref } from "vue";
import { useAnimaStore } from '@/stores/animaStore';
import { storeToRefs } from 'pinia';

const props = defineProps<{
    animaNum: number;
}>()

const animaStore = useAnimaStore();
const { partnerAnimas } = storeToRefs(animaStore);

//いらないかも
function isAbility(id: number): boolean {
    return id > 0;
}
type Ability = {
    key: number; //inputFormのTransitionで使用するkey
    id: number;
    function: string;
    name: string;
    type: string;
    level: number;
    option: number[];
    vaild: boolean;
}

//アビリティの有効無効
function vaild(ability: Ability) {
    if (ability.vaild === false) return "invailed";
}
function changeVaild(n: number, index: number, abiType: "active" | "passive" | "const") {
    partnerAnimas.value[n - 1][abiType][index].vaild = !partnerAnimas.value[n - 1][abiType][index].vaild;
    return partnerAnimas.value[n - 1][abiType][index].vaild;
}

const showAbility = ref(false);

</script>

<template>
    <p @click="showAbility = !showAbility">+アビリティ</p>
    <div v-if="showAbility">
        <p v-for="(ability, index) in partnerAnimas[props.animaNum - 1].active">
        <div v-if="isAbility(ability.id)" :class="vaild(ability)" class="sideAbility"
            @click="changeVaild(props.animaNum, index, 'active')">{{ ability.name }}Lv{{ ability.level }}({{
                ability.option[ability.level - 1] }})</div>
        </p>
        <p v-for="(ability, index) in partnerAnimas[props.animaNum - 1].passive">
        <div v-if="isAbility(ability.id)" :class="vaild(ability)" class="sideAbility"
            @click="changeVaild(props.animaNum, index, 'passive')">{{ ability.name }}Lv{{ ability.level }}({{
                ability.option[ability.level - 1] }})</div>
        </p>
        <p v-for="(ability, index) in partnerAnimas[props.animaNum - 1].const">
        <div v-if="isAbility(ability.id)" :class="vaild(ability)" class="sideAbility"
            @click="changeVaild(props.animaNum, index, 'const')">{{ ability.name }}Lv{{ ability.level }}({{
                ability.option[ability.level - 1] }})</div>
        </p>
    </div>
</template>

<style scoped>
.partnerParam {
    position: sticky;
    top: 10px;
    margin: 10px;
}

.sideAbility:hover {
    background-color: pink;
    cursor: pointer;
}

.invailed {
    padding-left: 8px;
    text-decoration: line-through;
    color: rgb(225, 225, 225);
    opacity: 0.8;
}

p {
    margin: 0;
    font-size: smaller;
}
</style>