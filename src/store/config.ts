export let appConfig;

const baseConfig = {
  dadataToken: '1b3313ded29d6593142938c4f15b234b9ab5ae5a',
  loginUrl: '/lend/login',
  logoutUrl: '/lend/logout',
};

if (process.env.NODE_ENV === 'production') {
  appConfig = {
    ...baseConfig,
    // siteUrl: 'https://jetlend.ru',
    mediaUrl: 'https://jetlend.ru',
    apiUrl: 'https://jetlend.ru/lend/api',
    apiBasePath: '/lend/api',
  };
} else {
  appConfig = {
    ...baseConfig,
    // siteUrl: 'http://localhost:9000',
    mediaUrl: 'http://localhost:8001',
    apiUrl: 'http://localhost:8001/lend/api',
    apiBasePath: '/lend/api',
  };
}

export function isProduction() {
  return (process.env.NODE_ENV === 'production');
}

export function isDevelopment() {
  return (process.env.NODE_ENV === 'development');
}

export function isTesting() {
  return (process.env.TARGET_ENV !== undefined);
}
