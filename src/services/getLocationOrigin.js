import { appConfig } from '../config';

export const getLocationOrigin = () => {
  if(appConfig.DEV_MODE) {
   return `${appConfig.dev.api.url}:${appConfig.dev.api.port}${appConfig.dev.api.prefix ? '/' + appConfig.dev.api.prefix :''}`
  }
  return `${appConfig.prod.api.url}:${appConfig.prod.api.port}${appConfig.prod.api.prefix ? '/' + appConfig.prod.api.prefix :''}`
 }
 

export default getLocationOrigin;
