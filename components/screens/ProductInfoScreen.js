import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
} from "react-native-vector-icons";

//customs
import { COLORS, Items } from "../database/Database";

const ProductInfoScreen = ({ route, navigation }) => {
  const { productID } = route.params;

  const [product, setProduct] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  //get product data by productId
  const getDataFromDB = async () => {
    for (let index = 0; index < Items.length; index++) {
      await setProduct(Items[index]);
      return;
    }
  };

  return (
    <View style={styles.productItemContainer}>
      <StatusBar
        backgroundColor={COLORS.backgroundLight}
        barStyle="dark-content"
      />

      <ScrollView>
        <View>
          <View></View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  productItemContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.black,
  },
});

export default ProductInfoScreen;
