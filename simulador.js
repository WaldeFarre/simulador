function calcular() {
  let ingresos = parseFloat(document.getElementById("txtIngresos").value);
  let egresos = parseFloat(document.getElementById("txtEgresos").value);

  let disponible = calcularDisponible(ingresos, egresos);
  document.getElementById("spnDisponible").innerHTML = "USD " + disponible.toFixed(2);

  let capacidad = calcularCapacidadPago(disponible);
  document.getElementById("spnCapacidadPago").innerHTML = "USD " + capacidad.toFixed(2);
  
}

