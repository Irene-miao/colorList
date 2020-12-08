import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BlockRGB from './components/BlockRGB';
import { FlatList } from 'react-native-gesture-handler';
 
 function HomeScreen({ navigation}) {
   const [colorArray, setColorArray] = useState([]);

   useEffect( () => {
  navigation.setOptions({
    headerRight: () => <TouchableOpacity style={styles.button} onPress={addColor}><Text style={styles.buttonText}>Add Color</Text></TouchableOpacity>,
    headerLeft: () => <TouchableOpacity style={styles.button} onPress={resetColor}><Text style={styles.buttonText}>Reset</Text></TouchableOpacity>,
  });
});

   function renderItem({ item }) {
     return (
     <TouchableOpacity 
     onPress={() => navigation.navigate('Details', 
     {...item,})
     }
     >
       <BlockRGB red={item.red} green={item.green} blue={item.blue} />
     </TouchableOpacity>
     );
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
    {/* <TouchableOpacity
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
    </TouchableOpacity> */}

     <FlatList
     style={{ width: '100%' }}
     data={colorArray}
     renderItem={renderItem}
     />
   </View>
 );
}


function DetailsScreen( {route}) {
  const { red, green, blue } = route.params;

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: "center",
          backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        },
      ]}
    >
      <Text style={styles.detailsText}>Red: {red}</Text>
      <Text style={styles.detailsText}>Green: {green}</Text>
      <Text style={styles.detailsText}>Blue: {blue}</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
  <NavigationContainer >
    <Stack.Navigator>
      <Stack.Screen name='Colors' component={HomeScreen} />
      <Stack.Screen name='Details' component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  detailsText: {
    fontSize: 36,
    marginBottom: 12,
    color: 'white',
  },

  button: {
padding: 5,
backgroundColor: 'black',
borderRadius: 10,
  },

  buttonText: {
color: 'white',
  }
});
