import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, StatusBar, Image, } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { API_URLS } from '../Util/AppConst';
import { apiCall, Spinner } from '../Util/AxiosUtil';
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function SingleDeviceDetails({ navigation, route }) {
    const insets = useSafeAreaInsets();
    const { model, modelId, brand, } = route.params || {};

    const [modelData, setModelData] = useState(null);
    const [variants, setVariants] = useState([]);

    const [selectedVariant, setSelectedVariant] = useState(null);
    const [price, setPrice] = useState('');

    const [loading, setLoading] = useState(false);

    const [gotExactValue, setGotExactValue] = useState(false);
    const [showFinalPrice, setShowFinalPrice] = useState(false);
    const [finalPrice, setFinalPrice] = useState('');

    useEffect(() => {
        if (modelId) {
            getModelDetails();
        }
    }, [modelId]);

    const getModelDetails = () => {
        setLoading(true);
        const url = `${API_URLS.MODELS}/${modelId}?mobile=true`;
        console.log('MODEL DETAILS URL:', url);
        apiCall({
            method: 'GET',
            url: url,
            data: {},
            callback: (response) => {
                if (response?.data) {
                    const data = response.data;
                    setModelData(data);

                    const validVariants =
                        data?.ramStorageComb?.filter(
                            item =>
                                item?.price !== undefined &&
                                item?.price !== null &&
                                item?.price !== ''
                        ) || [];

                    setVariants(validVariants);
                }
                setLoading(false);
            },
            setLoading: setLoading,
        });
    };

    const handleVariantClick = (variant) => {
        setSelectedVariant(variant);
        setPrice(
            variant?.price || ''
        );
        setGotExactValue(true);
    };

    const formatPrice = (value) => {
        if (
            value === undefined ||
            value === null ||
            value === ''
        ) {
            return '0';
        }

        return new Intl.NumberFormat(
            'en-IN'
        ).format(
            Number(value)
        );

    };

    //  GET EXACT VALUE
    const handleGetExactValue = async () => {
        if (!selectedVariant) return;
        await AsyncStorage.setItem(
            'details',
            JSON.stringify({
                selectedvariant: {
                    ramStorage: selectedVariant?.ramStorage,
                    price: selectedVariant?.price,
                    _id: modelData?._id,
                },
                modelId: modelData?._id || modelId,
                model: modelData,
            })
        );

        navigation.navigate('EnquiryQuestion', {
            model: modelData,
            modelId: modelData?._id || modelId,
            brand,
            variant: selectedVariant,
        });
    };

    // SHOW FINAL PRICE WHEN COMING BACK FROM ENQUIRY QUESTION

    useEffect(() => {
        if (route.params?.showFinalPrice === true) {

            setShowFinalPrice(true);
            setGotExactValue(true);

            if (route.params?.variant) {
                setSelectedVariant(route.params.variant);
            }

            if (
                route.params?.finalPrice !== undefined &&
                route.params?.finalPrice !== null
            ) {
                setFinalPrice(
                    route.params.finalPrice
                );
            }
        }
    }, [
        route.params?.showFinalPrice,
        route.params?.finalPrice,
        route.params?.variant,
    ]);

    //  RECALCULATE

    const handleRecalculate = async () => {
        await AsyncStorage.removeItem('trueDetails');
        await AsyncStorage.removeItem('finalPrice');
        const updatedDetails = {
            selectedvariant: {
                ...selectedVariant,
                _id: modelData?._id || modelId,
            },
            modelId: modelData?._id || modelId,
            model: modelData,
        };

        await AsyncStorage.setItem(
            'details',
            JSON.stringify(updatedDetails),
        );

        navigation.navigate('EnquiryQuestion', {
            model: modelData,
            modelId: modelData?._id || modelId,
            brand: brand,
            variant: updatedDetails.selectedvariant,
        });
    };
    const handleSubmit = () => {

        navigation.navigate(
            'AddressScreen',
            {
                model: modelData,
                modelId: modelData?._id || modelId,
                brand: brand,
                variant: selectedVariant,
                finalPrice: finalPrice || price,
            }
        );
    };

    const basePrice = finalPrice;

    if (loading || !modelData) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <Spinner />
            </SafeAreaView>
        );
    }

    return (

        <SafeAreaView style={styles.container}>

            {/* {loading && <Spinner />} */}
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>

                <TouchableOpacity
                    onPress={() =>
                        navigation.goBack()
                    }
                    style={styles.backButton}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8, }}>
                    <ChevronLeft width={24} height={24} color="#374151" />
                </TouchableOpacity>

                <Text style={styles.title}>
                    {
                        showFinalPrice
                            ? 'Final Price'
                            : gotExactValue
                                ? 'Estimated Value'
                                : 'Device Details'
                    }
                </Text>

            </View>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={
                    styles.scrollContent
                }
                showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <View style={styles.imageWrap}>
                            <Image
                                source={{
                                    uri:
                                        modelData?.image
                                }}
                                style={styles.deviceImage}
                                resizeMode="contain"
                            />
                        </View>

                        <View style={styles.infoSection}>
                            <Text style={styles.modelName}>
                                {modelData?.name || model?.name}
                                {gotExactValue && selectedVariant?.ramStorage
                                    ? ` (${selectedVariant.ramStorage})GB`
                                    : ''}
                            </Text>
                            {
                                !gotExactValue ? (
                                    <>
                                        <Text style={styles.variantTitle}>
                                            Choose a Variant
                                        </Text>
                                        <View style={styles.variantGrid}>
                                            {variants.map((variant) => (
                                                <TouchableOpacity
                                                    key={variant?._id}
                                                    style={[
                                                        styles.variantButton,
                                                        selectedVariant?._id ===
                                                            variant?._id
                                                            ? styles.variantButtonActive
                                                            : styles.variantButtonInactive,
                                                    ]}

                                                    onPress={() =>
                                                        handleVariantClick(variant)
                                                    }
                                                    activeOpacity={0.7}>

                                                    <Text
                                                        style={[styles.variantText,
                                                        selectedVariant?._id ===
                                                            variant?._id
                                                            ? styles.variantTextActive
                                                            : styles.variantTextInactive,
                                                        ]}>

                                                        {variant?.ramStorage}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                            )
                                            }
                                        </View>
                                    </>

                                ) : (
                                    <>
                                        <Text style={styles.getUptoLabel}>
                                            {showFinalPrice ? "Selling Price" : "Get Upto"}
                                        </Text>

                                        <Text style={styles.price}>
                                            ₹{formatPrice(
                                                showFinalPrice
                                                    ? (finalPrice || price)
                                                    : price
                                            )}
                                        </Text>
                                        {
                                            showFinalPrice && (
                                                <TouchableOpacity
                                                    onPress={handleRecalculate}
                                                >
                                                    <Text style={styles.recalculateText}>
                                                        Recalculate
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                    </>
                                )
                            }
                        </View>
                    </View>
                </View>

                {
                    showFinalPrice && (
                        <View style={styles.summaryBox}>
                            <Text style={styles.summaryTitle}>
                                Price Summary
                            </Text>

                            <View style={styles.summaryRow}>

                                <Text> Base Price </Text>
                                <Text>
                                    ₹ {formatPrice(basePrice)}
                                </Text>
                            </View>

                            <View style={styles.summaryRow}>
                                <Text>
                                    Pickup Charges
                                </Text>


                                <View style={{ flexDirection: 'row', }} >
                                    <Text style={styles.strike}>
                                        ₹100
                                    </Text>

                                    <Text style={styles.free}>
                                        Free
                                    </Text>

                                </View>
                            </View>

                            <View style={styles.divider} />
                            <View style={styles.summaryRow}>
                                <Text style={{ fontWeight: '700', }}>
                                    Total Amount
                                </Text>

                                <Text style={styles.total}>
                                    ₹{formatPrice(finalPrice || price)}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={handleSubmit}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.submitButtonText}>
                                    Submit
                                </Text>

                                <ChevronRight width={18} height={18} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                    )
                }
            </ScrollView>

            {
                !showFinalPrice && (
                    <View
                        // style={[
                        //     styles.ctaWrap,
                        //     {
                        //         paddingBottom: Math.max(insets.bottom, 16) + 12,
                        //     },
                        // ]}
                        style={[
                            styles.ctaWrap,
                            {
                                paddingBottom: insets.bottom + 16,
                            },
                        ]}


                    // style={styles.ctaWrap}
                    >
                        <TouchableOpacity
                            disabled={!gotExactValue}
                            onPress={handleGetExactValue}
                            style={[styles.ctaButton,
                            gotExactValue
                                ? styles.ctaButtonEnabled
                                : styles.ctaButtonDisabled,
                            ]}

                            activeOpacity={0.8}>

                            <Text style={[
                                styles.ctaText,
                                gotExactValue
                                    ? styles.ctaTextEnabled
                                    : styles.ctaTextDisabled,
                            ]}
                            >
                                Get Exact Value
                            </Text>
                            <ChevronRight width={20} height={20} color={gotExactValue ? '#FFFFFF' : '#9CA3AF'} />
                        </TouchableOpacity>
                    </View>
                )
            }
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },

    header: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 2,
    },

    backButton: {
        padding: 8,
        marginLeft: -4,
        borderRadius: 999,
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },

    scroll: {
        flex: 1,
    },

    scrollContent: {
        paddingBottom: 120,
    },

    card: {
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        paddingTop: 40,
        paddingBottom: 40,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 3,
        shadowOffset: {
            width: 0,
            height: 1,
        },

        elevation: 1,
    },

    row: {
        flexDirection: 'row',
        gap: 16,
    },

    imageWrap: {
        width: 112,
        height: 144,
        borderRadius: 16,
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
    },

    deviceImage: {
        width: '90%',
        height: '90%',
    },

    noImage: {
        fontSize: 48,
    },

    infoSection: {
        flex: 1,
        justifyContent: 'center',
    },

    modelName: {
        fontSize: 20,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 12,
        lineHeight: 22,
    },

    variantTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#374151',
        marginBottom: 8,
    },

    variantGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    variantButton: {
        width: '47%',
        marginHorizontal: '1.5%',
        marginBottom: 10,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    variantButtonActive: {
        borderColor: '#0D8A4F',
        backgroundColor: '#F0FDF4',
    },

    variantButtonInactive: {
        borderColor: '#E5E7EB',
        backgroundColor: '#F9FAFB',
    },

    variantText: {
        fontSize: 12,
        fontWeight: '700',
    },

    variantTextActive: {
        color: '#0D8A4F',
    },

    variantTextInactive: {
        color: '#4B5563',
    },

    selectedVariant: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },

    getUptoLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#374151',
    },

    price: {
        fontSize: 30,
        fontWeight: '800',
        color: '#0D8A4F',
        marginTop: 8,
    },

    recalculateText: {
        marginTop: 8,
        color: '#0D8A4F',
        textDecorationLine: 'underline',
        fontWeight: '700',
    },

    ctaWrap: {
        paddingHorizontal: 20,
        paddingTop: 12,
        // paddingBottom: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },

    ctaButton: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },

    ctaButtonEnabled: {
        backgroundColor: '#0D8A4F',
    },

    ctaButtonDisabled: {
        backgroundColor: '#E5E7EB',
    },

    ctaText: {
        fontWeight: '700',
        fontSize: 15,
    },

    ctaTextEnabled: {
        color: '#FFFFFF',
    },

    ctaTextDisabled: {
        color: '#9CA3AF',
    },

    summaryBox: {
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginTop: 30,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 3,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 2,
    },

    summaryTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 15,
        color: '#111827',
    },

    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    strike: {
        textDecorationLine: 'line-through',
        color: '#6B7280',
        marginRight: 5,
    },

    free: {
        color: '#0D8A4F',
        fontWeight: '700',
    },

    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 15,
    },

    total: {
        color: '#0D8A4F',
        fontWeight: '800',
        fontSize: 18,
    },

    submitButton: {
        marginTop: 20,
        backgroundColor: '#0D8A4F',
        borderRadius: 14,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginRight: 8,
    },

    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    loadingText: {
        marginTop: 12,
        color: '#6B7280',
        fontSize: 14,
    },

});

