document.addEventListener("DOMContentLoaded", function () {
  // Initialize all password toggles with closed eye icon
  document.querySelectorAll(".toggle-password i").forEach((icon) => {
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  });

  // Password toggle functionality
  document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("data-target");
      const input = document.getElementById(target);
      const icon = this.querySelector("i");

      const type =
        input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);

      icon.classList.toggle("fa-eye-slash");
      icon.classList.toggle("fa-eye");
    });
  });

  // Password strength meter (register page only)
  const passwordInput = document.getElementById("register-password");
  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      const strengthValue = document.getElementById("strength-value");
      const strengthBar = document.querySelector(".strength-bar");
      const password = this.value;
      let strength = 0;

      strengthBar.className = "strength-bar";

      if (password.length >= 8) strength++;
      if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
      if (password.match(/[0-9]/)) strength++;
      if (password.match(/[^a-zA-Z0-9]/)) strength++;

      if (password.length === 0) {
        strengthValue.textContent = "";
      } else if (strength <= 1) {
        strengthBar.classList.add("strength-weak");
        strengthValue.textContent = "Weak";
      } else if (strength <= 3) {
        strengthBar.classList.add("strength-medium");
        strengthValue.textContent = "Medium";
      } else {
        strengthBar.classList.add("strength-strong");
        strengthValue.textContent = "Strong";
      }
    });
  }

  // Password match validation
  const confirmPasswordInput = document.getElementById("register-confirm");
  if (confirmPasswordInput) {
    const passwordInput = document.getElementById("register-password");
    const matchIndicator = document.getElementById("password-match");
    const matchIcon = document.getElementById("match-icon");
    const matchText = document.getElementById("match-text");

    function checkPasswordMatch() {
      if (passwordInput.value && confirmPasswordInput.value) {
        matchIndicator.style.display = "flex";

        if (passwordInput.value === confirmPasswordInput.value) {
          matchIcon.className = "fas fa-check-circle match-success";
          matchText.textContent = "Passwords match";
          matchText.className = "match-success";
        } else {
          matchIcon.className = "fas fa-times-circle match-error";
          matchText.textContent = "Passwords do not match";
          matchText.className = "match-error";
        }
      } else {
        matchIndicator.style.display = "none";
      }
    }

    confirmPasswordInput.addEventListener("input", checkPasswordMatch);
    passwordInput.addEventListener("input", checkPasswordMatch);
  }

  // Form validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Login form handling
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      const button = document.getElementById("login-button");
      const feedback = document.getElementById("form-feedback");
      let isValid = true;

      document.getElementById("email-error").style.display = "none";
      document.getElementById("password-error").style.display = "none";
      feedback.textContent = "";
      feedback.style.display = "none";

      if (!validateEmail(email)) {
        document.getElementById("email-error").textContent =
          "Please enter a valid email address";
        document.getElementById("email-error").style.display = "block";
        isValid = false;
      }

      if (password.length < 6) {
        document.getElementById("password-error").textContent =
          "Password must be at least 6 characters";
        document.getElementById("password-error").style.display = "block";
        isValid = false;
      }

      if (isValid) {
        button.classList.add("btn-loading");

        fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })
          .then((response) => response.json())
          .then((data) => {
            button.classList.remove("btn-loading");
            if (data.success) {
              feedback.textContent = "Login successful! Redirecting...";
              feedback.style.display = "block";
              feedback.style.backgroundColor = "#d4edda";
              feedback.style.color = "#155724";
              feedback.style.border = "1px solid #c3e6cb";

              setTimeout(() => {
                window.location.href = "index.html";
              }, 1500);
            } else {
              feedback.textContent =
                data.message || "Login failed. Please try again.";
              feedback.style.display = "block";
              feedback.style.backgroundColor = "#f8d7da";
              feedback.style.color = "#721c24";
              feedback.style.border = "1px solid #f5c6cb";
            }
          })
          .catch((error) => {
            button.classList.remove("btn-loading");
            feedback.textContent = "An error occurred. Please try again.";
            feedback.style.display = "block";
            feedback.style.backgroundColor = "#f8d7da";
            feedback.style.color = "#721c24";
            feedback.style.border = "1px solid #f5c6cb";
            console.error("Login error:", error);
          });
      }
    });
  }

  // Register form handling
  const registerForm = document.getElementById("register-form");

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("register-name").value;
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;
      const confirmPassword = document.getElementById("register-confirm").value;
      const termsAgreed = document.getElementById("terms-agree").checked;
      const button = document.getElementById("register-button");
      const feedback = document.getElementById("form-feedback");
      const successMessage = document.getElementById("register-success");
      let isValid = true;

      document.getElementById("name-error").style.display = "none";
      document.getElementById("email-error").style.display = "none";
      document.getElementById("password-error").style.display = "none";
      document.getElementById("confirm-error").style.display = "none";
      document.getElementById("terms-error").style.display = "none";
      feedback.textContent = "";
      feedback.style.display = "none";
      successMessage.style.display = "none";

      if (name.length < 2) {
        document.getElementById("name-error").textContent =
          "Please enter your full name";
        document.getElementById("name-error").style.display = "block";
        isValid = false;
      }

      if (!validateEmail(email)) {
        document.getElementById("email-error").textContent =
          "Please enter a valid email address";
        document.getElementById("email-error").style.display = "block";
        isValid = false;
      }

      if (password.length < 8) {
        document.getElementById("password-error").textContent =
          "Password must be at least 8 characters";
        document.getElementById("password-error").style.display = "block";
        isValid = false;
      }

      if (password !== confirmPassword) {
        document.getElementById("confirm-error").textContent =
          "Passwords do not match";
        document.getElementById("confirm-error").style.display = "block";
        isValid = false;
      }

      if (!termsAgreed) {
        document.getElementById("terms-error").textContent =
          "You must agree to the terms";
        document.getElementById("terms-error").style.display = "block";
        isValid = false;
      }

      if (isValid) {
        button.classList.add("btn-loading");

        fetch("/api/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        })
          .then((response) => response.json())
          .then((data) => {
            button.classList.remove("btn-loading");
            if (data.success) {
              successMessage.style.display = "block";
              successMessage.textContent =
                "Registration successful! Redirecting to login...";
              successMessage.style.backgroundColor = "#d4edda";
              successMessage.style.color = "#155724";
              successMessage.style.border = "1px solid #c3e6cb";

              setTimeout(() => {
                window.location.href = "/login";
              }, 2000);
            } else {
              feedback.textContent =
                data.message || "Registration failed. Please try again.";
              feedback.style.display = "block";
              feedback.style.backgroundColor = "#f8d7da";
              feedback.style.color = "#721c24";
              feedback.style.border = "1px solid #f5c6cb";
            }
          })
          .catch((error) => {
            button.classList.remove("btn-loading");
            feedback.textContent = "An error occurred. Please try again.";
            feedback.style.display = "block";
            feedback.style.backgroundColor = "#f8d7da";
            feedback.style.color = "#721c24";
            feedback.style.border = "1px solid #f5c6cb";
            console.error("Registration error:", error);
          });
      }
    });
  }

  // Social login buttons
  document.querySelectorAll(".social-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      alert("Social login functionality would be implemented here");
    });
  });

  // Forgot Password Functionality (only if elements exist)
  const forgotPasswordLink = document.querySelector(".forgot-password");
  const forgotPasswordModal = document.getElementById("forgotPasswordModal");
  const closeModal = document.getElementById("closeModal");

  if (forgotPasswordLink && forgotPasswordModal && closeModal) {
    forgotPasswordLink.addEventListener("click", function (e) {
      e.preventDefault();
      forgotPasswordModal.classList.add("active");
    });

    closeModal.addEventListener("click", function () {
      forgotPasswordModal.classList.remove("active");
    });

    forgotPasswordModal.addEventListener("click", function (e) {
      if (e.target === forgotPasswordModal) {
        forgotPasswordModal.classList.remove("active");
      }
    });

    const forgotPasswordForm = document.getElementById("forgotPasswordForm");
    if (forgotPasswordForm) {
      forgotPasswordForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("reset-email").value;
        console.log("Password reset requested for:", email);
        alert("Password reset link sent to " + email);
        forgotPasswordModal.classList.remove("active");
      });
    }
  }
});
