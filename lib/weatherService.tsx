'use server';

import axios from 'axios';
const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const url = `https://api.weatherapi.com/v1`;

export async function fetchWeather(latitude: number, longitude: number) {
    try {
        const response = await axios.get(`${url}/current.json`, {
            params: {
                key: apiKey,
                q: `${latitude},${longitude}`,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Can't get weather data: ${error}`);
    }
}

export async function fetchLocation(city: string) {
    const response = await axios.get(`${url}/search.json`,{
        params: {
            key: apiKey,
            q: city,
        }
    });
    return response.data;
}
