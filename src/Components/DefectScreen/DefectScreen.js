import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Image
} from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DefectCard from "../CustomComponent/DefectCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiCall, Spinner } from "../Util/AxiosUtil";
import { API_URLS } from "../Util/AppConst";
import { DEFECT_ICONS, DEFECT_DATA } from "../DefectScreen/DefectData";
const recellBackIcon = require("../../Assets/BackIcon.png");

export default function DefectScreen({ navigation, route }) {
    const insets = useSafeAreaInsets();
    const [loading, setLoading] = useState(false);
    const [defects, setDefects] = useState([]);
    const [selectedDefects, setSelectedDefects] = useState([]);

    const { type } = route.params;

    const screen = DEFECT_DATA?.[type];

    const handleCardPress = (name) => {
        if (selectedDefects.includes(name)) {

            const updated =
                selectedDefects.filter(
                    item => item !== name
                );
            setSelectedDefects(updated);
        } else {
            const updated = [
                ...selectedDefects,
                name,
            ];
            setSelectedDefects(updated);
        }
    };

    useEffect(() => {
        setDefects([]);
        setSelectedDefects([]);
        getDefects();
    }, [type]);

    const getDefects = async () => {
        try {
            const details = JSON.parse(
                await AsyncStorage.getItem("details")
            );

            console.log(
                "DETAILS =>",
                JSON.stringify(details, null, 2)
            );

            const modelId =
                route?.params?.modelId ||
                details?.selectedvariant?._id;

            if (!modelId) {
                return;
            }

            apiCall({
                method: "GET",
                url: `${API_URLS.MODELS}/${modelId}?mobile=true`,
                setLoading,
                callback: (response) =>
                    handleDefectResponse(response, type),
            });
        } catch (error) {
            console.log("GET DEFECT ERROR =>", error);
            setLoading(false);
        }
    };

    const handleContinue = async () => {

        const details = JSON.parse(
            await AsyncStorage.getItem("details"));

        const selectedObject = {};

        selectedDefects.forEach(defect => {
            selectedObject[defect] = true;
        });

        const updatedDetails = {
            ...details,
            ...selectedObject,
        };

        await AsyncStorage.setItem(
            "details",
            JSON.stringify(updatedDetails)
        );

        if (type === "bodyDefect") {
            const navigationPaths = {
                "Broken/scratch on device screen": "brokenScratch",
                "Dead Spot/Visible line and Discoloration on screen": "defectiveScreen",
                "Scratch/Dent on device body": "scratchesBodyDefect",
                "Device panel missing/broken": "devicePanelMissing",
            };

            const selectedDefect = selectedDefects.find(
                (defect) => selectedObject[defect]
            );

            if (selectedDefect && navigationPaths[selectedDefect]) {
                navigation.push("DefectSelection", {
                    type: navigationPaths[selectedDefect],
                });
            } else {
                navigation.push("DefectSelection", {
                    type: "functionalDefect",
                });
            }

            return;
        }

        if (type === "availableAccessories") {

            const trueDetails =
                Object.keys(updatedDetails).filter(
                    key => updatedDetails[key] === true
                );

            if (details?.warranty) {
                trueDetails.push(details.warranty);
            }

            await AsyncStorage.setItem(
                "trueDetails",
                JSON.stringify(trueDetails)
            );

            apiCall({
                method: "POST",
                url: `${API_URLS.MODELS}/calculate-defects-price`,
                data: {
                    defects: trueDetails,
                    modelId:
                        updatedDetails?.selectedvariant?._id,
                    ramStorage:
                        updatedDetails?.selectedvariant?.ramStorage,
                },

                callback: async (response) => {
                    if (response?.status === 200) {

                        const calculatedFinalPrice =
                            response?.data?.totalPrice;

                        await AsyncStorage.setItem(
                            "finalPrice",
                            String(calculatedFinalPrice)
                        );

                        const storedDetails = JSON.parse(
                            await AsyncStorage.getItem("details"));

                        navigation.replace(
                            "DeviceDetails",
                            {
                                model: storedDetails?.model,
                                modelId:
                                    storedDetails?.modelId ||
                                    storedDetails?.selectedvariant?._id,
                                showFinalPrice: true,
                                finalPrice: calculatedFinalPrice,
                                variant: storedDetails?.selectedvariant,
                            }
                        );
                    }
                },
            });

            return;
        }

        if (type === "brokenScratch" || type === "defectiveScreen" || type === "scratchesBodyDefect" || type === "devicePanelMissing") {
            navigation.push("DefectSelection", {
                type: "functionalDefect",
            });
            return;
        }

        if (type === "functionalDefect") {
            navigation.push("DefectSelection", {
                type: "availableAccessories",
            });
            return;
        }
    };


    const handleDefectResponse = (response, currentType) => {
        if (response.status === 200) {

            const defectMapping = {
                bodyDefect: "bodyDefects",
                brokenScratch: "brokenScratchDefects",
                scratchesBodyDefect: "scrachesBodyDefect",
                devicePanelMissing: "devicePanelMissing",
                defectiveScreen: "screenDefects",
                functionalDefect: "functionalDefects",
                availableAccessories: "availableAccessories",
            };

            const defectKey = defectMapping[currentType];
            const defectList =
                response?.data?.[defectKey] || [];

            const formattedData = defectList.map((item) => ({
                _id: item?._id || item?.defect?._id,
                name: item?.name || item?.defect?.name,

                image: item?.image || item?.defect?.image,
                price: item?.price,

                Icon:
                    DEFECT_ICONS[
                    item?.name || item?.defect?.name
                    ],
            }));

            setDefects(formattedData);
            console.log('formattedData: ', formattedData);
        }
        setLoading(false);
    };




    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {loading && <Spinner />}

                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerRow}>

                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            {/* <ChevronLeft size={28} color="#000" /> */}
                            <Image
                                source={recellBackIcon}
                                style={styles.backIcon}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>

                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerTitle}>
                                {screen?.title}
                            </Text>

                            <Text style={styles.headerSubtitle}>
                                {screen?.subtitle}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Cards */}
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.grid}>
                        {defects.map((item) => (
                            <DefectCard
                                key={item._id}
                                label={item.name}
                                Icon={item.Icon}
                                selected={selectedDefects.includes(item.name)}
                                onPress={() => handleCardPress(item.name)}

                            />
                        ))}
                    </View>
                </ScrollView>

                {/* Continue */}
                <View
                    // style={styles.continueWrap}
                    style={[
                        styles.continueWrap,
                        {
                            paddingBottom: insets.bottom + 16,
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={handleContinue}
                    >
                        <Text style={styles.continueText}>
                            Continue
                        </Text>

                        <ChevronRight
                            size={20}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },

    container: {
        flex: 1,
    },

    header: {
        backgroundColor: "#FFF",
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 16,
        elevation: 2,
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    backIcon: {
        width: 42,
        height: 42,
    },

    backButton: {
        marginRight: 8,
        padding: 8,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
        flexShrink: 1,
    },

    headerSubtitle: {
        fontSize: 12,
        color: "#9CA3AF",
        marginTop: 2,
        flexShrink: 1,
    },
    headerTextContainer: {
        flex: 1,
        paddingRight: 10,
    },

    scrollContent: {
        padding: 20,
        paddingBottom: 120,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    continueWrap: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 16,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
    },

    continueButton: {
        backgroundColor: "#0D8A4F",
        borderRadius: 16,
        paddingVertical: 16,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    continueText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
        marginRight: 8,
    },
});