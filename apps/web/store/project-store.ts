import { create } from 'zustand';

interface ProjectState {
  projectId: string | null;
  title: string;
  language: string; // 'JAVASCRIPT' | 'PYTHON' | 'CPP' | 'JAVA'
  code: string;
  version: number;
  isDirty: boolean;
  isSaving: boolean;
  isLoading: boolean;
  lastSavedAt: string | null;

  setProject: (project: {
    id: string;
    title: string;
    language: string;
    code: string;
    version: number;
  }) => void;
  setCode: (code: string) => void;
  setTitle: (title: string) => void;
  setLanguage: (language: string) => void;
  setSaving: (saving: boolean) => void;
  markSaved: (newVersion: number) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

const initialState = {
  projectId: null,
  title: 'Untitled Project',
  language: 'JAVASCRIPT',
  code: '',
  version: 1,
  isDirty: false,
  isSaving: false,
  isLoading: false,
  lastSavedAt: null,
};

export const useProjectStore = create<ProjectState>((set) => ({
  ...initialState,

  setProject: (project) =>
    set({
      projectId: project.id,
      title: project.title,
      language: project.language,
      code: project.code,
      version: project.version,
      isDirty: false,
      isSaving: false,
      isLoading: false,
    }),

  setCode: (code) => set({ code, isDirty: true }),

  setTitle: (title) => set({ title, isDirty: true }),

  setLanguage: (language) => set({ language, isDirty: true }),

  setSaving: (saving) => set({ isSaving: saving }),

  markSaved: (newVersion) =>
    set({
      isSaving: false,
      isDirty: false,
      version: newVersion,
      lastSavedAt: new Date().toISOString(),
    }),

  setLoading: (loading) => set({ isLoading: loading }),

  reset: () => set(initialState),
}));
