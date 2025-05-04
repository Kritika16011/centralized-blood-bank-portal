document.addEventListener("DOMContentLoaded", () => {
    const apiBaseUrl = "http://localhost:5000/api/bloodbankAuth"; // Updated for blood bank

    function showRegister() {
        document.getElementById('loginBox')?.classList.add('hidden');
        document.getElementById('registerBox')?.classList.remove('hidden');
        document.getElementById('forgotPasswordBox')?.classList.add('hidden');
    }

    function showLogin() {
        document.getElementById('registerBox')?.classList.add('hidden');
        document.getElementById('forgotPasswordBox')?.classList.add('hidden');
        document.getElementById('loginBox')?.classList.remove('hidden');
    }

    function showForgotPassword() {
        document.getElementById('loginBox')?.classList.add('hidden');
        document.getElementById('forgotPasswordBox')?.classList.remove('hidden');
    }

    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(password);
    }

    async function register() {
        const emailField = document.getElementById("registerEmail");
        const passwordField = document.getElementById("registerPassword");
        const confirmPasswordField = document.getElementById("confirmPassword");

        if (!emailField || !passwordField || !confirmPasswordField) {
            console.error("One or more input fields not found! Check IDs in HTML.");
            alert("Error: Input fields not found! Check your HTML.");
            return;
        }

        const email = emailField.value.trim();
        const password = passwordField.value.trim();
        const confirmPassword = confirmPasswordField.value.trim();

        if (!email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (!validatePassword(password)) {
            alert("Password must be at least 6 characters long, include uppercase, lowercase, numbers, and special characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("email", email);
                alert("Registered successfully!");
                showLogin();
            } else {
                alert(`Registration failed! ${data.message || "Try again later."}`);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Network error. Check your backend connection.");
        }
    }

    async function login() {
        const emailField = document.getElementById("loginEmail");
        const passwordField = document.getElementById("loginPassword");

        if (!emailField || !passwordField) {
            alert("Login form error. Please refresh the page.");
            return;
        }

        const email = emailField.value.trim();
        const password = passwordField.value.trim();

        try {
            const response = await fetch(`${apiBaseUrl}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("email", email);
                alert("Login successful!");
                window.location.href = "bloodbankprofile.html";
            } else {
                alert(`Invalid credentials! ${data.message || ""}`);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Network error. Check your backend connection.");
        }
    }

    async function sendResetCode() {
        const emailField = document.getElementById("resetEmail");

        if (!emailField) {
            alert("Error: Reset email field not found.");
            return;
        }

        const email = emailField.value.trim();

        try {
            const response = await fetch(`${apiBaseUrl}/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                alert("Reset code sent to your email!");
                document.getElementById("resetCode")?.classList.remove("hidden");
                document.getElementById("newPassword")?.classList.remove("hidden");
                document.getElementById("resetBtn")?.classList.remove("hidden");
            } else {
                alert("Email not found!");
            }
        } catch (error) {
            console.error("Error in sending reset code:", error);
            alert("Network error. Check your backend connection.");
        }
    }

    async function resetPassword() {
        const resetCodeField = document.getElementById("resetCode");
        const newPasswordField = document.getElementById("newPassword");

        if (!resetCodeField || !newPasswordField) {
            alert("Reset form fields missing!");
            return;
        }

        const resetCode = resetCodeField.value.trim();
        const newPassword = newPasswordField.value.trim();

        if (!validatePassword(newPassword)) {
            alert("New password must be at least 6 characters long, including uppercase, lowercase, numbers, and special characters.");
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/reset-password/${resetCode}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword })
            });

            if (response.ok) {
                alert("Password reset successfully!");
                showLogin();
            } else {
                alert("Invalid reset code!");
            }
        } catch (error) {
            console.error("Error in password reset:", error);
            alert("Network error. Check your backend connection.");
        }
    }

    // Expose functions globally
    window.showRegister = showRegister;
    window.showLogin = showLogin;
    window.showForgotPassword = showForgotPassword;
    window.register = register;
    window.login = login;
    window.sendResetCode = sendResetCode;
    window.resetPassword = resetPassword;
});
