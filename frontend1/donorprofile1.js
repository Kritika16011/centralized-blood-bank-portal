const BASE_URL = "http://localhost:5000"; // Backend URL

// ✅ Fetch email from localStorage
const donorEmail = localStorage.getItem("userEmail")?.trim();
if (!donorEmail) {
    alert("No email found in local storage. Please log in again.");
    window.location.href = "login.html"; // Redirect to login if email is missing
}

// ✅ Function to Fetch Donor Profile
async function getDonorProfile() {
    try {
        if (!donorEmail) {
            alert("Invalid email. Please log in again.");
            return;
        }

        console.log("Fetching profile for:", donorEmail);

        const response = await fetch(`${BASE_URL}/donorprofile/${encodeURIComponent(donorEmail)}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        console.log("Response Status:", response.status);

        if (!response.ok) {
            throw new Error("Failed to fetch donor profile");
        }

        const data = await response.json();
        console.log("Fetched Profile Data:", data);

        if (!data || Object.keys(data).length === 0) {
            alert("No donor data found. Please check with support.");
            return;
        }

        // ✅ Ensure elements exist before assigning values
        document.getElementById("name") && (document.getElementById("name").value = data.name || "");
        document.getElementById("donorAge") && (document.getElementById("donorAge").value = data.age || "");
        document.getElementById("donorBloodType") && (document.getElementById("donorBloodType").value = data.blood_type || "");
        document.getElementById("mobile") && (document.getElementById("mobile").value = data.mobile || "");
        document.getElementById("donorEmail") && (document.getElementById("donorEmail").value = data.email || donorEmail);
        document.getElementById("address") && (document.getElementById("address").value = data.address || "");

    } catch (error) {
        console.error("Error fetching donor profile:", error.message);
        alert("Error fetching donor profile. Please try again.");
    }
}

// ✅ Function to Update Donor Profile
async function updateDonorProfile() {
    // Ensure donorEmail is defined
    if (!donorEmail) {
        alert("Email is required to update the profile.");
        return;
    }

    // ✅ Collect updated data dynamically
    const updatedData = { email: donorEmail };
    const fieldMappings = {
        name: "name",
        donorAge: "age",
        donorBloodType: "blood_type",
        mobile: "mobile",
        address: "address"
    };

    Object.entries(fieldMappings).forEach(([inputId, fieldName]) => {
        const value = document.getElementById(inputId)?.value.trim();
        if (value) updatedData[fieldName] = value;
    });

    // ✅ Check if there is data to update
    if (Object.keys(updatedData).length === 1) { // Only email is present
        alert("No fields to update.");
        return;
    }

    console.log("Updating Profile Data:", JSON.stringify(updatedData, null, 2));

    try {
        const response = await fetch(`${BASE_URL}/update-donorprofile`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        });

        const data = await response.json();
        console.log("Update Response:", data);

        if (!response.ok) {
            throw new Error(data.message || "Failed to update profile");
        }

        alert("Profile updated successfully!"); // Success feedback
        getDonorProfile(); // ✅ Refresh profile after update

    } catch (error) {
        console.error("Error updating donor profile:", error.message);
        alert("Error updating profile. Please try again.");
    }
}
// ✅ Ensure profile loads only after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    getDonorProfile(); // Fetch donor data on page load
    document.getElementById("updateProfileBtn")?.addEventListener("click", updateDonorProfile);
});
