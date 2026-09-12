/* Project 01 v3 — logika halaman daftar (demo murni, tanpa storage) */

(function () {
  var card = document.getElementById("card");
  var form = document.getElementById("registerForm");
  var nameInput = document.getElementById("name");
  var identityInput = document.getElementById("identity");
  var passwordInput = document.getElementById("password");
  var confirmInput = document.getElementById("confirm");
  var nameError = document.getElementById("nameError");
  var identityError = document.getElementById("identityError");
  var passwordError = document.getElementById("passwordError");
  var confirmError = document.getElementById("confirmError");
  var submitBtn = document.getElementById("submitBtn");
  var submitText = submitBtn.querySelector(".btn-text");
  var togglePass = document.getElementById("togglePass");
  var doneState = document.getElementById("doneState");
  var backLink = document.getElementById("backLink");

  if (!form) return;

  function setError(input, el, message) {
    if (message) {
      el.textContent = message;
      el.classList.add("show");
      input.setAttribute("aria-invalid", "true");
      return false;
    }
    el.textContent = "";
    el.classList.remove("show");
    input.setAttribute("aria-invalid", "false");
    return true;
  }

  function validateName(showError) {
    var valid = nameInput.value.trim().length >= 2;
    if (!valid && showError) {
      return setError(nameInput, nameError, "Nama minimal 2 karakter.");
    }
    return valid ? setError(nameInput, nameError, "") : false;
  }

  function validateIdentity(showError) {
    var value = identityInput.value.trim();
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[a-zA-Z0-9_.]{3,}$/.test(value);
    if (!valid && showError) {
      return setError(identityInput, identityError, value === ""
        ? "Email atau username wajib diisi."
        : "Isi email yang valid atau username (min. 3 karakter: huruf, angka, titik, garis bawah).");
    }
    return valid ? setError(identityInput, identityError, "") : false;
  }

  function validatePassword(showError) {
    var value = passwordInput.value;
    var valid = value.length >= 8 && /[a-zA-Z]/.test(value) && /[0-9]/.test(value);
    if (!valid && showError) {
      return setError(passwordInput, passwordError, value === ""
        ? "Password wajib diisi."
        : "Password minimal 8 karakter dan harus ada huruf dan angka.");
    }
    return valid ? setError(passwordInput, passwordError, "") : false;
  }

  function validateConfirm(showError) {
    var valid = confirmInput.value !== "" && confirmInput.value === passwordInput.value;
    if (!valid && showError) {
      return setError(confirmInput, confirmError, confirmInput.value === ""
        ? "Ulangi password wajib diisi."
        : "Password tidak sama. Cek lagi.");
    }
    return valid ? setError(confirmInput, confirmError, "") : false;
  }

  function refreshSubmit() {
    submitBtn.disabled = !(validateName(false) && validateIdentity(false) && validatePassword(false) && validateConfirm(false));
  }

  function shake() {
    card.classList.remove("shake");
    void card.offsetWidth;
    card.classList.add("shake");
  }

  nameInput.addEventListener("input", function () {
    validateName(nameInput.value.trim() !== "");
    refreshSubmit();
  });
  nameInput.addEventListener("blur", function () {
    validateName(true);
  });

  identityInput.addEventListener("input", function () {
    validateIdentity(identityInput.value.trim() !== "");
    refreshSubmit();
  });
  identityInput.addEventListener("blur", function () {
    validateIdentity(true);
  });

  passwordInput.addEventListener("input", function () {
    validatePassword(passwordInput.value !== "");
    validateConfirm(confirmInput.value !== "");
    refreshSubmit();
  });
  passwordInput.addEventListener("blur", function () {
    validatePassword(true);
  });

  confirmInput.addEventListener("input", function () {
    validateConfirm(confirmInput.value !== "");
    refreshSubmit();
  });
  confirmInput.addEventListener("blur", function () {
    validateConfirm(true);
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
    var okName = validateName(true);
    var okIdentity = validateIdentity(true);
    var okPass = validatePassword(true);
    var okConfirm = validateConfirm(true);
    if (!okName || !okIdentity || !okPass || !okConfirm) {
      shake();
      return;
    }

    submitText.textContent = "Memproses...";
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    // Simulasi 1,5 detik, lalu tampilkan state berhasil (tanpa menyimpan apa pun)
    setTimeout(function () {
      form.hidden = true;
      backLink.hidden = true;
      doneState.hidden = false;
    }, 1500);
  });

  refreshSubmit();
})();
