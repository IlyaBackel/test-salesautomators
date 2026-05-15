import { useTheme } from '@/src/app/providers/ThemeProvider';
import { TODO_STATUS } from '@/src/entities/todo/model/todo-constants';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native';

interface StatusSelectorProps {
    status: TODO_STATUS;
    onStatusChange: (status: TODO_STATUS) => void;
}

export default function StatusSelector({ status, onStatusChange }: StatusSelectorProps) {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { borderColor: colors.BORDER, backgroundColor: colors.BACKGROUND.CARD }]}>
            <Picker
                selectedValue={status}
                onValueChange={(itemValue) => onStatusChange(itemValue)}
                dropdownIconColor={colors.TEXT.PRIMARY}
                style={{ color: colors.TEXT.PRIMARY }}
            >
                <Picker.Item label="Active" value={TODO_STATUS.ACTIVE} />
                <Picker.Item label="Completed" value={TODO_STATUS.COMPLETED} />
                <Picker.Item label="Cancelled" value={TODO_STATUS.CANCELLED} />
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 8,
        overflow: 'hidden',
    },
});