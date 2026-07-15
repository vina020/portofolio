import { useCallback, useEffect, useState } from 'react'
import client from '../api/client'

export function useApiList(endpoint, params = {}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const paramsKey = JSON.stringify(params)

  const refetch = useCallback(() => {
    setLoading(true)
    client
      .get(endpoint, { params: JSON.parse(paramsKey) })
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [endpoint, paramsKey])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { data, loading, error, refetch }
}
