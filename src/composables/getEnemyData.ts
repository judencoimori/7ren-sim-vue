import { ref } from "vue";
import type { Ref } from "vue";

type EnemyData = {
    groupName: string,
    data: BattleData[],
    effect: string,
    rin?: number,
    exp?: number
}

type BattleData = {
    key: string,
    battleName: string,
    enemyList: Enemy[],
}

type Enemy = {
    enemyName: string,
    enemyStatus: [hp: number, atk: number, def: number, spd: number, luk: number, element: "b"|"m"|"g"|"d"|"n"],
    activeAbilityList: [function:string, abilityName: string, option: number][],
    passiveAbilityList: [function:string, abilityName: string, option: number][],
    constAbilityList: [function:string, abilityName: string, option: number][]
}

export async function getEnemyData(path: string) {
    const ENEMY_DATA_URL: string = "./data/enemy-data-" + path + ".json";

    const defaultEnemyData = {
        groupName: "default",
        data: [{
            key: "",
            battleName: "",
            enemyList: []
        }],
        effect: ""
    }

    let enemyData: EnemyData = defaultEnemyData;

    await fetch(ENEMY_DATA_URL)
        .then((res) => res.json())
        .then((json) => {
            enemyData = json;
        })
        .catch((err) => (console.log(err)));

    return enemyData;
    /*
        } else {
    
        console.log("fetch start " + "./data/enemyData_" + path + ".json");
        const ENEMY_DATA_URL: string = "./data/enemyData_" + path + ".json";
        const enemyData = ref({});
    
        fetch(ENEMY_DATA_URL)
            .then((res) => res.json())
            .then((json) => {
                enemyData.value = json;
            })
            .catch((err) => (console.log(err)));
    
        return enemyData;
        }
        */
}