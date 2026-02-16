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

export const MOCK_DATA: AppInputData = {
  date: new Date().toISOString().split('T')[0],
  wod: {
    title: "Monday Grind",
    parts: [
      {
        type: "strength",
        description: "Back Squat: 5-5-3-3-3 @ 70-85%",
        timecap_minutes: 20,
        notes: "Focus on deep position and fast ascent."
      },
      {
        type: "metcon",
        description: "AMRAP 12 min:\n10 Wall Balls (9/6kg)\n10 Box Jumps (60/50cm)\n10 Pull-ups",
        timecap_minutes: 12,
        notes: null
      }
    ]
  },
  athlete: {
    name: "Alex",
    level: "intermediate",
    goals: ["Increase Squat", "Improve Metcon Pacing"],
    equipment: ["Barbell", "Rower", "Box", "Pull-up bar"],
    injuries_or_limits: ["Mild lower back stiffness"],
    recent_workouts_summary: "Last week: heavy deadlifts on Tue, intense cardio on Thu.",
    prs: {
      back_squat_1rm: 140,
      front_squat_1rm: 110,
      deadlift_1rm: 180,
      clean_and_jerk_1rm: 95,
      snatch_1rm: 70,
      thruster_1rm: 85,
      pullups_unbroken: 15,
      muscleups_unbroken: 2,
      row_2k: "7:15",
      run_5k: "24:30"
    },
    preferences: {
      rx_vs_scale: "rx", // Let's see if the coach suggests scaling based on "bad back"
      session_time_minutes: 60
    }
  },
  kb_snippets: [
    {
      source: "Coach Notes",
      snippet: "Alex tends to round the back on heavy squats > 85%. Remind to brace core."
    }
  ]
};
