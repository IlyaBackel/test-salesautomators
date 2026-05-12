import { ITodo } from '@/src/types/todoItem';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import EmptyList from './EmptyList';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: ITodo[];
  onItemPress: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: ITodo['status']) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onItemPress, onToggleStatus, onDelete }: TodoListProps) {

  if (todos.length === 0) return <EmptyList />

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TodoItem
          todo={item}
          onPress={onItemPress}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
});