import { BaseState } from "./../index";

export interface RecipientsState extends BaseState {
  recipients: Recipient[];
}

export interface Recipient {
  id: string;
  accountNumber: string;
  mnemonicName?: string;
  internalBankCustomer: InternalBankCustomer;
}

export interface InternalBankCustomer {
  id: string;
  accountNumber: string;
  lastName: string;
  firstName: string;
}
