import { useTheme } from '@/src/app/providers/ThemeProvider';
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
    const { colors } = useTheme();

    return (
        <TextInput
            style={[
                styles.input,
                multiline && styles.textArea,
                {
                    borderColor: colors.BORDER,
                    color: colors.TEXT.PRIMARY,
                },
                style,
            ]}
            placeholder={placeholder}
            placeholderTextColor={colors.TEXT.PLACEHOLDER}
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