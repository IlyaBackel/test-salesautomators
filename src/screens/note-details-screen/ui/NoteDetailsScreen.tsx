import { useTheme } from '@/src/app/providers/ThemeProvider';
import { deleteTodo, editTodo } from '@/src/entities/todo/model/todoSlice';
import { TodoModal } from '@/src/features';
import { TodoInfo } from '@/src/widgets';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export default function NoteDetailsScreen() {
    const { colors } = useTheme();
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const { noteId } = route.params as { noteId: string };
    const todo = useAppSelector(state => state.todos.items.find(t => t.id === noteId));
    const [modalVisible, setModalVisible] = useState(false);

    if (!todo) {
        return (
            <View style={[styles.container, { backgroundColor: colors.BACKGROUND.PRIMARY }]}>
                <Text style={{ color: colors.TEXT.PRIMARY }}>Task not found</Text>
            </View>
        );
    }

    const handleUpdate = (data: any) => {
  dispatch(editTodo({
    id: noteId,
    title: data.title,
    description: data.description,
    manualLocation: data.manualLocation,
    mapLocation: data.mapLocation,
    latitude: data.latitude,
    longitude: data.longitude,
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

    const dynamicStyles = {
        editButton: { backgroundColor: colors.BUTTON.PRIMARY },
        deleteButton: { backgroundColor: colors.BUTTON.DELETE },
        deleteButtonText: { color: colors.TEXT.PRIMARY },
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.BACKGROUND.PRIMARY }]}>
            <TodoInfo todo={todo} />
            <View style={styles.buttonsRow}>
                <TouchableOpacity style={[styles.editButton, dynamicStyles.editButton]} onPress={() => setModalVisible(true)}>
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.deleteButton, dynamicStyles.deleteButton]} onPress={handleDelete}>
                    <Text style={[styles.deleteButtonText, dynamicStyles.deleteButtonText]}>Delete</Text>
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
        padding: 12,
        borderRadius: 8,
        marginLeft: 8,
        alignItems: 'center',
    },
    deleteButtonText: {
        fontWeight: 'bold',
    },
});