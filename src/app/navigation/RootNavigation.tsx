import { useTheme } from '@/src/app/providers/ThemeProvider';
import { HistoryScreen, HistoryScreenHeader } from '@/src/screens/history-screen';
import { NoteListHeader, NoteListScreen } from '@/src/screens/notes-list-screen';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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