import { COLORS } from '@/src/shared/theme/colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IControlButtonsForm {
    onClose: () => void;
    onSubmit: () => void;
    mode: 'create' | 'edit';
}

export default function ControlButtonsForm({ onClose, onSubmit, mode }: IControlButtonsForm) {
    return (
        <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
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
        borderColor: '#ccc',
        marginRight: 10,
      },
      submitButton: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: COLORS.BUTTON.PRIMARY,
      },
      submitText: {
        color: '#fff',
        fontWeight: 'bold',
      },
})
