import { COLORS } from '../constants/colors';
import { TODO_STATUS } from '../constants/todo-constants';
import { ITodo } from '../types/todoItem';

//получение цвета и текста для статуса и фона карточки
export const getStatusLabel = (status: TODO_STATUS): string => {
  switch (status) {
    case TODO_STATUS.ACTIVE: return 'Active';
    case TODO_STATUS.COMPLETED: return 'Completed';
    case TODO_STATUS.CANCELLED: return 'Cancelled';
    default: return 'Active';
  }
};

export const getStatusColor = (status: TODO_STATUS): string => {
  switch (status) {
    case TODO_STATUS.ACTIVE: return COLORS.BUTTON.ACTIVE;
    case TODO_STATUS.COMPLETED: return COLORS.BUTTON.COMPLETED;
    case TODO_STATUS.CANCELLED: return COLORS.BUTTON.DELETE;
    default: return COLORS.BUTTON.DEFAULT;
  }
};

export const getCardBackgroundColor = (status: ITodo['status']): string => {
    switch (status) {
        case 'active':
            return COLORS.BACKGROUND.TODO_ACTIVE;
        case 'completed':
            return COLORS.BACKGROUND.TODO_COMPLETED;
        default:
            return COLORS.BACKGROUND.TODO_DEFAULT;
    }
};