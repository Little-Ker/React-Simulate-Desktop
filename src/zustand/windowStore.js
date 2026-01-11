import { create } from 'zustand'

const useWindowStore = create((set, get) => ({
  // 最小視窗大小
  minWindowSize: {
    width: 200,
    height: 120,
  },

  // 預設視窗大小
  defaultWindowSizePercent: 70,
  getefaultWindowSize: () => {
    const percent = get().defaultWindowSizePercent
    return {
      width: (window.innerWidth * percent) / 100,
      height: (window.innerHeight * percent) / 100,
    }
  },

  // 開關 loading
  isLoadingList: {},
  setIsLoadingList: (id, bool) => set((state) => {
    state.isLoadingList[id] = bool

    return { isLoadingList: state.isLoadingList }
  }),

  // 作品專案設定: window 標題
  projectTitleList: {},
  setProjectTitleList: (id, bool) => set((state) => {
    state.projectTitleList[id] = bool

    return { projectTitleList: state.projectTitleList }
  }),
  // 作品專案設定: 是否開啟作品選單
  isMenuOpenList: {},
  setIsMenuOpenList: (id, bool) => set((state) => {
    state.isMenuOpenList[id] = bool

    return { isMenuOpenList: state.isMenuOpenList }
  }),

  // 作品專案設定: 設定 iframeUrl 網址
  iframeUrlList: {},
  setIframeUrlList: (id, bool) => set((state) => {
    state.iframeUrlList[id] = bool

    return { iframeUrlList: state.iframeUrlList }
  }),

  onMouseMovePos: (e, pos, size, setPos) => {
    const startX = e.clientX - pos.x
    const startY = e.clientY - pos.y

    const onMouseMove = (moveEvent) => {
      let newX = moveEvent.clientX - startX
      let newY = moveEvent.clientY - startY

      // 限制不超出左邊、上邊
      newX = Math.max(0, newX)
      newY = Math.max(0, newY)

      // 限制不超出右邊、下邊
      const maxX = window.innerWidth - size.width
      const maxY = window.innerHeight - size.height
      newX = Math.min(newX, maxX)
      newY = Math.min(newY, maxY)

      setPos({ x: newX, y: newY })
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  },

  onMouseResize: (e, size, setSize, type, pos, setIsOperating) => {
    e.preventDefault()
    e.stopPropagation()

    const startWidth = size.width
    const startHeight = size.height
    const startX = e.clientX
    const startY = e.clientY

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY

      setSize(prev => ({
        // 若是 width 或 both，就更新寬度，且不超出螢幕右側
        width: (type === 'width' || type === 'both')
          ? Math.min(window.innerWidth - pos.x, Math.max(200, startWidth + deltaX))
          : prev.width,
        // 若是 height 或 both，就更新高度，且不超出螢幕底部
        height: (type === 'height' || type === 'both')
          ? Math.min(window.innerHeight - pos.y, Math.max(150, startHeight + deltaY))
          : prev.height,
      }))
    }

    const onMouseUp = () => {
      setIsOperating(false)

      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  },

  // 縮放控制區域設定列表
  resizeHandlerList: [{
    type: 'width',
    style: {
      top: 0, right: 0, width: '6px', height: '100%', cursor: 'e-resize',
    },
  }, {
    type: 'height',
    style: {
      bottom: 0, left: 0, height: '6px', width: '100%', cursor: 's-resize',
    },
  }, {
    type: 'both',
    style: {
      bottom: 0, right: 0, width: '12px', height: '12px', cursor: 'nwse-resize',
    },
  }],

}))

export default useWindowStore
