export interface VibeProfile {
  hobbies: string[];
  customHobby?: string;
  budget: string;
  genderPref: string;
  religiPref: string;
  alcoholPref: string;
  personality: string;
  schedule: string[];
  channel: string;
  city: string;
  subdistrict?: string;
}

export interface CircleMatch {
  circleId: string;
  name: string;
  description: string;
  hobby: string;
  score: number;
  members: number;
  maxMembers: number;
  city: string;
}

export interface MeetupPlan {
  meetingNo: number;
  title: string;
  venue: string;
  agenda: string;
  icebreaker: string;
}
