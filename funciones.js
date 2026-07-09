function calcularDisponible(ingresos, egresos) {
  let disponible = ingresos - egresos;
  if (disponible < 0) {
    return 0;
  } else {
    return disponible;
  }
}
function calcularCapacidadPago(){
    return montoDisponible * 0.5;
}

function calcularInteresSimple(monto, tasa, plazoAnios) {
  return plazoAnios * monto * (tasa / 100);
}

function calcularTotalPagar(){

}

function calcularCuotaMensual(){

}

function aprobarCredito(){

}




