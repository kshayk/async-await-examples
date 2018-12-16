const axios = require('axios');

const fixerUrl = 'http://data.fixer.io/api/latest?access_key=c06b24bb8b8efd157054be0bbc87ba21';
const restCountries = 'https://restcountries.eu/rest/v2/currency/';

// const getExchangeRate = (from, to) => {
//     return axios.get(fixerUrl).then((response) => {
//         const euro = 1 / response.data.rates[from];
//         const rate = euro * response.data.rates[to];
//
//         return rate
//     })
// };

const getExchangeRate = async (from, to) => {
    try {
        let response = await axios.get(fixerUrl);

        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];

        if(isNaN(rate)) {
            throw new Error();
        }

        return rate
    } catch(e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
    }
};

const getCountries = async (currencyCode) => {
    try {
        let response = await axios.get(restCountries + currencyCode);

        return response.data.map((country) => {
            return country.name;
        });
    } catch(e) {
        throw new Error(`Could not get countries that use the currency code of ${currencyCode}`);
    }
};

const convertCurrency = async (from, to, amount) => {
    let exchangeRate = await getExchangeRate(from, to);
    let availableCountries = await getCountries(to);

    let convertedAmount = (amount * exchangeRate).toFixed(2);

    return `${amount} ${from} is worth ${convertedAmount} ${to} and can be used as ${to} in the following countries: ${availableCountries.join(', ')}`
};

convertCurrency('CAD', 'USD', 20).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e.message);
});

// getExchangeRate('USD', 'CAD').then((rate) => {
//     console.log(rate);
// });
//
// getCountries('EUR').then((countries) => {
//     console.log(countries);
// });