import { createRouter, createWebHistory } from 'vue-router'
import InputPartnerView from "../views/InputPartnerView.vue"
import SelectBattleView from "../views/SelectBattleView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'partner',
      component: InputPartnerView
    },
    {
      path: '/select',
      name: 'selectBattle',
      component: SelectBattleView
    }
  ]
})

export default router
