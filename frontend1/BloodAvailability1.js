
document.getElementById('searchBtn').addEventListener('click', async () => {
    const state = document.getElementById('state').value;
    const district = document.getElementById('district').value;
    const blood_type = document.getElementById('bloodGroup').value;
    const componentSelect = document.getElementById('bloodType');
    const component = componentSelect.options[componentSelect.selectedIndex].value;
  
    const resultBody = document.getElementById('resultBody');
    resultBody.innerHTML = ''; // Clear previous results
  
    if (!state || !district || !blood_type || !component) {
      alert("Please select all fields.");
      return;
    }
  
    try {
      const res = await fetch('http://localhost:5000/api/availability/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ state, district, blood_type, component })
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || 'Request failed');
      }
  
      // Create and add a row with data
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>1</td>
        <td>${data.bloodBankEmail || 'N/A'}</td>
        <td>${component.toUpperCase()}</td>
        <td>${data.availableUnits || 0}</td>
        <td>${data.bloodBankEmail || 'N/A'}</td>
        
      `;
      resultBody.appendChild(row);
  
    } catch (error) {
      console.error('Error fetching availability:', error);
      alert('Error: ' + error.message);
    }
  });
  