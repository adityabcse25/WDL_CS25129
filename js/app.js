const locBtn = document.getElementById('detectLocationBtn');
const locOutput = document.getElementById('locationOutput');

locBtn.addEventListener('click', () => {
  if (!navigator.geolocation) { 
    locOutput.textContent = 'Geolocation not supported.'; 
    return; 
  }
  locOutput.textContent = 'Detecting location…';
  navigator.geolocation.getCurrentPosition(
    (pos) => { 
      const { latitude, longitude } = pos.coords; 
      locOutput.innerHTML = `Latitude: <strong>${latitude.toFixed(5)}</strong><br>Longitude: <strong>${longitude.toFixed(5)}</strong>`; 
    },
    (err) => { 
      locOutput.textContent = err.message || 'Unable to detect location.'; 
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
});

const convBtn = document.getElementById('convertBtn');
const amountInput = document.getElementById('amountInput');
const fromCurr = document.getElementById('fromCurrency');
const toCurr = document.getElementById('toCurrency');
const convResult = document.getElementById('conversionResult');

convBtn.addEventListener('click', async () => {
  const amount = parseFloat(amountInput.value);
  
  if (isNaN(amount) || amount <= 0) { 
    convResult.textContent = 'Please enter valid amount.'; 
    return; 
  }
  
  const from = fromCurr.value, to = toCurr.value;
  
  if (from === to) { 
    convResult.textContent = `${amount} ${from} = ${amount} ${to}`; 
    return; 
  }
  
  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);
    convResult.textContent = `${amount} ${from} = ${converted} ${to}`;
  } catch (err) {
    convResult.textContent = 'Error fetching rates. Try again.';
  }
});