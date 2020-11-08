import { fetchVirus, fetchViruses, killVirus } from 'loaders/virus';

test('all viruses are fetched', () => {
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

test('one viruses is fetched', () => {
  expect(fetchVirus('9d6fa82f-2edc-43d6-a7a6-7ac4a6f0dcca')).toStrictEqual({
    id: '9d6fa82f-2edc-43d6-a7a6-7ac4a6f0dcca',
    positionX: 30,
    positionY: 24,
    src: '/static/media/Virus1.d02ce17d.png',
  });
});

test('kill virus should return id of killed virus', () => {
  expect(killVirus('9d6fa82f-2edc-43d6-a7a6-7ac4a6f0dcca')).toStrictEqual({
    id: '9d6fa82f-2edc-43d6-a7a6-7ac4a6f0dcca',
  });
});
