import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SyncAction {
  id: string;
  type: 'ADD' | 'UPDATE' | 'DELETE';
  payload: any;
  timestamp: number;
}

interface SyncQueueState {
  queue: SyncAction[];
  isSyncing: boolean;
}

const initialState: SyncQueueState = {
  queue: [],
  isSyncing: false,
};

const syncQueueSlice = createSlice({
  name: 'syncQueue',
  initialState,
  reducers: {
    enqueueAction: (state, action: PayloadAction<SyncAction>) => {
      state.queue.push(action.payload);
    },
    removeAction: (state, action: PayloadAction<string>) => {
      state.queue = state.queue.filter(item => item.id !== action.payload);
    },
    clearQueue: (state) => {
      state.queue = [];
    },
    setSyncing: (state, action: PayloadAction<boolean>) => {
      state.isSyncing = action.payload;
    },
  },
});

export const { enqueueAction, removeAction, clearQueue, setSyncing } = syncQueueSlice.actions;
export default syncQueueSlice.reducer;