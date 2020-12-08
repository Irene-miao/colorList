import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BlockRGB from './components/BlockRGB';
import { FlatList } from 'react-native-gesture-handler';
 


 function HomeScreen() {
   const [colorArray, setColorArray] = useState([]);

   function renderItem({ item }) {
     return <BlockRGB red={item.red} green={item.green} blue={item.blue} />;
   }
   
 function addColor() {
  let newColor =
     {
       red: Math.floor(Math.random() *256),
       green: Math.floor(Math.random() *256),
       blue: Math.floor(Math.random() *256),
       id: colorArray.length.toString(),
     };
     setColorArray([...colorArray, newColor
   ]);
   
 }
 function resetColor() {
   setColorArray([]);
 }

 return (
   <View style={styles.container}>
    <TouchableOpacity
    style={{ height: 40, justifyContent: 'center'}}
    onPress={addColor}
    >
      <Text style={{ color: 'red'}}>
        Add color
        </Text>
    </TouchableOpacity>

    <TouchableOpacity
    style={{ height: 40, justifyContent: 'center'}}
    onPress={resetColor}
    >
      <Text style={{ color: 'red'}}>
        Reset color
        </Text>
    </TouchableOpacity>
     <FlatList
     style={{ width: '100% '}}
     data={colorArray}
     renderItem={renderItem}
     />
   </View>
 );
}


const Stack = createStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
