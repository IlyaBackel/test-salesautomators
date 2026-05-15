import { useTheme } from '@/src/app/providers/ThemeProvider';
import { ThemeSwitcher } from '@/src/features/theme-switcher/ui/ThemeSwitcher';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SortMenu from './SortMenu';

export default function NoteListHeader() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.BACKGROUND.HEADER, borderColor: colors.BORDER }]}>
            <View style={styles.leftMenu}>
                <ThemeSwitcher />
            </View>
            <Text style={[styles.title, { color: colors.TEXT.PRIMARY }]}>Todo List</Text>
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
    },
    leftMenu:{
        width: 60,
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        flex: 1,
    },
    rightMenu: {
        width: 60,
        alignItems: 'flex-end',
    },
});