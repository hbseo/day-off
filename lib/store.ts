import { create } from 'zustand';

export type NavPanel = {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
};

export const useNavPanelStore = create<NavPanel>((set) => ({
  isCollapsed: false,
  setIsCollapsed: (value) => set(() => ({ isCollapsed: value })),
}));
