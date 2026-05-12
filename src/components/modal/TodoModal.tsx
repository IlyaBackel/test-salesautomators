import { COLORS } from '@/src/constants/colors';
import { ITodo } from '@/src/types/todoItem';
import React from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Modal from 'react-native-modal';
import TodoForm from '../form/TodoForm';

interface TodoModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  mode: 'create' | 'edit';
  initialData?: ITodo; 
}

export default function TodoModal({ visible, onClose, onSubmit, mode, initialData }: TodoModalProps) {
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
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContent}>
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
    backgroundColor: COLORS.BACKGROUND.PRIMARY,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
});