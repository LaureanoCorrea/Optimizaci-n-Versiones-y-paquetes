// const suma = (numero1, numero2) => {
//   if (!numero1 || !numero2) return 0;
//   if (typeof numero1 !== "number" || numero2 !== "number") return null;

//   let result = numero1 + numero2;
//   return result;
// }
// const suma = (...numeros) => {
//   if (numeros.length === 0) return 0;
//   //   if (typeof numero1 !== "number" || numero2 !== "number") return null;
//   let validInputs = true;
//   for (let i = 0; i < numeros.length && validInputs; i++) {
//     if (typeof numeros[i] !== "number") validInputs = false;
//   }
//   if (!validInputs) return null;

//   let result = 0;

//   for (let i = 0; i < numeros.length; i++) {
//     result = numeros[i];
//   }
//   return result;
// };

let suma = (...numeros) => {
    if (numeros.length === 0) return 0;
    if (!numeros.every((numero) => typeof numero === "number")) return null;

    return numeros.reduce((sumaTotal, numero) => sumaTotal += numero, 0);
}

let testTotales = 4;
let testValidos = 0;

console.log("Prueba de suma__________________________________________");
console.log("Prueba 1__________________________________________");
console.log(
  "prueba 1, la funcion debe devolver null si algun parametro no es numerico."
);

let resulTest1 = suma("2", 2);
if (resulTest1 === null) {
  console.log("Prueba 1 OK");
  testValidos++;
} else {
  console.log(
    `Prueba 1 FAIL, se recibio ${typeof resulTest1} pero se esperaba null`
  );
}

console.log("Prueba 2__________________________________________");
console.log("prueba 2, la funcion debe devolver 0 si no se pasan parametros.");

let resulTest2 = suma();
if (resulTest2 === 0) {
  console.log("Prueba 2 OK");
  testValidos++;
} else {
  console.log(
    `Prueba 2 FAIL, se recibio ${typeof resulTest2} pero se esperaba 0`
  );
}

console.log("Prueba 3__________________________________________");
console.log("prueba 3, la funcion debe devolver el resultado correcto.");

let resulTest3 = suma(2, 3);
if (resulTest3 === 5) {
  console.log("Prueba 3 OK");
  testValidos++;
} else {
  console.log(
    `Prueba 3 FAIL, se recibio ${typeof resulTest3} pero se esperaba 5`
  );
}

console.log("Prueba 4__________________________________________");
console.log(
  "prueba 4, la funcion debe devolver la suma de todos los parametros."
);

let resulTest4 = suma(2, 3, 4, 5);
if (resulTest4 === 14) {
  console.log("Prueba 4 OK");
  testValidos++;
} else {
  console.log(
    `Prueba 4 FAIL, se recibio ${typeof resulTest4} pero se esperaba 14`
  );
}

console.log(`Prueba ${testValidos}/${testTotales} `);
