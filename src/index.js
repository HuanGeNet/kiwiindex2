(function() {
    // 获取cookie对象、cookieObj会设置在全局变量中方便获取更新、
    function getCookie() {
        window.cookieObj = (function(str) {
            var arr = str.split('; '),
                obj = {};
            arr.forEach(function(ele) {
                var arr = ele.split('=');
                obj[arr[0]] = arr[1];
            });
            return obj;
        }(document.cookie));
    }
    getCookie();

    // 预加载背景图片、
    var bingImage = $('body .bingImage');
    bingImage[0].onload = function() {
        $(this).fadeIn(5000);
    }

    // 点击img的时候更换壁纸、
    $('.bingImage').click(function() {
        $(this).fadeOut(1000, function() {
            // 获取cookie对象、cookieObj会设置在全局变量中方便获取更新、
            getCookie();
            var type = cookieObj.bingImage_type || 0;
            $('.wrap>.box>div>input[type="radio"]').eq(type).prop('checked', true);
            // imageApi 调用的是navData.js里面的函数、
            type == 1 ? imageApi('imgMzt') : imageApi('imgSrc');
        });
        return false;
    });
    $('.bingImage').click();

    // 获取时间展示、
    $('p#text-random').text('本站已萌萌哒运行了 ' + runTime(2019,08,27, 9, 44, 34));
    setInterval(function() {
        $('p#text-random').text('本站已萌萌哒运行了 ' + runTime(2019,08,27, 9, 44, 34));
    }, 500);

    // 获取随机一言、
    $('p#text-cold').click(function() {
        // textApi 调用的是navData.js里面的函数、
        textApi();
        return false;
    });
    $('p#text-cold').click();

    $('.mainmenu .wrap>p:not(#text-cold)').click(function() {
        $(this).siblings('p').fadeToggle(500);
    });

    // // 获取人气统计、
    // $('.mainmenu .wrap>.box[data="switch_hi"]>i').click(function() {
    //     document.cookie = 'switch_hi=no;max-age=259200;';
    //     $(this).parent().hide();
    // });
    // staApi();
    // if (cookieObj.switch_hi != 'no') {
    //     $('.mainmenu .wrap>.box[data="switch_hi"]').fadeIn(1000);
    // }

    // ·····
    $('.mainmenu .wrap>.box[data="switch_bingImage"]>i').click(function() {
        document.cookie = 'switch_bingImage=no;max-age=259200;';
        $(this).parent().hide();
    });
    if (cookieObj.switch_bingImage != 'no') {
        $('.mainmenu .wrap>.box[data="switch_bingImage"]').fadeIn(1000);
    }
    $('.wrap>.box>div>input[type="radio"]').click(function() {
        var type = $(this).attr('data-log');
        document.cookie = 'bingImage_type=' + type + ';';
        $('.bingImage').click();
    });

    // min-height  设置body最小高度、
    var minHeight = (function() {
        // 兼容横屏模式、、
        var bodyHeight = $('body').outerHeight(),
            bodyWidth = $('body').outerWidth(),
            minHeight = bodyHeight > bodyWidth ? bodyHeight : bodyWidth;
        return minHeight;
    }());
    $('body').css('min-height', minHeight);

    // 点击按钮下载当前壁纸、
    $('.wrap>.box>div>span.but-Download').click(function() {
        var imgURL = $('.bingImage').prop('src');
        open(imgURL);
    });
}());

// 选中整个数据列表、
var $navigation = $('#navigation');

// 加载列表数据、
$navigation.navCon(navDate);

// 下拉卡片(li) 元素、
var $submenu = $('#navigation .submenu');

// 整个(.mainmenu) div的元素、
var $mainmenu = $('.mainmenu');

// 隐藏(收回)所有下拉列表、
$submenu.hide(0, function() {
    $navigation.fadeIn(1000);
});

// 网页加载完毕默认第一个展开、
// $submenu.first().delay(400).slideDown(700);

$submenu.on('click', 'li', function() {
    $submenu.siblings().find('li').removeClass('chosen');
    $(this).addClass('chosen');
});
$mainmenu.on('click', 'li', function() {
    $(this).next('.submenu').slideToggle().siblings('.submenu').slideUp();
});

// 最后一个注销的选项卡(Logout)，目前来看是占位用的、
$('#navigation li.Logout').click(function() {
    $mainmenu.fadeOut().delay(500).fadeIn(500);
});

// ························ 以下代码太乱·不易解释 ························
// 选中整个form表单、
var $form = $('#search_form');
// 关键词输入框
var $input = $form.find('#module_form input[type="text"]');
// 词条展示组件
var $module_suggest = $form.find('#module_suggest');
// 词条展示收起按钮、
var $butUp = $('#module_suggest .close span#packUp');
// 清除词条建议组件的模版、
$module_suggest.find('ul.sug').text('');
// input文本发生改变时触发事件、获取关键词建议的词条数据、
$input.bind('input propertychange', function() {
    var _this = this;
    clearTimeout($input.timer); // 防抖
    if ($input.val()) {
        $input.timer = setTimeout(function() {
            $.ajax({
                url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
                type: 'GET',
                data: {
                    wd: $(_this).val(),
                    cb: 'jsonp3'
                },
                dataType: 'jsonp'
            });
        }, 200);
        $navigation.fadeOut(300, function() {
            $module_suggest.fadeIn(300);
        });
    } else {
        // 没数据·隐藏、
        $butUp.click();
    }
});

// 对获取到的数据进行加工展示、
function jsonp3(res) {
    var $module_suggest_ulSug = $module_suggest.find('ul.sug');
    $module_suggest.clearQueue('sugLi');
    // 有数据·渲染、
    $module_suggest_ulSug.find('li').each(function(index, ele) {
        var _this = $(ele);
        $module_suggest.queue('sugLi', function(next) {
            _this.fadeOut(40, function() {
                this.remove();
                next();
            })
        });
    });
    res.s.forEach(function(ele, index) {
        if (index < 5) {
            $module_suggest.queue('sugLi', function(next) {
                var li = $('<li style="display:none;"><span>' + ele + '</span><i></i></li>');
                $module_suggest_ulSug.append(li);
                li.fadeIn(40, function() {
                    next();
                })
            });
        }
    });
    $module_suggest.dequeue('sugLi');
}

// 数据区域被点击事件、
$module_suggest.on('click', 'ul.sug>li span', function() {
    // 词条
    var word = $(this).text();
    wdf(word, $input, function() {
        // 回调函数
        setTimeout(function() {
            // 发送get请求、提交表单。
            $form.submit();
        }, 500);
    });
    $butUp.click();
});
$module_suggest.on('click', 'ul.sug>li i', function() {
    // 词条按钮
    var word = $(this).prev().text();
    wdf(word, $input, function() {
        // 回调函数
        // 主动触发文本改变(propertychange)事件
        $input.queue('wdf', function(next) {
            $input.trigger('propertychange');
        });
    });
});

// 百度
$('#baidu').click(function() {
    search_get('https://www.baidu.com/s?ie=UTF-8&wd=')
});
// 神马
$('#sm').click(function() {
    search_get('https://so.m.sm.cn/s?q=')
});
// 必应
$('#bing').click(function() {
    search_get('http://cn.bing.com/search?q=')
});
// 360
$('#so').click(function() {
    search_get('https://m.so.com/s?q=')
});
// Google
$('#google').click(function() {
    search_get('https://www.google.com/search?q=')
});

function search_get(apiStr) {
    var wd = $input.val();
    if (wd) {
        wdf(wd, $input, function() {
            // 回调函数
            setTimeout(function() {
                // 跳转页面。
                location.href = apiStr + wd;
            }, 500);
        });
        $butUp.click();
    }
}

// 实现输入关键词的动态效果、
function wdf(word, $inp, callback) {
    var valArr = $inp.val().split('');
    var arr = valArr.slice();
    valArr.forEach(function(e, i) {
        arr.pop();
        var wdf = null;
        if (arr.length > 1) {
            wdf = arr.join('');
        } else {
            wdf = ' ';
        }
        $inp.queue('wdf', function(next) {
            $inp.val(wdf);
            setTimeout(function() {
                next();
            }, 20);
        });
    });
    var wd = '';
    [].forEach.call(word, function(e) {
        wd += e;
        var wdf = wd;
        $inp.queue('wdf', function(next) {
            $inp.val(wdf);
            setTimeout(function() {
                next();
            }, 50);
        });
    });
    $input.queue('wdf', function(next) {
        typeof(callback) === 'function' && callback();
        next();
    });
    $input.dequeue('wdf');
}
// 点击收起词条、
$butUp.click(function() {
    $module_suggest.fadeOut(300, function() {
        $module_suggest.find('ul.sug').text('');
        $navigation.fadeIn(300);
    });
});