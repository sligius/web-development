<template>
    <div class="container">
        <h1>Конвертер Валют</h1>
        <div id="converter-content-wrapper">
            <div id="converter-exchange-wrapper">
                <input type="number" v-model="amount" placeholder="Сумма">
                <div id="currency-fields-wrapper">
                    <select v-model="selectedCurrencyFrom">
                        <option value="" disabled>From</option>
                        <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
                            {{ currency.name }} ({{ currency.code }})
                        </option>
                    </select>
                    <select v-model="selectedCurrencyTo">
                        <option value="" disabled>To</option>
                        <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
                            {{ currency.name }} ({{ currency.code }})
                        </option>
                    </select>

                </div>
                <button @click="convert">Посчитать</button>
            </div>
            <div class="result" v-if="showResult">
                <h2>{{ displayAmount }} {{ displayCurrencyFrom }} = {{ displayResult }} {{ displayCurrencyTo }}</h2>
            </div>
            <div v-else-if="error">
                <h2 style="color: red;">Ошибка: {{ error }}</h2>
            </div>
            <div class="result" v-else>
                <h2> ??? = ??? </h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currencies: [
                { code: 'USD', name: 'Доллар США' },
                { code: 'EUR', name: 'Евро' },
                { code: 'RUB', name: 'Российский рубль' },
                { code: 'GBP', name: 'Фунт стерлингов' },
                { code: 'CNY', name: 'Китайский юань' },
            ],
            selectedCurrencyFrom: '',
            selectedCurrencyTo: '',
            amount: 1,
            exchangeResult: null,
            displayAmount: null,
            displayResult: null,
            displayCurrencyFrom: null,
            displayCurrencyTo: null,
            showResult: false,
            error: null,
            apiKey: '',
        };
    },
    methods: {
        async convert() {
            this.error = null;
            this.exchangeResult = null;
            this.showResult = false;

            if (!this.selectedCurrencyFrom || !this.selectedCurrencyTo || !this.amount) {
                this.error = 'Пожалуйста, заполните все поля.';
                return;
            }

            try {
                const response = await fetch(`https://v6.exchangerate-api.com/v6/${this.apiKey}/pair/${this.selectedCurrencyFrom}/${this.selectedCurrencyTo}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const rate = data.conversion_rate;
                this.exchangeResult = (this.amount * rate).toFixed(2);
                this.displayAmount = this.amount;
                this.displayResult = this.exchangeResult;
                this.displayCurrencyFrom = this.selectedCurrencyFrom;
                this.displayCurrencyTo = this.selectedCurrencyTo;
                this.showResult = true;
            } catch (error) {
                this.error = 'Произошла ошибка при конвертации. Пожалуйста, попробуйте позже.';
                console.error(error);
            }
        },
    },
};
</script>
<style></style>