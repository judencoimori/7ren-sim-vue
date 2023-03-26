<script setup lang="ts">
import PartnerParam from '../components/PartnerParam.vue';
import CallPartner from "../components/CallPartner.vue"
import CallSaveParty from '@/components/CallSaveParty.vue';

</script>

<template>
    <div>
        <Suspense>
            <template #default>
                <CallPartner></CallPartner>
            </template>
        </Suspense>
        <Suspense>
            <template #default>
                <CallSaveParty></CallSaveParty>
            </template>
        </Suspense>
        <PartnerParam></PartnerParam>
    </div>
</template>

<style scoped>
div {
    background-color: orangered;
}
</style>