import React, { useEffect,useState} from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {addToCart,removeFromCart} from './action'
import { useDispatch,useSelector } from 'react-redux';
import { connect } from 'react-redux';
const Product = ({ cartData, dispatchAddToCart, dispatchRemoveFromCart }) => {
  const products = [
    { name: 'Assam Ctc', price: '$150', image: 'https://5.imimg.com/data5/BY/FG/MY-34572654/assam-ctc-tea.jpg' },
    { name: 'Dooars CTC', price: '$100', image: 'https://5.imimg.com/data5/SZ/HL/LO/IOS-9621676/product-jpeg-500x500.png' },
    { name: 'Darjeeling Leaf', price: '$80', image: 'https://4.imimg.com/data4/KL/BM/MY-8788583/dargelling-tea-powder-500x500.jpg' },
    { name: 'Assam Orthodox', price: '$30', image: 'https://5.imimg.com/data5/TM/GM/VU/SELLER-69908376/orthodox-tea.jpg' },

    // Add more products as needed
  ];
  const dispatch = useDispatch(); 
  const [isAdded,setisAdded]=useState(false)
  const handleremoveToCart = (item) => {
   
    //console.warn("hi",item);
   // dispatch(removeFromCart(item.name))
   dispatchRemoveFromCart(item.name);
   };
  const handleaddToCart = (item) => {
   
   //console.warn("hi",item);
   //dispatch(addToCart(item))
   dispatchAddToCart(item);
  };
 // const cartData=useSelector((state)=>state.reducer);
  console.log(cartData);
 /*  useEffect(()=>{
    if(cartData && cartData.length){
      cartData.forEach(element => {
       // console.log( cartData.length,"added item",element);
       if(element.name===item.name){
        setisAdded(true);
       }
        
      });
    }
  },[cartData]) */
  const isItemInCart = (item) => {
   return cartData.some((cartItem) => cartItem.name === item.name);
  // let result=cartData.filter(element)=>{}
  }
  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <Image style={styles.productImage} source={{ uri: item.image }} />
    
    { isItemInCart(item)?
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleremoveToCart(item)}
      >
        <Text style={styles.addToCartButtonText}>Remove from Cart</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleaddToCart(item)}
      >
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>

}
    </View>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderProductItem}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 10, 
  },
  productContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
  productImage: {
    height: 100,
    width: 100,
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
const mapStateToProps = (state) => {
  return{
    cartData: state.reducer
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddToCart: (item) => dispatch(addToCart(item)),
    dispatchRemoveFromCart: (itemName) => dispatch(removeFromCart(itemName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (Product);
