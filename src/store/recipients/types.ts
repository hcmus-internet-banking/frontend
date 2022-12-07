import { BaseState } from "./../index";

export interface RecipientsState extends BaseState {
  recipients: Recipient[];
}

export interface Recipient {
  id: string;
  accountNumber: string;
  mnemonicName: string;
}
