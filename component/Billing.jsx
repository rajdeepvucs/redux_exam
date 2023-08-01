/* import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import RNFS from 'react-native-fs';


const Billing = () => {
  const cartData = useSelector((state) => state.reducer);


  const grandTotal = cartData.reduce((total, item) => total + parseInt(item.price.slice(1)), 0);
  const generateBillContent = (cartData, grandTotal) => {
    let content = 'Item Name,Price\n'; // Header row
  
    cartData.forEach((item) => {
      content += `${item.name},${item.price}\n`;
    });
  
    content += `Grand Total,${grandTotal}\n`;
  
    return content;
  };
  const handleViewBill = async () => {
    try {
      const downloadPath = `${RNFS.DocumentDirectoryPath}/bill.csv`;
  
      const exists = await RNFS.exists(downloadPath);
      if (!exists) {
        Alert.alert('File not found', 'The bill file has not been downloaded yet.');
        return;
      }
  
      const fileContent = await RNFS.readFile(downloadPath, 'utf8');
  
      // Log the file content using console.log
      console.log('File Content:', fileContent);
    } catch (error) {
      console.log('Error viewing the downloaded file:', error);
    }
  };
  
  const handleDownloadBill = () => {
    const billContent = generateBillContent(cartData, grandTotal);
  
    const downloadPath = `${RNFS.DocumentDirectoryPath}/bill.csv`;
   // const downloadPath=`${RNFS.LibraryDirectoryPath}/bill.csv`;
    RNFS.writeFile(downloadPath, billContent, 'utf8')
      .then(() => {
        console.log('Bill downloaded successfully!');
      })
      .catch((error) => {
        console.log('Error downloading the bill:', error);
      });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Items:</Text>
      {cartData.map((item) => (
        <View key={item.name} style={styles.cartItemContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
      ))}
      <View style={styles.grandTotalContainer}>
        <Text style={styles.grandTotalText}>Grand Total:</Text>
        <Text style={styles.grandTotalPrice}>${grandTotal}</Text>
      </View>
      <TouchableOpacity onPress={handleDownloadBill} style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Download Bill</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleViewBill} style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View Bill</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
  },
  grandTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  grandTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  grandTotalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  downloadButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Billing;
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, PermissionsAndroid } from 'react-native';
import { useSelector } from 'react-redux';
import RNFS from 'react-native-fs';

const Billing = () => {
  const cartData = useSelector((state) => state.reducer);

  const grandTotal = cartData.reduce((total, item) => total + parseInt(item.price.slice(1)), 0);

  const generateBillContent = (cartData, grandTotal) => {
    let content = 'Item Name,Price\n'; // Header row
  
    cartData.forEach((item) => {
      content += `${item.name},${item.price}\n`;
    });
  
    content += `Grand Total,${grandTotal}\n`;
  
    return content;
  };

  const handleDownloadBill = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your device storage to save the bill.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const billContent = generateBillContent(cartData, grandTotal);
        const directory = RNFS.ExternalDirectoryPath + '/MyAppFolder'; // Create a folder to store the bill
        const downloadPath = directory + '/bill.csv';

        // Create the directory if it doesn't exist
        await RNFS.mkdir(directory);

        RNFS.writeFile(downloadPath, billContent, 'utf8')
          .then(() => {
            console.log('Bill downloaded successfully!');
            console.log(downloadPath);
            Alert.alert('Success', 'Bill downloaded successfully!');
          })
          .catch((error) => {
            console.log('Error downloading the bill:', error);
            Alert.alert('Error', 'Failed to download the bill.');
          });
      } else {
        console.log('Storage permission denied');
      }
    } catch (error) {
      console.warn('Error requesting storage permission:', error);
    }
  };
  const handleViewBill = async () => {
    try {
      const directory = RNFS.ExternalDirectoryPath + '/MyAppFolder'; // Replace with the folder name you used for downloading
    const downloadPath = directory + '/bill.csv';
  
      const exists = await RNFS.exists(downloadPath);
      if (!exists) {
        Alert.alert('File not found', 'The bill file has not been downloaded yet.');
        return;
      }
  
      const fileContent = await RNFS.readFile(downloadPath, 'utf8');
  
      // Log the file content using console.log
      console.log('File Content:', fileContent);
    } catch (error) {
      console.log('Error viewing the downloaded file:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Items:</Text>
      {cartData.map((item) => (
        <View key={item.name} style={styles.cartItemContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
      ))}
      <View style={styles.grandTotalContainer}>
        <Text style={styles.grandTotalText}>Grand Total:</Text>
        <Text style={styles.grandTotalPrice}>${grandTotal}</Text>
      </View>
      <TouchableOpacity onPress={handleDownloadBill} style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Download Bill</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleViewBill} style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View Bill</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
  },
  grandTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  grandTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  grandTotalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  downloadButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Billing;
