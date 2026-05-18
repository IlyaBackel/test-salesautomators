
import { Attachment } from '@/src/shared/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from './ITodo';
import { TODO_STATUS } from './todo-constants';

interface TodosState {
  items: ITodo[];
}

const initialState: TodosState = {
  items: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<ITodo, 'creationDate' | 'status'>>) => {
      const newTodo: ITodo = {
        ...action.payload,
        creationDate: Date.now(),
        status: TODO_STATUS.ACTIVE,
      };
      state.items.unshift(newTodo);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<{
      id: string;
      title: string;
      description?: string;
      manualLocation?: string;
      mapLocation?: string;
      latitude?: number;
      longitude?: number;
      status: TODO_STATUS;
      executionDateTime: number;
      attachments?: Attachment[];
      notificationId?: string;
    }>) => {
      const { id, ...updates } = action.payload;
      const todo = state.items.find(todo => todo.id === id);
      if (todo) {
        Object.assign(todo, updates);
      }
    },
    changeStatus: (state, action: PayloadAction<{ id: string; status: TODO_STATUS }>) => {
      const todo = state.items.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.status = action.payload.status;
      }
    },
    updateNotificationId: (state, action: PayloadAction<{ id: string; notificationId?: string }>) => {
      const todo = state.items.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.notificationId = action.payload.notificationId;
      }
    },
    setTodos: (state, action: PayloadAction<ITodo[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, editTodo, changeStatus, setTodos, updateNotificationId } = todosSlice.actions;
export default todosSlice.reducer;