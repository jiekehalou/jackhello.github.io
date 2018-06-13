/**
 * Created by DR16 on 2017/4/24.
 */

var sever = 'http://122.137.242.15/dcms';
// var sever = 'http://182.48.115.38:7880/dcms';
var baseUrl = sever + '/pwasCase/pwasCase-getScsCount.action';
var baseUrlALL = sever + '/pwasCase/pwasCase-getScsCountByParentCodes.action?bgcodes=';
var myChart3 = echarts.init(document.getElementById('chartBox'));//人员考核
var isDetail=false;
var obj={
    time:"month",
    startTime:"",
    endTime:""
};
$(function () {
    getKaohe();
})
function getKaohe(){
    var postData;
    if(isDetail){
        postData={startTime:obj.startTime,
            endTime:obj.endTime,
            deptId:'402880e72f449b1c012f449ccc020002'
        }
    }else{
        postData={time:obj.time,deptId:'402880e72f449b1c012f449ccc020002'}
    }
    $(".status").text("加载中...").show();
    getData(sever + '/PwasAdmin/Zhpj-YwDeptList.action',postData,function (data) {
        var result = data.data;
        var nameList=[];
        var nameNoneList=[];
        var valueList=[];
        result=result.sort(function (a,b) {
            a.SlNum=b.AqjaNum
        })
       result=result.splice(0,10);
        $.each(result,function(i,n){
                nameList.push(n.Name);
                valueList.push(n.AqjaNum)
        });
        //控制长度
        if(nameList.length<10){
            $.each(result,function(i,n){
                if(n.SlNum == 0 &&nameNoneList.length<=10-nameList.length){
                    nameNoneList.push(n.Name);
                    nameList.push(n.Name);
                    valueList.push(0);
                }
            });
        }
        //处理字段
        var naemListDeal=[];
        $.each(nameList,function(i,n){
            var str = "";
            if(n.indexOf("有限公司") != -1){
                str = n.substr(0,n.indexOf("有限公司"));
            }else{
                str = n;
            }
            if(str.indexOf("吉") != -1){
                if(str.indexOf("中国电信") !=-1){
                    str = "中国电信";
                }else if(str.indexOf("中国铁通") != -1){
                    str="中国铁通";
                }else if(str.indexOf("热力") != -1){
                    str="热力公司";
                }else if(str.indexOf("中国石油") != -1){
                    str="中国石油";
                }else{
                    str = str.substr(str.indexOf("吉林市")+3,str.length);
                }

            }
            naemListDeal.push(str);
        });

        //排序 冒泡可换成其他
        for(var i=0;i<valueList.length-1;i++){
            for(var j=0;j<valueList.length-i-1;j++){
                if(valueList[j]>valueList[j+1]){
                    var swap=valueList[j];
                    valueList[j]=valueList[j+1];
                    valueList[j+1]=swap;
                    var swapName=naemListDeal[j];
                    naemListDeal[j]=naemListDeal[j+1];
                    naemListDeal[j+1]=swapName;
                }
            }
        }
        var topArr=[];
        var option3 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['案件数量']
            },
            grid: {
                left: '1%',
                right: '12%',
                top:'10%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                position:'top',
                boundaryGap: false,
                splitLine: {show: false}
            },
            yAxis: {
                type: 'category',
                data: naemListDeal,
                // nameGap:'30',
                axisLabel: {
                    interval: 0
                    /*rotate: 30*/
                },
                yxisLine: {show: false},
                yxisTick: {show: false},
                yxisLabel: {interval: 0}
            },
            series: [
                {
                    name: '案件数量',
                    type: 'bar',
                    data: valueList,
                    symbol: 'none',
                    barMinWidth : 30,//柱图宽度
                    barMaxWidth:50,
                    itemStyle: {
                        normal: {
                            color: '#429BF9',
                            label:{
                                show:true,
                                position: 'right',
                                formatter:'{c}件',
                                textStyle:{
                                    color:"#666666"
                                }
                            }
                        }
                    }
                }
            ]
        };
        myChart3.setOption(option3);
    });
}
function getData(url, data, callback) {
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        async: true,
        dataType: 'json',
        success: function (data) {

            if (typeof callback == "function") {
                callback(data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        }
    });
}