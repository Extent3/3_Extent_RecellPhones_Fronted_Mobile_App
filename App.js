import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from "react-native";


import LoginScreen from './src/Components/LoginScreen/LoginScreen';

import OTPScreen from './src/Components/OTPScreen/OTPScreen';
import HomeScreen from './src/Components/HomeScreen/HomeScreen';
import BrandScreen from './src/Components/BrandScreen/BrandScreen';
import ModelScreen from './src/Components/ModelScreen/ModelScreen';
import SingleDeviceDetails from './src/Components/SingleDeviceDetails/SingleDeviceDetails';
import EnquiryQuestion from './src/Components/EnquiryQuestion/EnquiryQuestion';
import WarrantyScreen from './src/Components/WarrantyScreen/WarrantyScreen';
import PersonalDetails from './src/Components/PersonalDetails/PersonalDetails';
import AddressScreen from './src/Components/AddressScreen/AddressScreen';
import OrderScreen from './src/Components/OrderScreen/OrderScreen';
import ProfileScreen from './src/Components/ProfileScreen/ProfileScreen';
import PriceScreen from './src/Components/PriceScreen/PriceScreen';
import DefectScreen from './src/Components/DefectScreen/DefectScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
        />

        <Stack.Navigator
          screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Brand" component={BrandScreen} />
          <Stack.Screen name="Model" component={ModelScreen} />
          <Stack.Screen name="DeviceDetails" component={SingleDeviceDetails} />
          <Stack.Screen name="EnquiryQuestion" component={EnquiryQuestion} />
          <Stack.Screen name="WarrantyScreen" component={WarrantyScreen} />
          <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
          <Stack.Screen name="AddressScreen" component={AddressScreen} />
          <Stack.Screen name="OrderScreen" component={OrderScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="PriceScreen" component={PriceScreen} />

          <Stack.Screen
            name="DefectSelection"
            component={DefectScreen}
          />


        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
