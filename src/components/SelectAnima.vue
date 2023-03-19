<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useAnimaStore } from "@/stores/animaStore";
import { storeToRefs } from "pinia";

interface Props {
    animaNum: number;
}
const props = defineProps<Props>();

const animaStore = useAnimaStore();
const { animaData, partnerAnimas } = storeToRefs(animaStore);

const element = ref("b");
const rank = ref("CD");

const narrowAnimaData = computed(
    () => {
        return animaData.value.filter(anima => {
            return anima.rank == rank.value && anima.element == element.value;
        })
    }
)
const selectedAnimaId = ref(-1);

watch(animaData.value, () => {
    selectedAnimaId.value = 0;
})

watch(selectedAnimaId, id => {
    const anima = animaData.value[id];
    partnerAnimas.value[props.animaNum].hp = anima.hp;
    partnerAnimas.value[props.animaNum].id = anima.id;
    partnerAnimas.value[props.animaNum].atk = anima.atk;
    partnerAnimas.value[props.animaNum].def = anima.def;
    partnerAnimas.value[props.animaNum].spd = anima.spd;
    partnerAnimas.value[props.animaNum].luk = anima.luk;
    partnerAnimas.value[props.animaNum].name = anima.name;
    partnerAnimas.value[props.animaNum].rank = anima.rank;
    partnerAnimas.value[props.animaNum].element = anima.element;
})

</script>

<template>
    <div id="selectElement">
        <input type="radio" name="element" id="beast" v-model="element" value="b"><label for="beast">獣</label>
        <input type="radio" name="element" id="magic" v-model="element" value="m"><label for="magic">魔</label>
        <input type="radio" name="element" id="golem" v-model="element" value="g"><label for="golem">ゴ</label>
        <input type="radio" name="element" id="dragon" v-model="element" value="d"><label for="dragon">竜</label>
        <input type="radio" name="element" id="nothing" v-model="element" value="n"><label for="nothing">無</label>
    </div>
    <div id="selectRank">
        <input type="radio" name="rank" id="SS" v-model="rank" value="SS"><label for="SS">SS</label>
        <input type="radio" name="rank" id="S" v-model="rank" value="S"><label for="S">S</label>
        <input type="radio" name="rank" id="A" v-model="rank" value="A"><label for="A">A</label>
        <input type="radio" name="rank" id="B" v-model="rank" value="B"><label for="B">B</label>
        <input type="radio" name="rank" id="CD" v-model="rank" value="CD"><label for="CD">CD</label>
    </div>
    <div id="selectAnima">
        <select v-model="selectedAnimaId" style="width:100%">
            <option v-for="anima in narrowAnimaData" :value="anima.id">{{ anima.name }}</option>
        </select>
    </div>
</template>

<style scoped>
input[type=radio] {
    display: none;
}

#selectElement,
#selectRank {
    display: flex;
    align-items: center;
}

#selectElement label,
#selectRank label {
    font-weight:bold;
    background-color: darkred;
    width: 50px;
    height: 100%;
    margin: 1px;
    color: white;
    text-align: center;
    padding: 0 6px;
    border-radius: 2px;
}

#selectElement label:hover,
#selectRank label:hover {
    background-color: pink;
}

#selectElement input:checked + label,
#selectRank input:checked + label {
    background-color: pink;
    color:darkred;
}

#selectAnima {
    margin-top: 6px;
}</style>