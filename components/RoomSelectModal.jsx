import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { getRoomData} from '../services/userService';

const RoomSelectModal = ({ modalVisible, onClose, onRoomSelect }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase.from('room').select('*');
      if (error) {
        throw new Error(error.message);
      }

      // Dùng getRoomData để lấy chi tiết từng phòng
      const roomDetails = [];
      for (const room of data) {
        const result = await getRoomData(room.id);
        if (result.success) {
          roomDetails.push(result.data);
        }
      }

      setRooms(roomDetails);
    } catch (err) {
      console.error('Error fetching room data:', err.message);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      fetchRooms(); // Tải dữ liệu phòng khi modal mở
    }
  }, [modalVisible]);

  const handleRoomSelection = (room) => {
    setSelectedRoom(room); // Lưu phòng được chọn
  };

  const handleConfirmSelection = () => {
    if (selectedRoom) {
      onRoomSelect(selectedRoom); 
      onClose(); // Đóng modal
    } else {
      Alert.alert('No Room Selected', 'Please choose a room before confirming.');
    }
  };

  const getButtonStyle = (room) => {
    return room === selectedRoom ? styles.selectedRoomButton : styles.roomButton;
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Chọn Gara Rửa Xe</Text>
          <View style={styles.roomButtonsContainer}>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <TouchableOpacity
                  key={room.id}
                  style={getButtonStyle(room)}
                  onPress={() => handleRoomSelection(room)}
                >
                  <Text style={styles.buttonText}>{room.name}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text>Đang tải danh sách phòng...</Text>
            )}
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmSelection}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  roomButtonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  roomButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  selectedRoomButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RoomSelectModal;