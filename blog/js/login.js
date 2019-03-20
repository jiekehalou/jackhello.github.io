
import '@/css/login.less' //使用require导入less文件
import 'jquery';
import tool from '@/js/tool.js' //公用組建

class l {
    constructor() {
        this.x = 'login';
        this.y = 'register';
    }
    init() {
        this.bindEvent();
    }
    bindEvent() {
        $(".login-con .typein").focus(function () {
            var par = $(this).parent('.typein-con');
            $(".typein-con").not(par).removeAttr('isCurrent');
            par.attr('isCurrent', true);
        }).blur(function () {
            var par = $(this).parent('.typein-con');
            par.removeAttr('isCurrent');
        });

        $(".login-con .input-noshowpsw").click(function (params) {
            var has = $(this).hasClass('input-showpsw');
            if (has) {
                $(this).removeClass('input-showpsw');
                $("#password").attr('type', "password")
            } else {
                $(this).addClass('input-showpsw');
                $("#password").attr('type', "text")
            }
        })

        $(".login-con input[type='checkbox']").click(function () {
            var has = $(this).prop('checked');
            var par = $(this).parent('label');
            if (has) {
                par.attr('checked', "true")
            } else {
                par.removeAttr('checked');

            }

        })
        $(".login-con .panel-tab .tab").click(function () {
            var has = $(this).attr('iscurrent');
            var type = $(this).attr('data-type');
            // form-psw
            // form-message
            if (!has) {
                $(".login-con .panel-tab .tab").removeAttr('iscurrent');
                $(this).attr('iscurrent', "true");
                $(".login-con form").hide();
                $("#" + type).show();
            }
        })

        //message-code
        $("#message-phone").focus(function () {
            var regtel = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            // var isok=reg.test(val);
            var regNum = new RegExp("[0-9]*", "g")
            $(this)[0].oninput = function () {
                var val = this.value;
                var arr = val.match(regNum);
                // console.log(Array.isArray(arr));
                if (arr) {
                    var arrnums = arr.filter(function (val) {
                        return !!val
                    })
                    this.value = arrnums[0] || "";
                    if (regtel.test(arrnums[0])) {
                        $(".login-con .message-code").addClass("code-ok");
                    } else {
                        $(".login-con .message-code").removeClass("code-ok");

                    }

                }

                // this.value=result;

            }
        })
        //sumit
        $("#form-message .submit,#form-psw .submit").click((e) => {
            // alert(1);
            e.stopPropagation();
            e.preventDefault();
            tool.message();

        })
    }
}

var login = new l();
login.init();




