export interface Cohort {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  name: string;
}

export interface Facilitator {
  id: string;
  name: string;
  email: string;
  region: string;
  participantsCount: number;
  isActive: boolean;
  cohorts: Cohort[];
  courses: Course[];
}
