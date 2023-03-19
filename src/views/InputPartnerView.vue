<script setup lang="ts">
import InputPartner from "../components/InputPartner.vue";
import { storeToRefs } from "pinia";
import { useAnimaStore } from '@/stores/animaStore';


const useAnima = useAnimaStore();
const { partnerAnimas } = storeToRefs(useAnima);
const { addPartner, removePartner } = useAnima;

const key = 1;

</script>

<template>
    <div style="display:flex; flex-wrap: wrap;">
        <div v-for="n in partnerAnimas.length" class="nthInputAnima">
            <div class="nthAnima">
                {{ n }}体目
                <button @click="removePartner(n)">x</button>
            </div>
            <InputPartner :animaNum="n - 1"></InputPartner>
        </div>
        <button @click="addPartner(key), key++" style="flex:1 0 100%">Add Anima</button>
    </div>
</template>

<style scoped>
.nthInputAnima {
    max-width: 280px;
    margin:4px;
}

.nthAnima {
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
    font-weight: bold;
    border-bottom: 1px solid gray;
}

.nthAnima button {
    background-color: red;
    color:white;
    border-radius:4px;
    border:none;
}
.nthAnima button:hover {
    background-color: pink;
    color:red;
    cursor:pointer;
}
</style>