import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ContactState {
  totalContacts: number;
  sentCount: number;
  pendingCount: number;
  failedCount: number;
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  incrementSent: () => void;
  incrementFailed: () => void;
  resetCounters: () => void;
}

interface Contact {
  name: string;
  phone: string;
  status: 'pending' | 'sent' | 'failed';
}

export const useContactStore = create<ContactState>()(
  persist(
    (set) => ({
      totalContacts: 0,
      sentCount: 0,
      pendingCount: 0,
      failedCount: 0,
      contacts: [],
      setContacts: (contacts) => set({ 
        contacts,
        totalContacts: contacts.length,
        pendingCount: contacts.length,
        sentCount: 0,
        failedCount: 0
      }),
      incrementSent: () => set((state) => ({ 
        sentCount: state.sentCount + 1,
        pendingCount: state.pendingCount - 1
      })),
      incrementFailed: () => set((state) => ({ 
        failedCount: state.failedCount + 1,
        pendingCount: state.pendingCount - 1
      })),
      resetCounters: () => set({ 
        sentCount: 0,
        pendingCount: 0,
        failedCount: 0
      }),
    }),
    {
      name: 'contact-storage',
    }
  )
);