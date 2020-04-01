// @ts-nocheck

// 局部模式
const shell = require('shelljs');


// 不能在一股脑全部添加了
const options = {
    host: '47.93.84.174',
    port: '21',
    user: 'btcs401',
    password: 'Wzw123456!#',
    // proxy:{
    //   host: '',
    //   port: '',
    // }
}


let FtpDeploy = require('ftp-deploy');

let ftpDeploy = new FtpDeploy();

let config = {
    ...options,
    localRoot: __dirname + '/unpackage/dist/build/h5',
    remoteRoot: '/fre/',
    include: ['*', '**/*'], // this would upload everything except dot files
	// include: ["h5.zip"],
    // include: ["*.php", "dist/*", ".*"],
    // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
    // exclude: ["dist/**/*.map", "node_modules/**", "node_modules/**/.*", ".git/**"],
    // exclude: ['static/kindeditor/**'],
    // delete ALL existing files at destination before uploading, if true
    deleteRemote: false,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: false,
};

// use with promises
ftpDeploy.deploy(config, (err, res) => {
	if (err) {
		console.log(err);
	} else {
		console.log('finished:', res);
		process.exit();
	}
});


ftpDeploy.on('uploading', function(data) {

});
ftpDeploy.on('uploaded', function(data) {
    console.log('\033[33m '+data.filename+' upload done \033[39m'); // same data as uploading event
});
ftpDeploy.on('log', function(data) {
    // console.log(data); // same data as uploading event
});
ftpDeploy.on('upload-error', function(data) {
    console.log(data.err); // data will also include filename, relativePath, and other goodies
});
