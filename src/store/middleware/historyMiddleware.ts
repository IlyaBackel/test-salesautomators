import { addHistoryRecord } from '@/src/entities/history/model/historySlice';
import { ITodo } from '@/src/entities/todo/model/ITodo';
import { TODO_STATUS } from '@/src/entities/todo/model/todo-constants';
import { addTodo, changeStatus, deleteTodo, editTodo } from '@/src/entities/todo/model/todoSlice';
import { isAction, Middleware, PayloadAction } from '@reduxjs/toolkit';

export const historyMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (!isAction(action)) {
    return result;
  }

  const state = store.getState() as { todos: { items: ITodo[] } };

  if (action.type === addTodo.type) {
    const payload = (action as PayloadAction<Omit<ITodo, 'creationDate' | 'status'>>).payload;
    if (payload.id && payload.title) {
      store.dispatch(addHistoryRecord({
        id: Date.now().toString(),
        todoId: payload.id,
        todoTitle: payload.title,
        action: 'CREATE',
        timestamp: Date.now(),
      }));
    }
  }

  else if (action.type === editTodo.type) {
    const payload = (action as PayloadAction<{
      id: string;
      title: string;
      description?: string;
      location?: string;
      status: TODO_STATUS;
      executionDateTime: number;
    }>).payload;
    if (payload.id && payload.title) {
      store.dispatch(addHistoryRecord({
        id: Date.now().toString(),
        todoId: payload.id,
        todoTitle: payload.title,
        action: 'EDIT',
        timestamp: Date.now(),
      }));
    }
  }

  else if (action.type === deleteTodo.type) {
    const todoId = (action as PayloadAction<string>).payload;
    const todo = state.todos.items.find((todo: ITodo) => todo.id === todoId);
    if (todo) {
      store.dispatch(addHistoryRecord({
        id: Date.now().toString(),
        todoId: todo.id,
        todoTitle: todo.title,
        action: 'DELETE',
        timestamp: Date.now(),
      }));
    }
  }

  else if (action.type === changeStatus.type) {
    const { id, status } = (action as PayloadAction<{ id: string; status: TODO_STATUS }>).payload;
    const todo = state.todos.items.find((todo: ITodo) => todo.id === id);
    if (todo) {
      store.dispatch(addHistoryRecord({
        id: Date.now().toString(),
        todoId: id,
        todoTitle: todo.title,
        action: 'TOGGLE_STATUS',
        details: `to ${status}`,
        timestamp: Date.now(),
      }));
    }
  }

  return result;
};