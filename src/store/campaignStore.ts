import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Contact {
  id: string;
  name: string;
  phone: string;
  status: 'pending' | 'sent' | 'failed';
}

interface CampaignState {
  campaignStats: {
    totalContacts: number;
    pending: number;
    sent: number;
    failed: number;
    messagesPerHour: number;
    sessionTime: string;
  };
  contacts: Contact[];
  messageVariants: {
    variantA: string;
    variantB: string;
    variantC: string;
  };
  variantStats: {
    [key: string]: {
      sent: number;
      success: number;
      rate: number;
    };
  };
  provider: {
    id: string;
    name: string;
    apiKey?: string;
  };
  duration: number;
  messagesPerHour: number;
  updateCampaignStats: (stats: Partial<CampaignState['campaignStats']>) => void;
  updateMessageVariant: (variant: string, content: string) => void;
  updateProvider: (provider: CampaignState['provider']) => void;
  setDuration: (duration: number) => void;
  setMessagesPerHour: (rate: number) => void;
  setContacts: (contacts: Contact[]) => void;
  reset: () => void;
}

const initialState = {
  campaignStats: {
    totalContacts: 0,
    pending: 0,
    sent: 0,
    failed: 0,
    messagesPerHour: 0,
    sessionTime: '00:00:00',
  },
  contacts: [],
  messageVariants: {
    variantA: '',
    variantB: '',
    variantC: '',
  },
  variantStats: {
    variantA: { sent: 0, success: 0, rate: 0 },
    variantB: { sent: 0, success: 0, rate: 0 },
    variantC: { sent: 0, success: 0, rate: 0 },
  },
  provider: {
    id: 'skyetel',
    name: 'Skyetel',
  },
  duration: 60,
  messagesPerHour: 300,
};

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set) => ({
      ...initialState,
      updateCampaignStats: (stats) =>
        set((state) => ({
          campaignStats: { ...state.campaignStats, ...stats },
        })),
      updateMessageVariant: (variant, content) =>
        set((state) => ({
          messageVariants: { ...state.messageVariants, [variant]: content },
        })),
      updateProvider: (provider) => set({ provider }),
      setDuration: (duration) => set({ duration }),
      setMessagesPerHour: (messagesPerHour) => set({ messagesPerHour }),
      setContacts: (contacts) => set({ contacts }),
      reset: () => set(initialState),
    }),
    {
      name: 'campaign-storage',
    }
  )
);