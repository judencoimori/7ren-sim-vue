<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useAnimaStore } from '@/stores/animaStore';
import { storeToRefs } from 'pinia';
interface Props {
    animaNum: number;
}
const props = defineProps<Props>();

const animaStore = useAnimaStore();
const { partnerAnimas } = storeToRefs(animaStore);
const anima = computed(
    () => partnerAnimas.value[props.animaNum]
)

const hp = computed(
    () => {
        const row = anima.value.lv * 0.317 * (0.28 * anima.value.hp_arg.point + anima.value.hp) + anima.value.hp_arg.point;
        const calc = (row * (1 + anima.value.limitBreak * 0.07) + anima.value.hp_arg.accesory) * (1 + anima.value.hp_arg.percent / 100);
        return Math.round(calc);
    }
)
const atk = computed(
    () => {
        const row = anima.value.lv * 0.277 * (0.28 * anima.value.atk_arg.point + anima.value.atk) + anima.value.atk_arg.point;
        const calc = (row * (1 + anima.value.limitBreak * 0.07) + anima.value.atk_arg.accesory) * (1 + anima.value.atk_arg.percent / 100);
        return Math.round(calc);
    }
)
const def = computed(
    () => {
        const row = anima.value.lv * 0.277 * (0.28 * anima.value.def_arg.point + anima.value.def) + anima.value.def_arg.point;
        const calc = (row * (1 + anima.value.limitBreak * 0.07) + anima.value.def_arg.accesory) * (1 + anima.value.def_arg.percent / 100);
        return Math.round(calc);
    }
)
const spd = computed(
    () => {
        const row = anima.value.lv * 0.157 * (0.28 * anima.value.spd_arg.point + anima.value.spd) + anima.value.spd_arg.point;
        const calc = (row * (1 + anima.value.limitBreak * 0.07) + anima.value.spd_arg.accesory) * (1 + anima.value.spd_arg.percent / 100);
        return Math.round(calc);
    }
)
const luk = computed(
    () => {
        const row = anima.value.lv * 0.117 * (0.28 * anima.value.luk_arg.point + anima.value.luk) + anima.value.luk_arg.point;
        const calc = (row * (1 + anima.value.limitBreak * 0.07) + anima.value.luk_arg.accesory) * (1 + anima.value.luk_arg.percent / 100);
        return Math.round(calc);
    }
)

watchEffect(() => {
    partnerAnimas.value[props.animaNum].status.hp = hp.value;
    partnerAnimas.value[props.animaNum].status.atk = atk.value;
    partnerAnimas.value[props.animaNum].status.def = def.value;
    partnerAnimas.value[props.animaNum].status.spd = spd.value;
    partnerAnimas.value[props.animaNum].status.luk = luk.value;
}
)

</script>

<template>
    <div style="margin:8px 0">
        <div class="inputStatus">
            <label :for="'lv' + props.animaNum" class="statusName">Lv</label>
            <input type="number" v-model="anima.lv" class="status">
            <label :for="'limit' + props.animaNum" class="statusName">限凸</label>
            <input type="number" v-model="anima.limitBreak" class="status">
        </div>
        <div class="inputStatus">
            <div class="statusName"></div>
            <div class="status">Pt</div>
            <div class="status">装飾</div>
            <div class="status">%</div>
            <div class="status"></div>
        </div>
        <div class="inputStatus">
            <div class="statusName">HP</div>
            <input type="number" class="status" v-model="anima.hp_arg.point">
            <input type="number" class="status" v-model="anima.hp_arg.accesory">
            <input type="number" class="status" v-model="anima.hp_arg.percent">
            <div class="status">{{ hp }}</div>
        </div>
        <div class="inputStatus">
            <div class="statusName">攻撃</div>
            <input type="number" class="status" v-model="anima.atk_arg.point">
            <input type="number" class="status" v-model="anima.atk_arg.accesory">
            <input type="number" class="status" v-model="anima.atk_arg.percent">
            <div class="status">{{ atk }}</div>
        </div>
        <div class="inputStatus">
            <div class="statusName">防御</div>
            <input type="number" class="status" v-model="anima.def_arg.point">
            <input type="number" class="status" v-model="anima.def_arg.accesory">
            <input type="number" class="status" v-model="anima.def_arg.percent">
            <div class="status">{{ def }}</div>
        </div>
        <div class="inputStatus">
            <div class="statusName">速さ</div>
            <input type="number" class="status" v-model="anima.spd_arg.point">
            <input type="number" class="status" v-model="anima.spd_arg.accesory">
            <input type="number" class="status" v-model="anima.spd_arg.percent">
            <div class="status">{{ spd }}</div>
        </div>
        <div class="inputStatus">
            <div class="statusName">幸運</div>
            <input type="number" class="status" v-model="anima.luk_arg.point">
            <input type="number" class="status" v-model="anima.luk_arg.accesory">
            <input type="number" class="status" v-model="anima.luk_arg.percent">
            <div class="status">{{ luk }}</div>
        </div>
    </div>
</template>

<style scoped>
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0 0 0;
    font-weight: bold;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input {
    padding: 0;
    border: 1px solid gray;
    text-align: center;
    height: 1.5em;
    width: 100%;
    font-size: medium;
}

.inputStatus {
    display: flex;
    align-items: center;
    font-size: small;
    font-weight:bold;
    background-color:rgba(255, 192, 203, 0.37);
}

.statusName {
    flex: 0 0 40px;
    text-align: center;
}

.status {
    flex: 0 1 60px;
    text-align: center;
}
</style>