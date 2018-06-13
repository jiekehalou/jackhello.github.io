/**
 * Created by DR16 on 2017/4/24.
 */
var sever = 'http://122.137.242.15/dcms';
// var sever = 'http://182.48.115.38:7880/dcms';
var baseUrl = sever + '/pwasCase/pwasCase-getScsCount.action';
var sGurl=sever+"/PwasAdmin/Case-getDataNum.action";//市管主街
var baseUrlALL = sever + '/pwasCase/pwasCase-getScsCountByParentCodes.action';//一个区案案卷分类接口；
var myChart2 = echarts.init(document.getElementById('chartBox'));//区域统计；
var streetUrl=sever+"/pwasCase/pwasCase-getChildBgList.action?";
var chart2_index='';
var swi2=true;
var isDetail=false;
var chartResult;
var obj={
    time:"month",
    startTime:"",
    endTime:""
};
$(function () {
    var deviceWidth=$("body").width();
    var rate=deviceWidth/375;
    $("html").css("font-size",parseFloat(rate*20)+"px");
    getAll();
});

chart2_one();
function getAll() {
    var getData;
    if(isDetail){
        getData={startTime:obj.startTime,
            bgcodes:'220203,220211,220204,220202,220206,220205,220299',
            endTime:obj.endTime}
    }else{
        getData={time:obj.time,
            bgcodes:'220203,220211,220204,220202,220206,220205,220299'}
    }

    $.get(baseUrlALL,getData,function (data) {
        var dataList = data;
        var len = dataList.length;
        chart2_one(dataList,len);
    },'json');
};
function sum(arr) {
    var num=0;
    for(var k=0;k<arr.length;k++){
        num+=arr[k];
    }
    return num;
};
function chart2_one(dataList) {
    myChart2 = echarts.init(document.getElementById('chartBox'));
    chartResult=dataList;
    // var len=dataList.length;
    // var overNumList = [];
    // var checkNumList = [];
    // var regNumList = [];
    // var dealNumList = [];
    // var parcentList = [];
    // var allNumList = [];
    // for (var i = 0; i < len; i++) {
    //     overNumList.push(dataList[i].data.overNum);
    //     checkNumList.push(dataList[i].data.checkNum);
    //     regNumList.push(dataList[i].data.regNum);
    //     dealNumList.push(dataList[i].data.dealNum);
    //     allNumList.push(dataList[i].data.allNum);
    //     if (dataList[i].data.allNum > 0) {
    //         var s = parseFloat(100 * (dataList[i].data.overNum) / (dataList[i].data.allNum));
    //         parcentList.push(s.toFixed(2));
    //     } else {
    //         parcentList.push(0);
    //     }
    // }
    // var s1=sum(regNumList);
    // var s2=sum(dealNumList);
    // var s3=sum(checkNumList);
    // var s4=sum(overNumList);
    // var now=new Date().getMonth();

    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            itemWidth:13,
            itemHeight:13,
            data: ['新立案 ', '处理中 ', '待复核 ', '已结案 ']
        },
        grid: {
            left: '12%',
            right: '15%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: [
            {
                name: '区域',
                type: 'category',
                axisLabel: {
                    interval: 0,
                    rotate: -30,
                    textStyle:{
                         color:'#666666',
                        fontSize:10
                    }

                },
                data: ['龙潭区','丰满区','船营区','昌邑区', '高新开发区','经济开发区', '市管主街路'],
                splitLine: {show: false}
            }
        ],
        yAxis: {
            name: "案件数（个）",
            nameGap:5
        },
        series: [
            {
                name: '基础建设',
                type: 'bar',
                stack:" ",
                data: [1,2,3,3,4,3,4,2]
            },
            {
                name: '生态环境',
                type: 'bar',
                stack:" ",
                data: [1,2,3,3,4,3,4,2]
            },
            {
                name: '民生改善',
                type: 'bar',
                stack:" ",
                data: [1,2,3,3,4,3,4,2]
            },
            {
                name: '公共服务设施',
                type: 'bar',
                stack:" ",
                data: [1,2,3,3,4,3,4,2]
            }, {
                name: '旅游文化配套',
                type: 'bar',
                stack:" ",
                data: [1,2,3,3,4,3,4,2]
            }, {
                name: '城市地下综合管廊',
                type: 'bar',
                stack:" ",
                data: [1,2,3,3,4,3,4,2]
            },{
                name: '城市轨道交通',
                type: 'bar',
                stack:" ",
                data: [1,2,3,3,4,3,4,2]
            },{
                name: '城棚户区改造',
                type: 'bar',
                stack:" ",
                data: [1,2,3,3,4,3,4,2]
            },{
                name: '储备项目',
                type: 'bar',
                stack:" ",
                data: [1,2,3,3,4,3,4,2]
            },
        ],
    };
    myChart2.setOption(option);
    myChart2.on('click', function (params) {
        if(chart2_index===params.dataIndex&&swi2){
            var selectName=params.name.trim();
            if(selectName=="市管主街路"){
                chart2_Sg()
            }else{
                var bgCode=getCodeByName(selectName);
                chart2_two(bgCode);
            }
            $(".back").show();
            swi2=false;
            $(".back").click(function () {
                $(this).hide();
                chart2_one(dataList);
                swi2=true;
                chart2_index='';
            });
        }
        chart2_index=params.dataIndex;
    })
}
function chart2_two(bgCode){
    myChart2 = echarts.init(document.getElementById('chartBox'));
    var url=streetUrl;
    var getData;
    if(isDetail){
        getData={startTime:obj.startTime,
            bgcodes:bgCode,
            endTime:obj.endTime}
    }else{
        getData={time:obj.time,
            bgcodes:bgCode}
    }

    $.get(url,getData,function (data) {
        var dataList = data.data;
        var len = dataList.length;
        var overNumList = [];
        var checkNumList = [];
        var regNumList = [];
        var dealNumList = [];
        var allNumList = [];
        var nameList=[];
        if(len>0){
            dataList=dataList.sort(function (b,a) {
                return (a.code.allNum-b.code.allNum)
            });
            for (var i = 0; i < len&&i<7; i++) {
                overNumList.push(dataList[i].code.overNum);
                checkNumList.push(dataList[i].code.checkNum);
                regNumList.push(dataList[i].code.regNum);
                dealNumList.push(dataList[i].code.dealNum);
                allNumList.push(dataList[i].code.allNum);
                nameList.push(dataList[i].bgname);
            }

            var option4 = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    itemWidth:13,
                    itemHeight:13,
                    data: ['新立案 ', '处理中 ', '待复核 ', '已结案 ']
                },
                grid: {
                    grid: {
                        left: '12%',
                        right: '15%',
                        bottom: '10%',
                        containLabel: true
                    }
                },
                xAxis: [
                    {
                        name: '区域',
                        type: 'category',
                        axisLabel: {
                            interval: 0,
                            rotate: -30,
                            textStyle:{
                                color:'#666666',
                                fontSize:10
                            }

                        },
                        data: ['龙潭区','丰满区','船营区','昌邑区', '高新开发区','经济开发区', '市管主街路'],
                        splitLine: {show: false}
                    }
                ],
                yAxis: {
                    name: "案件数（个）",
                    nameGap:5
                },
                series: [
                    {
                        name: '已结案 ',
                        type: 'bar',
                        stack:" ",
                        barMinWidth : 30,//柱图宽度
                        barMaxWidth:50,
                        data: overNumList,
                        itemStyle: {
                            normal: {
                                // barBorderRadius: [5, 5, 0, 0],
                                color:'#49BF67'
                            }
                        }
                    },
                    {
                        name: '待复核 ',
                        type: 'bar',
                        stack:" ",
                        barMinWidth : 30,//柱图宽度
                        barMaxWidth:50,
                        data: checkNumList,
                        itemStyle: {
                            normal: {
                                color:'#FDC82C'
                            }
                        }
                    },
                    {
                        name: '处理中 ',
                        type: 'bar',
                        stack:" ",
                        barMinWidth : 30,//柱图宽度
                        barMaxWidth:50,
                        data: dealNumList,
                        itemStyle: {
                            normal: {
                                color:'#429BF9'
                            }
                        }
                    },
                    {
                        name: '新立案 ',
                        type: 'bar',
                        stack:" ",
                        barMinWidth : 30,//柱图宽度
                        barMaxWidth:50,
                        data: regNumList,
                        itemStyle: {
                            normal: {
                                color:'#FE6B61'
                            }
                        }
                    }
                ]
            };
            myChart2.setOption(option4);
            $(".back").show();
        }
    },'json');
}
function chart2_Sg(){
    myChart2 = echarts.init(document.getElementById('chartBox'));
    $.get(sGurl,function (data) {
        var dataList = data;
        var len = dataList.length;
        var overNumList = [];
        var checkNumList = [];
        var regNumList = [];
        var dealNumList = [];
        var nameList=[];
        if(len>0){
            for (var i = 0; i < len; i++) {
                overNumList.push(dataList[i].category.num4);
                checkNumList.push(dataList[i].category.num3);
                regNumList.push(dataList[i].category.num1);
                dealNumList.push(dataList[i].category.num2);
                nameList.push(dataList[i].name);
            }
            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    itemWidth:13,
                    itemHeight:13,
                    data: ['新立案 ', '处理中 ', '待复核 ', '已结案 ']
                },
                grid: {
                    grid: {
                        left: '12%',
                        right: '15%',
                        bottom: '10%',
                        containLabel: true
                    }
                },
                xAxis: [
                    {
                        name: '区域',
                        type: 'category',
                        axisLabel: {
                            interval: 0,
                            rotate: -30,
                            textStyle:{
                                color:'#666666',
                                fontSize:10
                            }

                        },
                        data: ['龙潭区','丰满区','船营区','昌邑区', '高新开发区','经济开发区', '市管主街路'],
                        splitLine: {show: false}
                    }
                ],
                yAxis: {
                    name: "案件数（个）",
                    nameGap:5
                },
                series: [
                    {
                        name: '已结案 ',
                        type: 'bar',
                        stack:" ",
                        barMinWidth : 30,//柱图宽度
                        barMaxWidth:50,
                        data: overNumList,
                        itemStyle: {
                            normal: {
                                // barBorderRadius: [5, 5, 0, 0],
                                color:'#49BF67'
                            }
                        }
                    },
                    {
                        name: '待复核 ',
                        type: 'bar',
                        stack:" ",
                        barMinWidth : 30,//柱图宽度
                        barMaxWidth:50,
                        data: checkNumList,
                        itemStyle: {
                            normal: {
                                color:'#FDC82C'
                            }
                        }
                    },
                    {
                        name: '处理中 ',
                        type: 'bar',
                        stack:" ",
                        barMinWidth : 30,//柱图宽度
                        barMaxWidth:50,
                        data: dealNumList,
                        itemStyle: {
                            normal: {
                                color:'#429BF9'
                            }
                        }
                    },
                    {
                        name: '新立案 ',
                        type: 'bar',
                        stack:" ",
                        barMinWidth : 30,//柱图宽度
                        barMaxWidth:50,
                        data: regNumList,
                        itemStyle: {
                            normal: {
                                color:'#FE6B61'
                            }
                        }
                    }
                ]
            };
            myChart2.setOption(option);
        }
    },'json');
}
function getCodeByName(name) {
    var s = [{id: '220203', text: '龙潭区', value: []},
        {id: '220204', text: '船营区', value: []},
        {id: '220211', text: '丰满区', value: []},
        {id: '220202', text: '昌邑区', value: []},
        {id: '220205', text: '经济开发区', value: []},
        {id: '220206', text: '高新开发区', value: []},
        {id: '220299', text: '市管主街路', value: []},
        {id: '220201', text: '吉林市辖区', value: []}];
    for (var m = 0; m < s.length; m++) {
        if (name == s[m].text) {
            return s[m].id;
        }
    }

}