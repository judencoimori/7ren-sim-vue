import { ref } from "vue";
import type { Ref } from "vue";

type Ability = {
  id: number,
  function: string,
  name: string,
  type: string,
  option: number[]
}

export function getAbilityData() {
  const ABILITY_DATA_URL: string = "./data/abilityData.csv";

  const abilityData:Ref<Ability[]> = ref([]);

  fetch(ABILITY_DATA_URL)
    .then((res) => res.text())
    .then((text) => {
      const lines = text.split(/\r\n|\n/);
      for (let i = 0; i < lines.length; i++) {
        let cells = lines[i].split(",");
        let optionStr = cells.slice(3, 8).filter((n: string) => n != "");
        abilityData.value.push({
          id: i,
          function: cells[0],
          name: cells[1],
          type: cells[2],
          option: optionStr.map(Number)
        })
      }
    })
    .catch((err) => (console.log(err)));

  return abilityData;
}