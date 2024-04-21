import { TournamentData } from '../model/types/tournament';

export function filterDataOnTournaments(data: TournamentData[]): TournamentData[] {
  return data.filter((item: TournamentData) => item.isLadder === false && item.isFinished === false);
}

export function filterDataOnLadders(data: TournamentData[]): TournamentData[] {
  return data.filter((item: TournamentData) => item.isLadder === true && item.isFinished === false);
}

export function filterFinishedTournaments(data: TournamentData[]): TournamentData[] {
  return data.filter((item: TournamentData) => item.isFinished === true);
}
