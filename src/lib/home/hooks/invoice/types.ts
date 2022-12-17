export interface Account {
  id: string;
  accountNumber: string;
  lastName: string;
  firstName: string;
}

export interface Invoice {
  id: string;
  amount: number;
  creator: Account;
  customer: Account;
  isPaid: boolean;
  paidAt: Date | null;
  message: string;
  updatedAt: Date;
  createAt: Date;
}
