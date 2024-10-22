import { ref } from 'vue'
import type { Ref } from 'vue'
import { IUser } from '../typings/interfaces/IUser'

export const useUsers = () => ({
  users: ref([
    {
      login: 'frontend@dev.ru',
      password: 'abe45d28281cfa2a4201c9b90a143095', // 123test
    },
  ]) as Ref<IUser[]>,
})
