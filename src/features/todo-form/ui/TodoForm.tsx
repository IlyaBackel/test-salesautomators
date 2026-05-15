import { useTheme } from '@/src/app/providers/ThemeProvider';
import { ITodo } from '@/src/entities/todo/model/ITodo';
import { useTodoForm } from '@/src/hooks/useTodoForm';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Input from '../../../shared/ui/Input';
import ControlButtonsForm from './ControlButtonsForm';
import DateTimePickerButton from './DateTimePickerButton';
import StatusSelector from './StatusSelector';

interface TodoFormProps {
    mode: 'create' | 'edit';
    initialData?: ITodo;
    onSubmit: (data: any) => void;
    onClose: () => void;
}

export default function TodoForm({ mode, initialData, onSubmit, onClose }: TodoFormProps) {
    const { colors } = useTheme();
    const {
        title, setTitle,
        description, setDescription,
        location, setLocation,
        executionDate, executionTime,
        onDateChange, onTimeChange,
        status, setStatus,
        handleSubmit,
    } = useTodoForm({ initialData, mode, onSubmit, onClose });

    const titleText = mode === 'create' ? 'New Task' : 'Edit Task';

    return (
        <View>
            <Text style={[styles.title, { color: colors.TEXT.PRIMARY }]}>{titleText}</Text>
            <Input
                style={styles.input}
                placeholder="Title *"
                value={title}
                onChangeText={setTitle}
            />
            <Input
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <Input
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
                multiline
            />
            <DateTimePickerButton
                label="Completion date"
                value={executionDate}
                mode="date"
                onChange={onDateChange}
                minimumDate={new Date()}
            />
            <DateTimePickerButton
                label="Completion time"
                value={executionTime}
                mode="time"
                onChange={onTimeChange}
            />
            {mode === 'edit' && status && setStatus && (
                <StatusSelector status={status} onStatusChange={setStatus} />
            )}
            <ControlButtonsForm onClose={onClose} onSubmit={handleSubmit} mode={mode} />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
});