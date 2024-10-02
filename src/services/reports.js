import axios from 'axios'
const baseUrl= 'http://192.168.1.7:3001/reports'

const getAll = () => {
    const request = axios.get(baseUrl)

    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)

    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)

    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    update
}