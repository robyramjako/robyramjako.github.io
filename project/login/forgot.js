/* Project 01 — logika halaman lupa password (demo tanpa backend) */

(function () {
  var card = document.getElementById("card");
  var form = document.getElementById("forgotForm");
  var identityInput = document.getElementById("identity");
  var identityError = document.getElementById("identityError");
  var submitBtn = document.getElementById("submitBtn");
  var sentState = document.getElementById("sentState");
  var backLink = document.getElementById("backLink");

  if (!form) return;

  function validateIdentity(showError) {
    var value = identityInput.value.trim();
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[a-zA-Z0-9_.]{3,}$/.test(value);
    if (!valid && showError) {
      identityError.textContent = value === ""
        ? "Email atau username wajib diisi."
        : "Isi email yang valid atau username (min. 3 karakter).";
      identityError.classList.add("show");
      identityInput.setAttribute("aria-invalid", "true");
    } else if (valid) {
      identityError.textContent = "";
      identityError.classList.remove("show");
      identityInput.setAttribute("aria-invalid", "false");
    }
    return valid;
  }

  identityInput.addEventListener("input", function () {
    validateIdentity(identityInput.value.trim() !== "");
    submitBtn.disabled = !validateIdentity(false);
  });

  identityInput.addEventListener("blur", function () {
    validateIdentity(true);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validateIdentity(true)) {
      card.classList.remove("shake");
      void card.offsetWidth;
      card.classList.add("shake");
      return;
    }

    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    // Simulasi pengiriman 1,5 detik, lalu tampilkan state terkirim
    setTimeout(function () {
      form.hidden = true;
      backLink.hidden = true;
      sentState.hidden = false;
    }, 1500);
  });

  submitBtn.disabled = true;
})();
