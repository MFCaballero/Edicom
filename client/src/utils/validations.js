




export function numeroPositivo(n) {  // 1 - 2 - 3,1 - 4 --> gastos/expensas  --> OKKKKKKKKKKKKK
    if(!isNaN(n) && n>=0){
        return true
    }
    return false
}

export function numeroPositivoEntero(n) { // --> 1,2,3,4 --> #pisos, #departamentos
    if(!isNaN(n) && n>=0 && n%1===0){
        return true
    }
    return false
}


export function correoElectronico(n) {  // 1 - 2 - 3,1 - 4 --> gastos/expensas
    if(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(n)){
        return true
    }
    return false
}

// export function alfaNumerico(n) {
//     if(!isNaN(n) && n>=0){
//         return true
//     }
//     return false
// }
