import { COLORS } from '@/src/constants/colors';
import { ITodo } from '@/src/types/todoItem';
import { formatCreationDate, formatCreationTime, formatExecutionDateTime } from '@/src/utils/date';
import { getStatusColor, getStatusLabel } from '@/src/utils/statusHelpers';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TodoInfoProps {
    todo: ITodo;
}

export default function TodoInfo ({ todo }: TodoInfoProps){
    const creationDateObj = new Date(todo.creationDate);
    const formattedCreationDate = `${formatCreationDate(creationDateObj)} ${formatCreationTime(creationDateObj)}`;

    return (
        <View style={styles.card}>
            <Text style={styles.label}>Title</Text>
            <Text style={styles.value}>{todo.title}</Text>

            {todo.description && (
                <>
                    <Text style={styles.label}>Desctiption</Text>
                    <Text style={styles.value}>{todo.description}</Text>
                </>
            )}

            {todo.location && (
                <>
                    <Text style={styles.label}>Location</Text>
                    <Text style={styles.value}>{todo.location}</Text>
                </>
            )}

            <Text style={styles.label}>Date and time of execution</Text>
            <Text style={styles.value}>{formatExecutionDateTime(todo.executionDateTime)}</Text>

            <Text style={styles.label}>Creation date</Text>
            <Text style={styles.value}>{formattedCreationDate}</Text>

            <Text style={styles.label}>Status</Text>
            <Text style={[styles.value, { color: getStatusColor(todo.status) }]}>
                {getStatusLabel(todo.status)}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.BACKGROUND.TODO,
        margin: 16,
        padding: 20,
        borderRadius: 16,
        alignSelf: 'stretch',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.TEXT.PRIMARY,
        marginTop: 16,
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: '#373636ff',
        marginBottom: 8,
        flexWrap: 'wrap',   
        flexShrink: 1,     
    },
});