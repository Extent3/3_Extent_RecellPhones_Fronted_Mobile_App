import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { apiCall, Spinner } from '../Util/AxiosUtil';
import { API_URLS } from '../Util/AppConst';
import AsyncStorage from '@react-native-async-storage/async-storage';
const logoImage = require('../../Assets/recellPhone.png');
const recellBackIcon = require("../../Assets/BackIcon.png");

export default function OTPScreen({ navigation, route }) {
  const { phoneNumber, } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtpCallback = async (response) => {
    setLoading(false);
    if (response?.status === 200) {
      const user = response?.data?.user;
      const isNewUser =
        response?.data?.is_new ??
        isNewUser ??
        false;
      ToastAndroid.show(
        'Login Successfully',
        ToastAndroid.SHORT
      );

      await AsyncStorage.setItem(
        'token',
        response?.data?.token || ''
      );

      await AsyncStorage.setItem(
        'user',
        JSON.stringify(response?.data?.user || {})
      );

      await AsyncStorage.setItem(
        'loggedinPhoneNumber',
        phoneNumber
      );

      const savedToken =
        await AsyncStorage.getItem('token');

      console.log(
        'SAVED TOKEN =>',
        savedToken
      );
      console.log('IS NEW USER:', isNewUser);
      console.log('USER ID:', user?._id);
      const isProfileCompleted =
        user?.firstName?.trim() &&
        user?.lastName?.trim() &&
        user?.address?.length > 0;

      ToastAndroid.show(
        'Login Successfully',
        ToastAndroid.SHORT
      );

      if (!isProfileCompleted) {
        navigation.replace('PersonalDetails', {
          phoneNumber,
          userId: user?._id,
        });
      } else {
        navigation.replace('Home');
      }
    } else {
      const errorMsg =
        response?.data?.message || "Invalid OTP";

      ToastAndroid.show(
        errorMsg,
        ToastAndroid.SHORT
      );
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length !== 6) {
      alert('Enter 6 digit OTP');
      return;
    }

    setLoading(true);
    apiCall({
      method: 'POST',
      url: API_URLS.LOGIN,
      data: {
        contact_number: phoneNumber,
        otp: code,
      },
      callback: verifyOtpCallback,
    });
  };

  const resendOtpCallback = (response) => {
    setLoading(false);

    if (response?.status === 200) {
      ToastAndroid.show(
        'OTP sent successfully',
        ToastAndroid.SHORT
      );

      setOtp(['', '', '', '', '', '']);

      setTimer(30);

      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } else {
      setLoading(false);

      const errorMsg =
        response?.data?.message || 'Failed to send OTP';

      ToastAndroid.show(
        errorMsg,
        ToastAndroid.SHORT
      );
    }
  };

  const handleResend = () => {
    if (timer > 0 || loading) {
      return;
    }

    setLoading(true);

    apiCall({
      method: 'POST',
      url: API_URLS.SEND_OTP,
      data: {
        contact_number: phoneNumber,
      },
      callback: resendOtpCallback,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Spinner />}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >

          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}
              style={styles.backButton}>

              <Image
                source={recellBackIcon}
                style={styles.backIcon}
                resizeMode="contain"
              />
              <Text style={styles.backButtonText}>
                Back
              </Text>
            </TouchableOpacity>
          </View>


          {/* LOGO */}
          <View style={styles.logoSection}>
            <Image source={logoImage} style={styles.logo} />
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={styles.subtitle}>
              We've sent a 6-digit code to {phoneNumber}
            </Text>
          </View>

          {/* OTP BOXES */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={el => (inputRefs.current[index] = el)}
                value={digit}
                onChangeText={value => handleChange(value, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                style={styles.otpBox}
              />
            ))}
          </View>

          {/* TIMER */}
          <View style={styles.timerBox}>
            {timer > 0 ? (
              <Text style={styles.timerText}>
                Resend OTP in {timer}s
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendText}>Resend OTP</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* VERIFY BUTTON */}
          <TouchableOpacity
            style={[
              styles.button,
              otp.some(d => d === '') && { opacity: 0.5 }
            ]}
            disabled={otp.some(d => d === '')}
            onPress={handleVerify}
          >
            <Text style={styles.buttonText}>Verify & Continue</Text>
          </TouchableOpacity>

          {/* HELP TEXT */}
          <Text style={styles.helpText}>
            Didn't receive OTP? Check SMS or resend again
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D8A4F',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 16,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 16,
  },
  // backText: {
  //   color: '#fff',
  //   fontSize: 16,
  // },

  logoSection: {
    alignItems: 'center',
    marginTop: 20,
  },

  logo: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },

  subtitle: {
    color: '#E5E7EB',
    textAlign: 'center',
    marginTop: 5,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 30,
  },

  otpBox: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 10,
    color: '#111827',
  },

  timerBox: {
    alignItems: 'center',
    marginTop: 20,
  },

  timerText: {
    color: '#fff',
  },

  resendText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#0D8A4F',
    fontWeight: 'bold',
  },

  helpText: {
    textAlign: 'center',
    color: '#E5E7EB',
    fontSize: 12,
    marginTop: 10,
  },
  backIcon: {
    width: 42,
    height: 42,
  },
});
