document.addEventListener("DOMContentLoaded", function () {
    // ✅ Register Form Submit
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const bloodbank_id = document.getElementById("reg_bloodbank_id").value;
            const username = document.getElementById("reg_username").value;
            const password = document.getElementById("reg_password").value;

            try {
                const response = await fetch("http://localhost:5000/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ bloodbank_id, username, password }),
                });

                const data = await response.json();
                if (response.ok) {
                    alert("Registration Successful! Please login.");
                    window.location.href = "bblog.html";
                } else {
                    alert("Registration Failed: " + data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong!");
            }
        });
    }

    // ✅ Login Form Submit
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const username = document.getElementById("login_username").value;
            const password = document.getElementById("login_password").value;

            try {
                const response = await fetch("http://localhost:5000/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem("authToken", data.token);
                    localStorage.setItem("bloodBankName", data.username);
                    alert("Login Successful!");
                    window.location.href = "bbmanage2.html";
                } else {
                    alert("Login Failed: " + data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong!");
            }
        });
    }

    // ✅ Forgot Password Form Submit
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const username = document.getElementById("forgot_username").value;

            try {
                const response = await fetch("http://localhost:5000/api/forgot-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username }),
                });

                const data = await response.json();
                if (response.ok) {
                    alert("Reset Token: " + data.token + "\nCheck your email.");
                } else {
                    alert("Error: " + data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong!");
            }
        });
    }

    // ✅ Reset Password Form Submit
    const resetPasswordForm = document.getElementById("resetPasswordForm");
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const token = document.getElementById("reset_token").value;
            const newPassword = document.getElementById("new_password").value;

            try {
                const response = await fetch("http://localhost:5000/api/reset-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token, newPassword }),
                });

                const data = await response.json();
                if (response.ok) {
                    alert("Password Reset Successful! Please login.");
                    window.location.href = "bblog.html";
                } else {
                    alert("Error: " + data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong!");
            }
        });
    }
});
