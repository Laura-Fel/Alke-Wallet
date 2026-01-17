/* ===============================
   ALKE WALLET - MAIN JS
   =============================== */

$(document).ready(function () {
  console.log("Alke Wallet JS cargado correctamente");

  // ======================
  // ESTADO GLOBAL
  // ======================
  let saldo = Number(localStorage.getItem("saldo")) || 1000000;
  let ingresos = Number(localStorage.getItem("ingresos")) || 0;
  let gastos = Number(localStorage.getItem("gastos")) || 0;
  let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];

  function guardarEstado() {
    localStorage.setItem("saldo", saldo);
    localStorage.setItem("ingresos", ingresos);
    localStorage.setItem("gastos", gastos);
    localStorage.setItem("transacciones", JSON.stringify(transacciones));
  }

  /* ======================
     LOGIN
  ====================== */
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    const user = $("#user").val();
    const pass = $("#pass").val();

    if (user === "admin" && pass === "1234") {
      alert("Ingreso exitoso");
      window.location.href = "menu.html";
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });

  /* ======================
     DEPÓSITO
  ====================== */
  $("#depositForm").on("submit", function (e) {
    e.preventDefault();

    const monto = Number($("#amount").val());

    if (monto > 0) {
      saldo += monto;
      ingresos += monto;
      transacciones.push(`Depósito de $${monto}`);
      guardarEstado();

      alert(`Transferencia realizada. Saldo restante: $${saldo}`);
      this.reset();
      window.location.href = "menu.html";
    }
  });

  /* ======================
     ENVÍO DE DINERO
  ====================== */
  $("#sendForm").on("submit", function (e) {
    e.preventDefault();

    const contacto = $("#contact").val();
    const monto = Number($("#amount").val());

    if (monto > 0 && monto <= saldo) {
      saldo -= monto;
      gastos += monto;
      transacciones.push(`Envío de $${monto} a ${contacto}`);
      guardarEstado();

      alert(`Transferencia realizada. Saldo restante: $${saldo}`);
      this.reset();
    } else {
      alert("Saldo insuficiente");
      window.location.href = "menu.html";
    }
  });

  /* ======================
     MENU
  ====================== */
  if ($("#saldo").length) {
    $("#saldo").text(`$${saldo.toLocaleString()}`);
    $("#ingresos").text(`$${ingresos.toLocaleString()}`);
    $("#gastos").text(`$${gastos.toLocaleString()}`);
  }

  /* ======================
     TRANSACCIONES
  ====================== */
  if ($("#transactionsList").length) {
    $("#transactionsList").empty();

    if (transacciones.length === 0) {
      $("#transactionsList").append("<li>No hay transacciones registradas</li>");
    } else {
      transacciones.forEach(t => {
        $("#transactionsList").append(`<li>${t}</li>`);
      });
    }
  }

  /* ======================
     ANIMACIONES JQUERY
  ====================== */
  $(".app-card").hide().fadeIn(500);
});
