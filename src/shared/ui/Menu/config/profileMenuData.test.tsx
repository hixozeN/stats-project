import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { User } from 'entities/User/index';
import { getMenuElements } from './profileMenuData';

describe('Menu elements', () => {
  const guestAuthData: User | null = null;
  const nonLestaAuthData: User = { username: 'Jest', lestaData: null };
  const lestaAuthData: User = {
    username: 'Jest',
    lestaData: {
      nickname: 'Jest',
      account_id: 12345,
    },
  };

  test('Список элементов для гостевого сайдбара', () => {
    const elements = getMenuElements({ module: 'guestSidebar', authData: guestAuthData });
    expect(elements.length).toBe(4);
  });

  test('Список элементов для авторизованного юзера', () => {
    const elements = getMenuElements({ module: 'userSidebar', authData: nonLestaAuthData });
    expect(elements.length).toBe(5);
  });

  test('Корректная ссылка на прикрепление LestaID для обычного юзера', () => {
    const elements = getMenuElements({ module: 'userSidebar', authData: nonLestaAuthData });
    const statsElement = elements.find((item) => item.name === 'Статистика');
    expect(statsElement.path).toBe(RoutePath.connectLesta);
  });

  test('Корректная ссылка на статистику текущего юзера', () => {
    const elements = getMenuElements({ module: 'userSidebar', authData: lestaAuthData });
    const statsElement = elements.find((item) => item.name === 'Статистика');
    expect(statsElement.path).toBe(`${RoutePath.user_id}/${lestaAuthData.lestaData.account_id}`);
  });
});
