import { BaseState } from "./../index";

export interface RecipientsState extends BaseState {
  recipients: Recipient[];
}

export interface Recipient {
  id: number;
  mnemonicName: string;
}
