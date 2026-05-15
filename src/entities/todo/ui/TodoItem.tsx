import { useTheme } from '@/src/app/providers/ThemeProvider';
import { ITodo } from '@/src/entities/todo/model/ITodo';
import { formatExecutionDateTime } from '@/src/shared/lib/date';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getCardBackgroundColor, getStatusColor, getStatusLabel } from '../lib/statusHelpers';

interface TodoItemProps {
    todo: ITodo;
    onPress: (id: string) => void;
    onToggleStatus: (id: string, currentStatus: ITodo['status']) => void;
    onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onPress, onToggleStatus, onDelete }: TodoItemProps) {
    const { colors } = useTheme();

    const cardBgColor = getCardBackgroundColor(todo.status, colors);
    const statusBgColor = getStatusColor(todo.status, colors);

    const dynamicStyles = {
        card: {
            backgroundColor: cardBgColor,
            borderColor: colors.BORDER,
        },
        title: {
            color: colors.TEXT.PRIMARY,
        },
        dateTime: {
            color: colors.TEXT.SECONDARY,
        },
        statusBadge: {
            backgroundColor: statusBgColor,
        },
        statusText: {
            color: colors.TEXT.TODO_TEXT,
        },
    };

    return (
        <TouchableOpacity style={[styles.card, dynamicStyles.card]} onPress={() => onPress(todo.id)}>
            <View style={styles.cardHeader}>
                <Text style={[styles.title, dynamicStyles.title]}>{todo.title}</Text>
                <Text style={[styles.dateTime, dynamicStyles.dateTime]}>{formatExecutionDateTime(todo.executionDateTime)}</Text>
            </View>
            <View style={styles.cardFooter}>
                <TouchableOpacity
                    onPress={() => onToggleStatus(todo.id, todo.status)}
                    style={[styles.statusBadge, dynamicStyles.statusBadge]}
                >
                    <Text style={[styles.statusText, dynamicStyles.statusText]}>{getStatusLabel(todo.status)}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(todo.id)} style={styles.deleteBtn}>
                    <Ionicons name="trash-outline" size={22} color={colors.BUTTON.DELETE} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
    },
    cardHeader: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginRight: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        width: '80%',
        marginBottom: 4,
        flexWrap: 'wrap',
    },
    dateTime: {
        fontSize: 14,
        flexWrap: 'wrap',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    deleteBtn: {
        padding: 4,
    },
});