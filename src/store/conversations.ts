import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useConversation = create(
  persist(
    (set) => ({
      conversations: [],
      setConversations: (conversations: any) =>
        set(() => ({ conversations })),
      activeConversation: null,
      setActiveConversation: (activeConversation: any) =>
        set(() => ({ activeConversation })),
      activeConversationData: [],
      setActiveConversationData: (activeConversationData: any) =>
        set(() => ({ activeConversationData })),

      logoutConversations: () =>
        set(() => ({
          conversations: [],
          activeConversation: null,
          activeConversationData: [],
        })),
    }),
    {
      name: 'conversation-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
