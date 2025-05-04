// Updated script for fetching and displaying donor details

document.getElementById('searchBtn').addEventListener('click', async () => {
    const state = document.getElementById('state').value;
    const district = document.getElementById('district').value;
    const bloodGroup = document.getElementById('bloodGroup').value;
  
    if (!state && !district) {
      alert('Please select a state or district to search.');
      return;
    }
  
    try {
      const queryParams = new URLSearchParams({
        state: state,
        district: district,
        bloodGroup: bloodGroup
      });
  
      const response = await fetch(`http://localhost:5000/donor-details?${queryParams.toString()}`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const donors = await response.json();
      const resultBody = document.getElementById('resultBody');
      resultBody.innerHTML = '';
  
      if (donors.length === 0) {
        resultBody.innerHTML = '<tr><td colspan="5">No donors found.</td></tr>';
      } else {
        donors.forEach((donor, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${donor.name}</td>
            <td>${donor.age}</td>
            <td>${donor.gender}</td>
            <td>${donor.email}</td>
          `;
          resultBody.appendChild(row);
        });
      }
    } catch (error) {
      console.error('Error fetching donor details:', error);
      alert('Something went wrong while fetching donor details.');
    }
  });
  