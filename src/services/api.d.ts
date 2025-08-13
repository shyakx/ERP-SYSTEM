import { ChatAPI } from '../types/api';

declare module '../services/api' {
  export const chatAPI: ChatAPI;
}

// Also declare the module augmentation for the api.js file
declare module '../services/api.js' {
  export const chatAPI: ChatAPI;
} 