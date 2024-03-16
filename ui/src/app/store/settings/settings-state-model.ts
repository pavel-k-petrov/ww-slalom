import { JudgementItemType } from '../models';

export interface SettingsStateModel {
  judges: {
    /** key - id судьи,  judgementItems - какие элементы судит*/
    [judgeId: string]: {
      title: string;
      judgementItems: JudgementItemType[];
    };
  };
  /** коды попыток */
  attempts: {
    code: string;
    title: string;
  }[];

  gates: number[];
}
