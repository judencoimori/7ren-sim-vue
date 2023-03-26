<script setup lang="ts">
import { ref, watch, computed, inject } from 'vue';
import { useAnimaStore } from "@/stores/animaStore";
import { storeToRefs } from "pinia";
import { getDataBase, getSavedParty, getSavedPartyKeys, savePartyToDB } from "../composables/useDataBase.js"

const animaStore = useAnimaStore();
const { partnerAnimas } = storeToRefs(animaStore);

let db: IDBDatabase;
db = await getDataBase();
const savedPartyKeys = ref(await getSavedPartyKeys(db));

const loadParty = ref("パーティ選択");

const loadPartyKey = ref("");

async function callParty() {
    if (loadParty.value === "パーティ選択") return;
    const partyData = await getSavedParty(db, loadParty.value)
    partnerAnimas.value = partyData.data;
    loadPartyKey.value = partyData.key;
}

async function saveParty() {
    savePartyToDB(db, loadPartyKey.value);
}

</script>

<template>
    <div class="callParty">
        <div>パーティ呼び出し</div>
        <div class="callPartySelect">
            <select v-model="loadParty" class="loadPartyKey">
                <option value="パーティ選択" disabled>パーティ選択</option>
                <option v-for="savedParty in savedPartyKeys" :value="savedParty" :key="savedParty">{{ savedParty }}</option>
            </select>
        </div>
        <div style="text-align:right">
            <button @click="callParty">パーティ呼び出し</button>
        </div>
        <div>パーティ保存</div>
        <div style="text-align:right">
            <button @click="saveParty">パーティ保存</button>
        </div>
    </div>
</template>

<style scoped>
.callParty {
    margin: 8px;
}

.callPartySelect {
    display: flex;
}

.loadPartyNum {
    border: none;
}

.loadPartyKey {
    border: none;
    width: 200px;
    flex: 1 1 200px;
}
</style>