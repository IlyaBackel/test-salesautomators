import { useTheme } from '@/src/app/providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const isDark = theme === 'dark';
  const translateX = useRef(new Animated.Value(isDark ? 28 : 0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: isDark ? 26 : 0,
      useNativeDriver: true,
      speed: 12,
      bounciness: 10,
    }).start();
  }, [isDark, translateX]);

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={toggleTheme}>
      <View style={[styles.container, { backgroundColor: colors.BACKGROUND.CARD, borderColor: colors.BORDER }]}>
        <Animated.View
          style={[
            styles.knob,
            {
              transform: [{ translateX }],
              backgroundColor: colors.BUTTON.PRIMARY,
            },
          ]}
        >
          <Ionicons
            name={isDark ? 'moon' : 'sunny'}
            size={20}
            color={colors.TEXT.HEADER_TEXT}
          />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  knob: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});