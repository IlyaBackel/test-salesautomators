import { Attachment } from '@/src/shared/types/types';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export async function copyToPermanentStorage(uri: string, fileName: string): Promise<string> {
  return uri;
}

export async function pickImage(): Promise<Attachment | null> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission needed', 'Please allow access to your photos');
    return null;
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: false,
    quality: 0.8,
  });
  if (result.canceled || !result.assets[0]) return null;
  const asset = result.assets[0];
  const finalUri = await copyToPermanentStorage(asset.uri, asset.fileName || `image_${Date.now()}.jpg`);
  return {
    id: Date.now().toString(),
    uri: finalUri,
    name: asset.fileName || 'image.jpg',
    mimeType: asset.mimeType || 'image/jpeg',
    size: asset.fileSize,
  };
}

export async function pickDocument(): Promise<Attachment | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: '*/*',
    copyToCacheDirectory: true,
  });
  if (!result.assets || !result.assets[0]) return null;
  const doc = result.assets[0];
  let finalUri = doc.uri;
  if (doc.mimeType?.startsWith('image/')) {
    finalUri = await copyToPermanentStorage(doc.uri, doc.name);
  }
  return {
    id: Date.now().toString(),
    uri: finalUri,
    name: doc.name,
    mimeType: doc.mimeType || 'application/octet-stream',
    size: doc.size,
  };
}