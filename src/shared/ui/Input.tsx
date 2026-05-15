import React from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle } from 'react-native';

interface InputProps extends Omit<TextInputProps, 'style'> {
    value: string;
    placeholder: string;
    onChangeText: (text: string) => void;
    style?: StyleProp<TextStyle>;
    multiline?: boolean;
}

export default function Input({ value, placeholder, onChangeText, style, multiline = false, ...restProps }: InputProps) {
    return (
        <TextInput
            style={[styles.input, multiline && styles.textArea, style]}
            placeholder={placeholder}
            placeholderTextColor="#5a5858ff"
            value={value}
            onChangeText={onChangeText}
            multiline={multiline}
            {...restProps}
        />
    );
}

const styles = StyleSheet.create({
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