import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Image } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import { theme } from '../constants/theme';
import { wp, hp } from '../helpers/common';
import Icon from '../assets/icons';
import { supabase } from '../lib/supabase';
import { getCarData, updateCarData, deleteCarData } from '../services/userService';
import EditCarModal from '../components/EditCarModal';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';



const MyCar = () => {
    const { user, setAuth } = useAuth();
    const router = useRouter();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    
    useFocusEffect(
        React.useCallback(() => {
            fetchCars();
        }, [])
    );

    const car1 = [
        {
            image: require('../assets/images/welcome1.png'),
        },
        {
            image: require('../assets/images/welcome1.png'),
        },
        {
            image: require('../assets/images/welcome1.png'),
        },
    ];

    const fetchCars = async () => {
        try {
            const response = await getCarData(user.id);
            if (response.success) {
                setCars(response.data);
            } else {
                Alert.alert('Error', response.msg);
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleDeleteCar = async (carId) => {
        console.log(carId);
        Alert.alert('Confirm', 'Are you sure you want to delete this car?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', onPress: async () => {
                const response = await deleteCarData(carId);
                if (response.success) {
                    Alert.alert('Success', 'Car deleted successfully!');
                    setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
                } else {
                    Alert.alert('Error', response.msg);
                }
            }, style: 'destructive' },
        ]);
    };
    const handleEditCar = (car) => {
        setSelectedCar(car);
        setModalVisible(true);
    };

    const handleSaveCar = async (carId, updatedData) => {
        const response = await updateCarData(carId, updatedData);
        console.log(carId);
        if (response.success) {
            Alert.alert('Success', 'Car updated successfully!');
            setCars((prevCars) =>
                prevCars.map((car) => (car.id === carId ? { ...car, ...updatedData } : car))
            );
            setModalVisible(false);
        } else {
            Alert.alert('Error', response.msg);
        }
    };

    useEffect(() => {
        if (user && user.id) {
            fetchCars();
        }
    }, [user]);

    const handleRefresh = () => {
        fetchCars();
    };

    const onLogout = async () => {
        setAuth(null);
        const { error } = await supabase.auth.signOut();
        if (error) {
            Alert.alert('SignOut', 'Error signing out!');
        }
    };

    const handleLogout = async () => {
        Alert.alert('Confirm', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: () => onLogout(), style: 'destructive' },
        ]);
    };

    if (loading) {
        return (
            <ScreenWrapper>
                <Text>Loading...</Text>
            </ScreenWrapper>
        );
    }

    return (
        <ScrollView>
            <ScreenWrapper bg="white">
                <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: wp(4) }}>
                    <Header title="My Car" mb={30} />
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Icon name="logout" color={theme.colors.rose} />
                    </TouchableOpacity>
                    <Text style={styles.title}>MY LIST CAR</Text>
                    <View style={styles.container}>
                        {cars.length > 0 ? (
                            cars.map((car, index) => (
                                <View key={car.id} style={styles.carContainer}>
                                    <Text style={styles.carTitle}>Car {index + 1}</Text>
                                    <Card style={styles.card}>
                                        <Card.Content>
                                            <View style={styles.cardContent}>
                                                <View style={styles.textContainer}>
                                                    <Text style={styles.subtitle}>Car Name: {car.name}</Text>
                                                    <Text style={styles.subtitle}>Car Code: {car.car_code}</Text>
                                                    <Text style={styles.subtitle}>License Plate: {car.license_plate}</Text>
                                                </View>
                                                <Image source={car1[index]?.image} style={styles.carImage} />
                                            </View>
                                        </Card.Content>
                                        <Card.Actions style={styles.actionsContainer}>
                                            <Button
                                                onPress={() => handleEditCar(car)}
                                                style={[styles.button, styles.editButton]}
                                                labelStyle={styles.buttonText}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                onPress={() => handleDeleteCar(car.id)}
                                                style={[styles.button, styles.deleteButton]}
                                                labelStyle={styles.buttonText}
                                            >
                                                Delete
                                            </Button>
                                        </Card.Actions>
                                    </Card>
                                </View>
                            ))
                        ) : (
                            <Text>No cars found.</Text>
                        )}
                    </View>
                    <EditCarModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        car={selectedCar}
                        onSave={handleSaveCar}
                    />
                    <Button loading={loading}
                        onPress={() => router.push('newcar')}
                        style={[styles.button1, styles.editButton]}
                        labelStyle={styles.buttonText}
                        >Add New Car
                    </Button>
                </View>
            </ScreenWrapper>
        </ScrollView>
    );
};

export default MyCar;

const styles = StyleSheet.create({
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    logoutButton: {
        position: 'absolute',
        right: 0,
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: '#fee2e2',
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(3.2),
        fontWeight: theme.fonts.bold,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
    },
    button: {
        width: '30%',
    },
    button1: {
        backgroundColor: theme.colors.primary,
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderCurve: 'continuous',
        borderRadius : theme.radius.sm
    },
    editButton: {
        backgroundColor: 'blue',
    },
    deleteButton: {
        backgroundColor: 'red',
    },
    container: {
        padding: 20,
    },
    card: {
        marginBottom: 20,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        paddingRight: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        color: 'gray',
    },
    carContainer: {
        marginBottom: 1,
    },
    carTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    carImage: {
        width: wp(20),
        height: hp(10),
        borderRadius: theme.radius.sm,
        marginLeft: wp(4),
    },
});
