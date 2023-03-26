<script setup lang="ts">
import { ref, provide } from "vue";
import InputPartner from "../components/InputPartner.vue";
import { storeToRefs } from "pinia";
import { useAnimaStore } from '@/stores/animaStore';
import { getDataBase, saveAnimaToDB, getSavedAnimaKeys } from "../composables/useDataBase.js"


const useAnima = useAnimaStore();
const { partnerAnimas } = storeToRefs(useAnima);
const { addPartner, removePartner } = useAnima;

const id = 1;

let db: IDBDatabase;
db = await getDataBase();

async function saveAnima(animaNum: number) {
    saveAnimaToDB(db, animaNum - 1);
}

const savedAnimaKeys = ref(await getSavedAnimaKeys(db));
provide("db", db);
provide("savedAnimaKeys", savedAnimaKeys);

</script>

<template>
    <div style="display:flex; flex-wrap: wrap;">
        <div v-for="n in partnerAnimas.length" class="nthInputAnima">
            <div class="nthAnima">
                <div>{{ n }}体目</div>
                <div>
                    <button class="save" @click="saveAnima(n)">save</button>
                    <button class="remove" @click="removePartner(n)">x</button>
                </div>
            </div>
            <InputPartner :animaNum="n - 1"></InputPartner>
        </div>
        <button @click="addPartner(), id++" style="flex:1 0 100%">Add Anima</button>
    </div>
</template>

<style scoped>
.nthInputAnima {
    max-width: 280px;
    margin: 4px;
}

.nthAnima {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0 0 0;
    font-weight: bold;
    border-bottom: 1px solid gray;
}

.save {
    margin-right: 4px;
}

.remove {
    background-color: red;
    color: white;
    border-radius: 4px;
    border: none;
}

.remove:hover {
    background-color: pink;
    color: red;
    cursor: pointer;
}
</style>