function calcular() {
  if (!validar()) {
    return;
  }

  let ingresos = parseFloat(document.getElementById("txtIngresos").value);
  let egresos = parseFloat(document.getElementById("txtEgresos").value);

  let disponible = calcularDisponible(ingresos, egresos);
  document.getElementById("spnDisponible").innerHTML = "USD " + disponible.toFixed(2);

  let capacidad = calcularCapacidadPago(disponible);
  document.getElementById("spnCapacidadPago").innerHTML = "USD " + capacidad.toFixed(2);

  let monto = parseInt(document.getElementById("txtMonto").value);
  let plazo = parseInt(document.getElementById("txtPlazo").value);
  let tasa = parseInt(document.getElementById("txtTasaInteres").value);

  let interes = calcularInteresSimple(monto, tasa, plazo);
  document.getElementById("spnInteresPagar").innerHTML = "USD " + interes.toFixed(2);

  let total = calcularTotalPagar(monto, interes);
  document.getElementById("spnTotalPrestamo").innerHTML = "USD " + total.toFixed(2);

  let cuota = calcularCuotaMensual(total, plazo);
  document.getElementById("spnCuotaMensual").innerHTML = "USD " + cuota.toFixed(2);

  let aprobado = aprobarCredito(capacidad, cuota);
  if (aprobado) {
    document.getElementById("spnEstadoCredito").innerHTML = "CREDITO APROBADO";
  } else {
    document.getElementById("spnEstadoCredito").innerHTML = "CREDITO RECHAZADO";
  }
}

function validar() {
  let valido = true;

  if (!validarCampo("txtIngresos", "errIngresos", false, 1, 1000000)) valido = false;
  if (!validarCampo("txtEgresos", "errEgresos", false, 0, 1000000)) valido = false;
  if (!validarCampo("txtMonto", "errMonto", true, 100, 100000)) valido = false;
  if (!validarCampo("txtPlazo", "errPlazo", true, 1, 30)) valido = false;
  if (!validarCampo("txtTasaInteres", "errTasa", true, 1, 100)) valido = false;

  if (!valido) {
    limpiarResultados();
  }
  return valido;
}

function validarCampo(idInput, idError, entero, minimo, maximo) {
  let valor = document.getElementById(idInput).value.trim();
  limpiarError(idInput, idError);

  if (valor === "") {
    marcarError(idInput, idError, "Este campo es obligatorio.");
    return false;
  }
  if (isNaN(valor)) {
    marcarError(idInput, idError, "Ingresa un número válido.");
    return false;
  }

  let numero = Number(valor);

  if (entero && !Number.isInteger(numero)) {
    marcarError(idInput, idError, "Debe ser un número entero.");
    return false;
  }
  if (numero < minimo) {
    marcarError(idInput, idError, "El valor mínimo permitido es " + minimo + ".");
    return false;
  }
  if (numero > maximo) {
    marcarError(idInput, idError, "El valor máximo permitido es " + maximo + ".");
    return false;
  }
  return true;
}

function marcarError(idInput, idError, mensaje) {
  document.getElementById(idError).textContent = mensaje;
  document.getElementById(idInput).closest(".input-wrap").classList.add("input-wrap--error");
}

function limpiarError(idInput, idError) {
  document.getElementById(idError).textContent = "";
  document.getElementById(idInput).closest(".input-wrap").classList.remove("input-wrap--error");
}

function limpiarResultados() {
  document.getElementById("spnDisponible").innerHTML = "—";
  document.getElementById("spnCapacidadPago").innerHTML = "—";
  document.getElementById("spnInteresPagar").innerHTML = "—";
  document.getElementById("spnTotalPrestamo").innerHTML = "—";
  document.getElementById("spnCuotaMensual").innerHTML = "—";
  document.getElementById("spnEstadoCredito").innerHTML = "ANALIZANDO...";
}

function reiniciar() {
  let inputs = ["txtIngresos", "txtEgresos", "txtMonto", "txtPlazo", "txtTasaInteres"];
  let errores = ["errIngresos", "errEgresos", "errMonto", "errPlazo", "errTasa"];
  for (let i = 0; i < inputs.length; i++) {
    document.getElementById(inputs[i]).value = "";
    limpiarError(inputs[i], errores[i]);
  }
  limpiarResultados();
}

document.getElementById("btnCalcularCredito").addEventListener("click", calcular);
document.getElementById("btnReiniciar").addEventListener("click", reiniciar);
