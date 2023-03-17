<script setup lang="ts">
import { useAnimaStore } from '@/stores/animaStore';

const enemyTypes = [
    { type: "challenge", name: "魔獣チャレンジ" },
    { type: "ppp", name: "ppp" },
    { type: "ppp", name: "業" },
    { type: "raid", name: "レイド" },
    { type: "budai", name: "部大祭" }
]
function isBudai(type: string): boolean {
    if (type === "budai") return true;
    return false;
}
</script>

<template>
    <div>
        <select style="width:10em">
            <option v-for="enemyType in enemyTypes" :disabled="isBudai(enemyType.type)">{{ enemyType.name }}</option>
        </select>
    </div>
</template>