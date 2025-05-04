document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-btn");
    const tableBody = document.getElementById("table-body");

    if (!searchButton || !tableBody) {
        console.error("Required elements not found!");
        return;
    }
    

    searchButton.addEventListener("click", async function () {
        const state = document.getElementById("state")?.value.trim();
        const district = document.getElementById("district")?.value.trim();
        const name = document.getElementById("name")?.value.trim();
        
        if (!state || !district) {
            tableBody.innerHTML = `<tr><td colspan="8" style="color: red;">Please select a state and district.</td></tr>`;
            return;
        }

        tableBody.innerHTML = `<tr><td colspan="8">Loading data, please wait...</td></tr>`;

        try {
            const response = await fetch(
                `http://localhost:5000/api/bloodbankdirectory?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}&searchName=${encodeURIComponent(name)}`
            );
            


            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (!Array.isArray(data) || data.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="8">No blood banks found.</td></tr>`;
            } else {
                tableBody.innerHTML = data
                    .map(
                        (bank, index) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${bank.blood_bank_name || "N/A"}</td>
                                <td>${bank.postal_address || "N/A"}</td>
                                <td>${bank.contact_no || "N/A"}</td>
                                <td>${bank.email || "N/A"}</td>
                                <td>${bank.category || "N/A"}</td>
                                <td>${bank.component_facility ? "Yes" : "No"}</td>
                                <td>${bank.apheresis_facility ? "Yes" : "No"}</td>
                            </tr>
                        `
                    )
                    .join("");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            tableBody.innerHTML = `<tr><td colspan="8" style="color: red;">Error loading data. Please try again.</td></tr>`;
        }
    });

    // Handle geolocation denial message
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Geolocation granted:", position);
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    document.getElementById("geolocation-message").innerText = "User denied the request for Geolocation.";
                }
            }
        );
    }
});
