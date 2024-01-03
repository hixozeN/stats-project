interface PrizeData {
  currency: string;
  amount: number;
}

interface TournamentRounds {
  matches: string[];
  roundNumber: string;
}

export interface TournamentData {
  _id: string;
  name: string;
  image: string;
  participants: string[];
  mode: string;
  isRegOpen: boolean;
  isFinished: boolean;
  isPrivate: boolean;
  isLadder: boolean;
  allowed_teams: string[] | null;
  description: string;
  rules: string;
  prize: PrizeData;
  max_teams: number;
  min_rating: number;
  registration_until: number;
  rounds: TournamentRounds[];
  date_start: number;
  date_end: number;
}

export interface TournamentSchema {
  tournaments?: TournamentData[];
  ladders?: TournamentData[];
  finished?: TournamentData[];
  isLoading: boolean;
  error?: string;
}
