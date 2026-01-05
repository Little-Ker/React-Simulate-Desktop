import React from 'react'
import {
  MdSettings, MdFactCheck, MdOutlinePets, MdFolder, MdPerson
} from 'react-icons/md'

const desktopAppRoutes = [
  { id: 'mynudes', name: '資料夾', icon: '📂' },
  { id: 'designercc', name: '小畫家', icon: '🎨' },
  { id: 'procrastiland', name: 'Procrastiland', icon: '🧭' },
]

const desktopBottomRoutes = [
  { id: 'personSetting', name: '個人設定', icon: MdPerson },
  { id: 'setting', name: '設定', icon: MdSettings },
  { id: 'folder', name: '資料夾', icon: MdFolder },
  { id: 'stickyNote', name: '便利貼', icon: MdFactCheck },
  { id: 'pet', name: '桌面寵物', icon: MdOutlinePets },
]

export {
  desktopAppRoutes,
  desktopBottomRoutes
}
