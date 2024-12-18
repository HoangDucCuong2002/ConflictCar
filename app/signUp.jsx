import { StyleSheet, Text, View, Pressable, Alert, KeyboardAvoidingView, Platform,Keyboard, TouchableWithoutFeedback,ScrollView } from 'react-native'
import React, {useRef, useState} from 'react'
import ScreenWrapper from '../components/ScreenWrapper' 
import { theme } from '../constants/theme'
import { useRouter } from 'expo-router'
import { StatusBar } from 'react-native'
import BackButton from '../components/BackButton'
import { wp, hp } from '../helpers/common'
import Input from '../components/Input'
import Icon from '../assets/icons'
import Button from '../components/Button'
import { supabase } from '../lib/supabase'
// import { session } from  '@supabase/supabase-js'

const signUp = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const nameRef = useRef("");
    const passwordRef = useRef("");
    const phoneNumberRef = useRef("")
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if (!emailRef.current || !passwordRef.current || !phoneNumberRef.current) {
            Alert.alert('Sign Up', "Please fill all the fields!");
            return;
        }
        let name = nameRef.current.trim();
        let email = emailRef.current.trim();
        let password = passwordRef.current.trim();
        let phoneNumber = phoneNumberRef.current.trim();

        setLoading(true);

        const { data: { session }, error } = await supabase.auth.signUp({
            email,
            password,
            phoneNumber,
            options: {
                data: {
                    name
                }
            }
        });
        setLoading(false);

        console.log('session: ', session);
        console.log('error: ', error);
        if (error) {
            Alert.alert('Sign up', error.message);
        } else {
            Alert.alert('Sign up', "Registration successful! Please log in.");
            router.replace('login'); // Điều hướng người dùng về màn hình đăng nhập
        }
    };

    return (
        <ScreenWrapper>
             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                <ScrollView 
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                <StatusBar style="dark"/>
                <View style={styles.container}>
                    <BackButton router={router} />

                    {/* Welcome */}
                    <View>
                        <Text style={styles.welcomeText}>Let's</Text>
                        <Text style={styles.welcomeText}>Get Started</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
                            Please login to continue
                        </Text>
                        <Input
                            icon={<Icon name="user" size={26} strokeWidth={1.6} />}
                            placeholder="Enter your username"
                            onChangeText={value => nameRef.current = value}
                        />
                        <Input
                            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
                            placeholder="Enter your email"
                            onChangeText={value => emailRef.current = value}
                        />
                        <Input
                            icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
                            placeholder="Enter your password"
                            secureTextEntry
                            onChangeText={value => passwordRef.current = value}
                        />
                        <Input
                            icon={<Icon name="call" size={26} strokeWidth={1.6} />}
                            placeholder="Enter your phone Number"
                            secureTextEntry
                            onChangeText={value => phoneNumberRef.current = value}
                        />
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>

                        {/* Button */}
                        <Button title="Sign Up" loading={loading} onPress={onSubmit} />
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account?</Text>
                        <Pressable onPress={() => router.push('login')}>
                            <Text style={[styles.footerText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold }]}> Login</Text>
                        </Pressable>
                    </View>
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </ScreenWrapper>
    );
};

export default signUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 45,
        paddingHorizontal: wp(5),
    },
    welcomeText: {
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.text,
    },
    form: {
        gap: 25
    },
    forgotPassword: {
        textAlign: 'right',
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6),
    }
});