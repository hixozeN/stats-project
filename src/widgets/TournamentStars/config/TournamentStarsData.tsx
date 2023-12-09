import icon1 from 'shared/assets/images/lending-test/icon-lending-test.jpg';
import img1 from 'shared/assets/images/lending-test/image 30.png';
import img2 from 'shared/assets/images/lending-test/image 31.png';
import img3 from 'shared/assets/images/lending-test/image 32.png';
import img4 from 'shared/assets/images/lending-test/image 33.png';
import icon2 from 'shared/assets/images/lending-test/icon-lenging-test-jpg.jpg';

export const awardsList = [
  {
    id: 1,
    image: img1,
    rarity: 'common',
  },
  {
    id: 2,
    image: img2,
    rarity: 'unique',
  },
  {
    id: 3,
    image: img3,
    rarity: 'epic',
  },
  {
    id: 4,
    image: img4,
    rarity: 'legendary',
  },
];

export const dataList = [
  {
    id: 1,
    icon: icon1,
    team: 'OLRCY',
    rating: 2674,
    tournaments: 27,
    modes: 25,
    members: 9,
    awards: [awardsList[0], awardsList[1], awardsList[2], awardsList[3]],
  },
  {
    id: 2,
    icon: icon2,
    team: 'No Mercy',
    rating: 2674,
    tournaments: 12,
    modes: 25,
    members: 1,
    awards: [awardsList[3]],
  },
  {
    id: 3,
    icon: icon1,
    team: 'Ace Ventura',
    rating: 2674,
    tournaments: 43,
    modes: 25,
    members: 9,
    awards: [awardsList[1]],
  },
  {
    id: 4,
    icon: icon1,
    team: '7STAR',
    rating: 2674,
    tournaments: 0,
    modes: 25,
    members: 2,
    awards: [awardsList[1], awardsList[2]],
  },
  {
    id: 5,
    icon: icon1,
    team: 'GuchiGangTeam',
    rating: 1245,
    tournaments: 0,
    modes: 25,
    members: 4,
    awards: [awardsList[2], awardsList[3]],
  },
];
