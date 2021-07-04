import axios from 'axios'
const baseUrl = 'https://aqueous-river-41570.herokuapp.com/api/persons'

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

const delet = (id, catcher) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data).catch(error => catcher(error))
}

export default { getAll, create, update, delet }