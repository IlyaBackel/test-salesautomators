import historyReducer from '@/src/entities/history/model/historySlice';
import locationHistoryReducer from '@/src/entities/location/model/locationsHistorySlice';
import sortReducer from '@/src/entities/sort/model/sortSlice';
import todoReducer from '@/src/entities/todo/model/todoSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { historyMiddleware } from './middleware/historyMiddleware';


const rootReducer = combineReducers({
  todos: todoReducer,
  sort: sortReducer,
  history: historyReducer,
  locationHistory: locationHistoryReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['todos', 'history', 'locationHistory'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(historyMiddleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;