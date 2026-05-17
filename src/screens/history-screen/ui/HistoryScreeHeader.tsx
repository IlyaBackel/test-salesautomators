import { useTheme } from '@/src/app/providers/ThemeProvider';
import { ThemeSwitcher } from '@/src/features/theme-switcher/ui/ThemeSwitcher';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HistoryScreenHeader() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor: colors.BACKGROUND.HEADER,
          borderColor: colors.BORDER,
        },
      ]}
    >
      <View style={styles.leftMenu}>
        <ThemeSwitcher />
      </View>
      <Text style={[styles.title, { color: colors.TEXT.PRIMARY }]}>History</Text>
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
    minHeight: 80,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
  },
  leftMenu: {
    width: 60,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    flex: 1,
  },
  rightPlaceholder: {
    width: 60,
  },
});