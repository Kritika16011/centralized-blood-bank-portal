// Get email from localStorage
function getEmailFromLocalStorage() {
    return localStorage.getItem("email"); // Ensure this is set at login
}

async function fetchBloodBankProfile() {
    const email = localStorage.getItem("email")?.trim();
    
    if (!email) {
        alert("⚠️ No email found in local storage");
        return;
    }

    const url = `http://localhost:5000/bloodbankprofile/${email}`;
    console.log("🔍 Fetching from:", url);

    try {
        const response = await fetch(url);

        console.log("✅ Response status:", response.status);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("❌ API Error:", errorData);
            alert(`Error: ${errorData.message || "Something went wrong"}`);
            return;
        }

        const data = await response.json();
        console.log("📦 Profile data:", data);

        document.getElementById("bloodBankName").value = data.blood_bank_name || "";
        document.getElementById("hospitalName").value = data.parent_hospital_name || "";
        document.getElementById("contactPerson").value = data.contact_person || "";
        document.getElementById("contactNumber").value = data.contact_no || "";
        document.getElementById("email").value = data.email || "";
        document.getElementById("licenseNumber").value = data.licence_no || "";

    } catch (error) {
        console.error("❌ Fetch failed:", error);
        alert("Failed to fetch blood bank profile. Please check your network and backend.");
    }
}


// Update Blood Bank Profile
async function updateBloodBankProfile() {
    const email = getEmailFromLocalStorage();
    if (!email) {
        alert("No email found in local storage");
        return;
    }

    const profileData = {
        email: email,
        blood_bank_name: document.getElementById("bloodBankName").value,
        parent_hospital_name: document.getElementById("hospitalName").value,
        contact_person: document.getElementById("contactPerson").value,
        contact_no: document.getElementById("contactNumber").value,
        licence_no: document.getElementById("licenseNumber").value
    };

    try {
        const response = await fetch("http://localhost:5000/bloodbankprofile/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profileData)
        });

        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error("❌ Error updating profile:", error);
        alert("Failed to update blood bank profile.");
    }
}

// Update Blood Components
async function updateBloodComponents() {
    const email = getEmailFromLocalStorage();
    if (!email) {
        alert("No email found in local storage");
        return;
    }

    const componentData = {
        email: email,
        blood_type: document.getElementById("bloodType").value,
        plasma_units: document.getElementById("plasma").value,
        platelets_units: document.getElementById("platelets").value,
        wbc_units: document.getElementById("wbc").value,
        rbc_units: document.getElementById("rbc").value
    };

    try {
        const response = await fetch("http:/localhost:5000/api/components/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(componentData)
        });

        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error("❌ Error updating components:", error);
        alert("Failed to update blood components.");
    }
}

// Auto-fetch profile on DOM load
// Auto-fetch profile on DOM load
document.addEventListener("DOMContentLoaded", () => {
    // Auto-fetch profile when the page loads
    fetchBloodBankProfile();

    // Handle the submission of the Blood Bank Profile form
    document.getElementById('bloodBankForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        await updateBloodBankProfile();  // Call the function to update the profile
    });

    // Handle the submission of the Blood Availability Update form
    document.getElementById('bloodUpdateForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        await updateBloodComponents();  // Call the function to update blood components
    });
});





/*
// Function to get email from local storage
function getEmailFromLocalStorage() {
    return localStorage.getItem("email"); // Ensure the key matches how you're storing the email
}

// Fetch Blood Bank Profile
async function fetchBloodBankProfile() {
    const email = getEmailFromLocalStorage();
    if (!email) {
        alert("No email found in local storage");
        return;
    }

    try {
        const response = await fetch(`http://192.168.141.155:5000/bloodbankprofile/${email}`);
        const data = await response.json();
        if (response.ok) {
            document.getElementById("bloodBankName").value = data.blood_bank_name || "";
            document.getElementById("parentHospital").value = data.parent_hospital_name || "";
            document.getElementById("contactPerson").value = data.contact_person || "";
            document.getElementById("contactNumber").value = data.contact_no || "";
            document.getElementById("email").value = data.email || "";
            document.getElementById("licenseNumber").value = data.licence_no || "";
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
}

// Update Blood Bank Profile
async function updateBloodBankProfile() {
    const email = getEmailFromLocalStorage();
    if (!email) {
        alert("No email found in local storage");
        return;
    }

    const profileData = {
        email: email,
        blood_bank_name: document.getElementById("bloodBankName").value,
        parent_hospital_name: document.getElementById("hospitalName").value,
        contact_person: document.getElementById("contactPerson").value,
        contact_no: document.getElementById("contactNumber").value,
        licence_no: document.getElementById("licenseNumber").value
    };

    try {
        const response = await fetch("http://192.168.141.155:5000/api/bloodbankprofile/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profileData)
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error("Error updating profile:", error);
    }
}

// Update Blood Components
async function updateBloodComponents() {
    const email = getEmailFromLocalStorage();
    if (!email) {
        alert("No email found in local storage");
        return;
    }

    const componentData = {
        email: email,
        blood_type: document.getElementById("bloodType").value,
        plasma_units: document.getElementById("plasma").value,
        platelets_units: document.getElementById("platelets").value,
        wbc_units: document.getElementById("wbc").value,
        rbc_units: document.getElementById("rbc").value
    };

    try {
        const response = await fetch("http://192.168.141.155:5000/api/components/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(componentData)
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error("Error updating blood components:", error);
    }
}

// Auto-fetch profile data on page load
document.addEventListener("DOMContentLoaded", fetchBloodBankProfile); */

/*
// Function to get email from local storage
function getEmailFromLocalStorage() {
    return localStorage.getItem("email"); // Ensure the key matches how you're storing the email
}

// Fetch Blood Bank Profile
async function fetchBloodBankProfile() {
    const email = getEmailFromLocalStorage();
    if (!email) {
        alert("No email found in local storage");
        return;
    }

    try {
        const response = await fetch(`http://192.168.187.155:5000/api/bloodbankprofile/${email}`);
        const data = await response.json();
        if (response.ok) {
            document.getElementById("bloodBankName").value = data.blood_bank_name || "";
            document.getElementById("parentHospital").value = data.parent_hospital_name || "";
            document.getElementById("contactPerson").value = data.contact_person || "";
            document.getElementById("contactNumber").value = data.contact_no || "";
            document.getElementById("email").value = data.email || "";
            document.getElementById("licenseNumber").value = data.licence_no || "";
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
}

// Update Blood Bank Profile
async function updateBloodBankProfile() {
    const email = getEmailFromLocalStorage();
    if (!email) {
        alert("No email found in local storage");
        return;
    }

    const profileData = {
        email: email,
        blood_bank_name: document.getElementById("bloodBankName").value,
        parent_hospital_name: document.getElementById("hospitalName").value,
        contact_person: document.getElementById("contactPerson").value,
        contact_no: document.getElementById("contactNumber").value,
        licence_no: document.getElementById("licenseNumber").value
    };

    try {
        const response = await fetch("http://192.168.187.155:5000/api/bloodbankprofile/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profileData)
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error("Error updating profile:", error);
    }
}

// Update Blood Components
async function updateBloodComponents() {
    const email = getEmailFromLocalStorage();
    if (!email) {
        alert("No email found in local storage");
        return;
    }

    const componentData = {
        email: email,
        blood_type: document.getElementById("bloodType").value,
        plasma_units: document.getElementById("plasma").value,
        platelets_units: document.getElementById("platelets").value,
        wbc_units: document.getElementById("wbc").value,
        rbc_units: document.getElementById("rbc").value
    };

    try {
        const response = await fetch("http://192.168.187.155:5000/api/components/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(componentData)
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error("Error updating blood components:", error);
    }
}

// Handle Blood Bank Profile Update (Frontend)
document.getElementById('bloodBankForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Blood Bank Profile Updated Successfully!');
});

// Handle Blood Availability Update (Frontend)
document.getElementById('bloodUpdateForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Get values from the form
    const bloodType = document.getElementById('bloodType').value;
    const plasma = document.getElementById('plasma').value;
    const platelets = document.getElementById('platelets').value;
    const wbc = document.getElementById('wbc').value;
    const rbc = document.getElementById('rbc').value;

    // Get email from localStorage
    const email = localStorage.getItem('email'); // Ensure you have set the email in localStorage

    if (!email) {
        return alert('Email is not available. Please login again.');
    }

    // Prepare data to send to the backend
    const data = {
        email: email,
        blood_type: bloodType,
        plasma_units: plasma,
        platelets_units: platelets,
        wbc_units: wbc,
        rbc_units: rbc
    };

    try {
        // Make API call to the backend
        const response = await fetch('/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Handle response from the backend
        const result = await response.json();

        if (response.ok) {
            alert(result.message);  // Show success message
        } else {
            alert('Error: ' + result.message);  // Show error message
        }
    } catch (error) {
        console.error('❌ Error:', error);
        alert('An error occurred while updating the blood component availability.');
    }
});

// Auto-fetch profile data on page load
document.addEventListener("DOMContentLoaded", fetchBloodBankProfile); */


