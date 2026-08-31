import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default function DefectCard({
    label,
    Icon,
    selected,
    onPress,
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[
                styles.card,
                selected ? styles.cardSelected : styles.cardUnselected,
            ]}
        >
            <View style={styles.iconArea}>
                <Icon />
            </View>

            <View
                style={[
                    styles.labelArea,
                    {
                        backgroundColor: selected ? "#0D8A4F" : "#F3F4F6",
                    },
                ]}
            >
                <Text
                    style={[
                        styles.label,
                        {
                            color: selected ? "#FFFFFF" : "#374151",
                        },
                    ]}
                >
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "45%",
        marginBottom: 16,
        borderRadius: 16,
        borderWidth: 2,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        minHeight: 220,
    },

    cardSelected: {
        borderColor: "#0D8A4F",
        shadowColor: "#0D8A4F",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },

    cardUnselected: {
        borderColor: "#E5E7EB",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },

    iconArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },

    labelArea: {
        width: "100%",
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 8,
    },

    label: {
        fontSize: 13,
        fontWeight: "700",
        textAlign: "center",
        lineHeight: 18,
    },
});

