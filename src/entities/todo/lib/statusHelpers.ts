import { COLORS } from '../../../shared/theme/colors';
import { ITodo } from '../model/ITodo';
import { TODO_STATUS } from '../model/todo-constants';

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