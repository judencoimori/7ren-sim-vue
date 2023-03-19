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
    <SelectAnima :animaNum="props.animaNum"></SelectAnima>
    <StatusInputErea :animaNum="props.animaNum"></StatusInputErea>
    <AbilityInputErea :animaNum="props.animaNum"></AbilityInputErea>
</template>

<style scoped>
</style>