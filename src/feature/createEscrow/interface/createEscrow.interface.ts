export interface IEscrowTransaction {
  id: string;
  expenseDetails: {
    billName: string;
    typeOfBill: string;
    amount: number;
    paidBy: string;
  };
  participants: string[];
  totalAmount: number;
  status: 'released' | 'pending' | 'approved' | 'rejected';
  approvedBy: string[];
  createdAt: Date;
  updatedAt: Date;
}