import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type HistoryActionType = 'CREATE' | 'EDIT' | 'DELETE' | 'TOGGLE_STATUS';

export interface HistoryRecord {
  id: string;
  todoId: string;         
  todoTitle: string;      
  action: HistoryActionType;
  details?: string;       
  timestamp: number;
}

interface HistoryState {
  records: HistoryRecord[];
}

const initialState: HistoryState = {
  records: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistoryRecord: (state, action: PayloadAction<HistoryRecord>) => {
      state.records = [action.payload, ...state.records];
    },
    clearHistory: (state) => {
      state.records = [];
    },
  },
});

export const { addHistoryRecord, clearHistory } = historySlice.actions;
export default historySlice.reducer;