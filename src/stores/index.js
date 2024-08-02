import { ref,} from 'vue'
import { defineStore } from 'pinia'

export const useModal = defineStore('modal', () => {
  const modal = ref(false);

  const toggleModal = () =>{
    modal.value = !modal.value
  }

  return { modal, toggleModal }
})



