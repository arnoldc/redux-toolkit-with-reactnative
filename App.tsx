import React, { useEffect, useState } from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Pressable,
   FlatList,
   Image,
   ActivityIndicator,
   ScrollView
 } from 'react-native';
import {  useAppDispatch, useAppSelector } from './src/app/hooks';
import { incremented, amountAdded  } from './src/features/counter/counter-slice';
import { useFetchBreedsQuery  } from './src/features/dogs/dogs-api-slice';

import { Provider} from 'react-redux';
import  { store } from './src/app/store';
 
 const App = () => {
   const value = useAppSelector((state) => state.counter.value)
   const dispatch = useAppDispatch();
   const [numDogs, setNumDogs] = useState(10)

   const { data = [], isFetching  } = useFetchBreedsQuery(value);

  const onClick = () => {
       dispatch(incremented());
      // dispatch(amountAdded(10))
      // setNumDogs(10)
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>  
        <Text>Name: {item.name}</Text>
        <Image style={styles.image} source={{ uri: item.image.url }} />
   </View>
  )
   return (
            <SafeAreaView>
              <ScrollView>
              <View style={styles.container}>
                    <Pressable style={styles.button} onPress={onClick} >
                          <Text>{`Counter ${value}`}</Text>
                    </Pressable>
                    {isFetching && <ActivityIndicator />}

                    <FlatList
                        nestedScrollEnabled
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                  
              </View>
              </ScrollView>
            </SafeAreaView>
   );
 };

 const MainApp = () =>  (
  <Provider store={store}>  
      <App />
  </Provider>
 )

 const styles = StyleSheet.create({
   container: {
      margin: 20,
   }, 
   button: {
     width: 90,
     height: 50,
     padding: 5,
     backgroundColor: '#ff0',
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 5,
     marginBottom : 10,
   },
   image: {
      height: 120,
      width: 120,
   },
   card: {
     borderWidth: 1,
    
   }
 });
 
 export default MainApp;
 