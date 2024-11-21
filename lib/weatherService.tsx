'use server';

import axios from 'axios';
const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const url = `https://api.weatherapi.com/v1`;

export async function fetchWeatherByCoordinates(latitude: number , longitude: number ) {
    try {
        const response = await axios.get(`${url}/current.json`, {
            params: {
                key: apiKey,
                q: `${latitude},${longitude}`,
            }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(`Can't get weather data: ${error.message}`);
    }
}

export async function fetchWeatherByCity(city: string) {
    try {
        const response = await axios.get(`${url}/current.json`, {
            params: {
                key: apiKey,
                q: city,
            }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(`Can't get weather data: ${error.message}`);
    }
}


export async function fetchLocation(city: string) {
    const response = await axios.get(`${url}/search.json`,{
        params: {
            key: apiKey,
            q: city,
        }
    });

    const citiesList = response.data.map(city => ({      
        label: `${city.name}, ${city.country}`,
        value: city.id
    }))

    return citiesList;
}
