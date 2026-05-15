import { COLORS } from '@/src/shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NoteDetailsHeader({ title }: { title?: string }) {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title} numberOfLines={1}>
                {title || 'Todo Info'}
            </Text>
            <View style={styles.rightPlaceholder} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: COLORS.BACKGROUND.HEADER,
    },
    backButton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        flex: 1,
        color: COLORS.TEXT.PRIMARY,
    },
    rightPlaceholder: {
        width: 40,
    },
});