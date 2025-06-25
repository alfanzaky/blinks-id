// components/js/interaksi.js

// Fungsi untuk menampilkan alert hanya sekali (gunakan localStorage) document.addEventListener("DOMContentLoaded", function () { const alertContainer = document.getElementById("alert-container"); const alertKey = "alertDismissed";

if (alertContainer && !localStorage.getItem(alertKey)) { fetch("components/alert.html") .then((res) => res.text()) .then((html) => { alertContainer.innerHTML = html;

// Tambahkan event listener ke tombol close
    const closeBtn = alertContainer.querySelector(".btn-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        alertContainer.innerHTML = "";
        localStorage.setItem(alertKey, true);
      });
    }
  })
  .catch((err) => console.error("Gagal memuat alert:", err));

} });


