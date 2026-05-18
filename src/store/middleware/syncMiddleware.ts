import { enqueueAction, removeAction, setSyncing } from '@/src/entities/sync/model/syncQueueSlice';
import { ITodo } from '@/src/entities/todo/model/ITodo';
import { TODO_STATUS } from '@/src/entities/todo/model/todo-constants';
import { addTodo, deleteTodo, editTodo } from '@/src/entities/todo/model/todoSlice';
import { todoApi } from '@/src/shared/api/todoApi';
import { isAction, Middleware, PayloadAction } from '@reduxjs/toolkit';
import * as Network from 'expo-network';
import { AppDispatch, RootState } from '..';

let isOnline = false;

const checkConnection = async (dispatch: AppDispatch, getState: () => RootState) => {
  const state = await Network.getNetworkStateAsync();
  const wasOnline = isOnline;
  isOnline = state.isConnected ?? false;
  if (isOnline && !wasOnline) {
    syncQueue(dispatch, getState);
  }
};

const syncQueue = async (dispatch: AppDispatch, getState: () => RootState) => {
  const queue = getState().syncQueue.queue;
  if (queue.length === 0) return;

  dispatch(setSyncing(true));
  for (const action of queue) {
    try {
      switch (action.type) {
        case 'ADD':
          await todoApi.create(action.payload);
          break;
        case 'UPDATE':
          await todoApi.update(action.payload.id, action.payload);
          break;
        case 'DELETE':
          await todoApi.delete(action.payload);
          break;
      }
      dispatch(removeAction(action.id));
    } catch (error) {
      console.error('Sync failed for action', action.id, error);
    }
  }
  dispatch(setSyncing(false));
};

export const syncMiddleware: Middleware = storeAPI => next => action => {
  const result = next(action);
  const { dispatch, getState } = storeAPI;

  if (!isAction(action)) return result;

  setInterval(() => checkConnection(dispatch, getState), 5000);
  checkConnection(dispatch, getState);

  if (!isOnline) {
    if (action.type === addTodo.type) {
      const payload = (action as PayloadAction<Omit<ITodo, 'creationDate' | 'status'>>).payload;
      dispatch(enqueueAction({
        id: Date.now().toString(),
        type: 'ADD',
        payload,
        timestamp: Date.now(),
      }));
    } else if (action.type === editTodo.type) {
      const payload = (action as PayloadAction<{
        id: string;
        title: string;
        description?: string;
        manualLocation?: string;
        mapLocation?: string;
        latitude?: number;
        longitude?: number;
        status: TODO_STATUS;
        executionDateTime: number;
        notificationId?: string;
        attachments?: any[];
      }>).payload;
      dispatch(enqueueAction({
        id: Date.now().toString(),
        type: 'UPDATE',
        payload,
        timestamp: Date.now(),
      }));
    } else if (action.type === deleteTodo.type) {
      const payload = (action as PayloadAction<string>).payload;
      dispatch(enqueueAction({
        id: Date.now().toString(),
        type: 'DELETE',
        payload,
        timestamp: Date.now(),
      }));
    }
  }

  return result;
};