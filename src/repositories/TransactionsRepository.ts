import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = {} as Balance;

    balance.income = this.transactions.reduce(
      (accumulator, { type, value }) => {
        if (type === 'income') {
          return accumulator + value;
        }
        return accumulator;
      },
      0,
    );
    balance.outcome = this.transactions.reduce(
      (accumulator, { type, value }) => {
        if (type === 'outcome') {
          return accumulator + value;
        }
        return accumulator;
      },
      0,
    );
    balance.total = this.transactions.reduce((accumulator, { type, value }) => {
      if (type === 'income') {
        return accumulator + value;
      }
      if (type === 'outcome') {
        return accumulator - value;
      }
      return accumulator;
    }, 0);
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
