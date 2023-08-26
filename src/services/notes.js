import axios from "axios";
// const baseUrl = 'http://localhost:3002/notes';
const baseUrl = 'http://localhost:3003/api/notes';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

// const getAll = () => {
//     return axios.get(baseUrl);
// }

// const create = newObject => {
//     return axios.post(baseUrl, newObject);
// }

// const update = (id, newObject) => {
//     return axios.put(`${baseUrl}/${id}`, newObject);
// }

export default { getAll, create, update }

// export default {
//     getAll: getAll,
//     create: create,
//     update: update
// }