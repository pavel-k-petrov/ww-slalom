export interface ParticipantsStateModel {
  [key: number]: Participant;
}

export interface Participant {
  name: string; // имя
  group: string; // группа (K1, K1ж итп)
}
