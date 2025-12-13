const timeRates = {
    Seconds: '1',
    Minutes: '60',
    Hours: '3600',
    Days: '86400',

};

const time = Object.keys(timeRates);

const inputAmount = document.getElementById("inputAmount");
const fromSelect = document.getElementById("fromSelect");
const toSelect = document.getElementById("toSelect");
const convertBtn = document.getElementById("convertBtn");
const outputResult = document.getElementById("outputResult");

function optionSelect(){
    time.forEach(units => {
        const label = units.charAt(0).toUpperCase() + units.slice(1);

        const optionFrom = new Option (label, units);
        const optionTo = new Option (label, units);

        fromSelect.add(optionFrom);
        toSelect.add(optionTo);

    });
    fromSelect.value = "Seconds";
    toSelect.value = "Minutes";

};


function conversionTime (){
const amount = parseFloat(inputAmount.value);
const fromTime = fromSelect.value;
const toTime = toSelect.value;

const timeRateFrom = timeRates[fromTime];
const timeRateTo = timeRates[toTime];

const result = (amount * timeRateFrom) / timeRateTo;

outputResult.textContent = result.toLocaleString(undefined, {maximumFractionDigits: 4})+ " "+toTime;

};

optionSelect();

convertBtn.addEventListener("click", conversionTime);