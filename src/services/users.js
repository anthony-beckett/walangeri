/**
 * users.js
 *
 * Service for handling user registration operations.
 * Sends registration requests to the backend API and returns user data upon successful registration.
 */

import axios from 'axios';
const baseUrl = 'http://192.168.1.7:3001/api/users';

/**
 * Registers a new user in the backend.
 * 
 * @param {Object} userDetails - The new user's registration details.
 * @param {string} userDetails.username - The user's email to be used as a username.
 * @param {string} userDetails.name - The user's display name.
 * @param {string} userDetails.password - The user's password.
 * @returns {Promise<Object>} - The response data containing the registered user information.
 * @throws {Error} - If the registration request fails.
 */
const register = async (userDetails) => {
    const response = await axios.post(baseUrl, userDetails);
    return response.data;
};

export default { register };