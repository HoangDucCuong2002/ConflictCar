import { View, Text, StyleSheet, Alert, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../constants/theme';
import { wp, hp } from '../../helpers/common';
import Icon from '../../assets/icons';
import { useRouter } from 'expo-router';
import { Button as PaperButton } from 'react-native-paper';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import moment from 'moment';
import BottomSheetCalendar from '../BottomSheetCalendar';
import { getWorkingHourData, insertWorkingHourData, insertAppointment } from '../../services/userService';
import RoomSelectModal from '../../components/RoomSelectModal';

const BookingCalendar = () => { 

const {user, setAuth} = useAuth();
const [workingHours, setWorkingHours] = useState([]);
const [selectedDate, setSelectedDate] = useState(null);
const [days, setDays] = useState([]);
const [dates, setDates] = useState([]);
const router = useRouter();
const [selectedTimes, setSelectedTimes] = useState([]);
const [showBottomSheet, setShowBottomSheet] = useState(false);
const [showRoomSelectModal, setShowRoomSelectModal] = useState(false);
const [selectedRoom, setSelectedRoom] = useState(null);

const { nameService, timeService, priceService, idService } =useLocalSearchParams();

useEffect(() => {
  // console.log('nameService:', nameService);
  // console.log('timeService:', timeService);
  // console.log('priceService:', priceService);
  console.log('idService:', idService);
},[])



useEffect(() => {
  if (!selectedDate) {
    const initialDates = [...Array(4)].map((_, index) => {
      const currentDate = moment().add(index, 'days');
      return currentDate.format('DD-YYYY');
    });
    setDates(initialDates);
  }
}, [selectedDate]);


// useEffect (() => {
//   const getAppointmentData = async () => {
//     setLoading(true);
//     const { success, data, msg } = await getAppointmentData(userId, roomId, workingHourId, appointmentId);

//     if (success) {
//       setAppointmentData(data);
//     } else {
//       Alert.alert('Error', msg);
//     }

//     setLoading(false);
//   };

//   getAppointmentData();
// }, [userId, roomId, workingHourId, appointmentId]);
useEffect(() => {
  const fetchAppointmentData = async () => {

  }
  fetchAppointmentData();
},[])

useEffect(() => {
  const fetchWorkingHourData = async () => {
    const workingHourIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    try {
      const results = await Promise.all(
        workingHourIds.map((id) => getWorkingHourData(id))
      );

      const formattedWorkingHours = results.reduce((acc, result, index) => {
        if (result.success && result.data) {
          const { start_time, end_time } = result.data;
          const formattedData = {
            id: workingHourIds[index],
            start_time: moment(start_time, 'HH:mm:ss').format('HH:mm'),
            end_time: moment(end_time, 'HH:mm:ss').format('HH:mm'),
          };
          acc.push(formattedData);  
        } else {
          console.error(`Error fetching data for ID ${workingHourIds[index]}: ${result.msg || 'No data available'}`);
        }
        return acc;
      }, []);
      // console.log("workingHour:", formattedWorkingHours);
      setWorkingHours(formattedWorkingHours);

    } catch (error) {
      console.error('Error fetching working hour data:', error);
    }
  };

  fetchWorkingHourData();
}, []);

  const handlePickRoom = () => {
    setShowRoomSelectModal(true);
  };
  const handleRoomSelect = (room) => {
    setSelectedRoom(room);  
    setShowRoomSelectModal(false); 
  };
  
  const handleMailIconPress = () => {
    setShowBottomSheet(true);
  };

  const handleDateSelect = (selectedCalendarDate) => {
    const formattedSelectedDate = moment(selectedCalendarDate).format('DD-YYYY');
  
    setSelectedDate(formattedSelectedDate);
    setShowBottomSheet(false);
  
    const updatedDates = [...Array(4)].map((_, index) => {
      const currentDate = moment(formattedSelectedDate, 'DD-YYYY').add(index, 'days');
      return currentDate.format('DD-YYYY');
    });
    setDates(updatedDates);
  };
  const [showButtons, setShowButtons] = useState(false);
  
  const areTimesAdjacent = (time1, time2) => {
    const [start1, end1] = time1.split(' - ').map(time => moment(time, 'HH:mm'));
    const [start2, end2] = time2.split(' - ').map(time => moment(time, 'HH:mm'));
    return end1.isSame(start2) || end2.isSame(start1);
  };
  
  const handleTimePress = (time, id) => {
    if (selectedTimes.some(item => item.time === time)) {
      setSelectedTimes((prevTimes) => prevTimes.filter((item) => item !== time));
      return;
    }
      if (selectedTimes.length > 0) {
        const lastSelectedTime = selectedTimes[selectedTimes.length - 1].time;

      if (!areTimesAdjacent(lastSelectedTime, time)) {
        Alert.alert("Error", "Vui Lòng chọn thời gian liên kề");
        return;
      }
    }
    
    setSelectedTimes((prevTimes) => [...prevTimes, { time, id }]);
  };
  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedRoom || selectedTimes.length === 0) {
      Alert.alert('Lỗi', 'Vui lòng chọn đầy đủ thông tin');
      return;
    }
    const timeString = selectedTimes.join(', ');
    console.log('Selected Times:', selectedTimes);
    selectedTimes.forEach((item, index) => {
      console.log(`selectedTimes[${index}]:`, item.id);
    });
    Alert.alert(
      "Xác nhận đặt lịch",
      `Bạn có muốn đặt lịch vào ngày ${selectedDate} không?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Confirm",
          onPress: async () => {
            console.log(`Đặt lịch cho các khoảng thời gian vào ngày ${selectedDate}`);
            setSelectedTimes([]);
            // console.log('Selected Date:', selectedDate);
            // console.log('Selected Room:', selectedRoom.id);
            try {
              const appointmentData = selectedTimes.map((item) => ({

                  day: selectedDate,
                  roomId: selectedRoom.id,
                  workingHourId: item.id,
                  userId: user?.id,
                  servicedId: idService,
              }));
              
              for (let appointment of appointmentData) {
                  const { success, msg, data } = await insertAppointment(
                      appointment.userId,
                      appointment.roomId,
                      { day: appointment.day }, 
                      appointment.workingHourId,
                      appointment.servicedId
                  );
                  if (!success) {
                      console.error('Error creating appointment:', msg);
                      Alert.alert('Lỗi', 'Có lỗi xảy ra khi tạo lịch hẹn.');
                      return; 
                  }
              }
              Alert.alert('Thành công');
              setSelectedRoom(null);
              setSelectedDate(null);
          } catch (error) {
              console.error('Error booking appointment:', error);
              Alert.alert('Lỗi', 'Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại.');
          }

          }
        }
      ]
    );
  };
  return (
    <ScrollView style={styles.container}>
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
        <View>
          <PaperButton
              mode="contained"
              onPress={handlePickRoom}
              style={styles.room}
            >
              {selectedRoom ? `${selectedRoom.name}` : 'Pick Room now'}
            </PaperButton>
        </View>
        {showRoomSelectModal && (
          <RoomSelectModal 
            modalVisible={showRoomSelectModal}
            onClose={() => setShowRoomSelectModal(false)}
            onRoomSelect={handleRoomSelect} // Pass the handler to the modal
          />
        )}
        <View style={styles.row}>
          <Text style={styles.title}>Chọn Ngày Rửa Xe</Text>
          <View style={styles.icons}>
            <Pressable onPress={handleMailIconPress}>
              <Icon name="mail" size={hp(3)} strokeWidth={2} color={theme.colors.text} />
            </Pressable>
          </View>
        </View>
        <View style={styles.dateContainer}>
        {[...Array(4)].map((_, index) => {
          const currentDate = moment().add(index, 'days');
          const displayDate = currentDate.format('DD-YYYY');
          const saveDate = currentDate.format('DD-MM-YYYY');
          return (
            <Pressable
              key={index}
              style={[
                styles.dateButton,
                selectedDate === saveDate && styles.selectedDateButton,
              ]}
              onPress={() => {
                setSelectedDate(saveDate);
                setSelectedTimes([]);
                setShowButtons(true);
              }}
            >
              <Text
                style={[
                  styles.dateButtonText,
                  selectedDate === saveDate && styles.selectedDateButtonText,
                ]}
              >
                {displayDate}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {showBottomSheet && (
        <BottomSheetCalendar
          isVisible={showBottomSheet}
          onClose={() => setShowBottomSheet(false)} 
          onSelectDate={handleDateSelect}
        />
      )}

      {selectedDate && showButtons && (
        <>  
          <Text style={styles.title}>Khoảng Thời Gian</Text>
          <View style={styles.buttonContainer}>
            {workingHours.map((workingHour, index) => {
              const timeRange = `${workingHour.start_time} - ${workingHour.end_time}`;
              const id = workingHour.id
              return (
                <Pressable
                  key={index}
                  style={[
                    styles.button,
                    selectedTimes.some(item => item.time === timeRange) && styles.selectedButton,
                  ]}
                  onPress={() => handleTimePress(timeRange, id)}
                >
                  <Text style={styles.buttonText}>{timeRange}</Text>
                </Pressable>
              );
            })}
          </View>
          <View style={styles.buttonWrapper}>
            <PaperButton
              mode="contained"
              onPress={handleConfirmBooking}
              style={[styles.confirmButton, { backgroundColor: selectedTimes.length === 0 ? '#7C7C7C' : '#4CAF50' }]}
              disabled={selectedTimes.length === 0 || !selectedRoom || selectedRoom.length === 0}
            >
              Process
            </PaperButton>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default BookingCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(2.5),
    fontWeight: theme.fonts.bold,
    // marginTop: 10,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    alignItems: 'center',  
    marginTop: 10, 
  },
  room: {
    width: '80%',
    backgroundColor: '#7C7C7C'
  },
  confirmButton: {
    width: '40%', 
    borderWidth: 1, 
    borderColor: '#4CAF50'
  },
  buttonContainer: {
    marginTop: 4,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    marginBottom: 10,
  },
  button: {
    margin: 5,
    width: '45%',
    height: 55,
    // gap: 5,
    borderRadius : theme.radius.xs,
    
    justifyContent: 'center',
    backgroundColor: '#2196F3',
  },
  dateText: {
    marginTop: 10,
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  dateContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  dateButton: {
    height: 55,
    padding: 8,
    alignItems: 'center',
    backgroundColor: theme.colors.primary,    
    borderRadius : theme.radius.sm
  },
  selectedDateButton: {
    backgroundColor: theme.colors.rose,
  },
  dateButtonText: {
    alignItems: 'center',
    color: theme.colors.darkLight,
    fontSize: 16,
  },
  selectedDateButtonText: {
    color: theme.colors.darkLight,
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  }
});
