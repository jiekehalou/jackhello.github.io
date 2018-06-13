/**
 * Created by DR16 on 2017/4/21.
 */
var sever = 'http://122.137.242.15/dcms';
var myChart1 = echarts.init(document.getElementById('chartBox'));
var chart1_index = '';
var swi = true;
var isDetail = false;
var obj = {
    time: "month",
    startTime: "",
    endTime: ""
};
var chartResult;

$(function () {
    // $("#menu").click(function () {
    //     $(this).toggleClass("menuUp");
    //     $("#chooseBox").slideToggle(300);
    // });
    //
    // $(".three").click(function () {
    //     $("#menu").text("近" + $(this).text());
    //     $(".three").css({background: "#F5F5F5", color: "#333333"});
    //     $(this).css({background: "#429BF9", color: "white"});
    // });
    getFenLei();
    var deviceWidth=$("body").width();
   var rate=deviceWidth/375;
    $("html").css("font-size",parseFloat(rate*20)+"px");
})


function getFenLei() {
    var postData;
    if (isDetail) {
        postData = {
            startTime: obj.startTime,
            endTime: obj.endTime
        }
    } else {
        postData = {time: obj.time}
    }
    getData(sever + '/PwasAdmin/AreaKh-getCaseType.action', postData, function (data) {
        var result = data.data;
        var len = result.length;
        $(".status").text("加载完成").fadeOut();
        reutlt = result.sort(function (a, b) {
            return (a.num - b.num);
        });
        setData(result);
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

function setData(result,callback) {
    chartResult=result;
    myChart1 = echarts.init(document.getElementById('chartBox'));//总数浏览
    var nameList = [];
    var pieList = [];
    var len = result.length;
    for (var i = 0; i < len; i++) {
        var item = result[i].name;
        var s = result[i].num;
        var obj = {value: s, name: item};
        pieList.push(obj);
        for (var k = 0; k < pieList.length - 1; k++) {
            if (item == pieList[k].name) {
                pieList[k].value += s;
                pieList.pop();
            }
        }
    }
    var num = 0;
    for (var j = 0; j < pieList.length; j++) {
        nameList.push(pieList[j].name);
        num += parseInt(pieList[j].value);
    }
    option = {
        color: ['#F15941', '#F59A01', '#F9DC74', '#1BAC8F', '#00A4E3', '#3274C0', '#7637CC', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        toolbox: {
            show: true
        },
        legend: {
            left: 'center',
            top: "bottom",
            itemWidth:13,
            itemHeight:13,
            data: nameList

        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}件 <br/>所占比例：({d}%)"
        },
        series: [
            {
                name: '案卷分类',
                type: 'pie',
                // radius: '50%',
                center: ['50%', '35%'],
                radius: ['18%', '45%'],
                data: pieList,
                itemStyle:{
                    normal:{
                        label:{
                            show:true,
                            formatter:'{b}',
                            textStyle:{
                                color:"#666666"
                            },
                        },
                        labelLine: {
                            show: true,
                            length:10,
                            length2:10,
                        },
                    }
                }
            }
        ]
        // });
    };
    myChart1.setOption(option);
    myChart1.on('click', function (params) {
        if(typeof callback=='function'){
            callback()
        }
        if (chart1_index === params.dataIndex && swi) {
                var selectedName = params.name.trim();
                $(".back").show();
                var bgcode = getBgCode(result, selectedName);
                OnSelectedCallback(bgcode, selectedName);
                swi = false;
            $(".back").click(function () {
                    $(this).hide();
                    setData(result);
                    swi = true;
                    chart1_index = '';
                });
        }
        chart1_index = params.dataIndex;
    });
}
function  OnSelectedCallback(bgcode, selectedName,callback) {
    // var url=sever+'/PwasAdmin/AreaKh-getByName.action?typeid='+name+'startTime='+obj.startTime+'&endTime='+obj.endTime;
    var name = bgcode;
    var getData;
    if (isDetail) {
        getData = {
            typeid: name,
            startTime: obj.startTime,
            endTime: obj.endTime
        }
    } else {
        getData = {time: obj.time, typeid: name}
    }
    var url = sever + '/PwasAdmin/AreaKh-getByName.action';
    $.get(url, getData, function (data) {
        // console.log(data);
        var result = data.data;
        var len = result.length;
        // alert(len);
        var nameList = [];
        var pieList = [];
        for (var i = 0; i < len; i++) {
            if (result[i].num != 0) {
                nameList.push(result[i].name);
                var obj = {value: result[i].num, name: result[i].name};
                pieList.push(obj);
            }

        }
        myChart1 = echarts.init(document.getElementById('chartBox'));//总数浏览
        option = {
            color: ['#F15941', '#F59A01', '#F9DC74', '#1BAC8F', '#00A4E3', '#3274C0', '#7637CC', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
            toolbox: {
                show: true
            },
            legend: {
                left: 'center',
                top: "bottom",
                itemWidth:13,
                itemHeight:13,
                data: nameList
            },
            tooltip: {
                trigger: 'item',
                formatter: selectedName + "<br/>{b} : {c}件 <br/>所占比例：({d}%)"
            },
            series: [
                {
                    name: '案卷分类',
                    type: 'pie',
                    // radius: '50%',
                    center: ['50%', '35%'],
                    radius: ['18%', '45%'],
                    data: pieList,
                    itemStyle:{
                        normal:{
                            label:{
                                show:true,
                                formatter:'{b}',
                                textStyle:{
                                    color:"#666666"
                                },
                            },
                            labelLine: {
                                show: true,
                                length:10,
                                length2:10,
                            },
                        }
                    }
                }
            ]
            // });
        };
        myChart1.setOption(option);
        myChart1.on('click', function (params) {
            if (typeof callback == 'function') {
                callback
            }
        });

    }, 'json');
}
function getBgCode(obj, name) {
    var bgcode = '';
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].name == name) {
            bgcode = obj[i].id
        }
    }
    return bgcode;
}