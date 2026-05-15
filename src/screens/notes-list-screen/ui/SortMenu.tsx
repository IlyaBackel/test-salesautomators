import { setSort } from '@/src/entities/sort/model/sortSlice';
import { ActiveSort } from '@/src/entities/todo/model/ITodo';
import { ACTIVE_SORT } from '@/src/entities/todo/model/todo-constants';
import { COLORS } from '@/src/shared/theme/colors';
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
                <TouchableOpacity onPress={() => setOpen(v => !v)} style={styles.iconButton}>
                    <Text style={styles.iconText}>{open ? '✕' : '☰'}</Text>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.menu, menuStyle]}>
                {SORT_OPTIONS.map((opt, idx) => (
                    <TouchableOpacity
                        key={opt.type}
                        style={ styles.option}
                        onPress={() => handleSelect(opt.type)}
                    >
                        <Text style={styles.optionText}>
                            {opt.label}{getArrow(opt.type)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    iconButton: {
        width: 60,
        height: 60,
        borderRadius: "50%",
        backgroundColor: COLORS.BUTTON.PRIMARY,
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
        color: COLORS.TEXT.HEADER_TEXT,
        fontWeight: 'bold'
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
    },
    option: {
        paddingVertical: 12,
        paddingHorizontal: 18,
        backgroundColor: 'rgba(202, 202, 202, 0.9)',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'rgba(175, 175, 175, 0.9)',
    },
    optionText: {
        fontSize: 17,
        fontWeight: '500',
        color: COLORS.TEXT.PRIMARY,
    },
});