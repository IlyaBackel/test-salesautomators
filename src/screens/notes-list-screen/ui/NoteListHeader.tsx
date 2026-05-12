import { COLORS } from '@/src/constants/colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SortMenu from './SortMenu';

export default function NoteListHeader() {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.leftPlaceholder} />
            <Text style={styles.title}>Todo List</Text>
            <View style={styles.rightMenu}>
                <SortMenu />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',   
        minHeight: 80,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: COLORS.BACKGROUND.HEADER,
    },
    leftPlaceholder: {
        width: 40,   
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        flex: 1,
        color: COLORS.TEXT.PRIMARY,
    },
    rightMenu: {
        width: 40,
        alignItems: 'flex-end',
    },
});