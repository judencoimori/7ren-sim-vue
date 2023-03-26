<script setup lang="ts">
import { computed } from "vue";
import PartnerAbility from "./PartnerAbility.vue";
import { useAnimaStore } from '@/stores/animaStore';
import { storeToRefs } from 'pinia';

const animaStore = useAnimaStore();
const { partnerAnimas } = storeToRefs(animaStore);
const animaNum = computed(
    (): number => {
        return partnerAnimas.value.length;
    }
)

</script>

<template>
    <div class="partnerParam">
        <div>味方アニマ情報</div>
        <div v-for="n in animaNum" style="margin-bottom:8px; border-top:1px solid white;" :key="'anima' + n">
            <div>
                <p>{{ n }}体目 {{ partnerAnimas[n - 1].name }} Lv{{ partnerAnimas[n - 1].lv }}
                    {{ partnerAnimas[n - 1].limitBreak
                    }}凸</p>
                <p>HP:{{ partnerAnimas[n - 1].status.hp }}
                    ATK:{{ partnerAnimas[n - 1].status.atk }}
                    DEF:{{ partnerAnimas[n - 1].status.def }}
                    SPD:{{ partnerAnimas[n - 1].status.spd }}
                    LUK:{{ partnerAnimas[n - 1].status.luk }}
                </p>
            </div>
            <PartnerAbility :animaNum="n"></PartnerAbility>
        </div>
    </div>
</template>

<style scoped>
.partnerParam {
    position: sticky;
    top: 10px;
    margin: 10px;
}

.sideAbility:hover {
    background-color: pink;
    cursor: pointer;
}

.invailed {
    padding-left: 8px;
    text-decoration: line-through;
    color: rgb(225, 225, 225);
    opacity: 0.8;
}

p {
    margin: 0;
    font-size: smaller;
}
</style>