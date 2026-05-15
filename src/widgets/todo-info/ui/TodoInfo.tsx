import { useTheme } from '@/src/app/providers/ThemeProvider';
import { getStatusColor, getStatusLabel } from '@/src/entities/todo/lib/statusHelpers';
import { ITodo } from '@/src/entities/todo/model/ITodo';
import { formatCreationDate, formatCreationTime, formatExecutionDateTime } from '@/src/shared/lib/date';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TodoInfoProps {
    todo: ITodo;
}

export default function TodoInfo({ todo }: TodoInfoProps) {
    const { colors } = useTheme(); 
    const creationDateObj = new Date(todo.creationDate);
    const formattedCreationDate = `${formatCreationDate(creationDateObj)} ${formatCreationTime(creationDateObj)}`;

    return (
        <View style={[styles.card, { backgroundColor: colors.BACKGROUND.CARD }]}>
            <Text style={[styles.label, { color: colors.TEXT.PRIMARY }]}>Title</Text>
            <Text style={[styles.value, { color: colors.TEXT.SECONDARY }]}>{todo.title}</Text>

            {todo.description && (
                <>
                    <Text style={[styles.label, { color: colors.TEXT.PRIMARY }]}>Description</Text>
                    <Text style={[styles.value, { color: colors.TEXT.SECONDARY }]}>{todo.description}</Text>
                </>
            )}

            {todo.location && (
                <>
                    <Text style={[styles.label, { color: colors.TEXT.PRIMARY }]}>Location</Text>
                    <Text style={[styles.value, { color: colors.TEXT.SECONDARY }]}>{todo.location}</Text>
                </>
            )}

            <Text style={[styles.label, { color: colors.TEXT.PRIMARY }]}>Date and time of execution</Text>
            <Text style={[styles.value, { color: colors.TEXT.SECONDARY }]}>{formatExecutionDateTime(todo.executionDateTime)}</Text>

            <Text style={[styles.label, { color: colors.TEXT.PRIMARY }]}>Creation date</Text>
            <Text style={[styles.value, { color: colors.TEXT.SECONDARY }]}>{formattedCreationDate}</Text>

            <Text style={[styles.label, { color: colors.TEXT.PRIMARY }]}>Status</Text>
            <Text style={[styles.value, { color: getStatusColor(todo.status, colors) }]}>
                {getStatusLabel(todo.status)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 16,
        padding: 20,
        borderRadius: 16,
        alignSelf: 'stretch',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        marginBottom: 8,
        flexWrap: 'wrap',
        flexShrink: 1,
    },
});