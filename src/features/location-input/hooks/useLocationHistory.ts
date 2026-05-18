import { addLocation } from '@/src/entities/location/model/locationsHistorySlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export const useLocationHistory = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector(state => state.locationHistory.items);

  const addToHistory = (text: string) => {
    const trimmed = text.trim();
    if (trimmed) {
      dispatch(addLocation(trimmed));
    }
  };

  return { history, addToHistory };
};

