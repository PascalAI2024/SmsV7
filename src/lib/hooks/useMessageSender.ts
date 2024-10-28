import { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { produce } from 'immer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { messageVariantSchema } from '../schemas';
import toast from 'react-hot-toast';

export function useMessageSender() {
  const [streak, setStreak] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(Date.now());
  const [comboMultiplier, setComboMultiplier] = useState(1);

  const form = useForm({
    resolver: zodResolver(messageVariantSchema),
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 100));
      return { success: true };
    },
    onSuccess: () => {
      toast.success('Message sent successfully');
    },
    onError: () => {
      toast.error('Failed to send message');
    },
  });

  const handleTap = useCallback(() => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapTime;

    if (timeSinceLastTap < 1000) {
      setStreak(produce((draft) => draft + 1));
      setComboMultiplier(produce((draft) => Math.min(draft + 0.1, 5)));
    } else {
      setStreak(1);
      setComboMultiplier(1);
    }

    setLastTapTime(now);
    sendMessageMutation.mutate('message');
  }, [lastTapTime, sendMessageMutation]);

  return {
    streak,
    comboMultiplier,
    handleTap,
    isLoading: sendMessageMutation.isPending,
    form,
  };
}