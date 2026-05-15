import todoReducer from '@/src/entities/todo/model/todoSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import sortReducer from '../entities/sort/model/sortSlice';


const rootReducer = combineReducers({
    todos: todoReducer,
    sort: sortReducer,   
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['todos'],   
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;