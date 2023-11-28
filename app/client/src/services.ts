import axios from 'axios'
import useSWR from 'swr'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

console.log(import.meta.env)

const baseURL = '/api/v1'

console.log('baseURL', baseURL)

const client = axios.create({
  baseURL,
})

const getAllMemes = async () => {
  const response = await client.get('/')
  return response.data
}

export const useCreateMeme = () => {
  const push = useNavigate()
  const [loading, setLoading] = useState(false)
  const submit = async data => {
    setLoading(true)

    try {
      await client.post('/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      push('/')
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return {
    submit,
    loading,
  }
}

export const useGetAllMemes = () => {
  const { data, error } = useSWR('get-all-memes', getAllMemes)
  console.log({
    data,
    error,
  })

  return { data, loading: !error && !data }
}
