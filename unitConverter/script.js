
const convertionRates = {
    meter: '1',
    kilometer: '1000',
    centimeter: '0.01',
    millimeter: '0.001',
};

document.getElementById("form").addEventListener("submit", (e)=> {

   e.preventDefault();
});

const inputAmount = document.getElementById("inputAmount");
const fromSelect = document.getElementById("fromSelect");
const toSelect = document.getElementById("toSelect");
const convertBtn = document.getElementById("convertBtn");
const outputResult = document.getElementById("outputResult");

const units = Object.keys(convertionRates);


function optionSelect(){
    units.forEach(unit =>{
        const label = unit.charAt(0).toUpperCase() + unit.slice(1) ; 

        const optionFrom = new Option(label, unit);
        const optionTo = new Option(label, unit);


        fromSelect.add(optionFrom);
        toSelect.add(optionTo);
    });

    fromSelect.value = 'meter';
    toSelect.value = 'kilometer';

}

//logic
function calculation() {
    const amount = parseFloat(inputAmount.value);
    const fromUnit = fromSelect.value;
    const toUnit = toSelect.value;

    const totalFrom = convertionRates[fromUnit];
    const totalTo = convertionRates[toUnit];

    const result = (amount * totalFrom) / totalTo;

    outputResult.textContent = result.toLocaleString(undefined, {maximumFractionDigits: 4})+" "+ toUnit;
}

optionSelect();



convertBtn.addEventListener("click", calculation);
