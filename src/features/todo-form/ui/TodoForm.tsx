import { useTheme } from '@/src/app/providers/ThemeProvider';
import { ITodo } from '@/src/entities/todo/model/ITodo';
import { useTodoForm } from '@/src/shared/lib/hooks/useTodoForm';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Input from '../../../shared/ui/Input';
import AttachmentsPicker from '../../attachment-picker';
import DateTimePickerButton from '../../date-time-picker-button';
import LocationInput, { useLocationHistory } from '../../location-input';
import ControlButtonsForm from './ControlButtonsForm';
import LocationPickerModal from './LocationPickerModal';
import StatusSelector from './StatusSelector';

interface TodoFormProps {
    mode: 'create' | 'edit';
    initialData?: ITodo;
    onSubmit: (data: any) => void;
    onClose: () => void;
}

export default function TodoForm({ mode, initialData, onSubmit, onClose }: TodoFormProps) {
    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const { colors } = useTheme();
    const {
        title, setTitle,
        description, setDescription,
        manualLocation, setManualLocation,
        mapLocation, setMapLocation,
        mapCoords, setMapCoords,
        executionDate, executionTime,
        onDateChange, onTimeChange,
        status, setStatus,
        handleSubmit,
        attachments, setAttachments,
    } = useTodoForm({ initialData, mode, onSubmit, onClose });
    const { addToHistory } = useLocationHistory();

    const titleText = mode === 'create' ? 'New Task' : 'Edit Task';

    const handleLocationSelect = (lat: number, lng: number, addr: string) => {
        setMapLocation(addr);
        setMapCoords({ lat, lng });
    };

    const handleFormSubmit = () => {
        if (manualLocation.trim()) {
            addToHistory(manualLocation.trim());
        }

        handleSubmit();
    };

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

            <LocationInput
                value={manualLocation}
                onChangeText={setManualLocation}
                placeholder="Manual location (type or select from list)"
            />

            <TouchableOpacity style={styles.locationButton} onPress={() => setLocationModalVisible(true)}>
                <Ionicons name="map-outline" size={20} />
                <Text>{mapLocation || 'Select location on map'}</Text>
            </TouchableOpacity>

            <LocationPickerModal
                visible={locationModalVisible}
                onClose={() => setLocationModalVisible(false)}
                onSelect={handleLocationSelect}
                initialLat={mapCoords.lat}
                initialLng={mapCoords.lng}
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
            <AttachmentsPicker
                attachments={attachments}
                onAdd={setAttachments}
                onRemove={(id) => setAttachments(attachments.filter(a => a.id !== id))}
            />
            {mode === 'edit' && status && setStatus && (
                <StatusSelector status={status} onStatusChange={setStatus} />
            )}
            <ControlButtonsForm onClose={onClose} onSubmit={handleFormSubmit} mode={mode} />
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
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 15,
        gap: 8,
    },
    locationButtonText: {
        fontSize: 16,
    },
});