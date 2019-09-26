
import {baseApiUrl} from './env.js';

export default [
  {
    name: 'num2px',
    methods: (val) => {
      if (val.indexOf('px') == -1) return `${val}px`;
      return val;
    },
  },
  {
    name:'domain',
    methods:(url) => {
      if(!url)return '';
      if (url.indexOf('http') == -1) return baseApiUrl+url;
      return url;
    }
  }
];
