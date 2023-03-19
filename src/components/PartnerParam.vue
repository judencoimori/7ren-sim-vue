<script setup lang="ts">
import { computed } from "vue";
import { useAnimaStore } from '@/stores/animaStore';
import { storeToRefs } from 'pinia';

const animaStore = useAnimaStore();
const { partnerAnimas } = storeToRefs(animaStore);
const animaNum = computed(
    (): number => {
        console.log(partnerAnimas.value.length);
        return partnerAnimas.value.length;
    }
)
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

function vaild(ability: Ability) {
    if (ability.vaild === false) return "invailed";
}

function changeVaild(n: number, index: number, abiType:"active" | "passive" | "const") {
    partnerAnimas.value[n - 1][abiType][index].vaild = !partnerAnimas.value[n - 1][abiType][index].vaild;
    return partnerAnimas.value[n - 1][abiType][index].vaild;
}

</script>

<template>
    <div class="partnerParam">
        <div v-for="n in animaNum" style="margin-bottom:8px; border-top:1px solid white;">
            <p>{{ n }}体目 {{ partnerAnimas[n - 1].name }} Lv{{ partnerAnimas[n - 1].lv }} {{ partnerAnimas[n - 1].limitBreak }}凸</p>
            <p>HP:{{ partnerAnimas[n - 1].status.hp }}
                ATK:{{ partnerAnimas[n - 1].status.atk }}
                DEF:{{ partnerAnimas[n - 1].status.def }}
                SPD:{{ partnerAnimas[n - 1].status.spd }}
                LUK:{{ partnerAnimas[n - 1].status.luk }}
            </p>
            <p v-for="(ability, index) in partnerAnimas[n - 1].active">
            <div v-if="isAbility(ability.id)" :class="vaild(ability)" class="sideAbility" @click="changeVaild(n, index, 'active')">{{ability.name }}Lv{{ ability.level }}({{
        ability.option[ability.level - 1] }})</div>
            </p>
            <p v-for="(ability, index) in partnerAnimas[n - 1].passive">
            <div v-if="isAbility(ability.id)" :class="vaild(ability)" class="sideAbility" @click="changeVaild(n, index, 'passive')">{{ ability.name }}Lv{{ ability.level }}({{
                ability.option[ability.level - 1] }})</div>
            </p>
            <p v-for="(ability, index) in partnerAnimas[n - 1].const">
            <div v-if="isAbility(ability.id)" :class="vaild(ability)" class="sideAbility" @click="changeVaild(n, index, 'const')">{{ ability.name }}Lv{{ ability.level }}({{
                ability.option[ability.level - 1] }})</div>
            </p>
        </div>
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
    cursor:pointer;
}

.invailed {
    padding-left:8px;
    text-decoration: line-through;
    color:rgb(225, 225, 225);
    opacity: 0.8;
}

p {
    margin: 0;
    font-size: smaller;
}
</style>