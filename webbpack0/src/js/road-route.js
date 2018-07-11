/**
 * Created by DR16 on 2017/12/13.
 */

;(function (win,router) {
    function Router() {
    }
    Router.prototype.route = function (pathList, callback) {
        var url = location.hash.slice(1) || '/';  //获取当前hash值
        if(url&&url.indexOf('?')>-1){
            var start=url.indexOf('?');
            url=url.substr(0,start)
        }
        window.addEventListener("load", function () {
            for (var i = 0; i < pathList.length; i++) {
                if (url == pathList[i].link) {
                    callback(i, url);
                }
            }
        }, false);
        // hash变化时的处理
        window.addEventListener('hashchange', function () {
            url = location.hash.slice(1) || '/';
            if(url&&url.indexOf('?')>-1){
                var start=url.indexOf('?');
                url=url.substr(0,start)
            }
            for (var i = 0; i < pathList.length; i++) {
                if (url == pathList[i].link) {
                    callback(i, url);
                }
            }
        }, false);
    };
    //实例化；
    Router = new Router(); //创建Router对象作为window对象的属性
})(window,window['Router'] || (window['Router']={}));

function loadContent(url) {
    $(".card-con .view").fadeOut(0);
    $(".card-con .view").empty().load(url,function () {
        $(this).fadeIn(500);
    });
    $(document,"body").scrollTop(0);
}
function  changeStyle(u,url) {
    $(".card-con .menu li a").removeClass("isCurrent");
    $(".card-con .menu li a").each(function () {
            var href = $(this).attr("href");
            var u = '#' + url;
            if (href && href == u) {
                $(this).addClass("isCurrent");
            }
        }
    )
}

//配置路由；
var pathList=[
    {link:"/roadline/home",page:"./page/road_completed/home.html"},
    {link:"/roadline/roadpartList",page:"./page/road_completed/roadpartList.html"},//路线下路段;
    {link:"/roadline/roadevent",page:"./page/road_completed/roadevent.html"},//路线事件;
    {link:"/roadpart/home",page:"./page/road_completed/roadpart.html"},//路段Home;
    {link:"/roadpart/roadpartEvent",page:"./page/road_completed/roadpartEvent.html"},//路段事件;
    {link:"/roadpart/roadeventDatail",page:"./page/road_completed/roadeventDatail.html"},//路段事件;
    {link:"/roadline/bridgeMes",page:"./page/road_completed/bridgeMes.html"},//桥梁信息;
    {link:"/roadline/bridgeMesDetail",page:"./page/road_completed/bridgeMesDetail.html"},//桥梁信息详情;
    {link:"/roadline/tunnelMes",page:"./page/road_completed/tunnelMes.html"},//隧道信息;
    {link:"/roadline/tunnelMesDetail",page:"./page/road_completed/tunnelMesDetail.html"},//隧道信息详情;
    {link:"/bridgepart/home",page:"./page/road_completed/bridgepart.html"},//桥梁Home;
    {link:"/tunnelpart/home",page:"./page/road_completed/tunnelpart.html"},//隧道Home;
    {link:"/roadline/projectManagement",page:"./page/road_completed/projectManagement.html"},//项目管理;
    {link:"/roadline/projectDetail",page:"./page/road_completed/projectDetail.html"},//项目详情;

    {link:"/roadline/biaoduanManagement",page:"./page/road_completed/biaoduanManagement.html"},//项目管理;
    {link:"/roadline/biaoduanDetail",page:"./page/road_completed/biaoduanDetail.html"}//项目详情;
];
Router.route(pathList, function (n, url) {
    changeStyle(n,url);
    loadContent(pathList[n].page);
});


