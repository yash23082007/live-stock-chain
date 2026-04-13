import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'

export function useMyTokens() {
  return useQuery({
    queryKey: ['tokens', 'my'],
    queryFn: () => api.get('/tokens/my').then((r) => r.data)
  })
}

export function useToken(tokenCode: string) {
  return useQuery({
    queryKey: ['tokens', tokenCode],
    queryFn: () => api.get(`/tokens/${tokenCode}`).then((r) => r.data),
    enabled: !!tokenCode
  })
}

export function useRedeemToken() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { tokenCode: string; items: any[] }) =>
      api.post('/tokens/redeem', data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tokens'] })
  })
}
