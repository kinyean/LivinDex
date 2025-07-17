import BaseAPI from "../../API/BaseAPI";

export const updateTopUp = async (uid: string, amount: number) => {
  const res = await BaseAPI.post('/wallet/topup', { uid, amount });
  return res.data;
};

export const updateCashOut = async (uid: string, amount: number) => {
    const res = await BaseAPI.post('/wallet/cashout', { uid, amount });
    return res.data;
  };

export const updateLCoin = async (uid: string, delta: number) => {
  const res = await BaseAPI.post('/wallet/lcoin', { uid, delta });
  return res.data;
};

export const getUserTransactions = async (uid: string) => {
  const res = await BaseAPI.get(`/wallet/transactions/${uid}`);
  return res.data;
};

export const addTransaction = async (uid: string, type: string, amount: number) => {
  const res = await BaseAPI.post('/wallet/transactions', {
    uid,
    type,
    amount,
  });
  return res.data;
};
