import React, { useEffect, useRef } from 'react';
import { useCampaignStore } from '../store/campaignStore';

const SessionTimer: React.FC = () => {
  const { 
    isSessionActive, 
    sessionConfig, 
    campaignStats,
    updateCampaignStats,
    sendNextMessage 
  } = useCampaignStore();
  
  const timerRef = useRef<NodeJS.Timeout>();
  const messageIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isSessionActive) {
      // Start session timer
      const endTime = Date.now() + sessionConfig.duration * 60 * 60 * 1000;
      
      const updateTimer = () => {
        const remaining = Math.max(0, endTime - Date.now());
        const hours = Math.floor(remaining / (60 * 60 * 1000));
        const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
        
        updateCampaignStats({
          sessionTime: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        });

        if (remaining === 0) {
          stopSession();
        }
      };

      timerRef.current = setInterval(updateTimer, 1000);
      updateTimer();

      // Start message sending interval
      if (sessionConfig.messagesPerHour > 0) {
        const interval = Math.floor(3600000 / sessionConfig.messagesPerHour);
        messageIntervalRef.current = setInterval(sendNextMessage, interval);
      }

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (messageIntervalRef.current) clearInterval(messageIntervalRef.current);
      };
    }
  }, [isSessionActive, sessionConfig.duration, sessionConfig.messagesPerHour]);

  return null; // This is a logic-only component
};

export default SessionTimer;