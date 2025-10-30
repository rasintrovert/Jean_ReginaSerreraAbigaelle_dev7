import axios from "axios";

export async function fetchCurrentWeather(city: string) {
	const apiKey = "611d2c5209654cb5b97211338251909";
	const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=fr`;
	const response = await axios.get(url);
	return response.data;
}

export async function fetchForecast(city: string) {
	const apiKey = "611d2c5209654cb5b97211338251909";
	const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&lang=fr`;
	const response = await axios.get(url);
	return response.data;
}