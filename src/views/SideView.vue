<script setup lang="ts">
import { ref, computed } from 'vue';
import PartnerParam from '../components/PartnerParam.vue';

</script>

<template>
    <div class="sideview">
        <div>sidebar</div>
        <PartnerParam></PartnerParam>
    </div>
</template>

<style scoped>
div {
    background-color:orangered;
}

.sideview {
    min-height: 100%;
    width: 300px;
    color: white;
    padding-bottom:60px;
    flex-shrink: 0;
}

.sideViewClose {
    width:0px;
}

</style>