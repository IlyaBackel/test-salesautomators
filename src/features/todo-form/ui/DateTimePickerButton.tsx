import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    label: string;
    value: Date;
    mode: 'date' | 'time';
    minimumDate?: Date;
    onChange: (event: any, date: Date) => void;
}

export default function DateTimePickerButton({ label, value, mode, onChange, minimumDate }: Props) {
    const [showPicker, setShowPicker] = useState(false);

    const handleChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') setShowPicker(false);
        if (selectedDate && selectedDate !== value) {
            onChange(event, selectedDate);
        }
    };

    const formattedValue = mode === 'date'
        ? value.toLocaleDateString()
        : value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (Platform.OS === 'ios') {
        return (
            <View style={styles.iosContainer}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.pickerWrapper}>
                    <DateTimePicker
                        value={value}
                        mode={mode}
                        onChange={handleChange}
                        minimumDate={mode === 'date' ? minimumDate : undefined}
                    />
                </View>
            </View>
        );
    }

    return (
        <>
            <TouchableOpacity style={styles.androidButton} onPress={() => setShowPicker(true)}>
                <Text>{label}: {formattedValue}</Text>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    value={value}
                    mode={mode}
                    onChange={handleChange}
                    minimumDate={mode === 'date' ? minimumDate : undefined}
                    display="spinner" 
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    iosContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 15,
        gap: 10,
    },
    label: {
        fontSize: 17,
        fontWeight: '600',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#7c7b7bff',
        borderRadius: 8,
        alignItems: 'center',
    },
    androidButton: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 15,
    },
});