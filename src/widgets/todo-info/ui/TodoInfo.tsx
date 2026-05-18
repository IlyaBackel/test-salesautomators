import { useTheme } from '@/src/app/providers/ThemeProvider';
import { getStatusColor, getStatusLabel } from '@/src/entities/todo/lib/statusHelpers';
import { ITodo } from '@/src/entities/todo/model/ITodo';
import { formatCreationDate, formatCreationTime, formatExecutionDateTime } from '@/src/shared/lib/date';
import React, { useState } from 'react';
import { Alert, Image, Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TodoInfoProps {
    todo: ITodo;
}

export default function TodoInfo({ todo }: TodoInfoProps) {
    const { colors } = useTheme();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const creationDateObj = new Date(todo.creationDate);
    const formattedCreationDate = `${formatCreationDate(creationDateObj)} ${formatCreationTime(creationDateObj)}`;
    const attachments = todo.attachments || [];

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
                console.error(error);
                Alert.alert('Error', 'Failed to open file');
            }
        }
    };

    return (
        <View style={[styles.card, { backgroundColor: colors.BACKGROUND.CARD }]}>
            {attachments.length > 0 && (
                <>
                    <Text style={[styles.label, { color: colors.TEXT.PRIMARY }]}>Attachments</Text>
                    <View style={styles.attachmentList}>
                        {attachments.map((att) => (
                            <TouchableOpacity key={att.id} onPress={() => openAttachment(att.uri, att.mimeType)}>
                                {att.mimeType.startsWith('image/') ? (
                                    <Image source={{ uri: att.uri }} style={styles.thumbnail} />
                                ) : (
                                    <Text style={[styles.attachment, { color: colors.TEXT.SECONDARY }]}>
                                        {att.name} ({att.size ? `${Math.round(att.size / 1024)} KB` : 'file'})
                                    </Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}

            <Text style={[styles.label, { color: colors.TEXT.PRIMARY }]}>Title</Text>
            <Text style={[styles.value, { color: colors.TEXT.SECONDARY }]}>{todo.title}</Text>

            {todo.description && (
                <>
                    <Text style={[styles.label, { color: colors.TEXT.PRIMARY }]}>Description</Text>
                    <Text style={[styles.value, { color: colors.TEXT.SECONDARY }]}>{todo.description}</Text>
                </>
            )}

            {todo.manualLocation && (
                <>
                    <Text style={[styles.label, { color: colors.TEXT.PRIMARY }]}>Manual location</Text>
                    <Text style={[styles.value, { color: colors.TEXT.SECONDARY }]}>{todo.manualLocation}</Text>
                </>
            )}

            {todo.mapLocation && (
                <>
                    <Text style={[styles.label, { color: colors.TEXT.PRIMARY }]}>Location from map</Text>
                    <Text style={[styles.value, { color: colors.TEXT.SECONDARY }]}>{todo.mapLocation}</Text>
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

            {/* Модальное окно для просмотра изображения */}
            <Modal visible={!!selectedImage} transparent={false} onRequestClose={() => setSelectedImage(null)}>
                <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={() => setSelectedImage(null)}>
                    <Image source={{ uri: selectedImage! }} style={styles.fullImage} resizeMode="contain" />
                </TouchableOpacity>
            </Modal>
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
    attachmentList: {
        marginTop: 4,
        marginBottom: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    attachment: {
        fontSize: 14,
        textDecorationLine: 'underline',
        marginBottom: 4,
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 4,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: '100%',
        height: '100%',
    },
});