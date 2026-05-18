import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { todoCreateSchema, todoEditSchema } from '../../../entities/todo/lib/todoValidation';
import { ITodo } from '../../../entities/todo/model/ITodo';
import { TODO_STATUS } from '../../../entities/todo/model/todo-constants';
import { Attachment } from '../../types/types';

interface UseTodoFormProps {
  initialData?: Partial<ITodo>;
  mode: 'create' | 'edit';
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export function useTodoForm({ initialData, mode, onSubmit, onClose }: UseTodoFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [manualLocation, setManualLocation] = useState(initialData?.manualLocation || '');
  const [mapLocation, setMapLocation] = useState(initialData?.mapLocation || '');
  const [mapCoords, setMapCoords] = useState({
    lat: initialData?.latitude,
    lng: initialData?.longitude,
  });
  const [executionDate, setExecutionDate] = useState(
    initialData?.executionDateTime ? new Date(initialData.executionDateTime) : new Date()
  );
  const [executionTime, setExecutionTime] = useState(
    initialData?.executionDateTime ? new Date(initialData.executionDateTime) : new Date()
  );
  const [status, setStatus] = useState<TODO_STATUS>(
    (initialData?.status as TODO_STATUS) || TODO_STATUS.ACTIVE
  );
  const [attachments, setAttachments] = useState<Attachment[]>(initialData?.attachments || []);

  const onDateChange = useCallback((event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setExecutionDate(selectedDate);
      const now = new Date();
      const isToday = selectedDate.toDateString() === now.toDateString();
      if (isToday && executionTime < now) {
        setExecutionTime(now);
      }
    }
  }, [executionTime]);

  const onTimeChange = useCallback((event: any, selectedTime?: Date) => {
    if (selectedTime) {
      const now = new Date();
      const selectedDateTime = new Date(
        executionDate.getFullYear(),
        executionDate.getMonth(),
        executionDate.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes(),
      );
      if (selectedDateTime < now) {
        Alert.alert('Error', 'Cannot select time in the past');
        return;
      }
      setExecutionTime(selectedTime);
    }
  }, [executionDate]);

  const handleSubmit = useCallback(() => {
    const executionDateTime = new Date(
      executionDate.getFullYear(),
      executionDate.getMonth(),
      executionDate.getDate(),
      executionTime.getHours(),
      executionTime.getMinutes()
    ).getTime();

    const baseData = {
      title: title.trim(),
      description: description.trim() || undefined,
      manualLocation: manualLocation.trim() || undefined,
      mapLocation: mapLocation.trim() || undefined,
      executionDateTime,
      attachments: attachments.length ? attachments : undefined,
      ...(mapCoords.lat && mapCoords.lng ? { latitude: mapCoords.lat, longitude: mapCoords.lng } : {}),
    };
    const schema = mode === 'create' ? todoCreateSchema : todoEditSchema;
    const dataToValidate = mode === 'edit' ? { ...baseData, status } : baseData;

    const result = schema.safeParse(dataToValidate);
    if (!result.success) {
      const firstError = result.error.issues[0];
      Alert.alert('Validation Error', firstError.message);
      return;
    }

    onSubmit(result.data);
    onClose();
    console.log(result.data, 'result.data');
  }, [title, description, manualLocation, mapLocation, mapCoords, executionDate, executionTime, status, mode, attachments, onSubmit, onClose]);

  return {
    title, setTitle,
    description, setDescription,
    manualLocation, setManualLocation,
    mapLocation, setMapLocation,
    mapCoords, setMapCoords,
    executionDate, executionTime,
    onDateChange, onTimeChange,
    status: mode === 'edit' ? status : undefined,
    setStatus: mode === 'edit' ? setStatus : undefined,
    handleSubmit,
    attachments, setAttachments
  };
}