import { View, Text, FlatList, Image, Dimensions} from 'react-native'
import React from 'react'

const sliderList = [
    {
      id: '1',
      name: 'Image 1',
      image: require('../assets/images/wash.png'),  
    },
    {
        id: '2',
        name: 'Image 2',
        image: require('../assets/images/wash.png'),
    },
    {
        id: '3',
        name: 'Image 3',
        image: require('../assets/images/wash.png'),
    },
    {
        id: '4',
        name: 'Image 4',
        image: require('../assets/images/wash.png'),
    },
];
const Slider = () => {
  return (
    <View style={{marginTop:5, marginLeft:10, marginBottom: 5}}>
      <FlatList
        data ={sliderList}
        horizontal={true}
        renderItem={({item})=> (
            <Image source={item.image}
                style={{
                    width: Dimensions.get('screen').width*0.8,
                    height: 120,
                    borderRadius: 10,
                    margin: 2,
                }}
            />
        )}
      />
    </View>
  )
}

export default Slider