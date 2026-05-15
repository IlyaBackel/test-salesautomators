import { useTheme } from '@/src/app/providers/ThemeProvider'; // <-- хук темы
import { ITodo } from '@/src/entities/todo/model/ITodo';
import React from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Modal from 'react-native-modal';
import TodoForm from '../../todo-form';

interface TodoModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  mode: 'create' | 'edit';
  initialData?: ITodo;
}

export default function TodoModal({ visible, onClose, onSubmit, mode, initialData }: TodoModalProps) {
  const { colors } = useTheme(); 

  const dynamicStyles = {
    modalContent: {
      backgroundColor: colors.BACKGROUND.MODAL, 
    },
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.bottomModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      avoidKeyboard={true}
      hideModalContentWhileAnimating={true}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.modalContent, dynamicStyles.modalContent]}>
          <TodoForm
            mode={mode}
            initialData={initialData}
            onSubmit={onSubmit}
            onClose={onClose}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
});