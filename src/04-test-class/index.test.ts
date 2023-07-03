import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  const bankAccount = getBankAccount(1000);
  const receivingBankAccount = getBankAccount(0);
  const cashAmountGreaterThanBalance = 9999;

  test('should create account with initial balance', () => {
    const initialBalance = 1000;
    expect(bankAccount.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() =>
      bankAccount.withdraw(cashAmountGreaterThanBalance),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      bankAccount.transfer(cashAmountGreaterThanBalance, receivingBankAccount),
    ).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const cashForTransfer = 1000;
    expect(() =>
      bankAccount.transfer(cashForTransfer, bankAccount),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const depositAmount = 5000;
    const updatedBalance = 6000;
    bankAccount.deposit(depositAmount);

    expect(bankAccount.getBalance()).toEqual(updatedBalance);
  });

  test('should withdraw money', () => {
    const withdrawAmount = 500;
    const updatedBalance = 5500;
    bankAccount.withdraw(withdrawAmount);

    expect(bankAccount.getBalance()).toEqual(updatedBalance);
  });

  test('should transfer money', () => {
    const cashForTransfer = 1500;
    const updatedReceivingBalance = 1500;
    bankAccount.transfer(cashForTransfer, receivingBankAccount);

    expect(receivingBankAccount.getBalance()).toEqual(updatedReceivingBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await bankAccount.fetchBalance();
    if (balance !== null) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const testBalanceValue = 55;
    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockResolvedValueOnce(testBalanceValue);

    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toEqual(testBalanceValue);

    jest.restoreAllMocks();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );

    jest.restoreAllMocks();
  });
});
