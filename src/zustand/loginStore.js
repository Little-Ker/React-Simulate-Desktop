import { create } from 'zustand'

const loginStore = create((set, get) => ({
  useName: null,
  setUseName: state => set({ useName: state }),
}))

export default loginStore
