import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface SidebarState {
  Open: boolean
  SetOpen: (open: boolean) => void
}

export const useOpen = create<SidebarState>()(
  devtools(
    persist(
      (set) => ({
        Open: true,
        SetOpen: (val) => set(() => ({ Open: val })),
      }),
      {
        name: 'sidebar-storage',
      },
    ),
  ),
)