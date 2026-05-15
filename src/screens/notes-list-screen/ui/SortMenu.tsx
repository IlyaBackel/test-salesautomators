import { useTheme } from '@/src/app/providers/ThemeProvider';
import { setSort } from '@/src/entities/sort/model/sortSlice';
import { ActiveSort } from '@/src/entities/todo/model/ITodo';
import { ACTIVE_SORT } from '@/src/entities/todo/model/todo-constants';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

const SORT_OPTIONS: { label: string; type: ActiveSort }[] = [
    { label: 'Status', type: ACTIVE_SORT.BY_STATUS },
    { label: 'Title', type: ACTIVE_SORT.BY_TITLE },
    { label: 'Date', type: ACTIVE_SORT.BY_DATE },
];

export default function SortMenu() {
    const dispatch = useAppDispatch();
    const activeSort = useAppSelector(s => s.sort.activeSort);
    const direction = useAppSelector(s => s.sort.directionOfSort);
    const [open, setOpen] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;
    const { colors } = useTheme(); 

    useEffect(() => {
        Animated.timing(animation, {
            toValue: open ? 1 : 0,
            duration: 250,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }, [open, animation]);

    const rotate = animation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '90deg'] });
    const menuStyle = {
        opacity: animation,
        transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }],
        pointerEvents: open ? ('auto' as const) : ('none' as const),
    };

    const handleSelect = useCallback((type: ActiveSort) => {
        const newDirection = activeSort === type ? (direction === 'decr' ? 'incr' : 'decr') : 'decr';
        dispatch(setSort({ activeSort: type, directionOfSort: newDirection }));
        setOpen(false);
    }, [activeSort, direction, dispatch]);

    const getArrow = (type: ActiveSort) => {
        if (type !== activeSort) return '';
        return direction === 'decr' ? ' ↓' : ' ↑';
    };

    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ rotate }] }}>
                <TouchableOpacity onPress={() => setOpen(v => !v)} style={[styles.iconButton, { backgroundColor: colors.BUTTON.PRIMARY }]}>
                    <Text style={[styles.iconText, { color: colors.TEXT.HEADER_TEXT }]}>{open ? '✕' : '☰'}</Text>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.menu, menuStyle, { backgroundColor: colors.BACKGROUND.CARD, borderColor: colors.BORDER }]}>
                {SORT_OPTIONS.map((opt) => (
                    <TouchableOpacity
                        key={opt.type}
                        style={[styles.option, { borderBottomColor: colors.BORDER }]}
                        onPress={() => handleSelect(opt.type)}
                    >
                        <Text style={[styles.optionText, { color: colors.TEXT.PRIMARY }]}>
                            {opt.label}{getArrow(opt.type)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    iconButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#494949',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    iconText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    menu: {
        position: 'absolute',
        top: 70,
        right: 0,
        borderRadius: 12,
        overflow: 'hidden',
        minWidth: 140,
        shadowColor: '#fdfdfd60',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8,
        zIndex: 10,
        gap: 2,
        borderWidth: 1,
    },
    option: {
        paddingVertical: 12,
        paddingHorizontal: 18,
        alignItems: 'center',
        borderBottomWidth: 0.5,
    },
    optionText: {
        fontSize: 17,
        fontWeight: '500',
    },
});