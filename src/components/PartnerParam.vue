<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useAnimaStore } from '@/stores/animaStore';
import { storeToRefs } from 'pinia';
const useAnima = useAnimaStore();
const { partnerAnimas } = storeToRefs(useAnima);
const animaNum = computed(
    (): number => {
        return partnerAnimas.value.length;
    }
)
function isAbility(id: number): boolean {
    return id > 0;
}

</script>

<template>
    <div>partnerparam</div>
    <div class="partnerParam">
        <div v-for="n in animaNum">
            <p>{{ n }}体目</p>
            <p>ID:{{ partnerAnimas[n - 1].id }} {{ partnerAnimas[n - 1].name }}</p>
            <p>HP :{{ partnerAnimas[n - 1].status.hp }} / ATK:{{ partnerAnimas[n - 1].status.atk }} / DEF:{{ partnerAnimas[n - 1].status.def }} / SPD:{{
                partnerAnimas[n - 1].status.spd }} / LUK:{{ partnerAnimas[n - 1].status.luk }}</p>
            <p>・アクティブ</p>
            <p v-for="(ability, index) in partnerAnimas[n - 1].active">
            <div v-if="isAbility(ability.id)">{{ index + 1 }}:{{ ability.name }}Lv{{ ability.level }}({{
                ability.option[ability.level - 1] }})</div>
            </p>
            <p>・パッシブ</p>
            <p v-for="(ability, index) in partnerAnimas[n - 1].passive">
            <div v-if="isAbility(ability.id)">{{ index + 1 }}:{{ ability.name }}Lv{{ ability.level }}({{
                ability.option[ability.level - 1] }})</div>
            </p>
            <p>・パッシブ（恒常）</p>
            <p v-for="(ability, index) in partnerAnimas[n - 1].const">
            <div v-if="isAbility(ability.id)">{{ index + 1 }}:{{ ability.name }}Lv{{ ability.level }}({{
                ability.option[ability.level - 1] }})</div>
            </p>
        </div>
    </div>
</template>

<style scoped>
.partnerParam {
    position:sticky;
    top:10px;
    margin:10px;
}

p {
    margin: 0;
    font-size:smaller;
}</style>