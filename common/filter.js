
import {apiBaseUrl,staticUrl} from "./env";

export const domain = (url) => {
  if(!url)return '';
  if (url.indexOf('http') == -1) return staticUrl+url;
  return url;
}
export const imgdomain = (url) => {
  if(!url)return '';
  if (url.indexOf('http') == -1) return 'http'+url;
  return url;
}

export default [
  {
    name: 'num2px',
    methods: (val) => {
      if (val.indexOf('px') == -1) return `${val}px`;
      return val;
    },
  },
  {
    name:'cutstr',
    methods: (str,len,tip) => {
      if(!str)return '';
      console.log(str,len,tip)
      if(str.length<len)return str;
      return str.substring(0,len)+tip
    },
  },
  {
    name:'domain',
    methods: domain
  },{
    name:'imgdomain',
    methods: imgdomain
  }
];
