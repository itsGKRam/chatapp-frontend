import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useUser = create(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setAccessToken: (accessToken: any) => set(() => ({ accessToken })),
      setUser: (user: any) => set(() => ({ user })),
      logoutUser: () => set(() => ({ user: null, accessToken: null })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
