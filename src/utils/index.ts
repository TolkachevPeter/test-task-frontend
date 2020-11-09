export const withSpaces = (value: string, gap: number = 3): string => {
  let result = '';
  let rest = value;
  let length = rest.length;

  while(length > 3) {
    const start = length - gap;
    const end = length;
    const sub = rest.substring(start, end);
    result = `${sub} ${result}`;
    rest = rest.substring(0, start);
    length = rest.length;
  }

  result = `${rest} ${result}`;
  return result.trim();
};

export const getMonthsStr = (months: number): string => {
  if(months === 1) return 'месяц';
  if(months >= 2 && months <= 4) return 'месяца';
  if(months >= 5 && months <= 20) return 'месяцев';
  const lastDigit = parseInt(months.toString().slice(-1));
  if(lastDigit === 1) return 'месяц';
  if(lastDigit >= 2 && months <= 4) return 'месяца';
  if(lastDigit >= 5 && months <= 9) return 'месяцев';
  return 'месяцев';
}

export const getDaysStr = (days: number): string => {
  if(days === 1) return 'день';
  if(days >= 2 && days <= 4) return 'дня';
  if(days >= 5 && days <= 20) return 'дней';
  const lastDigit = parseInt(days.toString().slice(-1));
  if(lastDigit === 1) return 'день';
  if(lastDigit >= 2 && days <= 4) return 'дня';
  if(lastDigit >= 5 && days <= 9) return 'дней';
  return 'дней';
}

export const CURRENCY_SUFFIX = '₽';
