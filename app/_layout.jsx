import React, { useEffect } from 'react';
import { router, Stack } from 'expo-router';
import { supabase } from '../lib/supabase';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { getUserData } from '../services/userService';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const _layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </GestureHandlerRootView>
  )
}

const MainLayout = () => {
  const { setAuth, setUserData } = useAuth();

  useEffect(()=> {
    supabase.auth.onAuthStateChange((_event, session) => {
      // console.log('session user: ', session?.user?.id);

      if (session) {
        setAuth(session?.user)
        updateUserData(session?.user, session?.user?.email)
        // console.log('auth user:  ', session?.user)
        router.replace('home')
      } else {
        setAuth(null)
        router.replace('/welcome')
      }
    })
  },[]);

  const updateUserData = async (user, email) => {
    let res = await getUserData(user?.id);
    if(res.success) setUserData({...res.data, email});
    // console.log('got user data: ', res);
    // if(res.success) setUserData(res.data);
    // const isAdmin = res.data.role === 'admin';
    //   if (isAdmin) {
    //     router.replace('home1');
    //   } else {
    //     router.replace('home');
    //   }
    // } else {
    //   console.error('Failed to fetch user data');
    // }
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    />
  )
}

export default _layout