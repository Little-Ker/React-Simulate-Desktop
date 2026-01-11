import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import useWindowStore from '@/zustand/windowStore'

const useDesktopStore = create((set, get) => ({
  // 設定整個清單
  windowList: [],
  setWindowList: newList => set({ windowList: newList }),

  getWindowMaxZ: () => {
    const list = get().windowList
    return list.length === 0 ? 0 : Math.max(...list.map(w => w.zIndex))
  },

  // 在 Store 的 actions 中加入
  openWindow: windowData => set((state) => {
    // 檢查是否已經開啟，避免重複開啟
    const isExist = state.windowList.find(w => w.id === windowData.id)
    if (isExist) {
      get().focusWindow(windowData.id) // 如果已開啟，直接聚焦
      return state
    }

    // const maxZ = Math.max(...state.windowList.map(w => w.zIndex))
    const nextZ = get().getWindowMaxZ() + 5
    return {
      windowList: [
        ...state.windowList,
        {
          id: uuid(),
          ...windowData,
          zIndex: nextZ,
        },
      ],
    }
  }),

  // 關閉視窗 Action
  closeWindow: id => set((state) => {
    const { setProjectTitleList, setIsLoadingList } = useWindowStore.getState()
    setProjectTitleList(id, undefined)
    setIsLoadingList(id, undefined)
    return {
      windowList: state.windowList.filter(w => w.id !== id),
    }
  }),

  // 提升層級 Action
  focusWindow: id => set((state) => {
    if (state.windowList.length === 0) return state

    const maxZ = Math.max(...state.windowList.map(w => w.zIndex), 0)

    // 檢查點擊的是否已經是最上層，避免不必要的更新
    const target = state.windowList.find(w => w.id === id)
    if (target && target.zIndex === maxZ && state.windowList.length > 1) {
      // 如果已經是最高且不是唯一視窗，可以不處理，或者強行 +1
    }

    return {
      windowList: state.windowList.map(w => (w.id === id ? { ...w, zIndex: maxZ + 1 } : w)),
    }
  }),
}))

export default useDesktopStore
