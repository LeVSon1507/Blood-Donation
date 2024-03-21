declare module '*.css';
declare module '*.scss';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.gif';

//import svg icon as component
declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>> & { title?: string };

  const src: any;
  export default src;
}

declare module '*.bundle.js';
