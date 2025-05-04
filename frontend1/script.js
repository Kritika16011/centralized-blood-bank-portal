const statesAndDistricts = {
    "Uttar Pradesh": ["Lucknow", "Varanasi", "Agra"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur"],
    "Bihar": ["Patna", "Gaya", "Muzaffarpur"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli"]
};

// Populate State Dropdown
const stateDropdown = document.getElementById("state");
Object.keys(statesAndDistricts).forEach(state => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateDropdown.appendChild(option);
});

// Populate District Dropdown Based on State Selection
stateDropdown.addEventListener("change", function () {
    const districtDropdown = document.getElementById("district");
    districtDropdown.innerHTML = '<option value="">Select District</option>'; // Reset districts

    if (this.value) {
        statesAndDistricts[this.value].forEach(district => {
            const option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtDropdown.appendChild(option);
        });
    }
});

