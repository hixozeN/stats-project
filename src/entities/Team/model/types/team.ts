interface AwardsTeam {
  _id: number;
  image: string;
  rarity: string;
}

export interface TeamData {
  _id: number;
  logo: string;
  name: string;
  rating: number;
  tournaments: number;
  modes: number;
  members: number;
  awards: AwardsTeam[];
  isOpened?: boolean;
  participants?: number[];
}

export interface TeamItemProps {
  dataTeam: TeamData;
}

export interface TeamsSchema {
  myTeams?: TeamData[];
  openedTeams?: TeamData[];
  topTeams?: TeamData[];
  isLoading: boolean;
  error?: string;
}
