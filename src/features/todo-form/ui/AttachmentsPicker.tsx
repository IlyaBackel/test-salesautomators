import { useTheme } from '@/src/app/providers/ThemeProvider';
import { Attachment } from '@/src/shared/types/types';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    attachments: Attachment[];
    onAdd: (attachments: Attachment[]) => void;
    onRemove: (id: string) => void;
}

async function copyToPermanentStorage(uri: string, fileName: string): Promise<string> {
    return uri; 
}

export default function AttachmentsPicker({ attachments, onAdd, onRemove }: Props) {
    const { colors } = useTheme();

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please allow access to your photos');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            quality: 0.8,
        });
        if (!result.canceled && result.assets[0]) {
            const asset = result.assets[0];
            const finalUri = await copyToPermanentStorage(asset.uri, asset.fileName || `image_${Date.now()}.jpg`);
            const newAttachment: Attachment = {
                id: Date.now().toString(),
                uri: finalUri,
                name: asset.fileName || 'image.jpg',
                mimeType: asset.mimeType || 'image/jpeg',
                size: asset.fileSize,
            };
            onAdd([...attachments, newAttachment]);
        }
    };

    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: '*/*',
            copyToCacheDirectory: true, 
        });
        if (result.assets && result.assets[0]) {
            const doc = result.assets[0];
            let finalUri = doc.uri;
            if (doc.mimeType && doc.mimeType.startsWith('image/')) {
                finalUri = await copyToPermanentStorage(doc.uri, doc.name);
            }
            const newAttachment: Attachment = {
                id: Date.now().toString(),
                uri: finalUri,
                name: doc.name,
                mimeType: doc.mimeType || 'application/octet-stream',
                size: doc.size,
            };
            onAdd([...attachments, newAttachment]);
        }
    };

    const renderItem = ({ item }: { item: Attachment }) => (
        <View style={[styles.attachmentItem, { backgroundColor: colors.BACKGROUND.CARD, borderColor: colors.BORDER }]}>
            {item.mimeType.startsWith('image/') && (
                <Image source={{ uri: item.uri }} style={styles.thumbnail} />
            )}
            <Text style={[styles.fileName, { color: colors.TEXT.PRIMARY }]} numberOfLines={1}>
                {item.name}
            </Text>
            <TouchableOpacity onPress={() => onRemove(item.id)}>
                <Ionicons name="close-circle" size={24} color={colors.BUTTON.DELETE} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.BUTTON.PRIMARY }]} onPress={pickImage}>
                    <Ionicons name="image-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.BUTTON.PRIMARY }]} onPress={pickDocument}>
                    <Ionicons name="document-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Document</Text>
                </TouchableOpacity>
            </View>
            {attachments.length > 0 && (
                <FlatList
                    data={attachments}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 15 },
    buttonRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
    button: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, gap: 6 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    list: { gap: 8 },
    attachmentItem: { flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 8, borderWidth: 1, marginRight: 8, gap: 8 },
    thumbnail: { width: 40, height: 40, borderRadius: 4 },
    fileName: { maxWidth: 120, fontSize: 12 },
});