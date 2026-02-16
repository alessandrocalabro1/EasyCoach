export interface WodPart {
  type: 'strength' | 'skill' | 'metcon' | 'accessory';
  description: string;
  timecap_minutes: number | null;
  notes: string | null;
}

export interface Wod {
  title: string;
  parts: WodPart[];
}

export interface Prs {
  back_squat_1rm: number | null;
  front_squat_1rm: number | null;
  deadlift_1rm: number | null;
  clean_and_jerk_1rm: number | null;
  snatch_1rm: number | null;
  thruster_1rm: number | null;
  pullups_unbroken: number | null;
  muscleups_unbroken: number | null;
  row_2k: string | null;
  run_5k: string | null;
}

export interface AthletePreferences {
  rx_vs_scale: 'rx' | 'scale' | 'quality' | null;
  session_time_minutes: number | null;
}

export interface Athlete {
  name: string | null;
  level: 'beginner' | 'intermediate' | 'advanced' | 'competitive' | null;
  goals: string[];
  equipment: string[];
  injuries_or_limits: string[];
  recent_workouts_summary: string | null;
  prs: Prs;
  preferences: AthletePreferences;
}

export interface KbSnippet {
  source: string;
  snippet: string;
}

export interface AppInputData {
  date: string;
  wod: Wod;
  athlete: Athlete;
  kb_snippets: KbSnippet[];
}

export const INITIAL_EMPTY_DATA: AppInputData = {
  date: new Date().toISOString().split('T')[0],
  wod: {
    title: "",
    parts: []
  },
  athlete: {
    name: "",
    level: "intermediate", // Default
    goals: [],
    equipment: [],
    injuries_or_limits: [],
    recent_workouts_summary: null,
    prs: {
      back_squat_1rm: null,
      front_squat_1rm: null,
      deadlift_1rm: null,
      clean_and_jerk_1rm: null,
      snatch_1rm: null,
      thruster_1rm: null,
      pullups_unbroken: null,
      muscleups_unbroken: null,
      row_2k: null,
      run_5k: null
    },
    preferences: {
      rx_vs_scale: null,
      session_time_minutes: null
    }
  },
  kb_snippets: []
};
