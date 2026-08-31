import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiCall, Spinner } from "../Util/AxiosUtil";
import { API_URLS } from "../Util/AppConst";

export default function WarrantyScreen({ navigation, route }) {

    const [warrantyNames, setWarrantyNames] = useState([]);
    const [selectedWarranty, setSelectedWarranty] = useState(null);
    const [selected, setSelected] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getWarranty();
    }, []);

    const getWarranty = async () => {
        try {
            const details = JSON.parse(
                await AsyncStorage.getItem('details')
            );
            const modelId = details?.selectedvariant?._id;
            console.log('modelId: ', modelId);

            if (!modelId) return;
            setLoading(true);

            apiCall({
                method: 'GET',
                url: `${API_URLS.MODELS}/${modelId}?mobile=true`,
                setLoading,
                callback: handleWarrantyResponse,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleWarrantyResponse = (response) => {
        if (response.status === 200 && response.data?.warranty?.length > 0) {

            const items = response.data.warranty.map((warranty) => ({
                id: warranty.defect?._id,
                name: warranty.defect?.name,
                label: warranty.defect?.name,
                subLabel: warranty.defect?.description,
                price: warranty.price,
            }));

            setWarrantyNames(items);
            console.log('items: ', items);
        }
        setLoading(false);
    };

    const handleSelect = (name) => {
        setSelectedWarranty(name);
        setSelected(true);
    };

    const handleContinue = async () => {
        if (!selectedWarranty) {
            alert('Please select warranty');
            return;
        }

        const details = JSON.parse(
            await AsyncStorage.getItem('details')
        );

        await AsyncStorage.setItem(
            'details',
            JSON.stringify({
                ...details,
                warranty: selectedWarranty,
            }),
        );

        navigation.navigate('DefectSelection', {
            type: 'bodyDefect',
        });
    };

    return (
        <View style={styles.screen}>
            {loading && <Spinner />}
            {/* ── Header ── */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("EnquiryQuestion")}
                    style={styles.backButton}
                >
                    <ChevronLeft size={24} color="#374151" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mobile Age</Text>
            </View>

            {/* ── Question ── */}
            <ScrollView
                style={styles.body}
                contentContainerStyle={styles.bodyContent}
            >
                <Text style={styles.question}>What is your mobile age?</Text>
                <Text style={styles.subQuestion}>
                    (Because you chose your device is under brand's warranty)
                </Text>

                <View style={styles.grid}>
                    {warrantyNames.map((option) => {
                        const isSelected = selectedWarranty === option.name;
                        return (
                            <TouchableOpacity
                                key={option.id}
                                onPress={() => handleSelect(option.name)}
                                style={[
                                    styles.optionCard,
                                    isSelected
                                        ? styles.optionCardSelected
                                        : styles.optionCardDefault,
                                ]}
                                activeOpacity={0.85}
                            >
                                {/* Radio indicator */}
                                <View
                                    style={[
                                        styles.radioOuter,
                                        isSelected
                                            ? styles.radioOuterSelected
                                            : styles.radioOuterDefault,
                                    ]}
                                >
                                    {isSelected && <View style={styles.radioInner} />}
                                </View>

                                <View style={styles.optionTextWrap}>
                                    <Text
                                        style={[
                                            styles.optionLabel,
                                            isSelected
                                                ? styles.optionLabelSelected
                                                : styles.optionLabelDefault,
                                        ]}
                                    >
                                        {option.label}
                                    </Text>
                                    {option.subLabel && (
                                        <Text style={styles.optionSubLabel}>
                                            {option.subLabel}
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            {/* ── Continue Button ── */}
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={handleContinue}
                    disabled={!selected}
                    style={[
                        styles.continueButton,
                        selected
                            ? styles.continueButtonActive
                            : styles.continueButtonDisabled,
                    ]}
                    activeOpacity={0.85}
                >
                    <Text
                        style={[
                            styles.continueButtonText,
                            selected
                                ? styles.continueButtonTextActive
                                : styles.continueButtonTextDisabled,

                        ]}
                    >
                        Continue
                    </Text>
                    <ChevronRight
                        size={20}
                        color={selected ? "#FFFFFF" : "#9CA3AF"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    header: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    backButton: {
        padding: 8,
        marginLeft: -4,
        borderRadius: 999,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#111827",
    },
    body: {
        flex: 1,
    },
    bodyContent: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 128,
    },
    question: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 4,
    },
    subQuestion: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 24,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    optionCard: {
        width: "48.5%",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        borderRadius: 16,
        borderWidth: 2,
        padding: 14,
        marginBottom: 12,
    },
    optionCardDefault: {
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
    },
    
    optionCardSelected: {
        borderColor: "#0D8A4F",
        backgroundColor: "#FFFFFF",
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 2,
    },
    radioOuterDefault: {
        borderColor: "#D1D5DB",
    },
    radioOuterSelected: {
        borderColor: "#0D8A4F",
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#0D8A4F",
    },
    optionTextWrap: {
        flex: 1,
        minWidth: 0,
    },
    optionLabel: {
        fontSize: 14,
        fontWeight: "bold",
        lineHeight: 20,
    },
    optionLabelDefault: {
        color: "#111827",
    },
    optionLabelSelected: {
        color: "#0D8A4F",
    },
    optionSubLabel: {
        fontSize: 12,
        fontWeight: "500",
        color: "#D97706",
        marginTop: 4,
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 24,
    },
    continueButton: {
        width: "100%",
        paddingVertical: 16,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3,
    },
    continueButtonActive: {
        backgroundColor: "#0D8A4F",
    },
    continueButtonDisabled: {
        backgroundColor: "#E5E7EB",
    },
    continueButtonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    continueButtonTextActive: {
        color: "#FFFFFF",
    },
    continueButtonTextDisabled: {
        color: "#9CA3AF",
    },
});