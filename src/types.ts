export interface Sermon {
  id: string;
  title: string;
  minister: string;
  date: string;
  audioUrl?: string;
  category: 'Sunday' | 'Wednesday' | 'Youth' | 'Special';
  scripture: string;
  duration: string;
  summary: string;
  listenCount: number;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  category: 'Easter' | 'Youth' | 'Weekend Challenge' | 'Outreach' | 'Prayer Night' | 'General';
  imageUrl?: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  email: string;
  request: string;
  status: 'Pending' | 'Prayed For' | 'Answered';
  date: string;
  countOfPrayers: number;
}

export interface DonationLog {
  id: string;
  amount: number;
  date: string;
  fundType: 'Tithe' | 'Outreach' | 'Special Projects' | 'General Offering';
  memberName: string;
  email: string;
}

export type ActiveTab = 'home' | 'about' | 'events' | 'sermons' | 'contact' | 'calendar' | 'giving' | 'admin';
