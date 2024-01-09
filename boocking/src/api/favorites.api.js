import { baseInstance } from './index'

export const favorites = () => baseInstance.get(`/all_favorites`)

export const addFavorites = (favorites) =>
  baseInstance.post(`/add_favorites`, favorites)
