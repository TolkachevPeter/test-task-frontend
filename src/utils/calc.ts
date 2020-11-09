import {CalcData, CalcResponse} from '../models';

export const getPercents = (time: number): number => {
  return 21 - (time * 0.5);
};

export const getMonthPay = (time: number, amount: number): number => {
  const percents = getPercents(time);
  return Math.floor((amount * percents / 100 + amount) / time);
};

export const getInterest = (time: number, amount: number): number => {
  const monthPay = getMonthPay(time, amount);
  return monthPay * time - amount;
};

export const dataToResponse = (data: CalcData): CalcResponse => {
  return {
    monthPay: getMonthPay(data.time, data.amount),
    percents: getPercents(data.time),
    interest: getInterest(data.time, data.amount)
  };
}
