import React, {useRef, useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { wp, hp } from '../helpers/common';
import { theme } from '../constants/theme';
import { router } from 'expo-router';
import Button from '../components/Button'

const Welcome = () => {
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require('../assets/images/Dirty.png')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}>
        <StatusBar style="light" />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Washing Car!</Text>
          <Image 
            source={require('../assets/images/logo1.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
        </View>

        <View style={styles.footer}>
          <Button
            title="Sign Up" loading={loading}
            onPress={() => router.push('signUp')}>
          </Button>
          <Button
            title="Log In" loading={loading}
            onPress={() => router.push('login')}>
          </Button>
          <Button
             title="Video" loading={loading}
             onPress={() => router.push('signUp')}>
          </Button>

          {/* Login Option */}
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Pressable onPress={() => router.push('login')}>
              <Text
                style={[
                  styles.loginText,
                  { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold },
                ]}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Welcome;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    opacity: 0.95,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: hp(5),
  },
  title: {
    color: theme.colors.gray,
    fontSize: hp(4),
    textAlign: 'center',
    fontWeight: theme.fonts.extraBold,
  },
  punchline: {
    textAlign: 'center',
    paddingHorizontal: wp(10),
    fontSize: hp(1.8),
    color: theme.colors.gray,
    marginTop: hp(2),
  },
  logo: {
    width: wp(50), 
    height: hp(12),
    marginTop: hp(3),
  },
  footer: {
    marginTop: hp(4),
    width: wp(80),
    gap: 70,
    // height: hp()
  },
  // button: {
  //   width: wp(80),
  //   paddingVertical: hp(3),
  //   borderRadius: 8,
  //   alignItems: 'center',
  // },
  primaryButton: {
    backgroundColor: theme.colors.primaryDark,
  },
  // secondaryButton: {
  //   backgroundColor: theme.colors.primaryLight,
  // },
  buttonText: {
    color: 'white',
    fontWeight: theme.fonts.semibold,
    fontSize: hp(2),
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3),
  },
  loginText: {
    textAlign: 'center',
    color: 'white',
    fontSize: hp(1.6),
  },
});
