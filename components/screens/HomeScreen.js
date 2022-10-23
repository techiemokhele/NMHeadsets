import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
} from "react-native-vector-icons";

//customs
import { COLORS, Items } from "../database/Database";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [accessory, setAccessory] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  //get product data
  const getDataFromDB = () => {
    let productList = [];
    let accessoryList = [];

    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category == "product") {
        productList.push(Items[index]);
      } else if (Items[index].category == "accessory") {
        accessoryList.push(Items[index]);
      }
    }

    setProducts(productList);
    setAccessory(accessoryList);
  };

  //create a product component
  const ProductCard = ({ data }) => {
    return (
      <Pressable
        style={styles.productItemContainer}
        onPress={() => navigation.navigate("Product", { productID: data.id })}
      >
        <View style={styles.productItemContent}>
          {data.isOff ? (
            <View style={styles.productItemPercentageContainer}>
              <Text style={styles.productItemPercent}>
                {data.offPercentage}%
              </Text>
            </View>
          ) : null}
          <Image source={data.productImage} style={styles.productItemImage} />
        </View>
        <Text style={styles.productItemText}>{data.productName}</Text>

        {/*show accessories*/}
        {data.category == "accessory" ? (
          data.isAvailable ? (
            <View style={styles.accessoryContainer}>
              <FontAwesome
                name="circle"
                style={styles.accessoryCircleIconAvailable}
              />
              <Text style={styles.accessoryText}>Available</Text>
            </View>
          ) : (
            <View style={styles.accessoryContainer}>
              <FontAwesome
                name="circle"
                style={styles.accessoryCircleIconUnavailable}
              />
              <Text style={styles.accessoryText}>Unavailable</Text>
            </View>
          )
        ) : null}
        <View style={styles.productNumbersContainer}>
          <Text style={styles.productItemText}>R {data.productPrice}.99</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{data.rating}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      {/*icon section*/}
      <View style={styles.contentContainer}>
        <Pressable>
          <Entypo
            name="shopping-bag"
            color={COLORS.white}
            style={styles.handbagIcon}
          />
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Cart")}>
          <MaterialCommunityIcons
            name="cart-arrow-right"
            color={COLORS.white}
            style={styles.cartIcon}
          />
        </Pressable>
      </View>

      {/*heading section*/}
      <View style={styles.textSectionContainer}>
        <Text style={styles.textItemHeading}>NM Market Headsets</Text>
        <Text style={styles.textItem}>
          Audio shop on Outeniqua Ave 18.{"\n"}
        </Text>
        <Text style={styles.textItemBlurb}>
          This shop offers both products and services
        </Text>
      </View>
      <View style={styles.horizontalLine} />

      {/*product item section*/}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        {/*products section*/}
        <View style={styles.productContainer}>
          <View style={styles.productContent}>
            <Text style={styles.productText}>
              <FontAwesome5
                name="cart-arrow-down"
                size={18}
                color={"#D4AF37"}
              />{" "}
              Products
            </Text>
            <Text style={styles.productTextQuantity}>231</Text>
          </View>
          <Text style={styles.productAllText}>See All</Text>
        </View>

        {/*product items section*/}
        <View style={styles.productCardContainer}>
          {products.map((data) => {
            return <ProductCard data={data} key={data.id} />;
          })}
        </View>

        {/*accessories section*/}
        <View style={styles.productContainer}>
          <View style={styles.productContent}>
            <Text style={styles.productText}>
              <MaterialCommunityIcons
                name="cart-heart"
                size={20}
                color={"#D4AF37"}
              />{" "}
              Accessories
            </Text>
            <Text style={styles.productTextQuantity}>43</Text>
          </View>
          <Text style={styles.productAllText}>See All</Text>
        </View>

        {/*product items section*/}
        <View style={styles.productCardContainer}>
          {accessory.map((data) => {
            return <ProductCard data={data} key={data.id} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? "10%" : "0%",
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.black,
  },

  //icon section
  contentContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  handbagIcon: {
    overflow: "hidden",
    fontSize: 18,
    padding: 12,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: COLORS.white,
    backgroundColor: "#D4AF37",
  },
  cartIcon: {
    overflow: "hidden",
    fontSize: 18,
    padding: 12,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: COLORS.white,
    backgroundColor: "#D4AF37",
  },

  //heading section
  textSectionContainer: {
    marginBottom: 10,
    padding: 16,
    paddingTop: 0,
  },
  textItemHeading: {
    alignSelf: "center",
    fontSize: 36,
    fontWeight: "600",
    color: COLORS.white,
    letterSpacing: 0.7,
    marginBottom: 10,
  },
  textItem: {
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.white,
    letterSpacing: 1,
  },
  textItemBlurb: {
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.white,
    letterSpacing: 1,
    marginTop: -10,
  },
  horizontalLine: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 10,
    borderTopColor: "#D4AF37",
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  //product section
  scrollContainer: {
    marginBottom: 20,
  },
  productContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 5,
  },
  productContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  productText: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.white,
    letterSpacing: 1,
  },
  productTextQuantity: {
    marginLeft: 10,
    marginTop: 2.5,
    fontSize: 15,
    fontWeight: "400",
    color: COLORS.white,
    letterSpacing: 1,
    opacity: 0.5,
  },
  productAllText: {
    fontSize: 18,
    fontWeight: "400",
    color: COLORS.white,
  },

  //products item section
  productCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  productItemContainer: {
    width: "48%",
    marginVertical: 14,
  },
  productItemContent: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    width: "100%",
    height: 100,
    borderRadius: 10,
    borderColor: "#D4AF37",
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  productItemPercentageContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    width: "20%",
    height: "20%",
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#D4AF37",
  },
  productItemPercent: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: "500",
    letterSpacing: 1,
  },
  productItemImage: {
    height: "80%",
    width: "80%",
    resizeMode: "contain",
  },

  //product numbers
  productNumbersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productItemText: {
    marginTop: 10,
    fontSize: 12,
    color: COLORS.white,
    fontWeight: "600",
    marginBottom: 2,
    letterSpacing: 1,
  },
  ratingContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    right: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#D4AF37",
  },
  rating: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: "600",
    marginBottom: 2,
    letterSpacing: 1,
  },

  //accessory section
  accessoryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  accessoryCircleIconAvailable: {
    fontSize: 12,
    marginRight: 6,
    color: COLORS.green,
  },
  accessoryCircleIconUnavailable: {
    fontSize: 12,
    marginRight: 6,
    color: COLORS.red,
  },
  accessoryText: {
    fontSize: 12,
    color: "#D4AF37",
  },
});

export default HomeScreen;
