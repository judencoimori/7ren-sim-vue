<script setup lang="ts">
import { ref, watch, computed, inject } from 'vue';
import { useAnimaStore } from "@/stores/animaStore";
import { storeToRefs } from "pinia";
import { getDataBase, getSavedAnima, getSavedAnimaKeys } from "../composables/useDataBase.js"

const animaStore = useAnimaStore();
const { partnerAnimas } = storeToRefs(animaStore);

const animaLength = computed(
    () => partnerAnimas.value.length
)

let db: IDBDatabase;
db = await getDataBase();
const savedAnimaKeys = ref(await getSavedAnimaKeys(db));


const loadAnima = ref("アニマ選択");
const loadAnimaNum = ref(1);

async function callAnima() {
    if (loadAnima.value === "アニマ選択") return;
    partnerAnimas.value[loadAnimaNum.value - 1] = await getSavedAnima(db, loadAnima.value);
}

</script>

<template>
    <div class="callPartner">
        <div>アニマ呼び出し</div>
        <div class="callPartnerSelect">
            <select v-model="loadAnimaNum" class="loadAnimaNum">
                <option v-for="n in animaLength" :value="n">{{ n }}</option>
            </select>
            <span>体目</span>
            <select v-model="loadAnima" class="loadAnimaKey">
                <option value="アニマ選択" disabled>アニマ選択</option>
                <option v-for="savedAnima in savedAnimaKeys" :value="savedAnima" :key="savedAnima">{{ savedAnima }}</option>
            </select>
        </div>
        <div style="text-align:right">
            <button @click="callAnima">呼び出し</button>
        </div>
    </div>
</template>

<style scoped>
.callPartner {
    margin: 8px;
}

.callPartnerSelect {
    display: flex;
}

.loadAnimaNum {
    border:none;
}

.loadAnimaKey {
    border:none;
    width: 100px;
    flex: 1 1 100px;
}
</style>