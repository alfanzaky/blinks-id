document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");

  includes.forEach(el => {
    const file = el.getAttribute("data-include");

    // Skip jika alert sudah pernah ditutup
    if (file.includes("alert.html") && localStorage.getItem("alertDismissed") === "true") {
      el.remove(); // hapus div kosong
      return;
    }

    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`Gagal memuat ${file}`);
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;

        // Jika ini adalah alert, tambahkan listener untuk tombol close
        if (file.includes("alert.html")) {
          const closeBtn = el.querySelector(".btn-close");
          if (closeBtn) {
            closeBtn.addEventListener("click", () => {
              localStorage.setItem("alertDismissed", "true");
            });
          }
        }

        // Jalankan kembali script Bootstrap jika ada
        if (typeof bootstrap !== "undefined" && bootstrap.init) bootstrap.init();
      })
      .catch(err => console.error("Include error:", err));
  });
});
