import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { products } from '../services/product';

const categories = [
  'Dụng cụ rửa',
  'Dụng cụ thay dầu',
  'Dụng cụ làm mát',
  'Lốp dự phòng'
];

const ProductScreen = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // useEffect(() => {
  //   console.log(filteredProducts); // Kiểm tra dữ liệu products trong console
  // }, [filteredProducts]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <View style={styles.productItem}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
      </View>
    </View>
  );

  // Chia dữ liệu thành cặp (2 sản phẩm mỗi hàng)
  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let elements = [];
    for (let i = 0; i < numberOfFullRows; i++) {
      elements.push(data.slice(i * numColumns, i * numColumns + numColumns));
    }

    if (data.length % numColumns !== 0) {
      elements.push(data.slice(numberOfFullRows * numColumns));
    }
    return elements;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Buttons for filtering categories */}
      <View style={styles.buttonContainer}>
        {['All', ...categories].map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.button, selectedCategory === category && styles.selectedButton]}
            onPress={() => handleCategoryChange(category)}
          >
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={formatData(filteredProducts, 2)} // Chia sản phẩm thành các cặp
        renderItem={({ item }) => (
          <View style={styles.row}>
            {item.map((product, index) => (
              <View key={index} style={styles.productItem}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productCategory}>{product.category}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
              </View>
            ))}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  productItem: {
    flex: 0.48, // Cung cấp khoảng cách và chiếm gần nửa chiều rộng
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 12,
    color: '#444',
  },
});

export default ProductScreen;
