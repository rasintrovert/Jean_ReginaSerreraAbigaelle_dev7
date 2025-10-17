import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, ActivityIndicator, Text, Image } from "react-native";
import WeatherHeader from "./components/WeatherHeader";
import WeatherDetails from "./components/WeatherDetails";
import { fetchCurrentWeather, fetchForecast } from "./services/weatherService";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";

export default function App() {
    const [weather, setWeather] = useState<any>(null);
    const [forecast, setForecast] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const city = "Port-au-Prince";

    useEffect(() => {
        async function getWeather() {
            try {
                const currentData = await fetchCurrentWeather(city);
                const forecastData = await fetchForecast(city);

                setWeather(currentData);
                setForecast(forecastData);
            } catch (err) {
                console.error(err);
                setError("Impossible de récupérer la météo");
            } finally {
                setLoading(false);
            }
        }

        getWeather();
    }, []);

    if (loading) {
        return (
            <SafeAreaViewContext style={styles.safe}>
                <StatusBar barStyle="light-content" backgroundColor={styles.safe.backgroundColor} />
                <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />
            </SafeAreaViewContext>
        );
    }

    if (error) {
        return (
            <SafeAreaViewContext style={styles.safe}>
                <StatusBar barStyle="light-content" backgroundColor={styles.safe.backgroundColor} />
                <Text style={{ color: "#fff", marginTop: 50 }}>{error}</Text>
            </SafeAreaViewContext>
        );
    }

    const cityName = `${weather.location.name}, ${weather.location.region}`;
    // Formater l'heure au format 12h avec am/pm et fuseau horaire
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZoneName: 'short'
        };
        return date.toLocaleTimeString('en-US', timeOptions);
    };
    
    const updateTime = `As of ${formatTime(weather.current.last_updated)}`;
    const temperature = `${weather.current.temp_c}°C`;
    const condition = weather.current.condition.text;
    const weatherIcon = `https:${weather.current.condition.icon}`; // URL de l'icône
    const forecastText =
        forecast?.forecast?.forecastday?.[0]
            ? `Day ${forecast.forecast.forecastday[0].day.maxtemp_c}° • Night ${forecast.forecast.forecastday[0].day.mintemp_c}°`
            : "";
    
    const alertText = "RIP CURRENT STATE...";
    const alertCount = 1;

    return (
        <SafeAreaViewContext style={styles.safe}>
            <StatusBar barStyle="light-content" backgroundColor={styles.safe.backgroundColor} />
            <ScrollView contentContainerStyle={styles.scroll}>
                <WeatherHeader
                    city={cityName}
                    updateTime={updateTime}
                    temperature={temperature}
                    condition={condition}
                    forecast={forecastText}
                    weatherIcon={weatherIcon}
                    alertText={alertText}
                    alertCount={alertCount}
                />
                <WeatherDetails weather={weather} forecast={forecast} />
            </ScrollView>
        </SafeAreaViewContext>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#3b3838ff" },
    scroll: { flexGrow: 1, paddingHorizontal: 16, paddingTop: 20, backgroundColor: "#3b3838ff" },
});
