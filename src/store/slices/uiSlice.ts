import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  mobileMenuOpen: boolean;
  notificationsOpen: boolean;
  searchParams: {
    location?: string;
    startDate?: string;
    endDate?: string;
    travelers?: number;
  };
  activeTab: string;
  modal: {
    isOpen: boolean;
    type: string | null;
    data: any;
  };
}

const initialState: UiState = {
  mobileMenuOpen: false,
  notificationsOpen: false,
  searchParams: {},
  activeTab: 'upcoming',
  modal: {
    isOpen: false,
    type: null,
    data: null,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    toggleNotifications: (state) => {
      state.notificationsOpen = !state.notificationsOpen;
    },
    closeNotifications: (state) => {
      state.notificationsOpen = false;
    },
    setSearchParams: (state, action: PayloadAction<Partial<UiState['searchParams']>>) => {
      state.searchParams = { ...state.searchParams, ...action.payload };
    },
    clearSearchParams: (state) => {
      state.searchParams = {};
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    openModal: (state, action: PayloadAction<{ type: string; data?: any }>) => {
      state.modal = {
        isOpen: true,
        type: action.payload.type,
        data: action.payload.data || null,
      };
    },
    closeModal: (state) => {
      state.modal = {
        isOpen: false,
        type: null,
        data: null,
      };
    },
  },
});

export const {
  toggleMobileMenu,
  closeMobileMenu,
  toggleNotifications,
  closeNotifications,
  setSearchParams,
  clearSearchParams,
  setActiveTab,
  openModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;