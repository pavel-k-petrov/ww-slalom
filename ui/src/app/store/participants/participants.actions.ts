import { Participant } from './participants-state-model';

export class AddOrUpdateParticipant {
  static readonly type = '[Participants] AddOrUpdateParticipant';
  constructor(public participantNumber: number, public participantData: Participant) {}
}
