const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//all currencies
app.get("/getAllCurrencies", async (req, res) => {
    const nameURL =
        "https://openexchangerates.org/api/currencies.json?app_id=e656fcbb8edc40b69bc3323be1de336f";

    try {
        const namesResponse = await axios.get(nameURL);
        const nameData = namesResponse.data;

        return res.json(nameData);
    } catch (error) {
        console.error(error);
    }
});

//get the target amount
app.get("/convert", async (req, res) => {
    const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
        req.query;

    try {
        const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=e656fcbb8edc40b69bc3323be1de336f`;

        const dataResponse = await axios.get(dataUrl);
        const rates = dataResponse.data.rates;

        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;

        return res.json(targetAmount.toFixed(2));
    } catch (error) {
        console.error(error);
    }
});

//listen to a port
app.listen(5000, () => {
    console.log("SERVER STARTED");
});
