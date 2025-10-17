import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import WeatherAlert from "./WeatherAlert";

interface WeatherHeaderProps {
    city: string;
    updateTime: string;
    temperature: string;
    condition: string;
    forecast: string;
    weatherIcon: string;
    alertText?: string;
    alertCount?: number;
}

export default function WeatherHeader({
    city,
    updateTime,
    temperature,
    condition,
    forecast,
    weatherIcon,
    alertText,
    alertCount,
}: WeatherHeaderProps) {
    return (
        <View style={styles.hero}>
            {/* Ligne supérieure */}
            <View style={styles.headerTop}>
                <Text style={styles.cityName}>{city}</Text>
                <Text style={styles.updateTime}>{updateTime}</Text>
            </View>

            {/* Section principale */}
            <View style={styles.headerMain}>
                <View style={styles.tempRow}>
                    <Text style={styles.temperature}>{temperature}</Text>
                    <Image source={{ uri: weatherIcon }} style={styles.weatherIcon} />
                </View>

                <Text style={styles.conditionText}>{condition}</Text>
                <Text style={styles.forecastText}>{forecast}</Text>
            </View>

            {/* Bloc d'alerte */}
            {alertText && <WeatherAlert text={alertText} count={alertCount ?? 0} />}
        </View>
    );
}

const styles = StyleSheet.create({
    hero: {
        borderRadius: 8,
        backgroundColor: "#754deeff",
        height: 180,
        marginBottom: 10,
        position: "relative",
    },
    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 4,
        backgroundColor: "rgba(39, 37, 37, 0.2)",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cityName: { fontSize: 12, fontWeight: "bold", color: "#fff" },
    updateTime: { fontSize: 12, color: "#fff", alignSelf: "center" },
    headerMain: {
        flexDirection: "column",
        alignItems: "flex-start",
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        flex: 1,
        marginTop: 0,
    },
    tempRow: { flexDirection: "row", alignItems: "flex-start" },
    temperature: { fontSize: 50, fontWeight: "900", color: "#fff" },
    weatherIcon: { width: 55, height: 40, marginLeft: 8, marginTop: 15},
    conditionText: { fontSize: 14, fontWeight: "600", color: "#fff"},
    forecastText: { fontSize: 14, fontWeight: "400", color: "#fff"},
});
