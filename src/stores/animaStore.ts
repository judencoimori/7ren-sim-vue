import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAnimaData } from "../composables/getAnimaData.js";
import { getAbilityData } from "../composables/getAbilityData.js"

class AnimaProps {
    key: string; //IndexedDBで使用する一意のkey
    id: number = 0;
    name: string = "";
    rank: string = "CD";
    element: string = "b";
    hp: number = 0;
    atk: number = 0;
    def: number = 0;
    spd: number = 0;
    luk: number = 0;
    hp_arg: Arg = { point: 0, accesory: 0, percent: 0 };
    atk_arg: Arg = { point: 0, accesory: 0, percent: 0 };
    def_arg: Arg = { point: 0, accesory: 0, percent: 0 };
    spd_arg: Arg = { point: 0, accesory: 0, percent: 0 };
    luk_arg: Arg = { point: 0, accesory: 0, percent: 0 };
    lv: number = 150;
    limitBreak: number = 5;
    abilitys: Ability[] = [{
        key: 0, //inputFormのTransitionで使用するkey
        id: -1,
        function: "",
        name: "",
        type: "",
        level: -1,
        option: [0],
        vaild: true
    }];
    active: Ability[] = [];
    passive: Ability[] = [];
    const: Ability[] = [];
    status: Status = {
        hp: 0,
        atk: 0,
        def: 0,
        spd: 0,
        luk: 0
    };
    constructor(key: string) {
        this.key = key;
    }
}

type Arg = {
    point: number,
    accesory: number,
    percent: number
}

type Ability = {
    key: number; //inputFormのTransitionで使用するkey
    id: number;
    function: string;
    name: string;
    type: string;
    level: number;
    option: number[];
    vaild: boolean;
}
type Status = {
    hp: number;
    atk: number;
    def: number;
    spd: number;
    luk: number;
}

export const useAnimaStore = defineStore('animaStore', () => {

    const animaData = getAnimaData();
    const abilityData = getAbilityData();

    //初期値に空アニマを設定
    const partnerKey = "ニラマル" + Date.now().toString();
    const partnerAnimas = ref([new AnimaProps(partnerKey)]);
    const enemyKey = "ニラマル" + Date.now().toString();
    const enemyAnimas = ref([new AnimaProps(enemyKey)]);

    //partnerAnimasに空アニマをpush
    function addPartner() {
        const key = "ニラマル" + Date.now().toString();
        partnerAnimas.value.push(new AnimaProps(key));
    }

    //animaNum番目のpartnerAnimasに空アビリティをpush
    function addAbility(animaNum: number, abilityKey: number) {
        const newAbility = {
            key: abilityKey,
            id: -1,
            function: "",
            name: "",
            type: "",
            level: -1,
            option: [0],
            vaild: true
        };
        partnerAnimas.value[animaNum].abilitys.push(newAbility);
    }

    //animaNum番目のpartnerAnimasのabilityNum番目のアビリティを削除
    function removeAbility(animaNum: number, abilityNum: number) {
        partnerAnimas.value[animaNum].abilitys.splice(abilityNum, 1);
    }

    function asortAbility(animaNum: number) {
        const abilitys = partnerAnimas.value[animaNum].abilitys;
        partnerAnimas.value[animaNum].active = abilitys.filter((ability: { type: string, level: number }) => {
            return ability.type === "a" && ability.level > 0;
        })
        partnerAnimas.value[animaNum].passive = abilitys.filter((ability: { type: string, level: number }) => {
            return ability.type === "p" && ability.level > 0;
        })
        partnerAnimas.value[animaNum].const = abilitys.filter((ability: { type: string, level: number }) => {
            return ability.type === "c" && ability.level > 0;
        })
    }

    //inputAbilityFormのinputに@change
    //入力がアビリティ名と一致したらfunction,typeをセット
    function checkAbility(animaNum: number, abilityNum: number) {
        for (let i = 0; i < abilityData.value.length; i++) {
            const abi = partnerAnimas.value[animaNum].abilitys[abilityNum];
            if (abilityData.value[i].name === abi.name) {
                abi.id = abilityData.value[i].id;
                abi.function = abilityData.value[i].function;
                abi.type = abilityData.value[i].type;
                abi.option = abilityData.value[i].option;
                abi.level = 1;
                //levelはinpurAbilityFormのselectにv-model
                return;
            }
            resetAbility(animaNum, abilityNum);
        }
    }
    function resetAbility(animaNum: number, abilityNum: number) {
        const abi = partnerAnimas.value[animaNum].abilitys[abilityNum];
        //abi.keyはそのまま
        abi.id = -1;
        abi.function = "";
        abi.type = "";
        abi.level = -1;
        abi.option = [0];
    }

    function removePartner(animaNum: number) {
        if (partnerAnimas.value.length === 1) return;
        partnerAnimas.value.splice(animaNum - 1, 1);
    }

    return { partnerAnimas, enemyAnimas, animaData, abilityData, addPartner, removePartner, addAbility, removeAbility, checkAbility, asortAbility }
})