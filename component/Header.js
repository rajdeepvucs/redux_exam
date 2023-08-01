import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import{useSelector} from 'react-redux'

const Header = () => {
    const cartData=useSelector((state)=>state.reducer)
    const [count,setcount]=useState(0);
    useEffect(()=>{
setcount(cartData.length);
    },[cartData])
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#32a852',
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  
  },
});

export default Header;
