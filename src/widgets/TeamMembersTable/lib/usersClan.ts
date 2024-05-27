import { LestaClanMember } from 'entities/Lesta/model/types/clans';

export function usersClan(clanUsers: LestaClanMember[]): LestaClanMember[] {
  if (!clanUsers.length) return [];

  const roleValues: Record<string, string> = {
    private: 'private',
    executive_officer: 'executive_officer',
    commander: 'commander',
  };

  const usersWithRole = clanUsers.map((user) => {
    if ((user as LestaClanMember).role) {
      return {
        ...user,
        role: roleValues[(user as LestaClanMember).role],
      };
    }
    return user;
  });

  const commanders = usersWithRole.filter((user) => user.role === roleValues.commander);
  const executiveOfficers = usersWithRole.filter((user) => user.role === roleValues.executive_officer);
  const otherUsers = usersWithRole.filter((user) => (
    user.role !== roleValues.commander && user.role !== roleValues.executive_officer
  ));

  const sortedUsers = [
    ...commanders,
    ...executiveOfficers,
    ...otherUsers,
  ];

  return sortedUsers as LestaClanMember[];
}
