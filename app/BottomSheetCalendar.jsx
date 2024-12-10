import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const BottomSheetCalendar = ({ isVisible, onClose, onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleConfirm = () => {
    // Nếu chọn ngày, gửi lại ngày được chọn cho parent và đóng Bottom Sheet
    if (selectedDate) {
      onSelectDate(selectedDate);
    }
    onClose(); // Đóng Bottom Sheet dù có chọn ngày hay không
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.bottomSheet}>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={selectedDate ? { [selectedDate]: { selected: true } } : {}}
          />
          <View style={styles.buttonsContainer}>
            {/* Nút đóng Bottom Sheet */}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.buttonText}>Đóng</Text>
            </TouchableOpacity>
            {/* Nút xác nhận (Nếu có chọn ngày thì sẽ gửi ngày được chọn, không thì chỉ đóng Bottom Sheet) */}
            <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
              <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  confirmButton: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default BottomSheetCalendar;
