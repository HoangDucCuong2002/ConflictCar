import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { theme } from '../constants/theme'
import { wp, hp } from '../helpers/common';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { insertCar } from '../services/userService';
import { useRouter } from 'expo-router';

const newCar = () => {
    const { user: currentUser } = useAuth();  // Get current user from context
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [car, setCar] = useState({
        name: '',
        car_code: '',
        license_plate: '',
    });

    const onSubmit = async () => {
        let carData = { ...car };
        const { name, car_code, license_plate } = carData;

        if (!car_code || !name || !license_plate) {
            Alert.alert('Car Details', "Please fill all the fields");
            return;
        }

        setLoading(true);
        const res = await insertCar(currentUser?.id, carData);
        setLoading(false);

        if (res.success) {
            Alert.alert("Success", "Car added successfully!");
            await fetchMyCars();
            router.push('mycar');
        } else {
            Alert.alert("Error", res.msg || "Something went wrong!");
        }
    };

    return (
        <ScreenWrapper bg="white">
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    <Header title="Add New Car" />
                    {/* Form for entering car details */}
                    <View style={styles.form}>
                        <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
                            Please fill the car details
                        </Text>
                        <Input
                            placeholder='Enter car name'
                            value={car.name}
                            onChangeText={(value) => setCar({ ...car, name: value })}
                        />
                        <Input
                            placeholder='Enter car code'
                            value={car.car_code}
                            onChangeText={(value) => setCar({ ...car, car_code: value })}
                        />
                        <Input
                            placeholder='Enter license plate'
                            value={car.license_plate}
                            onChangeText={(value) => setCar({ ...car, license_plate: value })}
                        />
                        <Button title="Add Car" loading={loading} onPress={onSubmit} />
                    </View>
                </ScrollView>
            </View>
        </ScreenWrapper>
    );
};

export default newCar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(4),
    },
    form: {
        gap: 18,
        marginTop: 20,
    },
});
