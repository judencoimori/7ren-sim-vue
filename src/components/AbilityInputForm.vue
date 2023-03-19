<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useAnimaStore } from '@/stores/animaStore';
import { storeToRefs } from 'pinia';

interface Props {
    animaNum: number;
    abilityNum: number;
}
const props = defineProps<Props>();

const useAnima = useAnimaStore();
const { partnerAnimas } = storeToRefs(useAnima);
const { checkAbility, removeAbility, asortAbility } = useAnima;

const isNotAbility = computed(
    () => {
        return ability.value.id < 0 && ability.value.name != "";
    }
)

const ability = computed(
    () => partnerAnimas.value[props.animaNum].abilitys[props.abilityNum]
);

const getIdStr = computed(
    (): string => {
        const IdStr: string = "ability" + props.animaNum + "_" + props.abilityNum
        return IdStr;
    }
);

watch(partnerAnimas.value[props.animaNum].abilitys[props.abilityNum], abi => {
    asortAbility(props.animaNum);
})
/*
const level = ref(ability.value.level);
watch(level, () => {
    console.log("change")
})
*/

</script>

<template>
    <div class="abilityInputFormContainer">
        <label :for="getIdStr">{{ abilityNum + 1 }}</label>
        <input type="text" v-model.lazy="ability.name" autocomplete="off" list="abilityOptions"
            @change="checkAbility(animaNum, abilityNum)" :id="getIdStr" :class="{ bgColorPink: isNotAbility }">
        <select v-model="ability.level">
            <option v-for="(option, index) in ability.option" :key="option" :value="index + 1">
                {{ index + 1 }}
            </option>
        </select>
        <button @click="removeAbility(props.animaNum, props.abilityNum)" class="removeButton">x</button>
    </div>
</template>



<style scoped>
.bgColorPink {
    background-color: pink;
}

.abilityInputFormContainer {
    display: flex;
    align-items: center;
}

label {
    display: flex;
    align-items: center;
}

label,
button {
    margin: 0 2px 0 0;
}

input {
    flex: 1 1 auto;
}

select {
    flex: 0 0 3em;
    width: 2.5em;
}

.removeButton {
    margin:0px;
    padding:0px;
    width:30px;
    background-color:transparent;
    border:none;
}
.removeButton:hover {
    cursor: pointer;
    color:darkgray;
    background-color: lightgray;
    font-weight: bold;
}
</style>