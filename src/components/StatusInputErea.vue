<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
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

const hp_arg = ref({ point: 0, accesory: 0, percent: 0 });
const atk_arg = ref({ point: 0, accesory: 0, percent: 0 });
const def_arg = ref({ point: 0, accesory: 0, percent: 0 });
const spd_arg = ref({ point: 0, accesory: 0, percent: 0 });
const luk_arg = ref({ point: 0, accesory: 0, percent: 0 });
const lv = ref(150);
const limitBreak = ref(5);

const hp = computed(
    () => {
        const row = lv.value * 0.317 * (0.28 * hp_arg.value.point + anima.value.hp) + hp_arg.value.point;
        const calc = (row * (1 + limitBreak.value * 0.07) + hp_arg.value.accesory) * (1 + hp_arg.value.percent / 100);
        return Math.round(calc);
    }
)
const atk = computed(
    () => {
        const row = lv.value * 0.277 * (0.28 * atk_arg.value.point + anima.value.atk) + atk_arg.value.point;
        const calc = (row * (1 + limitBreak.value * 0.07) + atk_arg.value.accesory) * (1 + atk_arg.value.percent / 100);
        return Math.round(calc);
    }
)
const def = computed(
    () => {
        const row = lv.value * 0.277 * (0.28 * def_arg.value.point + anima.value.def) + def_arg.value.point;
        const calc = (row * (1 + limitBreak.value * 0.07) + def_arg.value.accesory) * (1 + def_arg.value.percent / 100);
        return Math.round(calc);
    }
)
const spd = computed(
    () => {
        const row = lv.value * 0.157 * (0.28 * spd_arg.value.point + anima.value.spd) + spd_arg.value.point;
        const calc = (row * (1 + limitBreak.value * 0.07) + spd_arg.value.accesory) * (1 + spd_arg.value.percent / 100);
        return Math.round(calc);
    }
)
const luk = computed(
    () => {
        const row = lv.value * 0.117 * (0.28 * luk_arg.value.point + anima.value.luk) + luk_arg.value.point;
        const calc = (row * (1 + limitBreak.value * 0.07) + luk_arg.value.accesory) * (1 + luk_arg.value.percent / 100);
        return Math.round(calc);
    }
)
watchEffect(() => {
    anima.value.status.hp = hp.value;
    anima.value.status.atk = atk.value;
    anima.value.status.def = def.value;
    anima.value.status.spd = spd.value;
    anima.value.status.luk = luk.value;
})
</script>

<template>
    <div>
        <div class="inputStatus">
            <div class="statusName"></div>
            <div class="status">Pt</div>
            <div class="status">装飾</div>
            <div class="status">%</div>
        </div>
        <div class="inputStatus">
            <div class="statusName">HP</div>
            <input type="number" class="status" v-model="hp_arg.point">
            <input type="number" class="status" v-model="hp_arg.accesory">
            <input type="number" class="status" v-model="hp_arg.percent">
        </div>
        <div class="inputStatus">
            <div class="statusName">攻撃</div>
            <input type="number" class="status" v-model="atk_arg.point">
            <input type="number" class="status" v-model="atk_arg.accesory">
            <input type="number" class="status" v-model="atk_arg.percent">
        </div>
        <div class="inputStatus">
            <div class="statusName">防御</div>
            <input type="number" class="status" v-model="def_arg.point">
            <input type="number" class="status" v-model="def_arg.accesory">
            <input type="number" class="status" v-model="def_arg.percent">
        </div>
        <div class="inputStatus">
            <div class="statusName">速さ</div>
            <input type="number" class="status" v-model="spd_arg.point">
            <input type="number" class="status" v-model="spd_arg.accesory">
            <input type="number" class="status" v-model="spd_arg.percent">
        </div>
        <div class="inputStatus">
            <div class="statusName">幸運</div>
            <input type="number" class="status" v-model="luk_arg.point">
            <input type="number" class="status" v-model="luk_arg.accesory">
            <input type="number" class="status" v-model="luk_arg.percent">
        </div>
        <div style="color:lightgray; margin-left:10px;">{{ anima.id }},{{ anima.name }},{{ hp }},{{ atk }},{{ def }},{{ spd }},{{ luk }}
        </div>
    </div>
</template>

<style scoped>
input {
    padding: 0;
    border: 1px solid gray;
    border-radius: 2px;
    text-align: center;
    width: 100%;
    font-size:small;
}
.inputStatus {
    display:flex;
    font-size:small;
}
.statusName {
    flex:0 0 40px;
    text-align:center;
}
.status {
    flex:0 1 60px;
    text-align:center;
    margin:2px;
}
</style>