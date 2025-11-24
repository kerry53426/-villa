export interface ProposalSection {
  id: string;
  title: string;
  content: string;
  subsections?: ProposalSection[];
}

export interface ProposalData {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  sections: ProposalSection[];
}

export enum AIServiceState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}