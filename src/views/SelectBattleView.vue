<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import { getEnemyData } from "../composables/getEnemyData.js"
import { useAnimaStore } from '@/stores/animaStore';

const selectedType = ref("challenge");
const getdata = await getEnemyData(selectedType.value);
const selectedEnemyData = ref(getdata);
const selectedBattle = ref(0);

watch(selectedType, async () => {
    const getdata = await getEnemyData(selectedType.value);
    selectedEnemyData.value = getdata;
})

watch(() => selectedEnemyData.value.groupName,() => {
    selectedBattle.value = 0;
})

const elements = {
    b:"獣",
    m:"魔",
    g:"ゴ",
    d:"竜",
    n:"無"
}

const enemyTypes = [
    { type: "normal", name: "魔獣チャレンジ", path: "challenge" },
    { type: "ppp", name: "ppp", path: "ppp" },
    { type: "ppp", name: "業", path: "karma" },
    { type: "raid", name: "レイド", path: "raid" },
    { type: "normal", name: "サンプル", path: "sample" },
    { type: "budai", name: "部大祭", path: "budai" }
]
function isBudai(type: string): boolean {
    if (type === "budai") return true;
    return false;
}
</script>

<template>
    <div>
        <div>
            <select style="width:20em" v-model="selectedType" id="type">
                <option v-for="enemyType in enemyTypes" :disabled="isBudai(enemyType.type)" :value="enemyType.path"
                    :key="enemyType.path">{{
                        enemyType.name }}</option>
            </select>
        </div>
        <div>
            <select style="width:20em" v-model="selectedBattle" id="battle">
                <option v-for="(selectedBattle, index) in selectedEnemyData.data" :value="index"
                    :key="selectedBattle.battleName">{{ selectedBattle.battleName }}</option>
            </select>
        </div>
        <div>
            <div v-for="enemy in selectedEnemyData.data[selectedBattle].enemyList">
                <div>{{ enemy.enemyName }} {{ elements[enemy.enemyStatus[5]] }}</div>
                <div>HP:{{ enemy.enemyStatus[0] }} ATK:{{ enemy.enemyStatus[1] }} DEF:{{ enemy.enemyStatus[2] }} SPD:{{ enemy.enemyStatus[3] }} LUK:{{ enemy.enemyStatus[4] }}</div>
                <div>
                    <span v-for="active in enemy.activeAbilityList">{{ active[1] }}({{ active[2] }}) </span>
                    <span v-for="active in enemy.passiveAbilityList">{{ active[1] }}({{ active[2] }}) </span>
                    <span v-for="active in enemy.constAbilityList">{{ active[1] }}({{ active[2] }}) </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>



</style>