export const GET_ALL_SERVICES_URL = "http://localhost:3001/services/all";
export const SERVICES_URL = "http://localhost:3001/services";

export function filterServices(array, building, status){
    let result;
    console.log(status)
    if (building !== 'All' && status === 'All') {
        result = array.filter(s => s.building.name === building)
        return result
    }
    if (status !== 'All' && building === 'All') {
        if(status === 'Pendiente') result = array.filter(s => !s.accepted)
        else result = array.filter(s => s.accepted)
        return result
    }
    if (building !== 'All' && status !== 'All') {
        result = array.filter(s => s.building.name === building)
        if(status === 'Pendiente') result = array.filter(s => !s.accepted)
        else result = array.filter(s => s.accepted)
        return result
    }

    return array
}