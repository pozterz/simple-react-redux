const prefix = ''

export const appConfig = {
  appName: 'React Redux Router Bootstrap Boilerplate',
  DEV_MODE: true,
  config: {
    baselimit:{
      limit: 20
    }
  },
  api: {
    auth: `auth`,
    photos: `albums/1/photos`
  },
  dev: {
    api: {
      url: 'https://jsonplaceholder.typicode.com',
      port: 443,
      // prefix,
    }
  },
  prod: {
    api: {
      url: 'https://jsonplaceholder.typicode.com',
      port: 443,
      // prefix,
    }
  }
};
