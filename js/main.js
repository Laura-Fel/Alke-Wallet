document.addEventListener("DOMContentLoaded", () => {
  console.log("Alke Wallet JS cargado correctamente");

  // Estado global simulado
  let saldo = 1000000;
  let transacciones = [];
})

  /* ======================
     LOGIN
  ====================== */
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const user = document.getElementById("user").value;
      const pass = document.getElementById("pass").value;

      if (user === "hola@ejemplo.com" && pass === "1234") {
        alert("Ingreso exitoso");
        window.location.href = "menu.html";
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    });
  }

  /* ======================
     DEPÓSITO
  ====================== */
  const depositForm = document.getElementById("depositForm");

  if (depositForm) {
    depositForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const monto = Number(document.getElementById("amount").value);

    if (monto > 0) {
      saldo += monto;
      transacciones.push(`Depósito de $${monto}`);
      alert(`Depósito realizado. Nuevo saldo: $${saldo}`);
      depositForm.reset();

      // redirige al menú (opcional pero recomendado)
      window.location.href = "menu.html";
    } else {
      alert("Ingresa un monto válido");
    }
  });
}

/* ======================
     ENVÍO DE DINERO
  ====================== */
  const sendForm = document.getElementById("sendForm");

  if (sendForm) {
    sendForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const contacto = document.getElementById("contact").value;
      const monto = Number(document.getElementById("amount").value);

      if (monto > 0 && monto <= saldo) {
        saldo -= monto;
        transacciones.push(`Envío de $${monto} a ${contacto}`);
        alert(`Transferencia realizada. Saldo restante: $${saldo}`);
        sendForm.reset();
      } else {
        alert("Saldo insuficiente");
      }
    });
  }

  /* ======================
     TRANSACCIONES
  ====================== */
  const list = document.getElementById("transactionsList");

  if (list) {
    list.innerHTML = "";

    if (transacciones.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No hay transacciones registradas";
      list.appendChild(li);
    } else {
      transacciones.forEach(t => {
        const li = document.createElement("li");
        li.textContent = t;
        list.appendChild(li);                      
      });
    }
  }