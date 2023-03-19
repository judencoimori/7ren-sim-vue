import { ref } from "vue";
import type { Ref } from "vue";

type Anima = {
    id: number;
    name: string;
    rank: string;
    element: string;
    hp: number;
    atk: number;
    def: number;
    spd: number;
    luk: number
}

export function getAnimaData() {
    const ANIMA_DATA_URL: string = "../data/animaData.csv";
    let animaData: Ref<Anima[]> = ref([]);

    fetch(ANIMA_DATA_URL)
        .then((res) => res.text())
        .then((text) => {
            const lines = text.split(/\r\n|\n/);
            for (let i = 0; i < lines.length; i++) {
                let cells = lines[i].split(",");
                //console.log(cells);
                if (cells[1] === "C" || cells[1] === "D") cells[1] = "CD";
                animaData.value.push({
                    id: i,
                    name: cells[0],
                    rank: cells[1],
                    element: cells[2],
                    hp: parseInt(cells[3]),
                    atk: parseInt(cells[4]),
                    def: parseInt(cells[5]),
                    spd: parseInt(cells[6]),
                    luk: parseFloat(cells[7])
                })

            }
        })
        .catch((err) => (console.log(err)));

    return animaData;
}