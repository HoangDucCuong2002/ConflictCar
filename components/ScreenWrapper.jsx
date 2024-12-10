import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ScreenWrapper = ({children, bg}) => {
    const {top} = useSafeAreaInsets();
    const {bottom} = useSafeAreaInsets();
    const paddingTop = top>0? top+ 5: 30;
    const paddingBottom = bottom > 0 ? bottom + 10 : 20;
  return (
    <View style ={{ flex: 1, paddingTop, paddingBottom, backgroundColor: bg}}>
      {
        children
      }
    </View>
  )
}

export default ScreenWrapper