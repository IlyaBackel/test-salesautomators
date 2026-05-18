import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationsHistoryState {
  items: string[];
}

const initialState: LocationsHistoryState = {
  items: [],
};

const locationsHistorySlice = createSlice({
  name: 'locationsHistory',
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<string>) => {
      const location = action.payload.trim();
      if (!location) return;
      const filtered = state.items.filter(item => item !== location);
      state.items = [location, ...filtered];
    },
    clearHistory: (state) => {
      state.items = [];
    },
  },
});

export const { addLocation, clearHistory } = locationsHistorySlice.actions;
export default locationsHistorySlice.reducer;