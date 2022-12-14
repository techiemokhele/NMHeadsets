import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import HomeScreen from "./components/screens/HomeScreen";
import MyCartScreen from "./components/screens/MyCartScreen";
import ProductInfoScreen from "./components/screens/ProductInfoScreen";

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cart" component={MyCartScreen} />
        <Stack.Screen name="Product" component={ProductInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
