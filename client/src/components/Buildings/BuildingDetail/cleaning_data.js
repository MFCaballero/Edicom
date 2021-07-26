
export function Data(array){
    var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
    };
    //aca hago un array.map para cambiar la prop concept y que queden todas iguales
    let aux = array.map(e=> e = {
        concept: (e.concept[0].toUpperCase() + e.concept.split("").slice(1).map(e => e = e.toLowerCase()).join("")),
        amount: e.amount
    })
    let grouped= groupBy(aux,"concept")
    let aux2 = []
    for (const property in grouped) {
        aux2.push({
            concept: property,
            amount: grouped[property].map(e=>e=e.amount).reduce(function(prev, curr){
        return prev + curr;
    })});
    }
    if(aux2.length <= 10) return aux2.sort((a,b) => (a.amount > b.amount) ? -1 : ((b.amount > a.amount) ? 1 : 0));
    return aux2.sort((a,b) => (a.amount > b.amount) ? -1 : ((b.amount > a.amount) ? 1 : 0)).slice(0,10);
    
}
export function dataLine(array){
    var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
    };
    let aux = array.map(e => e = {date: new Date(e.date).getMonth(), amount: e.amount})
    let grouped= groupBy(aux,"date");
    let months = [0,1,2,3,4,5,6,7,8,9,10,11]
    let aux2 = []
    for (const property in grouped) {
        grouped[property] = grouped[property].map(e=>e=e.amount).reduce(function(prev, curr){
            return prev + curr;
    })}
    months.forEach(e => grouped[e] ? null : grouped[e] = 0)
    for (const prop in grouped){
        aux2.push({
            date: parseInt(prop),
            amount: grouped[prop]
    })}
    return aux2.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
}