//main.js
import './css/common.less' //使用require导入less文件
import  './css/font/iconfont.css'

// () => import('@/page/' + file + '.vue')
// const _import = file => () => import('@/page/' + file + '.vue')
// const  test= f => import('./page/test.html');

// require('jquery')

import  'jquery'


import head from './page/head.html';
import content from './page/content.html';

// console.log('sss');
// console.log(head);



$('#root').append(head);
$('#root').append(content);




// document.querySelector("#root").appendChild(greeter());
