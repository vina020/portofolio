import { useEffect, useState } from 'react'
import client from '../api/client'

export function useProfile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .get('/profile')
      .then((res) => setProfile(res.data))
      .catch(() => setProfile(null))
      .finally(() => setLoading(false))
  }, [])

  return { profile, loading }
}
