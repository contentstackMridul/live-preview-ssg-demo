
import ContentstackLivePreview from '@contentstack/live-preview-utils';
import Contentstack from 'contentstack';

export const Stack = Contentstack.Stack({
  api_key: "bltcf74a9ab795009ca",
  delivery_token: "cs9b220eda212bb79c63ea9ec1",
  environment: "ssr",
  live_preview: {
    enable: true,
    host: "api.contentstack.io",
    management_token: "csbca50eadf01e8d1c6d75e2ed",
  },
});

ContentstackLivePreview.init({
    stackSdk: Stack,
    enable: process.env.NODE_ENV === 'production' ? false : true,
    clientUrlParams:{
        host:'app.contentstack.com',
    }
});

export const onEntryChange = ContentstackLivePreview.onEntryChange;