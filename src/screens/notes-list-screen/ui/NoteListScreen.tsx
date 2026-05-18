import { useTheme } from '@/src/app/providers/ThemeProvider';
import { selectActiveSort, selectDirectionOfSort } from '@/src/entities/sort/model/sortSlice';
import { sortTodos } from '@/src/entities/todo/lib/sorts';
import { TODO_STATUS } from '@/src/entities/todo/model/todo-constants';
import { TodoModal } from '@/src/features';
import { RootStackParamList } from '@/src/shared/types/types';
import { TodoList } from '@/src/widgets';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addTodo, changeStatus, deleteTodo } from '../../../entities/todo/model/todoSlice';
import { cancelNotification, scheduleTodoNotification } from '../../../shared/lib/notifications';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export default function NoteListScreen() {
    const dispatch = useAppDispatch();
    const todos = useAppSelector((state) => state.todos.items);
    const activeSort = useAppSelector(selectActiveSort);
    const direction = useAppSelector(selectDirectionOfSort);
    const [modalVisible, setModalVisible] = useState(false);
    const { colors } = useTheme();

    type NavigationProp = StackNavigationProp<RootStackParamList, 'Todo List'>;
    const navigation = useNavigation<NavigationProp>();

    const sortedTodos = sortTodos(todos, activeSort, direction);

    const handleCreate = async (data: any) => {
        const newId = Date.now().toString();
        const notificationId = await scheduleTodoNotification({
            id: newId,
            title: data.title,
            executionDateTime: data.executionDateTime,
        });
        dispatch(addTodo({
            id: newId,
            title: data.title,
            description: data.description,
            manualLocation: data.manualLocation,
            mapLocation: data.mapLocation,
            latitude: data.latitude,
            longitude: data.longitude,
            executionDateTime: data.executionDateTime,
            notificationId: notificationId || undefined,
        }));
    };

    const handleToggleStatus = async (id: string, currentStatus: TODO_STATUS) => {
        const todo = todos.find(t => t.id === id);
        let newStatus: TODO_STATUS;
        if (currentStatus === TODO_STATUS.ACTIVE) newStatus = TODO_STATUS.COMPLETED;
        else if (currentStatus === TODO_STATUS.COMPLETED) newStatus = TODO_STATUS.ACTIVE;
        else return;

        if (newStatus !== TODO_STATUS.ACTIVE && todo?.notificationId) {
            await cancelNotification(todo.notificationId);
        }
        dispatch(changeStatus({ id, status: newStatus }));
    };

    const handleItemPress = (id: string) => {
        navigation.navigate('Todo Info', { noteId: id });
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.BACKGROUND.PRIMARY }]}>
            <TodoList
                todos={sortedTodos}
                onItemPress={handleItemPress}
                onToggleStatus={handleToggleStatus}
                onDelete={(id) => dispatch(deleteTodo(id))}
            />
            <TouchableOpacity style={[styles.fab, { backgroundColor: colors.BUTTON.PRIMARY }]} onPress={() => setModalVisible(true)}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            <TodoModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleCreate}
                mode="create"
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    fabText: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
    },
});