// 局部模式
const shell = require('shelljs');
// 全局模式下，就不需要用shell开头了。
// require('shelljs/global');



//shell.exec('git pull origin master');

// 由于我的用另外一个仓库存放dist目录，所以这里要将文件增量复制到目标目录。并切换到对应目录。
shell.cp('-r', './unpackage/dist/build/h5/*', '../shop-diy-dist/htdocs/fre');

shell.cd('../shop-diy-dist');

var sd = require('silly-datetime');
var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');

// 不能在一股脑全部添加了
shell.exec('git add htdocs/fre/');
shell.exec(`git commit -m "客户端发布版本${time}"`);
shell.exec('git push origin master');
