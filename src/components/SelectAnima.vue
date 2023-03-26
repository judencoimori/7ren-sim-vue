<script setup lang="ts">
import { ref, computed, watch, inject } from "vue";
import { useAnimaStore } from "@/stores/animaStore";
import { storeToRefs } from "pinia";

interface Props {
    animaNum: number;
}
const props = defineProps<Props>();

const animaStore = useAnimaStore();
const { animaData, partnerAnimas } = storeToRefs(animaStore);
const element = computed(() => partnerAnimas.value[props.animaNum].element);
const rank = computed(() => partnerAnimas.value[props.animaNum].rank);
const id = computed(() => partnerAnimas.value[props.animaNum].id);

const narrowAnimaData = ref(animaData.value.filter(anima => {
    return anima.rank == "CD" && anima.element == "b";
}))

const selectedAnimaId = computed(() => partnerAnimas.value[props.animaNum].id);
const dataLoad = ref(animaData.value.length > 0); //うーん


watch([id, element, rank, dataLoad], ([newId], [oldId]) => {
    narrowAnimaData.value = animaData.value.filter(anima => {
        return anima.rank === rank.value && anima.element === element.value;
    })
    if (narrowAnimaData.value.length !== 0 && newId === oldId) partnerAnimas.value[props.animaNum].id = narrowAnimaData.value[0].id;
}, { immediate: true })

watch(animaData.value, () => {
    dataLoad.value = true;
    calcStatus(selectedAnimaId.value);
})

watch(selectedAnimaId, id => {
    calcStatus(id);
}, { immediate: true })

function calcStatus(id: number) {
    if (dataLoad.value) {
        const anima = animaData.value[id];
        partnerAnimas.value[props.animaNum].hp = anima.hp;
        partnerAnimas.value[props.animaNum].id = anima.id;
        partnerAnimas.value[props.animaNum].atk = anima.atk;
        partnerAnimas.value[props.animaNum].def = anima.def;
        partnerAnimas.value[props.animaNum].spd = anima.spd;
        partnerAnimas.value[props.animaNum].luk = anima.luk;
        partnerAnimas.value[props.animaNum].name = anima.name;
        partnerAnimas.value[props.animaNum].key = anima.name + Date.now().toString();
        partnerAnimas.value[props.animaNum].rank = anima.rank;
        partnerAnimas.value[props.animaNum].element = anima.element;
    }
}

</script>

<template>
    <div class="animaKey">
        <input type="text" v-model="partnerAnimas[props.animaNum].key">
    </div>
    <div class="title">アニマ選択エリア</div>
    <div id="selectElement">
        <input type="radio" :name="'elements' + props.animaNum" :id="'beast' + props.animaNum"
            v-model="partnerAnimas[props.animaNum].element" value="b"><label :for="'beast' + props.animaNum">獣</label>
        <input type="radio" :name="'elements' + props.animaNum" :id="'magic' + props.animaNum"
            v-model="partnerAnimas[props.animaNum].element" value="m"><label :for="'magic' + props.animaNum">魔</label>
        <input type="radio" :name="'elements' + props.animaNum" :id="'golem' + props.animaNum"
            v-model="partnerAnimas[props.animaNum].element" value="g"><label :for="'golem' + props.animaNum">ゴ</label>
        <input type="radio" :name="'elements' + props.animaNum" :id="'dragon' + props.animaNum"
            v-model="partnerAnimas[props.animaNum].element" value="d"><label :for="'dragon' + props.animaNum">竜</label>
        <input type="radio" :name="'elements' + props.animaNum" :id="'nothing' + props.animaNum"
            v-model="partnerAnimas[props.animaNum].element" value="n"><label :for="'nothing' + props.animaNum">無</label>
    </div>
    <div id="selectRank">
        <input type="radio" :name="'rank' + props.animaNum" :id="'SS' + props.animaNum"
            v-model="partnerAnimas[props.animaNum].rank" value="SS"><label :for="'SS' + props.animaNum">SS</label>
        <input type="radio" :name="'rank' + props.animaNum" :id="'S' + props.animaNum"
            v-model="partnerAnimas[props.animaNum].rank" value="S"><label :for="'S' + props.animaNum">S</label>
        <input type="radio" :name="'rank' + props.animaNum" :id="'A' + props.animaNum"
            v-model="partnerAnimas[props.animaNum].rank" value="A"><label :for="'A' + props.animaNum">A</label>
        <input type="radio" :name="'rank' + props.animaNum" :id="'B' + props.animaNum"
            v-model="partnerAnimas[props.animaNum].rank" value="B"><label :for="'B' + props.animaNum">B</label>
        <input type="radio" :name="'rank' + props.animaNum" :id="'CD' + props.animaNum"
            v-model="partnerAnimas[props.animaNum].rank" value="CD"><label :for="'CD' + props.animaNum">CD</label>
    </div>
    <div id="selectAnima">
        <select v-model="partnerAnimas[props.animaNum].id" style="width:100%">
            <option v-for="anima in narrowAnimaData" :value="anima.id">{{ anima.name }}</option>
        </select>
    </div>
</template>

<style scoped>
.animaKey input {
    background-color: transparent;
    border: none;
    width:100%;
}

.animaKey input:focus {
    outline: none;
    border: none;
    background-color: lightpink;
}

.animaKey select {
    width:100%;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0 0 0;
    font-weight: bold;
}

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
    font-weight: bold;
    background-color: darkred;
    width: 55px;
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

#selectElement input:checked+label,
#selectRank input:checked+label {
    background-color: pink;
    color: darkred;
}

#selectAnima {
    margin-top: 6px;
}
</style>