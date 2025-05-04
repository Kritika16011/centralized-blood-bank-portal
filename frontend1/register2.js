

document.getElementById("donorForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form submission

    let firstName = document.getElementById("firstName").value.trim();
    let age = document.getElementById("age").value.trim();
    let fatherName = document.getElementById("fatherName").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let email = document.getElementById("email").value.trim();
    let pinCode = document.getElementById("pinCode").value.trim();
    let bloodTypeSelect = document.getElementById('blood_type');
    let bloodType = bloodTypeSelect.options[bloodTypeSelect.selectedIndex].value; 

    // Validation
    if (!/^[A-Za-z ]+$/.test(firstName)) {
        alert("Name should contain only letters and spaces.");
        return;
    }

    if (!/^[0-9]+$/.test(age) || age < 18 || age > 65) {
        alert("Age should be between 18 and 65.");
        return;
    }

    if (!/^[A-Za-z ]+$/.test(fatherName)) {
        alert("Father Name should contain only letters and spaces.");
        return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Mobile number should be exactly 10 digits and contain only numbers.");
        return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!/^[0-9]{6}$/.test(pinCode)) {
        alert("Pin Code should be exactly 6 digits and contain only numbers.");
        return;
    }

    // Validation Pass - Proceed with Form Submission
    const formData = {
        name: firstName,
        age: age,
        gender: document.getElementById('gender').value,
        father_name: fatherName,
        mobile: mobile,
        email: email,
        state: document.getElementById('state').value,
        district: document.getElementById('district').value,
        address: document.getElementById('address').value,
        pin_code: pinCode,
        blood_type: bloodType
    };

    try {
        const response = await fetch("http://localhost:5000/donors/signup", {  
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Signup successful! Redirecting...");
            window.location.href = "home.html";  
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to submit the form.");
    }
});

