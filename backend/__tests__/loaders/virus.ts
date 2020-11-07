import { fetchViruses } from 'loaders/virus';

test('correct greeting is generated', () => {
  expect(fetchViruses()).toStrictEqual([
    {
      id: '9d6fa82f-2edc-43d6-a7a6-7ac4a6f0dcca',
      positionX: 30,
      positionY: 24,
      src: '/static/media/Virus1.d02ce17d.png',
    },
    {
      id: 'd8408a56-ecd6-464b-9616-c5a456bfb4f8',
      positionX: 39,
      positionY: 74,
      src: '/static/media/Virus1.d02ce17d.png',
    },
    {
      id: '4b03e963-1bcf-4054-9b0c-cb866cfb7f23',
      positionX: 11,
      positionY: 94,
      src: '/static/media/Virus6.9a59198b.png',
    },
  ]);
});