import { ITodo } from '@/src/entities/todo/model/ITodo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
      location?: string;
      status: TODO_STATUS;
      executionDateTime: number;
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
  },
});

export const { addTodo, deleteTodo, editTodo, changeStatus } = todosSlice.actions;
export default todosSlice.reducer;