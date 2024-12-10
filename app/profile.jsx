import { StyleSheet, Text, TouchableOpacity, View ,Alert, Pressable} from 'react-native'
import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'expo-router';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header'
import { theme } from '../constants/theme';
import { wp, hp } from '../helpers/common';
import Icon from '../assets/icons';
import { supabase } from '../lib/supabase';
import Avatar from '../components/Avatar'
// import Input from '../components/Input';
import Button from '../components/Button';


// import { TouchableOpacity } from 'react-native-gesture-handler';
const Profile = () => {
    const {user, setAuth } = useAuth();
    // console.log(user.name)
    // const [loading, setLoading] = useState(false);
    const router = useRouter();
    const onLogout = async () => {
        setAuth(null);
        const {error} = await supabase.auth.signOut();
        if (error) {
          Alert.alert('SignOut', "Error signing out !")
        }
      }
    const handleLogout = async () => {
        Alert.alert('Confirm', "Are tou sure you want to log out?", [
            {
                text: 'Cancel',
                onPress: () => console.log('modal cancelled'),
                style: 'cancel'
            },
            {
                text: 'Logout',
                onPress: () => onLogout(),
                style: 'destructive'
            }
        ])
    }
  return (
    <ScreenWrapper bg="white">
        <UserHeader user={user} router={router} handleLogout={handleLogout}/>
    </ScreenWrapper>
  )
}
const UserHeader = ( { user, router, handleLogout}) => {
    return (
        <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: wp(4)}}>
            <View>
                <Header title="Profile" mb={30}/>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Icon name="logout" color={theme.colors.rose} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <View style={{gap: 15}}>
                    <View style={styles.avatarContainer}>
                        <Avatar
                            uri={user?.image}
                            size={hp(12)}
                            rounded={theme.radius.xxl*1.4}
                        />
                        <Pressable style={styles.editIcon} onPress ={()=> router.push('editProfile')}>
                            <Icon name="edit" strokeWidth={2.5} size ={20}/>
                        </Pressable>
                    </View>

                    <View style={{alignItems: 'center', gap: 4}}>
                        <Text style={styles.userName}>{user && user.name}</Text>
                        <Text style={styles.infoText}>{user && user.address ? user.address : 'university'}</Text>
                    </View>
                    <View style={{gap: 10}}>
                        <View style={styles.info}>
                            <Icon name="location" size={25} color={theme.colors.textLight}/>
                            <Text style={styles.infoText}>
                                {user && user.address ? user.address : 'university'}
                            </Text>
                        </View>
                        <View style={styles.info}>
                            
                            <Icon name="mail" size={25} color={theme.colors.textLight}/>
                            <Text style={styles.infoText}>
                                {user && user.email}
                            </Text>
                        </View>
                            <View style={styles.info}>
                                <Icon name="call" size={25} color={theme.colors.textLight}/>
                                <Text style={styles.infoText}>
                                {user && user.phoneNumber ? user.phoneNumber : '0973901956'}
                                </Text>
                            </View>
                            <View style={styles.info}>
                                <Icon name="user" size={25} color={theme.colors.textLight}/>
                                <Text style={styles.infoText}>
                                {user && user.bio ? user.bio : 'hello'}
                                </Text>
                            </View>
                    </View>
                    <Button title="My Car" onPress={() => router.push('mycar')}/>
                </View>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container : {
        flex: 1
    },
    headerContainer: {
        marginHorizontal: wp(4),
        marginBottom: 20
    },
    input: {
        flexDirection: 'row',
        borderWidth: 0.4,
        borderColor: theme.colors.text,
        borderRadius: theme.radius.xxl,
        borderCurve: 'continuous',
        padding: 17,
        paddingHorizontal: 20,
        gap: 15,
    },
    headerShape : {
        width: wp(100),
        height: hp(20)
    },
    avatarContainer: {
        height: hp(12),
        width: hp(12),
        alignSelf: 'center'
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: -12,
        padding: 7,
        borderRadius: 50,
        backgroundColor: 'white',
        shadowColor: theme.colors.textLight,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 7
    },
    userName: {
        fontSize: hp(3),
        fontWeight: 500,
        color: theme.colors.textDark
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12, // Similar padding to Input fields
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.textLight,
        gap: 10,
        
    },
    infoText: {
        fontSize: hp(2.2),
        fontWeight: '700',
        color: theme.colors.textLight
    },
    logoutButton: {
        position: 'absolute',
        right: 0,
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: '#fee2e2'
    },
    listStyle: {
        paddingHorizontal: wp(4),
        paddingBottom: 30,
    }
})