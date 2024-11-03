/**
 * login.js
 *
 * Service for handling user login operations.
 * Sends login requests to the backend API and returns the user data upon successful login.
 */

import axios from 'axios'
const baseUrl = 'http://192.168.1.7:3001/api/login'

/**
 * Logs in the user with provided credentials.
 * 
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.username - The user's email or username.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} - The response data containing the user's authentication token and user info.
 * @throws {Error} - If the login request fails.
 */

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { login }