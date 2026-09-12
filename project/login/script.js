/* Project 01 v3 — logika halaman masuk (demo murni, tanpa storage) */

(function () {
  var card = document.getElementById("card");
  var form = document.getElementById("loginForm");
  var identityInput = document.getElementById("identity");
  var passwordInput = document.getElementById("password");
  var identityError = document.getElementById("identityError");
  var passwordError = document.getElementById("passwordError");
  var submitBtn = document.getElementById("submitBtn");
  var submitText = submitBtn.querySelector(".btn-text");
  var togglePass = document.getElementById("togglePass");

  if (!form) return;

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isUsername(value) {
    return /^[a-zA-Z0-9_.]{3,}$/.test(value);
  }

  function validateIdentity(showError) {
    var value = identityInput.value.trim();
    var valid = isEmail(value) || isUsername(value);
    if (!valid && showError) {
      identityError.textContent = value === ""
        ? "Email atau username wajib diisi."
        : "Isi email yang valid atau username (min. 3 karakter: huruf, angka, titik, garis bawah).";
      identityError.classList.add("show");
      identityInput.setAttribute("aria-invalid", "true");
    } else if (valid) {
      identityError.textContent = "";
      identityError.classList.remove("show");
      identityInput.setAttribute("aria-invalid", "false");
    }
    return valid;
  }

  function validatePassword(showError) {
    var value = passwordInput.value;
    var valid = value.length >= 8 && /[a-zA-Z]/.test(value) && /[0-9]/.test(value);
    if (!valid && showError) {
      passwordError.textContent = value === ""
        ? "Password wajib diisi."
        : "Password minimal 8 karakter dan harus ada huruf dan angka.";
      passwordError.classList.add("show");
      passwordInput.setAttribute("aria-invalid", "true");
    } else if (valid) {
      passwordError.textContent = "";
      passwordError.classList.remove("show");
      passwordInput.setAttribute("aria-invalid", "false");
    }
    return valid;
  }

  function refreshSubmit() {
    submitBtn.disabled = !(validateIdentity(false) && validatePassword(false));
  }

  function shake() {
    card.classList.remove("shake");
    void card.offsetWidth;
    card.classList.add("shake");
  }

  identityInput.addEventListener("input", function () {
    validateIdentity(identityInput.value.trim() !== "");
    refreshSubmit();
  });

  identityInput.addEventListener("blur", function () {
    validateIdentity(true);
  });

  passwordInput.addEventListener("input", function () {
    validatePassword(passwordInput.value !== "");
    refreshSubmit();
  });

  passwordInput.addEventListener("blur", function () {
    validatePassword(true);
  });

  togglePass.addEventListener("click", function () {
    var showing = passwordInput.type === "text";
    passwordInput.type = showing ? "password" : "text";
    togglePass.classList.toggle("showing", !showing);
    togglePass.setAttribute("aria-label", showing ? "Tampilkan password" : "Sembunyikan password");
    togglePass.setAttribute("aria-pressed", String(!showing));
    passwordInput.focus();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var identityOk = validateIdentity(true);
    var passOk = validatePassword(true);
    if (!identityOk || !passOk) {
      shake();
      return;
    }

    // Cegah double click + tampilkan state loading
    submitText.textContent = "Sedang masuk...";
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    // Simulasi proses login 1,5 detik
    setTimeout(function () {
      window.location.href = "success.html";
    }, 1500);
  });

  refreshSubmit();
})();
