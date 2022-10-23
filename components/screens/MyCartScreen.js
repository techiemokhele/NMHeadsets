import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//customs
import { COLOURS, Items } from "../database/Database";

const MyCartScreen = ({ navigation }) => {
  const [product, setProduct] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDb();
    });

    return unsubscribe;
  }, [navigation]);

  //get data from local DB by ID
  const getDataFromDb = async () => {
    let items = await AsyncStorage.getItem("cartItems");
    items = JSON.parse(items);

    let productData = [];
    if (items) {
      Items.forEach((data) => {
        if (items.includes(data.id)) {
          productData.push(data);
          return;
        }
      });
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct(false);
      getTotal(false);
    }
  };

  //get total price of all items in the cart
  const getTotal = (productData) => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].productPrice;
      total = total + productPrice;
    }
    setTotal(total);
  };

  return (
    <View>
      <Text>MyCartScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MyCartScreen;
