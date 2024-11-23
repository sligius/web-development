<template>
    <div class="container">
        <h1>Погода</h1>
        <div id="weather-content-wrapper">
            <div id="weather-search-wrapper">
                <select v-model="selectedCountry">
                    <option value="" disabled>Выберите страну</option>
                    <option v-for="country in countries" :key="country.id" :value="country.id">
                        {{ country.name }}
                    </option>
                </select>
                <button @click="getAverageTemperature">Узнать</button>
            </div>
            <div v-if="averageTemperature !== null">
                <h2>Средняя температура по региону {{ selectedCountryName }}: <span id="temperature-value">{{
                    averageTemperature }}°C</span></h2>
            </div>
            <div v-else-if="error">
                <h2 style="color: red;">Ошибка: {{ error }}</h2>
            </div>
            <div v-else>
                <h2>Какая же там средняя температура?</h2>
            </div>
        </div>
    </div>
</template>


<script>
import countriesData from '../citiesData.json';

export default {
    data() {
        return {
            countries: countriesData.countries,
            selectedCountry: '',
            selectedCountryName: '',
            averageTemperature: null,
            error: null,
            apiKey: '',
        };
    },
    methods: {
        async getAverageTemperature() {
            this.averageTemperature = null;
            this.error = null;
            this.selectedCountryName = this.countries.find(c => c.id === this.selectedCountry)?.name || '';

            if (this.selectedCountry) {
                const country = this.countries.find(c => c.id === this.selectedCountry);
                if (country && country.cities) {
                    const temperatures = await Promise.all(
                        country.cities.map(async (city) => {
                            try {
                                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${this.apiKey}&units=metric&lang=ru`;
                                const response = await fetch(apiUrl);
                                if (!response.ok) {
                                    throw new Error(`HTTP error! Status: ${response.status} for city ${city.name}`);
                                }
                                const data = await response.json();
                                return data.main.temp;
                            } catch (error) {
                                console.error(`Error fetching weather for ${city.name}:`, error);
                                return null;
                            }
                        })
                    );
                    const validTemperatures = temperatures.filter(temp => temp !== null);
                    if (validTemperatures.length > 0) {
                        this.averageTemperature = Math.round(validTemperatures.reduce((sum, temp) => sum + temp, 0) / validTemperatures.length);

                    } else {
                        this.error = "Не удалось получить данные о погоде ни для одного города.";
                    }
                }
            }
        },
    },
};
</script>

<style scoped></style>