import { create } from 'zustand'

const loginStore = create((set, get) => ({
  useName: null,
  setUseName: state => set({ useName: state }),

  tableCloth: '',
  setTableCloth: state => set({ tableCloth: state }),
}))

export default loginStore
