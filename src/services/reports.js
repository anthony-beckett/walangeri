import axios from 'axios'
const baseUrl= 'http://192.168.1.7:3001/api/reports'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)

    return request.then(response => response.data)
}

const create =  async newObject => {
    const config = {
        headers: { Authorization: token},
    }

    const response = await axios.post(baseUrl, newObject, config)

    return response.data
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)

    return request.then(response => response.data)
}

const deleteReport = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

export default {
    getAll,
    create,
    update,
    deleteReport,
    setToken
}