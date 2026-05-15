import { useTheme } from '@/src/app/providers/ThemeProvider';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IControlButtonsForm {
    onClose: () => void;
    onSubmit: () => void;
    mode: 'create' | 'edit';
}

export default function ControlButtonsForm({ onClose, onSubmit, mode }: IControlButtonsForm) {
    const { colors } = useTheme();

    return (
        <View style={styles.buttonsRow}>
            <TouchableOpacity
                style={[styles.cancelButton, { borderColor: colors.BORDER }]}
                onPress={onClose}
            >
                <Text style={{ color: colors.TEXT.PRIMARY }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: colors.BUTTON.PRIMARY }]}
                onPress={onSubmit}
            >
                <Text style={styles.submitText}>{mode === 'create' ? 'Create' : 'Save'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelButton: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        marginRight: 10,
    },
    submitButton: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        borderRadius: 8,
    },
    submitText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});