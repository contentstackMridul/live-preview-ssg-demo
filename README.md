# Next.js: SSG + Preview Mode Demo

This demo showcases Next.js' next-gen Static Site Generation (SSG) support.

## How to use this demo

In this demo, there are 3 main files that you have to check to understand the live preview for ssg
1. ``` src/pages/index.tsx ```
   This file have two components
    a. Home component
       This component will fetch the data from contentstack server and render the page
    b. Content component
        This component will help Home component to render the page content.
2. ``` src/pages/ref_field.tsx ```
    This file contain RefField1 component which will render the reference field data. We are using this component inside Content component present in src/pages/index.tsx file.
3. ``` src/utils.js ``` 
    In this file we are initalizing the Contentstack SDK and Live Preview SDK. This is the ideal way to initialize both sdk. After initialization we are exporting the function and importing in the 
    other components. You can check this in Home component. Please use you own credential to initialize the Contentstack sdk.

> Note: you will find the details comments of code inside the files itself for better understanding.

> ** There are some other files as well but those are not concerned us.  **

## Learn More

You can learn more about this feature in the
[Next.js 9.3 Blog Post](https://nextjs.org/blog/next-9-3) or our
[Documentation](https://nextjs.org/docs/advanced-features/preview-mode).
