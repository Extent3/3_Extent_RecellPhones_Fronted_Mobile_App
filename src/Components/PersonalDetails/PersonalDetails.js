import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ToastAndroid,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { apiCall, Spinner } from '../Util/AxiosUtil';
import { API_URLS } from '../Util/AppConst';
import InputComponent from "../CustomComponent/InputComponent";
const logoImage = require('../../Assets/recellPhone.png');
const recellBackIcon = require("../../Assets/BackIcon.png");
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PersonalDetails({ navigation, route }) {
    const { userId } = route?.params;

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });
    const [errors, setErrors] = useState({});
    const insets = useSafeAreaInsets();


    const updatePersonalDetailsCallback = response => {
        console.log('Personal Details Response:', response);
        setLoading(false)

        if (response?.status === 200) {
            ToastAndroid.show(
                'Profile completed successfully',
                ToastAndroid.SHORT,
            );

            navigation.replace('Home');
        } else {
            ToastAndroid.show(
                response?.data?.error ||
                'Failed to update profile',
                ToastAndroid.LONG,
            );
        }
    };
    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [field]: '',
        }));
    };

    const handleValidation = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "Please Enter Your First Name";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Please Enter Your Last Name";
        }


        if (
            formData.email.trim() &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
        ) {
            newErrors.email = "Please enter a valid email address";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!handleValidation()) return;
        const data = {
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim(),
        };
        setLoading(true)
        apiCall({
            method: 'PUT',
            url: `${API_URLS.UPDATE_PERSONAL_DETAILS}/${userId}`,
            data,
            setLoading,
            callback: updatePersonalDetailsCallback,
        });
    };

    return (
        <LinearGradient
            colors={["#0D8A4F", "#0a6d3e"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.screen}
        >
            {loading && <Spinner />}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={0}
            >
                {/* Header with Back Button */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                        style={styles.backButton}
                    >
                        <Image
                            source={recellBackIcon}
                            style={styles.backIcon}
                            resizeMode="contain"
                        />

                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                </View>

                {/* Logo Section */}
                <View style={styles.logoSection}>
                    <Image
                        source={logoImage}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />

                    <Text style={styles.title}>Personal Details</Text>
                    <Text style={styles.subtitle}>
                        Complete your profile to continue
                    </Text>
                </View>

                {/* Form Section */}
                <ScrollView
                    style={styles.formContainer}

                    contentContainerStyle={[
                        styles.formContent,
                        {
                            paddingBottom: insets.bottom + 24,
                        },
                    ]}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    showsVerticalScrollIndicator={false}  >

                    <View style={styles.field}>
                        <InputComponent
                            label="First Name"
                            value={formData.firstName}
                            onChangeText={(text) => handleChange('firstName', text)}
                            placeholder="Enter your first name"
                            error={errors.firstName}
                        />
                    </View>
                    <View style={styles.field}>
                        <InputComponent
                            label="Last Name"
                            value={formData.lastName}
                            onChangeText={(text) => handleChange('lastName', text)}
                            placeholder="Enter your last name"
                            error={errors.lastName}
                        />
                    </View>

                    <View style={styles.field}>
                        <InputComponent
                            label="Email Address"
                            value={formData.email}
                            onChangeText={(text) => handleChange('email', text)}
                            placeholder="Enter your email (optional)"
                            keyboardType="email-address"
                            error={errors.email}
                        />
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.submitButton}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.submitButtonText}>Complete Profile</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
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
    logoSection: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingBottom: 24,
    },

    logoImage: {
        width: 120,
        height: 150,
    },
    title: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 8,
        letterSpacing: -0.3,
    },
    subtitle: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 14,
        textAlign: "center",
        maxWidth: 280,
    },
    formContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    formContent: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 24,
    },
    field: {
        marginBottom: 20,
    },

    textarea: {
        height: 84,
        textAlignVertical: "top",
    },
    row: {
        flexDirection: "row",
        gap: 12,
    },

    submitButton: {
        width: "100%",
        backgroundColor: "#0D8A4F",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    submitButtonText: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 16,
    },
    helpText: {
        fontSize: 12,
        color: "#9CA3AF",
        textAlign: "center",
        marginTop: 16,
        marginBottom: 24,
        lineHeight: 18,
    },
    backIcon: {
        width: 42,
        height: 42,
    },
    formContent: {
        paddingHorizontal: 24,
        paddingTop: 24,
    },
});