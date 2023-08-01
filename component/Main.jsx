import React from 'react';
import { View, StyleSheet,TouchableOpacity,Text } from 'react-native';
import Product from './Product';
import Header from './Header';


const Main = ({navigation}) => {
  return (
    <View style={styles.container}>
   
      <Header />
      <Product />
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => navigation.navigate('Billing')}>
        <Text style={styles.addToCartButtonText}>Bill</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
    },
    addToCartButton: {
      backgroundColor: '#3498db',
      padding: 5,
      marginTop: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    addToCartButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
export default Main;
