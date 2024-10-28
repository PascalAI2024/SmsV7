// Define core types used throughout the application

/**
 * Contact information structure
 */
export interface Contact {
  id: string;
  name: string;
  phone: string;
  status: 'pending' | 'sent' | 'failed';
}

/**
 * SMS Provider configuration
 */
export interface SMSProvider {
  id: string;
  name: string;
  apiKey?: string;
}

/**
 * Campaign session configuration
 */
export interface SessionConfig {
  duration: number; // in hours
  messagesPerHour: number;
  provider: SMSProvider;
}

/**
 * Campaign statistics
 */
export interface CampaignStats {
  totalContacts: number;
  pending: number;
  sent: number;
  failed: number;
  messagesPerHour: number;
  sessionTime: string;
}

/**
 * Message variants for randomization
 */
export interface MessageVariants {
  variantA: string;
  variantB: string;
  variantC: string;
}