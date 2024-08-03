const host = 'api.frankfurter.app';

document.addEventListener('DOMContentLoaded', () => {
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    const msg = document.getElementById("output");

    for (let currCode in countryList) {
        let fromOption = document.createElement("option");
        fromOption.innerText = currCode;
        fromOption.value = currCode;
        if (currCode === "USD") fromOption.selected = true;
        fromSelect.append(fromOption);

        let toOption = document.createElement("option");
        toOption.innerText = currCode;
        toOption.value = currCode;
        if(currCode === "INR") toOption.selected = true;
        toSelect.append(toOption);

        toSelect.addEventListener("change",(evt)=>{
            updateFlag(evt.target);
        });

        fromSelect.addEventListener("change",(evt)=>{
            updateFlag(evt.target);
        });
    }

    const updateFlag = (element)=>{
        let currCode = element.value;
        let countryCode = countryList[currCode];
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newSrc;
    }

    btn.addEventListener("click",async (evt)=>{
        evt.preventDefault();
        let amount = document.getElementById("amt");
        let amtValue = amount.value;
        if(amtValue=""|| amtValue<1){
            amtValue = 1;
            amount.value="1";
        }

        let url = `https://${host}/latest?amount=${amount.value}&from=${fromSelect.value}&to=${toSelect.value}`;
        let response = await fetch(url);
        let data = await response.json();
        let rate = Object.values(data.rates);
        msg.innerHTML = `${amount.value} ${fromSelect.value} = ${rate} ${toSelect.value}`
    });

});
