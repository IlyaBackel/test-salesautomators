import { addHistoryRecord } from '@/src/entities/history/model/historySlice';
import { ITodo } from '@/src/entities/todo/model/ITodo';
import { TODO_STATUS } from '@/src/entities/todo/model/todo-constants';
import { addTodo, changeStatus, deleteTodo, editTodo } from '@/src/entities/todo/model/todoSlice';
import { isAction, Middleware, PayloadAction } from '@reduxjs/toolkit';

export const historyMiddleware: Middleware = store => next => action => {
  if (!isAction(action)) {
    return next(action);
  }

  const state = store.getState() as { todos: { items: ITodo[] } };

  if (action.type === addTodo.type) {
    const payload = (action as PayloadAction<Omit<ITodo, 'creationDate' | 'status'>>).payload;
    const result = next(action);
    if (payload.id && payload.title) {
      store.dispatch(addHistoryRecord({
        id: Date.now().toString(),
        todoId: payload.id,
        todoTitle: payload.title,
        action: 'CREATE',
        timestamp: Date.now(),
      }));
    }
    return result;
  }

  if (action.type === editTodo.type) {
    const payload = (action as PayloadAction<{
      id: string;
      title: string;
      description?: string;
      location?: string;
      status: TODO_STATUS;
      executionDateTime: number;
    }>).payload;
    const result = next(action);
    if (payload.id && payload.title) {
      store.dispatch(addHistoryRecord({
        id: Date.now().toString(),
        todoId: payload.id,
        todoTitle: payload.title,
        action: 'EDIT',
        timestamp: Date.now(),
      }));
    }
    return result;
  }

  if (action.type === deleteTodo.type) {
    const todoId = (action as PayloadAction<string>).payload;
    const todoToDelete = state.todos.items.find(t => t.id === todoId);
    const result = next(action);
    if (todoToDelete) {
      store.dispatch(addHistoryRecord({
        id: Date.now().toString(),
        todoId: todoToDelete.id,
        todoTitle: todoToDelete.title,
        action: 'DELETE',
        timestamp: Date.now(),
      }));
    }
    return result;
  }

  if (action.type === changeStatus.type) {
    const { id, status } = (action as PayloadAction<{ id: string; status: TODO_STATUS }>).payload;
    const result = next(action);
    const todo = state.todos.items.find(t => t.id === id);
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
    return result;
  }

  return next(action);
};