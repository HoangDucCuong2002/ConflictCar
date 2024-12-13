import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const CarModal = ({ visible, onClose, cars, onSelectCar }) => {
    const [selectedCar, setSelectedCar] = useState(null);

    const handleSelectCar = (car) => {
        setSelectedCar(car);      
    };

    const handleSubmit = () => {
        if (selectedCar) {
            onSelectCar(selectedCar)
            onClose();
        } else {
            alert("Vui lòng chọn một chiếc xe");
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Mời chọn mã xe</Text>
                    {cars.map((car) => (
                        <TouchableOpacity
                            key={car.id}
                            style={[
                                styles.carButton,
                                selectedCar?.id === car.id && styles.selectedCarButton, // Thêm màu cho nút đã chọn
                            ]}
                            onPress={() => handleSelectCar(car)}  
                        >
                            <Text style={styles.carText}>{car.license_plate}</Text>
                        </TouchableOpacity>
                    ))}
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    carButton: {
        backgroundColor: '#007bff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    selectedCarButton: {
        backgroundColor: '#28a745', // Màu cho nút đã chọn
    },
    carText: {
        color: 'white',
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '80%',
        marginTop: 10,
        gap: 10,
    },
    closeButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 8,
        marginTop: 20,
    },
    submitButton: {
        backgroundColor: '#28a745', // Màu xanh lá cho nút Submit
        padding: 8,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CarModal;
