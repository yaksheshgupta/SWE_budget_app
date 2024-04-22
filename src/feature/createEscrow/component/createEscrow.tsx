import { useState, useEffect } from 'react';
import { IEscrowTransaction } from '../interface/createEscrow.interface';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';

const EscrowTransactions = () => {
    const [escrowTransactions, setEscrowTransactions] = useState<IEscrowTransaction[]>([]);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        const storedEscrowTransactions = JSON.parse(localStorage.getItem('EscrowTransactions') || '[]');
        setEscrowTransactions(storedEscrowTransactions);
    }, []);

    const createEscrowTransaction = (data: any) => {
        const expenseDetails = {
            billName: data.billName,
            typeOfBill: data.typeOfBill,
            amount: data.amount,
            paidBy: data.paidBy,
        };

        const participants = [...data.chooseCb, data.paidBy];

        const newEscrowTransaction: IEscrowTransaction = {
            id: uuidv4(),
            expenseDetails,
            participants,
            totalAmount: data.amount,
            status: 'pending',
            approvedBy: [data.paidBy],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const updatedEscrowTransactions = [...escrowTransactions, newEscrowTransaction];
        setEscrowTransactions(updatedEscrowTransactions);
        localStorage.setItem('EscrowTransactions', JSON.stringify(updatedEscrowTransactions));
        reset();
    };

    const approveTransaction = (transactionId: string, participant: string) => {
        const updatedTransactions = escrowTransactions.map((transaction: IEscrowTransaction) => {
            if (transaction.id === transactionId) {
                const isAllApproved = transaction.participants.every((p) =>
                    transaction.approvedBy.includes(p)
                );

                if (isAllApproved) {
                    return { ...transaction, status: 'released' as const };
                } else {
                    return {
                        ...transaction,
                        approvedBy: [...transaction.approvedBy, participant],
                    };
                }
            }
            return transaction;
        });

        setEscrowTransactions(updatedTransactions);
        localStorage.setItem('EscrowTransactions', JSON.stringify(updatedTransactions));
    };

    const rejectTransaction = (transactionId: string) => {
        const updatedTransactions = escrowTransactions.map((transaction: IEscrowTransaction) => {
            if (transaction.id === transactionId) {
                return { ...transaction, status: 'rejected' as const };
            }
            return transaction;
        });

        setEscrowTransactions(updatedTransactions);
        localStorage.setItem('EscrowTransactions', JSON.stringify(updatedTransactions));
    };

    return (
        <div>
            <h2>Create New Escrow Transaction</h2>
            <form onSubmit={handleSubmit(createEscrowTransaction)}>
                <div>
                    <label htmlFor="billName">Bill Name:</label>
                    <input type="text" id="billName" {...register('billName', { required: true })} />
                </div>
                <div>
                    <label htmlFor="typeOfBill">Type of Bill:</label>
                    <input type="text" id="typeOfBill" {...register('typeOfBill', { required: true })} />
                </div>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" id="amount" {...register('amount', { required: true })} />
                </div>
                <div>
                    <label htmlFor="paidBy">Paid By:</label>
                    <input type="text" id="paidBy" {...register('paidBy', { required: true })} />
                </div>
                <div>
                    <label htmlFor="chooseCb">Participants:</label>
                    <input type="text" id="chooseCb" {...register('chooseCb', { required: true })} />
                </div>
                <button type="submit">Create Escrow Transaction</button>
            </form>

            <h2>Pending Escrow Transactions</h2>
            {escrowTransactions
                .filter((transaction) => transaction.status === 'pending')
                .map((transaction) => (
                    <div key={transaction.id}>
                        <h3>{transaction.expenseDetails.billName}</h3>
                        <p>Paid By: {transaction.expenseDetails.paidBy}</p>
                        <p>Total Amount: {transaction.totalAmount}</p>
                        <p>Participants:</p>
                        <ul>
                            {transaction.participants.map((participant) => (
                                <li key={participant}>
                                    {participant}{' '}
                                    {transaction.approvedBy.includes(participant) ? (
                                        <span>(Approved)</span>
                                    ) : (
                                        <>
                                            <button onClick={() => approveTransaction(transaction.id, participant)}>
                                                Approve
                                            </button>
                                            <button onClick={() => rejectTransaction(transaction.id)}>Reject</button>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
        </div>
    );
};

export default EscrowTransactions;