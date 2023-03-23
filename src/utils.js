
import ContentstackLivePreview from '@contentstack/live-preview-utils';
import Contentstack from 'contentstack';

export const Stack = Contentstack.Stack({
  // user your own credentials
  api_key: "bltcf74a9ab795009ca", // you stack api key
  delivery_token: "cs9b220eda212bb79c63ea9ec1", // delivery token
  environment: "ssr", // environment on which you published the entry
  // To initialize the live preview
  live_preview: {
    enable: true,
    host: "api.contentstack.io", 
    management_token: "csbca50eadf01e8d1c6d75e2ed",
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