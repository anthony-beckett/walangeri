/**
 * reports.js
 *
 * Service for handling operations related to maintenance reports.
 * Includes functions for retrieving, creating, updating, and deleting reports.
 */

import axios from 'axios'
const baseUrl= 'http://192.168.1.7:3001/api/reports'

let token = null

/**
 * Sets the authorization token for requests.
 * 
 * @param {string} newToken - The JWT token to authorize requests.
 */
const setToken = newToken => {
    token = `Bearer ${newToken}`
}

/**
 * Fetches all reports from the backend.
 * 
 * @returns {Promise<Array>} - An array of all report objects.
 * @throws {Error} - If the request fails.
 */
const getAll = () => {
    const request = axios.get(baseUrl)

    return request.then(response => response.data)
}

/**
 * Creates a new report in the backend.
 * 
 * @param {Object} newObject - The report data to create a new report.
 * @param {string} newObject.reportName - Name of the report.
 * @param {string} newObject.addressLot - Address or lot information.
 * @param {string} newObject.jobType - Type of job (e.g., Carpentry).
 * @param {string} newObject.urgencyLevel - Urgency level of the job.
 * @param {string} [newObject.notes] - Additional notes (optional).
 * @param {string} [newObject.image] - Base64 encoded image (optional).
 * @returns {Promise<Object>} - The created report data returned from the server.
 * @throws {Error} - If the creation request fails.
 */
const create =  async newObject => {
    const config = {
        headers: { Authorization: token},
    }

    const response = await axios.post(baseUrl, newObject, config)

    return response.data
}

/**
 * Updates an existing report with new data.
 * 
 * @param {string} id - The ID of the report to update.
 * @param {Object} newObject - The updated report data.
 * @returns {Promise<Object>} - The updated report object returned from the server.
 * @throws {Error} - If the update request fails.
 */
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)

    return request.then(response => response.data)
}

/**
 * Deletes a report from the backend.
 * 
 * @param {string} id - The ID of the report to delete.
 * @returns {Promise<Object>} - The response data after deletion.
 * @throws {Error} - If the delete request fails.
 */
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