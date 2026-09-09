
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from "react-native";

import { ChevronLeft } from "lucide-react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { API_URLS } from "../Util/AppConst";
import { apiCall, Spinner } from "../Util/AxiosUtil";
import InputComponent from "../CustomComponent/InputComponent";

const logoImage = require("../../Assets/ResalePhoneLogo.png");

export default function AddressScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState({
    houseNo: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "Home",
  });

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [existingAddresses, setExistingAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [errors, setErrors] = useState({});
  const addressTypes = ["Home", "Office", "Other"];
  const [addressLoading, setAddressLoading] = useState(true);

  useEffect(() => {
    getUserAndAddresses();
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev, [field]: value,
    }));

    setErrors(prev => ({
      ...prev, [field]: "",
    }));
  };

  const getUserAndAddresses = async () => {
    const userData = await AsyncStorage.getItem("user");

    if (!userData) {
      setAddressLoading(false);
      return;
    }

    const loggedUser = JSON.parse(userData);

    setUser(loggedUser);

    const userId = loggedUser?._id;

    if (!userId) {
      setAddressLoading(false);
      return;
    }

    setLoading(true);

    apiCall({
      method: "GET",
      url: `${API_URLS.USERS}/${userId}`,
      data: {},
      callback: getUserCallback,
      setLoading: setLoading,
    });
  };

  const getUserCallback = async (response) => {
    setLoading(false);
    setAddressLoading(false);
    console.log("GET USER RESPONSE:", response);

    if (response?.status === 200) {
      const updatedUser = response?.data?.user || response?.data;

      if (updatedUser) {
        setUser(updatedUser);

        await AsyncStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        const addresses = updatedUser?.address || [];

        setExistingAddresses(addresses);

        setShowNewAddressForm(addresses.length === 0);
      }
    }
  };



  const handleSelectExistingAddress = async (address) => {
    console.log("SELECTED EXISTING ADDRESS:", address);

    setSelectedAddress(address);

    await AsyncStorage.setItem(
      "selectedAddress",
      JSON.stringify(address)
    );
  };



  const saveActivity = async (
    addressToUse,
    updatedUser = null
  ) => {

    const userData = await AsyncStorage.getItem("user");

    const currentUser =
      updatedUser ||
      (userData ? JSON.parse(userData) : null);

    const phoneNumber = await AsyncStorage.getItem("LoggedPhoneNumber");
    const trueDetailsData = await AsyncStorage.getItem("trueDetails");
    const detailsData = await AsyncStorage.getItem("details");
    const finalPriceData = await AsyncStorage.getItem("finalPrice");
    const selectedVariantData = await AsyncStorage.getItem("selectedvariant");
    const details = JSON.parse(detailsData);
    const defects = JSON.parse(trueDetailsData);
    const selectedVariant = JSON.parse(selectedVariantData);
    const finalPrice = JSON.parse(finalPriceData);

    const requestData = {
      contact_number: phoneNumber || currentUser?.contact_number,
      model: selectedVariant?._id || details?.selectedvariant?._id,
      ramStorage: selectedVariant?.ramStorage || details?.selectedvariant?.ramStorage,
      defects: defects,
      final_price: finalPrice,
      add_on_amount: 0,
      selected_address: addressToUse,
      status: currentUser?.partner
        ? "APPROVAL_PENDING"
        : "PENDING",
    };
    setLoading(true);

    apiCall({
      method: "POST",
      url: API_URLS.ACTIVITIES,
      data: requestData,
      callback: getActivityCallback,
      setLoading: setLoading,
    });
  };

  const getActivityCallback = async (response) => {
    setLoading(false);
    if (
      response?.status === 200) {
      await AsyncStorage.removeItem("defectsAndEnquiryQestion");
      await AsyncStorage.removeItem("modelsData");
      await AsyncStorage.removeItem("selectedBrandName");
      await AsyncStorage.removeItem("details");
      await AsyncStorage.removeItem("finalPrice");
      await AsyncStorage.removeItem("selectedModelImages");
      await AsyncStorage.removeItem("selectedModelName");
      await AsyncStorage.removeItem("selectedModelPrice");
      await AsyncStorage.removeItem("selectedvariant");
      await AsyncStorage.removeItem("trueDetails");
      navigation.navigate("Home");
    }
  };


  const updateAddressCallback = async (response) => {
    setLoading(false);
    if (response?.status === 200) {
      const updatedUser = response?.data?.user;
      if (updatedUser) {
        setUser(updatedUser);

        await AsyncStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        const addresses =
          updatedUser?.address || [];

        setExistingAddresses(addresses);
        const latestAddress =
          addresses[addresses.length - 1];

        console.log(
          "LATEST ADDRESS:",
          latestAddress
        );

        setSelectedAddress(latestAddress);

        await AsyncStorage.setItem(
          "selectedAddress",
          JSON.stringify(latestAddress)
        );

        ToastAndroid.show(
          "Address saved successfully",
          ToastAndroid.SHORT
        );

        saveActivity(
          latestAddress,
          updatedUser
        );
      }
    } else {
      ToastAndroid.show(
        response?.data?.message ||
        response?.data?.error ||
        "Failed to update address",
        ToastAndroid.LONG
      );
    }
  };
  const handleValidation = () => {
    const newErrors = {};

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Please enter pincode";
    } else if (formData.pincode.length !== 6) {
      newErrors.pincode = "Please enter 6 digit pincode";
    }

    if (!formData.houseNo.trim()) {
      newErrors.houseNo = "Please enter House / Flat No.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Please enter Street / Area";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Please enter City";
    }

    if (!formData.state.trim()) {
      newErrors.state = "Please enter State";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ADD NEW ADDRESS
  const handleSubmit = async () => {

    if (!handleValidation()) return;

    const userData = await AsyncStorage.getItem("user");
    const currentUser = JSON.parse(userData || "null");
    const userId = currentUser?._id;

    if (!userId) {
      return;
    }

    const requestData = {
      pincode: Number(formData.pincode),
      flat_no: formData.houseNo,
      area: `${formData.address}, ${formData.city}, ${formData.state}`,
      land_mark: formData.landmark,
      alternate_number: null,
      type: formData.addressType,
    };

    console.log(
      "ADDRESS REQUEST:",
      requestData
    );

    setLoading(true);

    apiCall({
      method: "PUT",
      url: `${API_URLS.UPDATE_ADDRESS}/${userId}`,
      data: requestData,
      callback: updateAddressCallback,
      setLoading: setLoading,
    });
  };


  const handleContinueWithSelectedAddress = async () => {
    if (!selectedAddress) {
      alert('Please select an address');
      return;
    }

    console.log(
      "CONTINUE WITH ADDRESS:",
      selectedAddress
    );

    await AsyncStorage.setItem(
      "selectedAddress",
      JSON.stringify(selectedAddress)
    );

    saveActivity(selectedAddress, user);
  };

  const getAddressText = (address) => {
    return [
      address?.flat_no,
      address?.area,
      address?.land_mark
        ? `Landmark: ${address.land_mark}`
        : null,
      address?.pincode,
    ]
      .filter(Boolean)
      .join(", ");
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
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ChevronLeft
              size={24}
              color="#FFFFFF"
            />

            <Text style={styles.backButtonText}>
              Back
            </Text>
          </TouchableOpacity>
        </View>

        {/* LOGO */}

        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
            <Image
              source={logoImage}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>
            Address
          </Text>

          <Text style={styles.subtitle}>
            Select or add the address where we should
            pick up your device
          </Text>
        </View>

        <ScrollView
          style={styles.formContainer}
          // contentContainerStyle={styles.formContent}
          // contentContainerStyle={[
          //   styles.formContent,
          //   {
          //     paddingBottom: insets.bottom,
          //   },
          // ]}
          contentContainerStyle={[
            styles.formContent,
            {
              paddingBottom: insets.bottom,
            },
          ]}
          keyboardShouldPersistTaps="handled"
        >

          {addressLoading ? (
            <View style={styles.addressLoadingContainer}>
              <Text style={styles.addressLoadingText}>
                Loading address...
              </Text>
            </View>
          ) : (
            <>

              {existingAddresses.length > 0 &&
                !showNewAddressForm && (
                  <>
                    <Text style={styles.sectionTitle}>
                      Select Pickup Address
                    </Text>

                    {existingAddresses.map(
                      (address, index) => {
                        const isSelected =
                          selectedAddress?._id ===
                          address?._id;

                        return (
                          <TouchableOpacity
                            key={
                              address?._id ||
                              index
                            }
                            activeOpacity={0.8}
                            onPress={() =>
                              handleSelectExistingAddress(
                                address
                              )
                            }
                            style={[
                              styles.existingAddressCard,
                              isSelected &&
                              styles.selectedAddressCard,
                            ]}
                          >
                            <View style={styles.addressRadio}>
                              <View
                                style={[
                                  styles.radioOuter,
                                  isSelected &&
                                  styles.radioOuterSelected,
                                ]}
                              >
                                {isSelected && (
                                  <View
                                    style={
                                      styles.radioInner
                                    }
                                  />
                                )}
                              </View>

                              <View
                                style={
                                  styles.addressDetails
                                }
                              >
                                <View
                                  style={
                                    styles.addressHeaderRow
                                  }
                                >
                                  <Text
                                    style={
                                      styles.addressTypeTitle
                                    }
                                  >
                                    {address?.type ||
                                      "Address"}
                                  </Text>
                                </View>

                                <Text
                                  style={
                                    styles.addressText
                                  }
                                >
                                  {getAddressText(
                                    address
                                  )}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      }
                    )}

                    <TouchableOpacity
                      onPress={() => {
                        setShowNewAddressForm(true);
                        setSelectedAddress(null);
                      }}
                      style={styles.addNewAddressButton}
                      activeOpacity={0.85}
                    >
                      <Text
                        style={
                          styles.addNewAddressText
                        }
                      >
                        + Add New Address
                      </Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                      onPress={
                        handleContinueWithSelectedAddress
                      }
                      style={styles.submitButton}
                      activeOpacity={0.85}
                    >
                      <Text
                        style={
                          styles.submitButtonText
                        }
                      >
                        Continue
                      </Text>
                    </TouchableOpacity> */}
                  </>
                )}

              {/* ================================= */}
              {/* ADD NEW ADDRESS */}
              {/* ================================= */}

              {(showNewAddressForm ||
                existingAddresses.length === 0) && (
                  <>
                    {existingAddresses.length > 0 && (
                      <TouchableOpacity
                        onPress={() => {
                          setShowNewAddressForm(false);
                        }}
                        style={styles.backToAddressButton}
                      >
                        <Text
                          style={
                            styles.backToAddressText
                          }
                        >
                          ← Select Existing Address
                        </Text>
                      </TouchableOpacity>
                    )}

                    {/* HOUSE / FLAT */}

                    <View style={styles.field}>
                      <InputComponent
                        label="House / Flat No. *"
                        value={formData.houseNo}
                        onChangeText={(text) => handleChange("houseNo", text)}
                        placeholder="e.g. A-101"
                        error={errors.houseNo}
                      />
                    </View>
                    {/* STREET */}

                    <View style={styles.field}>
                      <InputComponent
                        label="Street / Area *"
                        value={formData.address}
                        onChangeText={(text) => handleChange("address", text)}
                        placeholder="Enter street, area, locality"
                        error={errors.address}
                        multiline
                        numberOfLines={3}
                      />
                    </View>

                    {/* LANDMARK */}

                    <View style={styles.field}>
                      <InputComponent
                        label="Landmark"
                        value={formData.landmark}
                        onChangeText={(text) => handleChange("landmark", text)}
                        placeholder="Nearby landmark (optional)"
                      />
                    </View>
                    {/* CITY */}

                    <View style={styles.row}>
                      <View style={styles.halfField}>
                        <InputComponent
                          label="City *"
                          value={formData.city}
                          onChangeText={(text) => handleChange("city", text)}
                          placeholder="City"
                          error={errors.city}
                        />
                      </View>

                      <View style={styles.halfField}>
                        <InputComponent
                          label="State *"
                          value={formData.state}
                          onChangeText={(text) => handleChange("state", text)}
                          placeholder="State"
                          error={errors.state}
                        />
                      </View>
                    </View>
                    <View style={styles.field}>
                      <InputComponent
                        label="Pincode *"
                        value={formData.pincode}
                        onChangeText={(text) =>
                          handleChange(
                            "pincode",
                            text.replace(/[^0-9]/g, "")
                          )
                        }
                        placeholder="Enter 6-digit pincode"
                        keyboardType="number-pad"
                        maxLength={6}
                        error={errors.pincode}
                      />
                    </View>

                    {/* ADDRESS TYPE */}

                    <View style={styles.field}>
                      <Text style={styles.label}>
                        Save Address As
                      </Text>

                      <View
                        style={
                          styles.addressTypeRow
                        }
                      >
                        {addressTypes.map(
                          (type) => {
                            const isSelected =
                              formData.addressType ===
                              type;

                            return (
                              <TouchableOpacity
                                key={type}
                                onPress={() =>
                                  handleChange(
                                    "addressType",
                                    type
                                  )
                                }
                                style={[
                                  styles.addressTypeButton,
                                  isSelected
                                    ? styles.addressTypeButtonSelected
                                    : styles.addressTypeButtonDefault,
                                ]}
                                activeOpacity={0.85}
                              >
                                <Text
                                  style={[
                                    styles.addressTypeText,
                                    isSelected
                                      ? styles.addressTypeTextSelected
                                      : styles.addressTypeTextDefault,
                                  ]}
                                >
                                  {type}
                                </Text>
                              </TouchableOpacity>
                            );
                          }
                        )}
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={styles.submitButton}
                      activeOpacity={0.85}
                    >
                      <Text
                        style={
                          styles.submitButtonText
                        }
                      >
                        Continue
                      </Text>
                    </TouchableOpacity>

                    <Text style={styles.helpText}>
                      Fields marked with * are required
                    </Text>
                  </>
                )}
            </>
          )}
        </ScrollView>
        {!showNewAddressForm && existingAddresses.length > 0 && (
          <View
            style={[
              styles.bottomButtonContainer,
              {
                paddingBottom: insets.bottom + 16,
              },
            ]}
          >
            <TouchableOpacity
              onPress={handleContinueWithSelectedAddress}
              style={styles.submitButton}
              activeOpacity={0.85}
            >
              <Text style={styles.submitButtonText}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingTop: 16,
    paddingBottom: 24,
  },

  logoCircle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    padding: 16,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },

  logoImage: {
    width: "100%",
    height: "100%",
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
    maxWidth: 300,
  },
  bottomButtonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",

    paddingHorizontal: 24,
    paddingTop: 12,

    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",

    elevation: 10,
  },

  formContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  formContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    // paddingBottom: 30,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
  },

  existingAddressCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },

  selectedAddressCard: {
    borderColor: "#0D8A4F",
    borderWidth: 2,
    backgroundColor: "#F0FDF4",
  },

  addressRadio: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#9CA3AF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },

  radioOuterSelected: {
    borderColor: "#0D8A4F",
  },

  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#0D8A4F",
  },

  addressDetails: {
    flex: 1,
    marginLeft: 12,
  },

  addressHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  addressTypeTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },

  addressText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 21,
  },

  addNewAddressButton: {
    borderWidth: 1,
    borderColor: "#0D8A4F",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },

  addNewAddressText: {
    color: "#0D8A4F",
    fontSize: 15,
    fontWeight: "600",
  },

  backToAddressButton: {
    marginBottom: 20,
  },

  backToAddressText: {
    color: "#0D8A4F",
    fontSize: 15,
    fontWeight: "600",
  },

  field: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },

  input: {
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#1F2937",
    fontSize: 15,
  },

  textarea: {
    height: 84,
    textAlignVertical: "top",
  },

  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  halfField: {
    flex: 1,
  },

  addressTypeRow: {
    flexDirection: "row",
    gap: 12,
  },

  addressTypeButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },

  addressTypeButtonDefault: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
  },

  addressTypeButtonSelected: {
    backgroundColor: "#0D8A4F",
    borderColor: "#0D8A4F",
    elevation: 3,
  },

  addressTypeText: {
    fontSize: 14,
    fontWeight: "600",
  },

  addressTypeTextDefault: {
    color: "#4B5563",
  },

  addressTypeTextSelected: {
    color: "#FFFFFF",
  },

  submitButton: {
    width: "100%",
    backgroundColor: "#0D8A4F",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 24,
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
  addressLoadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },

  addressLoadingText: {
    fontSize: 15,
    color: "#6B7280",
  },
});
