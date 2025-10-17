import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { 
    Thermometer, 
    Droplets, 
    Gauge, 
    Eye, 
    Wind, 
    Sun, 
    Moon,
    Sunrise,
    Sunset
} from "lucide-react-native";

interface WeatherDetailsProps {
    weather: any;
    forecast: any;
}

// Composant pour l'arc de soleil
const SunArc = ({ sunrise = "06:38 AM", sunset = "06:46 PM" }) => {
    const [nowSeconds, setNowSeconds] = useState(() => {
        const now = new Date();
        return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setNowSeconds(now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const timeToMinutes = (timeStr: string) => {
        const [time, period] = timeStr.split(" ");
        let [h, m] = time.split(":").map(Number);
        if (period.toLowerCase() === "pm" && h !== 12) h += 12;
        if (period.toLowerCase() === "am" && h === 12) h = 0;
        return h * 60 + m;
    };

    const sunriseMin = timeToMinutes(sunrise);
    const sunsetMin = timeToMinutes(sunset);

    const sunriseSec = sunriseMin * 60;
    const sunsetSec = sunsetMin * 60;

    // progression du jour (0 = lever, 1 = coucher)
    const percent =
        nowSeconds <= sunriseSec
            ? 0
            : nowSeconds >= sunsetSec
                ? 1
                : (nowSeconds - sunriseSec) / (sunsetSec - sunriseSec);

    // demi-cercle (0 → π)
    const angle = Math.PI * percent;
    const radius = 40; // Réduit de 50 à 40
    const cx = 50; // Réduit de 60 à 50
    const cy = 50; // Réduit de 60 à 50

    // position du soleil
    const sunX = cx - radius * Math.cos(angle);
    const sunY = cy - radius * Math.sin(angle);

    return (
        <Svg width="100" height="60" style={styles.sunArc}>
            {/* arc fixe */}
            <Path
                d={`M${cx - radius},${cy} A${radius},${radius} 0 0,1 ${cx + radius},${cy}`}
                fill="none"
                stroke="#f97316"
                strokeWidth="2.5"
            />
            {/* soleil qui bouge */}
            <Circle
                cx={sunX}
                cy={sunY}
                r="5"
                fill="#facc15"
                stroke="#facc15"
                strokeWidth="1.5"
            />
        </Svg>
    );
};

export default function WeatherDetails({ weather, forecast }: WeatherDetailsProps) {
    if (!weather) return null;

    const formatTime = (timeString: string) => {
        if (!timeString) return '';
        // Les heures de lever/coucher sont déjà au format "HH:MM AM/PM"
        return timeString;
    };

    const weatherData = [
        {
            icon: <Thermometer size={20} color="#666" />,
            label: "High / Low",
            value: `${forecast?.forecast?.forecastday?.[0]?.day?.maxtemp_c || weather.current.temp_c}°/${forecast?.forecast?.forecastday?.[0]?.day?.mintemp_c || weather.current.temp_c}°`
        },
        {
            icon: <Droplets size={20} color="#666" />,
            label: "Humidity",
            value: `${weather.current.humidity}%`
        },
        {
            icon: <Gauge size={20} color="#666" />,
            label: "Pressure",
            value: `${weather.current.pressure_in} in`
        },
        {
            icon: <Eye size={20} color="#666" />,
            label: "Visibility",
            value: `${weather.current.vis_km} km`
        },
        {
            icon: <Wind size={20} color="#666" />,
            label: "Wind",
            value: `${weather.current.wind_mph} mph ${weather.current.wind_dir}`
        },
        {
            icon: <Droplets size={20} color="#666" />,
            label: "Dew Point",
            value: `${weather.current.dewpoint_c}°`
        },
        {
            icon: <Sun size={20} color="#666" />,
            label: "UV Index",
            value: `${weather.current.uv} of 11`
        },
        {
            icon: <Moon size={20} color="#666" />,
            label: "Moon Phase",
            value: forecast?.forecast?.forecastday?.[0]?.astro?.moon_phase || "Waxing Crescent"
        }
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Weather Today in {weather.location.name}, {weather.location.region}</Text>
            
            {/* Feels Like + Sun Arc Section */}
            <View style={styles.feelsLikeSunSection}>
                {/* Feels Like Left Side */}
                <View style={styles.feelsLikeLeft}>
                    <Text style={styles.feelsLikeLabel}>Feels Like</Text>
                    <Text style={styles.feelsLikeTemp}>{weather.current.feelslike_c}°</Text>
                </View>
                
                       {/* Sun Arc Right Side */}
                       <View style={styles.sunArcRight}>
                           <SunArc 
                               sunrise={forecast?.forecast?.forecastday?.[0]?.astro?.sunrise || '06:38 AM'}
                               sunset={forecast?.forecast?.forecastday?.[0]?.astro?.sunset || '06:46 PM'}
                           />
                           <View style={styles.sunTimes}>
                        <View style={styles.sunInfoLeft}>
                            <Sunrise size={12} color="#FFA500" />
                            <Text style={styles.sunText}>{formatTime(forecast?.forecast?.forecastday?.[0]?.astro?.sunrise || '')}</Text>
                        </View>
                        <View style={styles.sunSpacer} />
                        <View style={styles.sunInfoRight}>
                            <Sunset size={12} color="#FFA500" />
                            <Text style={styles.sunText}>{formatTime(forecast?.forecast?.forecastday?.[0]?.astro?.sunset || '')}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Weather Details Grid */}
            <View style={styles.detailsGrid}>
                {weatherData.map((item, index) => (
                    <View key={index} style={styles.detailItem}>
                        <View style={styles.detailLeft}>
                            {item.icon}
                            <Text style={styles.detailLabel}>{item.label}</Text>
                        </View>
                        <Text style={styles.detailValue}>{item.value}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 20,
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 16,
        textAlign: "center",
    },
    feelsLikeSunSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
        paddingVertical: 16,
        backgroundColor: "#f8f9fa",
        borderRadius: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    feelsLikeLeft: {
        flex: 1,
        alignItems: "flex-start",
    },
    feelsLikeLabel: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
    },
    feelsLikeTemp: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#333",
    },
    sunArcRight: {
        flex: 1,
        alignItems: "center",
        position: "relative",
    },
    sunArc: {
        marginBottom: 2,
    },
    sunTimes: {
        flexDirection: "row",
        justifyContent: "center",
        width: 160,
        alignItems: "center",
    },
    sunInfoLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    sunSpacer: {
        width: 20,
    },
    sunInfoRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    sunText: {
        fontSize: 11,
        color: "#333",
        marginLeft: 12,
        fontWeight: "500",
    },
    detailsGrid: {
        flex: 1,
    },
    detailItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    detailLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    detailLabel: {
        fontSize: 14,
        color: "#333",
        marginLeft: 12,
        fontWeight: "500",
    },
    detailValue: {
        fontSize: 14,
        color: "#333",
        fontWeight: "600",
    },
});
