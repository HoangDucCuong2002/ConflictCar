import { Tabs } from 'expo-router';
import React from 'react';        
import TabBar from '../../components/TabBar'
// const isAdmin = false 

const _layout= () => {
  return (
    <Tabs
        tabBar={props=> <TabBar {...props} />}
    >
      {/* {isAdmin ? (
        <Tabs.Screen
          name="home1"
          options={{
            tabBarLabel: 'Home',
          }}
        />
      ) : ( */}
        <Tabs.Screen
          name="home"
        />
      {/* )} */}
      <Tabs.Screen
        name="calendar"
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: 'History',
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          tabBarLabel: 'Setting',
        }}
      />
    </Tabs>
  );
}
export default _layout;
