<script setup lang="ts">
import AbilityInputErea from './AbilityInputErea.vue';
import StatusInputErea from './StatusInputErea.vue';
import SelectAnima from "./SelectAnima.vue"
interface Props {
    animaNum: number;
}
const props = defineProps<Props>();
</script>

<template>
    <p>アニマ選択エリア</p>
    <SelectAnima :animaNum="props.animaNum"></SelectAnima>
    <p>ステータス入力エリア</p>
    <StatusInputErea :animaNum="props.animaNum"></StatusInputErea>
    <p>アビリティ入力エリア</p>
    <AbilityInputErea :animaNum="props.animaNum"></AbilityInputErea>
</template>

<style>
p {
    margin:16px 0 0 0;
    font-weight:bold;
}</style>