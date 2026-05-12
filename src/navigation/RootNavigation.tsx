import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NoteDetailsHeader, NoteDetailsScreen } from '../screens/note-details-screen';
import { NoteListHeader, NoteListScreen } from "../screens/notes-list-screen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Todo List"
                component={NoteListScreen}
                options={{
                    title: 'Todo List',
                    header: (props) => <NoteListHeader /> ,
                }}
            />
            <Stack.Screen
                name="Todo Info"
                component={NoteDetailsScreen}
                options={{
                    header: (props) => <NoteDetailsHeader title={'Todo Info'} /> ,
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    );
}