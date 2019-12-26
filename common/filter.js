import {staticUrl} from "./env";

export const domainFn = (url) => {
  if (!url) return '';
  if (url.indexOf('http') == -1) return staticUrl + url;
  return url;
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const formatTime = function (date) {
  const year = new Date(date * 1000).getFullYear()
  const month = new Date(date * 1000).getMonth() + 1
  const day = new Date(date * 1000).getDate()
  const hour = new Date(date * 1000).getHours()
  const minute = new Date(date * 1000).getMinutes()
  const second = new Date(date * 1000).getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatRichTextByUparse = (html)=>{
  //let html2 = '<div style="position:relative;z-index:1;width: 750rpx;height: 300rpx;"><video  x5-video-player-type="h5-page"  src="https://new401.bafangka.com/uploadfiles/wkbq6nc2kc/media/5df3493875.mp4"    autostart="false" loop="true" /></div>';
  if(!html) return;
  let newContent= html.replace(/<embed[^>]*>/gi,function(match,capture){
    match = match.replace(/type="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
    match = match.replace(/embed/gi, 'video x5-video-player-type="h5-page" ')
    match = match.replace(/width="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
    match = match.replace(/height="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
    //相对地址
    match = match.replace(/src="\/uploadfiles/gi, `src="${staticUrl}/uploadfiles`)
    return match;
  });

  return newContent
}


export const lazyImgUrl = 'https://new401.bafangka.com/uploadfiles/wkbq6nc2kc/image/20191112154310111.jpg'

export default [
  {
    name:'formatRichTextByUparse',
    methods:formatRichTextByUparse,
  },{
    name: 'zero',
    methods: (val) => {
      return val ? val : 0
    }
  },
  {
    name: 'lazyimg',
    methods: (val) => {
      return val ? val : 'lazyImgUrl'
    }
  },
  {
    name: 'num2px',
    methods: (val) => {
      if (val.indexOf('px') == -1) return `${val}px`;
      return val;
    },
  },
  {
    name: 'formStampTime',
    //开始和结束的时间戳
    /**
     *
     * @param startTimeStamp
     * @param endTimeStamp
     * @param type 需要返回的对象
     */
    methods: (start_timeStamp, end_timeStamp, type) => {

      let data = getCountdownFunc({start_timeStamp, end_timeStamp}), rt = null;
      console.log(data)
      switch (type) {
        case 'd':
          rt = data.d;
          break;
        case 'h':
          rt = data.h;
          break;
        case 'm':
          rt = data.m;
          break;
        case 's':
          rt = data.s;
          break;
        case 'is_start':
          rt = data.is_start ? '结束' : '开始';
          break;
      }
      return rt;
    }
  },
  {
    name: 'cutstr',
    methods: (str, len, tip) => {
      if (!str) return '';
      console.log(str, len, tip)
      if (str.length < len) return str;
      return str.substring(0, len) + tip
    },
  },
  {
    name: 'domain',
    methods: domainFn
  }
];
