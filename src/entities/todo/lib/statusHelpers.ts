import { lightColors } from '@/src/shared/theme/colors';
import { TODO_STATUS } from '../model/todo-constants';

export const getStatusLabel = (status: TODO_STATUS): string => {
  switch (status) {
    case TODO_STATUS.ACTIVE: return 'Active';
    case TODO_STATUS.COMPLETED: return 'Completed';
    case TODO_STATUS.CANCELLED: return 'Cancelled';
    default: return 'Active';
  }
};

export const getStatusColor = (status: TODO_STATUS, colors: typeof lightColors): string => {
  switch (status) {
    case TODO_STATUS.ACTIVE: return colors.STATUS.ACTIVE;
    case TODO_STATUS.COMPLETED: return colors.STATUS.COMPLETED;
    case TODO_STATUS.CANCELLED: return colors.STATUS.CANCELLED;
    default: return colors.BUTTON.DEFAULT;
  }
};

export const getCardBackgroundColor = (status: TODO_STATUS, colors: typeof lightColors): string => {
  switch (status) {
    case TODO_STATUS.ACTIVE: return colors.BACKGROUND.TODO_ACTIVE;
    case TODO_STATUS.COMPLETED: return colors.BACKGROUND.TODO_COMPLETED;
    default: return colors.BACKGROUND.TODO_DEFAULT;
  }
};