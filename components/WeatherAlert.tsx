import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AlertCircle } from "lucide-react-native";

interface WeatherAlertProps {
    text: string;
    count: number;
}

export default function WeatherAlert({ text, count }: WeatherAlertProps) {
    return (
        <View style={styles.alertWidget}>
            <View style={styles.alertLeft}>
                <AlertCircle size={16} color="#FFA500" fill="#FFA500" />
                <Text style={styles.alertText}>{text}</Text>
            </View>
            <View style={styles.alertButton}>
                <Text style={styles.alertButtonText}>+{count} MORE</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    alertWidget: {
        position: "absolute",
        top: 115,
        right: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1c1b1e",
        borderRadius: 8,
        paddingVertical: 3,
        paddingHorizontal: 6,
        minWidth: 140,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    alertLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
    alertText: { color: "#fff", fontWeight: "500", fontSize: 9, flexShrink: 1, marginLeft: 4 },
    alertButton: {
        backgroundColor: "#0f0e10",
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginLeft: 8,
    },
    alertButtonText: { color: "#fff", fontWeight: "bold", fontSize: 7 },
});
