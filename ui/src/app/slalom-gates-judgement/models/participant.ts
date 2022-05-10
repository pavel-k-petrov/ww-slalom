/** модель участника с точки зрения судьи на воротах */
export interface Participant {
  participantNumber: string;
  shortInfo: string;
}

export const exampleParticipants = [
  {
    participantNumber: '51',
    shortInfo: '51 - Владимир Соколов (K1)',
  },
  {
    participantNumber: '25',
    shortInfo: '25 - Анохина/Блохина (Б2см)',
  },
  {
    participantNumber: '52',
    shortInfo: '52 - Егор Летов (K1)',
  },
  {
    participantNumber: '53',
    shortInfo: '53 - Жан Жак Руссо (K1)',
  },
  {
    participantNumber: '58',
    shortInfo: '58 - Алёхин Александр (K1)',
  },
];
