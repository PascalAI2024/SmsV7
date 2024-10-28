import { useQuery } from '@tanstack/react-query';
import { format, subDays } from 'date-fns';

export function useAnalytics(timeframe: '24h' | '7d' | '30d') {
  return useQuery({
    queryKey: ['analytics', timeframe],
    queryFn: async () => {
      // Simulate API call
      const days = timeframe === '24h' ? 1 : timeframe === '7d' ? 7 : 30;
      const data = Array.from({ length: days }).map((_, i) => ({
        date: format(subDays(new Date(), i), 'yyyy-MM-dd'),
        sent: Math.floor(Math.random() * 1000),
        failed: Math.floor(Math.random() * 100),
        rate: Math.random() * 100,
      }));
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}