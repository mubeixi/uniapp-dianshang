
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
export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
export const formatTime = function(date) {
  const year = new Date(date*1000).getFullYear()
  const month = new Date(date*1000).getMonth() + 1
  const day = new Date(date*1000).getDate()
  const hour = new Date(date*1000).getHours()
  const minute = new Date(date*1000).getMinutes()
  const second = new Date(date*1000).getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
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
