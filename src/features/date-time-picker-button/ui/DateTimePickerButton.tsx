import { Platform } from 'react-native';
import AndroidPicker from './AndroidPicker';
import IOSPicker from './IOSPicker';

interface DateTimePickerButtonProps {
  label: string;
  value: Date;
  mode: 'date' | 'time';
  minimumDate?: Date;
  onChange: (event: any, date: Date) => void;
}

export default function DateTimePickerButton(props: DateTimePickerButtonProps) {
  if (Platform.OS === 'ios') {
    return <IOSPicker {...props} />;
  }
  return <AndroidPicker {...props} />;
}