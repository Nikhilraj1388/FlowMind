import { create } from 'zustand';

/** Global UI state — sidebar, panels, modals */
interface UIState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  aiPanelOpen: boolean;
  activeVizTab: 'graph' | 'recursion' | 'memory' | 'output';

  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleAIPanel: () => void;
  setAIPanel: (open: boolean) => void;
  setActiveVizTab: (tab: UIState['activeVizTab']) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarOpen: true,
  sidebarCollapsed: false,
  aiPanelOpen: true,
  activeVizTab: 'graph',

  toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  toggleAIPanel: () => set({ aiPanelOpen: !get().aiPanelOpen }),
  setAIPanel: (open) => set({ aiPanelOpen: open }),
  setActiveVizTab: (tab) => set({ activeVizTab: tab }),
}));
