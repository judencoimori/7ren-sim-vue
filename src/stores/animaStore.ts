import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAnimaData } from "../composables/getAnimaData.js";
import { getAbilityData } from "../composables/getAbilityData.js"

class AnimaProps {
    key: number; //input時に使用する一意のkey
    id: number;
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
        key: 0,
        id: -1,
        function: "",
        name: "",
        type: "",
        level: -1,
        option: [0],
        vaild:true
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
    constructor(animaNum: number, key: number) {
        this.id = 0;
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
    vaild:boolean;
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

    //初期値にid:0、abilitys:[{}]の空アニマを設定
    const partnerAnimas = ref([new AnimaProps(0, 0)]);
    const enemyAnimas = ref([new AnimaProps(0, 0)]);

    //partnerAnimasに空アニマをpush
    function addPartner(key: number) {
        const animaNum = partnerAnimas.value.length;
        partnerAnimas.value.push(new AnimaProps(animaNum, key));
    }

    //animaNum番目のpartnerAnimasに空アビリティをpush
    function addAbility(animaNum: number, key: number) {
        const newAbility = {
            key: key,
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
        abi.id = -1;
        abi.function = "";
        abi.type = "";
        abi.level = -1;
        abi.option = [0];
    }

    function removePartner(animaNum: number) {
        if(partnerAnimas.value.length === 1) return;
        partnerAnimas.value.splice(animaNum - 1, 1);
    }

    return { partnerAnimas, enemyAnimas, animaData, abilityData, addPartner, removePartner, addAbility, removeAbility, checkAbility, asortAbility }
})