import * as request from './requester.js';

const baseUrl = 'http://localhost:3030/data';

export const getAll = () => request.get(`${baseUrl}/pets?sortBy=_createdOn%20desc&distinct=name`)

export const getOne = (petId) => request.get(`${baseUrl}/pets/${petId}`)

export const create = (petData) => request.post(`${baseUrl}/pets`, petData)

export const edit = (petId, petData) => request.put(`${baseUrl}/pets/${petId}`, petData)

export const remove = (petId) => request.del(`${baseUrl}/pets/${petId}`)

export const makeDonation = (petId) => request.post(`${baseUrl}/donation`, petId)

export const getAllDonations = (petId) => request.get(`${baseUrl}/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`)

export const getAllDonationsFromAUser = (petId, userId) => request.get(`${baseUrl}/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`)