interface IAwardsTeam {
  _id: number;
  image: string;
  rarity: string;
}

interface ITeam {
  _id: number;
  icon: string;
  team: string;
  rating: number;
  tournaments: number;
  modes: number;
  members: number;
  awards: IAwardsTeam[];
}

export interface ITeamItemProps {
  dataTeam: ITeam;
}
