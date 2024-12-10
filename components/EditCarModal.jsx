    import React, { useState, useEffect } from 'react';
    import { Modal, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
    import { theme } from '../constants/theme';
    import { hp, wp } from '../helpers/common';

    const EditCarModal = ({ visible, onClose, car, onSave }) => {
        const [carName, setCarName] = useState(car?.name || '');
        const [carCode, setCarCode] = useState(car?.car_code || '');
        const [licensePlate, setLicensePlate] = useState(car?.license_plate || '');

        useEffect(() => {
            if (car) {
                setCarName(car.name);
                setCarCode(car.car_code);
                setLicensePlate(car.license_plate);
            }
        }, [car]);

        const handleSave = () => {
            if (!carName || !carCode || !licensePlate) {
                // Validate the input fields
                alert("All fields are required!");
                return;
            }
            const updatedData = {
                name: carName,
                car_code: carCode,
                license_plate: licensePlate,
            };
            onSave(car.id, updatedData);
        };

        return (
            <Modal visible={visible} transparent animationType="slide">
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>Edit Car</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Car Name"
                            value={carName}
                            onChangeText={setCarName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Car Code"
                            value={carCode}
                            onChangeText={setCarCode}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="License Plate"
                            value={licensePlate}
                            onChangeText={setLicensePlate}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    export default EditCarModal;

    const styles = StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContainer: {
            width: wp(80),
            padding: 20,
            backgroundColor: 'white',
            borderRadius: theme.radius.md,
            elevation: 5,
        },
        title: {
            fontSize: hp(2.5),
            fontWeight: theme.fonts.bold,
            marginBottom: 15,
            color: theme.colors.text,
        },
        input: {
            width: '100%',
            height: hp(5),
            borderWidth: 1,
            borderColor: theme.colors.gray,
            borderRadius: theme.radius.sm,
            paddingHorizontal: 10,
            marginBottom: 15,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        cancelButton: {
            backgroundColor: theme.colors.rose,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: theme.radius.sm,
        },
        saveButton: {
            backgroundColor: theme.colors.primary,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: theme.radius.sm,
        },
        buttonText: {
            color: 'white',
            fontWeight: theme.fonts.medium,
        },
    });
