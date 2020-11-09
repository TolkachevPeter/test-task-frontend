import {RangeItem} from '../models';
import {withSpaces, getMonthsStr, CURRENCY_SUFFIX} from './';

export const getAmountRangeItems = (from: number, to: number, step: number): RangeItem[] => {
  const result = [];
  for(let value = from; value <= to; value += step) {
    const title = `${withSpaces(value.toString())} ${CURRENCY_SUFFIX}`;
    result.push({title, value});
  }
  return result;
}

export const getMonthsRangeItems = (from: number, to: number, step: number): RangeItem[] => {
  const result = [];
  for(let value = from; value <= to; value += step) {
    const title = `${value} ${getMonthsStr(value)}`;
    result.push({title, value});
  }
  return result;
}

export const getPeriodicRangeItems = (): RangeItem[] => {
  return [
    {title: 'Каждый день', value: 0},
    {title: '1 раз в неделю', value: 1},
    {title: '2 раза в месяц', value: 2},
    {title: '1 раз в месяц', value: 3}
  ];
}

export const getDaysByPeriod = (period: number): number => {
  switch(period) {
    case 0: return 1;
    case 1: return 7;
    case 2: return 14;
    case 3: return 28;
  }
  return 0;
}

export const getDaysByMonths = (months: number): number => months * 30;
