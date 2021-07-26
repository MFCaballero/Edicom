export const GET_ALL_COMPLAINTS_URL = "http://localhost:3001/complaints/all";
export const PUT_SEEN_COMPLAINT_URL = "http://localhost:3001/complaints/";
export const PUT_STATE_COMPLAINT_URL = "http://localhost:3001/complaints/state/";
export const GET_COMPLAINTS_BY_USER_URL = 'http://localhost:3001/complaints/user/';
export const ADD_COMPLAINTS = "http://localhost:3001/complaints/"
export function filterComplaints(array, building, importance, status){
    let result;
    if(status !== 'All') status === 'Abierto' ? status = 'opened' : status = 'closed'
    console.log(array,building,importance,status)
    if (building !== 'All' && importance === 'All' && status === 'All') {
        result = array.filter(s => s.building.name === building)
        return result
    }
    if (importance !== 'All' && building === 'All' && status === 'All') {
        result = array.filter(s => s.importance === importance)
        return result
    }
    if (status !== 'All' && building === 'All' && importance === 'All') {
        result = array.filter(s => s.state === status)
        return result
    }
    if (building !== 'All' && importance !== 'All' && status !== 'All') {
        result = array.filter(s => s.building.name === building)
        .filter(s => s.importance === importance)
        .filter(s => s.state === status)
        return result
    }
    if (building !== 'All' && importance !== 'All' && status === 'All') {
        result = array.filter(s => s.building.name === building)
        .filter(s => s.importance === importance)
        return result
    }
    if (building !== 'All' && importance === 'All' && status !== 'All') {
        result = array.filter(s => s.building.name === building)
        .filter(s => s.state === status)
        return result
    }
    if (building === 'All' && importance !== 'All' && status !== 'All') {
        result = array.filter(s => s.importance === importance)
        .filter(s => s.state === status)
        return result
    }
    return array
}