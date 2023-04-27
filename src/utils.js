
import ContentstackLivePreview from '@contentstack/live-preview-utils';
import Contentstack from 'contentstack';

export const Stack = Contentstack.Stack({
  // user your own credentials
  api_key: "your api key", // you stack api key
  delivery_token: "your delivery token", // delivery token
  environment: "Your environment", // environment on which you published the entry
  // To initialize the live preview
  live_preview: {
    enable: true,
    host: "api.contentstack.io", 
    management_token: "your management token",
  },
});

// Initialize the live preview sdk
ContentstackLivePreview.init({
    stackSdk: Stack,
    enable: process.env.NODE_ENV === 'production' ? false : true,
    clientUrlParams:{
        host:'app.contentstack.com',
    }
});

export const onEntryChange = ContentstackLivePreview.onEntryChange;
export const onLiveEdit = ContentstackLivePreview.onLiveEdit;