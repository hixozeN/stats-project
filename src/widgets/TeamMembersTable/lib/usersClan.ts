import { LestaClanMember, LestaClanPlayer, LestaClanUser } from 'entities/Lesta/model/types/clans';

const roleValues: Record<string, string> = {
  private: 'Рядовой',
  executive_officer: 'Зам',
  commander: 'Командир',
};

export function usersClan(players: LestaClanPlayer[], members: LestaClanMember[]): LestaClanUser[] {
  if (!players.length || !members.length) return null;

  const resultArray: LestaClanUser[] = [];
  const membersWithRoleMap: Record<number, LestaClanMember> = {};

  members.forEach((member) => {
    membersWithRoleMap[member.account_id] = {
      ...member,
      role: roleValues[member.role],
    };
  });

  const concatenatedPlayers = players.map((player) => {
    const matchingMember = membersWithRoleMap[player.account_id];
    return matchingMember ? { ...player, ...matchingMember } : player;
  });

  const sortedPlayers: LestaClanMember[] = concatenatedPlayers.sort((a, b) => (
    a.nickname.localeCompare(b.nickname)
  ));

  const officers = sortedPlayers.filter((p) => p.role === roleValues.executive_officer);
  const privates = sortedPlayers.filter((p) => p.role === roleValues.private);

  resultArray.push(sortedPlayers.find((p) => p.role === roleValues.commander));
  resultArray.push(...officers);
  resultArray.push(...privates);

  return resultArray;
}
