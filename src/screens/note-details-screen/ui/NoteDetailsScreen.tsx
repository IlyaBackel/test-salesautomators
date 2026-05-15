import { deleteTodo, editTodo } from '@/src/entities/todo/model/todoSlice';
import { TodoModal } from '@/src/features';
import { COLORS } from '@/src/shared/theme/colors';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { TodoInfo } from '@/src/widgets';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NoteDetailsScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const { noteId } = route.params as { noteId: string };
    const todo = useAppSelector(state => state.todos.items.find(t => t.id === noteId));
    const [modalVisible, setModalVisible] = useState(false);

    if (!todo) {
        return (
            <View style={styles.container}>
                <Text>Task not found</Text>
            </View>
        );
    }

    const handleUpdate = (data: any) => {
        dispatch(editTodo({
            id: noteId,
            title: data.title,
            description: data.description,
            location: data.location,
            status: data.status,
            executionDateTime: data.executionDateTime,
        }));
    };

    const handleDelete = () => {
        Alert.alert('Delete task?', 'This action cannot be undone', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    dispatch(deleteTodo(noteId));
                    navigation.goBack();
                },
            },
        ]);
    };

    return (
        <ScrollView style={styles.container}>
            <TodoInfo todo={todo} />
            <View style={styles.buttonsRow}>
                <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>

            <TodoModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleUpdate}
                mode="edit"
                initialData={todo}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND.PRIMARY,
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 24,
    },
    editButton: {
        flex: 1,
        backgroundColor: COLORS.BUTTON.PRIMARY,
        padding: 12,
        borderRadius: 8,
        marginRight: 8,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    deleteButton: {
        flex: 1,
        backgroundColor: COLORS.BUTTON.DELETE,
        padding: 12,
        borderRadius: 8,
        marginLeft: 8,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: COLORS.TEXT.PRIMARY,
        fontWeight: 'bold',
    },
});