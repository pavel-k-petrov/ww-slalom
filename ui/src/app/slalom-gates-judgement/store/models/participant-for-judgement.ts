/** модель участника с точки зрения судьи на воротах -
 * "единица судейства" */
export interface ParticipantForJudgement {
  attemptCode?: string;
  participantNumber: string;
  shortInfo: string;
}
