import {FlatList, Alert, Button, StyleSheet, Text, View,Pressable, ScrollView,ImageBackground } from 'react-native'
import React, { useEffect, useState} from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useAuth } from '../../contexts/AuthContext'
import CarModal from '../../components/CarModal';
import { theme } from '../../constants/theme';
import { wp, hp } from '../../helpers/common';
import Icon from '../../assets/icons';
import { useRouter } from 'expo-router';
import Avatar from '../../components/Avatar';
// import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { getCarData, getServiceData } from '../../services/userService'
import Slider from '../../components/Slider';
import moment from 'moment';
import 'moment-duration-format';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const {user, setAuth} = useAuth();
  const [cars, setCars] = useState([]); 
  // const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [services, setServices] = useState([]);
  const onSelectCar = (car) => {
    console.log("Car selected:", car.license_plate, car.id);
  };
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
      }
  };

  useEffect(() => {
      if (user && user.id) {
          fetchCars();
      }
  }, [user]);
  useEffect(() => {
      const fetchServiceData = async () => {
        const servicesId = [1, 2, 3];

        try {
          const results = await Promise.all(
            servicesId.map(async (id) => {
              const response = await getServiceData(id);
              return { ...response.data, id };
            })
          );
          const combinedData = results.map((item, index) => ({
            ...item,
            image: services1[index]?.image,
            time: moment.duration(parseInt(item.duration_minute), 'minutes').format('mm:ss'),
          }));
          setServices(combinedData);
        } catch (error) {
          console.error('Error fetching service data:', error);
        }
      };

      fetchServiceData();

    }, []);
  
    

  
  const services1 = [
    {
      image: require('../../assets/images/welcome1.png'),
    },
    {
      image: require('../../assets/images/welcome1.png'),
    },
    {
      image: require('../../assets/images/welcome1.png'),
    },
  ];
  const saveService = async (service) => {
    try {
      // setModalVisible(true);
      // if (!car) {
      //   throw new Error('Car data is not available');
      // }
      
      // const carLicensePlate = car.license_plate;
      // const carId = car.id;
    
      setModalVisible(true);
      const serviceData = {
        nameService: service.name,
        timeService: service.time,
        priceService: service.price,
        idService: service.id,
        // carLicensePlate: carLicensePlate,
        // carId: carId,
      };
      // console.log('Data', serviceData)
      router.push({
        pathname: '/calendar',
        params: serviceData, 
      });
    } catch (error) {
      console.error('Error saving service:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi lưu dịch vụ!');
    }
  };
    const renderServiceItem = ({ item }) => (
      
      <ImageBackground source={item.image} style={styles.serviceBackground} imageStyle={{ opacity: 0.5 }}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceTime}>{item.time}</Text>
        <Text style={styles.servicePrice}>{item.price}</Text>
        <Pressable
          style={styles.bookButton}
          onPress={() => {
            const service = {
              name: item.name,
              time: item.time,
              price: item.price,
              id: item.id,
            };
            saveService(service);
          }}
        >
          <Text style={styles.bookButtonText}>Đặt ngay</Text>
        </Pressable>
      </ImageBackground>
    );
  const router = useRouter();
  
  return (
    // <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome {user?.name || 'Guest'} </Text>
          <View style={styles.icons}>
            <Pressable onPress={() => router.push('notification')}>
              <Icon name="heart" size={hp(3)} strokeWidth={2} color={theme.colors.text} />
            </Pressable>
                <Pressable onPress={() => router.push('mycar')}>
                  <Icon name="plus" size={hp(3)} strokeWidth={2} color={theme.colors.text} />
                </Pressable>
                <Pressable onPress={() => router.push('profile')}>
                  <Avatar
                    uri={user?.image}
                    size={hp(3)}
                    rounded={theme.radius.sm}
                    style={{borderWidth:2}}
                  />
                </Pressable>
            </View>
        </View>
        {/* main */}
        <Slider />
        <View style={styles.flatListContainer}>
          <Text style={styles.title1}>Dịch Vụ Rửa Xe</Text>
          <FlatList
            data={services}
            renderItem={renderServiceItem}
            keyExtractor={(item) => item.id}
            horizontal
            contentContainerStyle={styles.listStyle}
            showsHorizontalScrollIndicator={false}
          />
          <Text style={styles.title1}>Chuong Trinh Khuyen Mai</Text>
          <FlatList
            data={services}
            renderItem={renderServiceItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            contentContainerStyle={styles.listStyle}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <CarModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          cars={cars}
          onSelectCar={onSelectCar}
        />
      </View>
      </ScrollView>
  )
}
export default Home;
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    // paddingBottom: 20,
    flex: 1,
  },
  servicePrice: {
    color: theme.colors.dark,
    fontSize: hp(1.8),
    marginTop: hp(0.5),
    fontWeight: '500',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  serviceBackground: {
    width: wp(40),
    height: hp(21),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    marginBottom: 0,
  },
  serviceName: {
    color: theme.colors.dark,
    fontSize: hp(2),
    fontWeight: 'bold',
    marginBottom: hp(1),
  },
  serviceTime: {
    color: theme.colors.primary,
    fontSize: hp(2),
  },
  bookButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderRadius: theme.radius.sm,
    marginTop: hp(1),
  },
  bookButtonText: {
    color: 'white',
    fontSize: hp(1.5),
    fontWeight: 'bold',
  },
  listStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: wp(2),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 0,
    marginHorizontal: wp(1),
    marginTop: 10
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(2.5),
    fontWeight: theme.fonts.bold,
    marginTop: 5,
  },
  title1: {
    color: theme.colors.text,
    fontSize: hp(2.5),
    fontWeight: theme.fonts.bold,
    marginTop: 5,
    marginLeft: 15
  },
  avararImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderCurve: 'continuous',
    borderColor: theme.colors.gray,
    borderWidth: 3,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItem: 'center',
    gap: 18
  },
  flatListContainer: {
    marginTop: hp(1),
    marginLeft: 5
  },
})