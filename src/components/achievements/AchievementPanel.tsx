import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Target, Award, Flame, Gift, Crown } from 'lucide-react';
import { useAchievementStore } from '../../store/achievementStore';

const milestones = [
  {
    id: 'speed-demon-1',
    title: 'Speed Demon I',
    description: 'Reach 300 messages per minute',
    icon: Zap,
    requirement: 300,
    type: 'speed'
  },
  {
    id: 'speed-demon-2',
    title: 'Speed Demon II',
    description: 'Reach 500 messages per minute',
    icon: Zap,
    requirement: 500,
    type: 'speed'
  },
  {
    id: 'combo-master-1',
    title: 'Combo Master I',
    description: 'Achieve a 50x combo',
    icon: Flame,
    requirement: 50,
    type: 'combo'
  },
  {
    id: 'combo-master-2',
    title: 'Combo Master II',
    description: 'Achieve a 100x combo',
    icon: Flame,
    requirement: 100,
    type: 'combo'
  },
  {
    id: 'volume-king-1',
    title: 'Volume King I',
    description: 'Send 1,000 messages',
    icon: Trophy,
    requirement: 1000,
    type: 'volume'
  },
  {
    id: 'volume-king-2',
    title: 'Volume King II',
    description: 'Send 5,000 messages',
    icon: Trophy,
    requirement: 5000,
    type: 'volume'
  },
  {
    id: 'perfect-streak-1',
    title: 'Perfect Streak I',
    description: 'Maintain a streak for 100 taps',
    icon: Star,
    requirement: 100,
    type: 'streak'
  },
  {
    id: 'christmas-spirit',
    title: 'Christmas Spirit',
    description: 'Send 2,000 Christmas messages',
    icon: Gift,
    requirement: 2000,
    type: 'volume'
  },
  {
    id: 'rhythm-master',
    title: 'Rhythm Master',
    description: 'Maintain perfect rhythm for 60 seconds',
    icon: Crown,
    requirement: 60,
    type: 'rhythm'
  }
];

// ... rest of the component remains the same