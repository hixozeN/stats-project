import icon1 from 'shared/assets/images/lending-test/icon-lending-test.jpg';
import img1 from 'shared/assets/images/lending-test/image 30.png';
import img2 from 'shared/assets/images/lending-test/image 31.png';
import img3 from 'shared/assets/images/lending-test/image 32.png';
import img4 from 'shared/assets/images/lending-test/image 33.png';
import icon2 from 'shared/assets/images/lending-test/icon-lenging-test-jpg.jpg';

export const awardsList = [
  {
    _id: 1,
    image: img1,
    rarity: 'common',
  },
  {
    _id: 2,
    image: img2,
    rarity: 'unique',
  },
  {
    _id: 3,
    image: img3,
    rarity: 'epic',
  },
  {
    _id: 4,
    image: img4,
    rarity: 'legendary',
  },
];

export const dataList = [
  {
    _id: 1,
    logo: icon1,
    name: 'OLRCY',
    rating: 2674,
    tournaments: 27,
    modes: 25,
    members: 9,
    awards: [awardsList[0], awardsList[1], awardsList[2], awardsList[3]],
  },
  {
    _id: 2,
    logo: icon2,
    name: 'No Mercy',
    rating: 2674,
    tournaments: 12,
    modes: 25,
    members: 1,
    awards: [awardsList[3]],
  },
  {
    _id: 3,
    logo: icon1,
    name: 'Ace Ventura',
    rating: 2674,
    tournaments: 43,
    modes: 25,
    members: 9,
    awards: [awardsList[1]],
  },
  {
    _id: 4,
    logo: icon1,
    name: '7STAR',
    rating: 2674,
    tournaments: 0,
    modes: 25,
    members: 2,
    awards: [awardsList[1], awardsList[2]],
  },
  {
    _id: 5,
    logo: icon1,
    name: 'GuchiGangTeam',
    rating: 1245,
    tournaments: 0,
    modes: 25,
    members: 4,
    awards: [awardsList[2], awardsList[3]],
  },
];
