import { useTheme } from '@/src/app/providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NoteDetailsHeader() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { colors } = useTheme(); 

    return (
        <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.BACKGROUND.HEADER, borderColor: colors.BORDER }]}>
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color={colors.TEXT.PRIMARY} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.TEXT.PRIMARY }]} numberOfLines={1}>
                 Todo Info
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
    },
    rightPlaceholder: {
        width: 40,
    },
});