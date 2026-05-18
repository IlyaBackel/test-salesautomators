import { useTheme } from '@/src/app/providers/ThemeProvider';
import { getStatusColor, getStatusLabel } from '@/src/entities/todo/lib/statusHelpers';
import { ITodo } from '@/src/entities/todo/model/ITodo';
import { formatCreationDate, formatCreationTime, formatExecutionDateTime } from '@/src/shared/lib/date';
import React, { useState } from 'react';
import { Alert, Linking, StyleSheet, View } from 'react-native';
import { AttachmentList } from './AttachmentList';
import { ImageModal } from './ImageModal';
import { InfoField } from './InfoField';

interface TodoInfoProps {
    todo: ITodo;
}

export default function TodoInfo({ todo }: TodoInfoProps) {
    const { colors } = useTheme();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const creationDateObj = new Date(todo.creationDate);
    const formattedCreationDate = `${formatCreationDate(creationDateObj)} ${formatCreationTime(creationDateObj)}`;

    const openAttachment = async (uri: string, mimeType: string) => {
        if (mimeType.startsWith('image/')) {
            setSelectedImage(uri);
        } else {
            try {
                const canOpen = await Linking.canOpenURL(uri);
                if (canOpen) {
                    await Linking.openURL(uri);
                } else {
                    Alert.alert('Cannot open this file');
                }
            } catch (error) {
                console.log(error);
                Alert.alert('Error', 'Failed to open file');
            }
        }
    };

    return (
        <View style={[styles.card, { backgroundColor: colors.BACKGROUND.CARD }]}>
            <AttachmentList attachments={todo.attachments || []} onPress={openAttachment} />
            <InfoField label="Title" value={todo.title} />
            <InfoField label="Description" value={todo.description} />
            <InfoField label="Manual location" value={todo.manualLocation} />
            <InfoField label="Location from map" value={todo.mapLocation} />
            <InfoField label="Date and time of execution" value={formatExecutionDateTime(todo.executionDateTime)} />
            <InfoField label="Creation date" value={formattedCreationDate} />
            <InfoField label="Status" value={getStatusLabel(todo.status)} customStyle={{ color: getStatusColor(todo.status, colors) }} />
            <ImageModal visible={!!selectedImage} uri={selectedImage} onClose={() => setSelectedImage(null)} />
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
});