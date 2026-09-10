import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { apiCall, Spinner } from '../Util/AxiosUtil';
import { API_URLS } from '../Util/AppConst';
import InputComponent from '../CustomComponent/InputComponent';

const logoImage = require('../../Assets/recellPhone.png');

export default function LoginScreen({ navigation }) {
  const [phoneNumber, setphoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const insets = useSafeAreaInsets();

  const handleLoginResponse = (response) => {
    setLoading(false);

    if (response?.status === 200) {
      const isNewUser = response?.data?.is_new ?? false;

      ToastAndroid.show(
        'OTP Sent Successfully',
        ToastAndroid.SHORT
      );

      navigation.navigate('OTP', { phoneNumber, isNewUser, });
      return;
    }

    const errorMsg =
      response?.data?.error || 'Failed to send OTP';

    ToastAndroid.show(
      errorMsg,
      ToastAndroid.SHORT
    );
  };

  const handleLogin = () => {
    if (phoneNumber.length !== 10) {
      setError('Please enter valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);
    apiCall({
      method: "POST",
      url: API_URLS.SEND_OTP,
      data: { contact_number: phoneNumber, },
      callback: handleLoginResponse
    });
  };

  return (

    <LinearGradient
      colors={['#0D8A4F', '#0a6d3e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          {loading && <Spinner />}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >

            {/* TOP LOGO SECTION */}
            <View style={styles.logoSection}>
              <Image source={logoImage} style={styles.logoImage} />
              <Text style={styles.title}>RecellPhones</Text>
              <Text style={styles.subtitle}>Buy & Sell Used Devices</Text>
              <Text style={styles.description}>
                Get best value for your old devices with instant price quotes
              </Text>
            </View>

            {/* FORM SECTION */}
            <View
              style={[
                styles.formSection,
                {
                  paddingBottom: insets.bottom + 24,
                },
              ]}
            >
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.signInText}>Sign in to continue</Text>


              <InputComponent
                label="Phone Number"
                value={phoneNumber}
                onChangeText={(text) => {
                  setphoneNumber(text);
                  setError('');
                }}
                placeholder="Enter mobile number"
                // keyboardType="phone-pad"
                keyboardType="numeric"
                maxLength={10}
                prefix="+91"
                error={error}
              />

              {/* LOGIN BUTTON */}
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  phoneNumber.length === 0 && { opacity: 0.5 }
                ]}
                onPress={handleLogin}
                disabled={phoneNumber.length === 0}
              >
                <Text style={styles.loginButtonText}>Continue</Text>
              </TouchableOpacity>
              {/* TERMS */}
              <Text style={styles.termsText}>
                By continuing you agree to Terms & Privacy Policy
              </Text>
            </View>
          </ScrollView>

        </KeyboardAvoidingView>

      </SafeAreaView>
    </LinearGradient >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  flex: {
    flex: 1,
    justifyContent: 'space-between',
  },

  /* LOGO SECTION */

  logoSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  logoImage: {
    width: 130,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 14,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
  },

  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 6,
  },

  description: {
    fontSize: 13,
    color: '#E5E7EB',
    textAlign: 'center',
    marginTop: 10,
  },

  /* FORM SECTION */
  formSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 35,
    // padding: 24,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },

  signInText: {
    color: '#6B7280',
    marginBottom: 20,
  },

  loginButton: {
    marginTop: 20,
    backgroundColor: '#0D8A4F',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  signupText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#6B7280',
  },

  termsText: {
    marginTop: 15,
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
