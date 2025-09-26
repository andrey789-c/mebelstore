import { API_URL } from "@/entities/config"
import type { ICategory } from "@/entities/models/product"
import axios from "axios"

export const getCatalog = async () => {
  const res = await axios.get<ICategory[]>(`${API_URL}/category`)

  return res.data
}