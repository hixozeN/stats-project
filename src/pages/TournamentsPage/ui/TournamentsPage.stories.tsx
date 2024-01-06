import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { tournamentReducer } from 'entities/Tournament';
import TournamentsPage from './TournamentsPage';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TournamentsPage> = {
  title: 'pages/TournamentsPage',
  component: TournamentsPage,
};

export default meta;

type Story = StoryObj<typeof TournamentsPage>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Dark: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator(
      {
        tournaments: {
          tournaments: [
            {
              _id: '1',
              name: 'Обычный турнир',
              // eslint-disable-next-line max-len
              image: 'https://cdn.akamai.steamstatic.com/steam/apps/444200/ss_366cf41b49d636266346f1578116623d2c0dbdea.1920x1080.jpg?t=1701681449',
              participants: [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20',
                '21',
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '30',
                '31',
                '32',
              ],
              mode: '7x7',
              isRegOpen: false,
              isFinished: false,
              isPrivate: false,
              isLadder: false,
              allowed_teams: [],
              description: 'Четкое описание четкого турнира',
              rules: 'Анархия мать порядка',
              prize: {
                currency: '₽',
                amount: 1000,
              },
              max_teams: 64,
              min_rating: 0,
              registration_until: 1733792963,
              date_start: 1733965763,
              date_end: 1735520963,
            },
            {
              _id: '2',
              name: 'Еще один обычный турик',
              // eslint-disable-next-line max-len
              image: 'https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/c_scale,w_400/ncom/software/switch/70010000028919/61d7237ead3264ef217abd1b0c7636ece0a966c0f26b4a9104e8ffa20b907b6d',
              participants: [
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20',
                '21',
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '30',
                '31',
                '32',
              ],
              mode: '7x7',
              isRegOpen: false,
              isFinished: false,
              isPrivate: false,
              isLadder: false,
              allowed_teams: [],
              description: 'Четкое описание четкого турнира',
              rules: 'Анархия мать порядка',
              prize: {
                currency: '₽',
                amount: 1000,
              },
              max_teams: 64,
              min_rating: 0,
              registration_until: 1733792963,
              date_start: 1733965763,
              date_end: 1735520963,
            },
            {
              _id: '4',
              name: 'Это не ладдер',
              // eslint-disable-next-line max-len
              image: 'https://steamuserimages-a.akamaihd.net/ugc/250340463214516581/E278E157D5197219246AB3E1BAFCB7A64879B572/?imw=1024&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
              participants: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
              mode: '7x7',
              isRegOpen: false,
              isFinished: false,
              isPrivate: false,
              isLadder: false,
              allowed_teams: [],
              description: 'Четкое описание четкого турнира',
              rules: 'Анархия мать порядка',
              prize: {
                currency: '₽',
                amount: 1000,
              },
              max_teams: 16,
              min_rating: 0,
              registration_until: 1733792963,
              date_start: 1733965763,
              date_end: 1735520963,
            },
          ],
          ladders: [
            {
              _id: '3',
              name: 'Сезонный ладдер (Декабрь)',
              // eslint-disable-next-line max-len
              image: 'https://d1fs8ljxwyzba6.cloudfront.net/assets/article/2016/10/07/world-of-tanks-blitz-night-hunt_feature.jpg',
              participants: [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20',
                '21',
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '30',
                '31',
                '32',
              ],
              isRegOpen: false,
              isFinished: false,
              isPrivate: false,
              isLadder: true,
              allowed_teams: [],
              description: 'Четкое описание четкого турнира',
              rules: 'Анархия мать порядка',
              prize: {
                currency: '₽',
                amount: 10000,
              },
              max_teams: 64,
              min_rating: 0,
              registration_until: 1733792963,
              date_start: 1733965763,
              date_end: 1735520963,
            },
            {
              _id: '5',
              name: 'Ладдер профи',
              image: 'https://i.pinimg.com/originals/20/47/2a/20472a0f5abe7d63a97ee2ba68db7b41.jpg',
              participants: [
                '1',
              ],
              isRegOpen: false,
              isFinished: false,
              isPrivate: false,
              isLadder: true,
              allowed_teams: [],
              description: 'Четкое описание четкого турнира',
              rules: 'Анархия мать порядка',
              prize: {
                currency: '₽',
                amount: 1000,
              },
              max_teams: 8,
              min_rating: 1500,
              registration_until: 1733792963,
              date_start: 1733965763,
              date_end: 1735520963,
            },
          ],
          finished: [
            {
              _id: '6',
              name: 'Finished tournament',
              image: 'https://i.pinimg.com/originals/20/47/2a/20472a0f5abe7d63a97ee2ba68db7b41.jpg',
              participants: [
                '1', '2', '3', '4', '5', '6', '7', '8',
              ],
              isRegOpen: false,
              isFinished: false,
              isPrivate: false,
              isLadder: true,
              allowed_teams: [],
              description: 'Четкое описание четкого турнира',
              rules: 'Анархия мать порядка',
              prize: {
                currency: '₽',
                amount: 1000,
              },
              max_teams: 8,
              min_rating: 1500,
              registration_until: 1733792963,
              date_start: 1733965763,
              date_end: 1735520963,
            },
          ],
        },
      },
      { tournaments: tournamentReducer },
    ),
  ],
};