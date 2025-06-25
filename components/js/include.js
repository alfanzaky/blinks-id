// Fungsi untuk menyisipkan file HTML ke elemen dengan atribut data-include
document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");

  includes.forEach(el => {
    const file = el.getAttribute("data-include");
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`Gagal memuat ${file}`);
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;
        // Jalankan kembali script Bootstrap (untuk dropdown, dsb.)
        if (typeof bootstrap !== "undefined" && bootstrap.init) bootstrap.init();
      })
      .catch(err => console.error("Include error:", err));
  });
});
