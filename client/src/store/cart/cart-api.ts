import { API_URL } from "@/entities/config"
import axios from "axios"
import type { ICart } from "./cart-model"

export const getCart = async() => {
  const res = await axios.get<ICart>(`${API_URL}/cart`)

  return res.data
}

export const incrementProductCart = async(id: number) => {
  const res = await axios.post(`${API_URL}/cart/increment/${id}`)

  return res.data
}

export const decrementProductCart = async(id: number) => {
  const res = await axios.post(`${API_URL}/cart/decrement/${id}`)

  return res.data
}

export const removeProductCart = async(id: number) => {
  const res = await axios.post(`${API_URL}/cart/remove/${id}`)

  return res.data
}

export const clearCart = async() => {
  const res = await axios.post(`${API_URL}/cart/clear`)

  return res.data
}