import { TODO_STATUS } from '@/src/entities/todo/model/todo-constants';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native';

interface StatusSelectorProps {
    status: TODO_STATUS;
    onStatusChange: (status: TODO_STATUS) => void;
    darkMode?: boolean; 
}

export default function StatusSelector({ status, onStatusChange, darkMode = false }: StatusSelectorProps) {
    const styles = getStyles(darkMode);

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={status}
                onValueChange={(itemValue) => onStatusChange(itemValue)}
            >
                <Picker.Item label="Active" value={TODO_STATUS.ACTIVE} />
                <Picker.Item label="Completed" value={TODO_STATUS.COMPLETED} />
                <Picker.Item label="Cancelled" value={TODO_STATUS.CANCELLED} />
            </Picker>
        </View>
    );
}

const getStyles = (darkMode: boolean) => StyleSheet.create({
    container: {
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 8,
        overflow: 'hidden',
    },
});