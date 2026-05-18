import { useTheme } from '@/src/app/providers/ThemeProvider';
import { HistoryScreen, HistoryScreenHeader } from '@/src/screens/history-screen';
import { MapScreenHeader } from '@/src/screens/map-screen';
import MapScreen from '@/src/screens/map-screen/ui/MapScreen';
import { NoteListHeader, NoteListScreen } from '@/src/screens/notes-list-screen';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import { NoteDetailsHeader, NoteDetailsScreen } from '../../screens/note-details-screen';
import { RootStackParamList, RootTabParamList } from "../../shared/types/types";

const TodoStack = createNativeStackNavigator<RootStackParamList>();

function TodoStackScreen() {
    const { colors } = useTheme();
    return (
        <TodoStack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: colors.BACKGROUND.HEADER },
                headerTintColor: colors.TEXT.HEADER_TEXT,
            }}
        >
            <TodoStack.Screen
                name="Todo List"
                component={NoteListScreen}
                options={{
                    header: (props) => <NoteListHeader />,
                }}
            />
            <TodoStack.Screen
                name="Todo Info"
                component={NoteDetailsScreen}
                options={{
                    header: (props) => <NoteDetailsHeader />,
                }}
            />
        </TodoStack.Navigator>
    );
}

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootNavigation() {
    const { colors } = useTheme();
    const navigation = useNavigation<any>();

    useEffect(() => {
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            const todoId = response.notification.request.content.data?.todoId;
            if (todoId) {
                navigation.navigate('Todo Info', { noteId: todoId });
            }
        });
        return () => subscription.remove();
    }, [navigation]);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.BUTTON.PRIMARY,
                tabBarInactiveTintColor: colors.TEXT.SECONDARY,
                tabBarStyle: {
                    backgroundColor: colors.BACKGROUND.CARD,
                    borderTopColor: colors.BORDER,
                },
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Tasks"
                component={TodoStackScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? 'list' : 'list-outline'} size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? 'map' : 'map-outline'} size={size} color={color} />
                    ),
                    headerShown: true,
                    header: (props) => <MapScreenHeader />,
                }}
            />
            <Tab.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? 'time' : 'time-outline'} size={size} color={color} />
                    ),
                    headerShown: true,
                    header: (props) => <HistoryScreenHeader />,
                }}
            />
        </Tab.Navigator>
    );
}