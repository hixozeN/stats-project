import { TeamData } from '../model/types/team';

export function filterMyTeams(data: TeamData[]): TeamData[] {
  return data;
  // return data.filter((item: TeamData) => item.isLadder === false && item.isFinished === false);
}

export function filterOpenedTeams(data: TeamData[]): TeamData[] {
  return data.filter((item: TeamData) => item.isOpened === false);
}

export function filterTopTeams(data: TeamData[]): TeamData[] {
  return data;
  // return data.filter((item: TeamData) => item. === true);
}
