var navDate = [{
    // li代表表头
    li: {
        // 图标class类名
        spanClass: 'HOME',
        // 表头的名称
        spanName: '搜索引擎'
    },
    // ul代表表头里边的内容区、
    ul: [{
        // 这是单个表项(a标签)，有名称(name)、有跳转的地址(href)
        name: 'No.1 百度',
        href: 'https://m.baidu.com/?wpo=btmfast&pu=sz%401321_480&from=1013843a',
    }, {
        // 这是单个表项(a标签)，有名称(name)、有跳转的地址(href)
        name: 'No.2 神马',
        href: 'http://quark.sm.cn',
    }, {
        // 这是单个表项(a标签)，有名称(name)、有跳转的地址(href)
        name: 'No.3 必应',
        href: 'http://cn.bing.com',
    }, {
        // 这是单个表项(a标签)，有名称(name)、有跳转的地址(href)
        name: 'No.4 搜狗',
        href: 'https://www.sogou.com',
    }, {
        // 这是单个表项(a标签)，有名称(name)、有跳转的地址(href)
        name: 'No.5 360',
        href: 'https://www.so.com',
    }, {
        // 这是单个表项(a标签)，有名称(name)、有跳转的地址(href)
        name: 'No.6 Google（挂梯子）',
        href: 'https://www.google.com.hk/',
            }, {
        // 这是单个表项(a标签)，有名称(name)、有跳转的地址(href)
        name: 'No.6 Google（镜像）',
        href: 'http://googlefans.ccaeo.com/google',
    }]
}, {
    li: {
        spanClass: 'soundCode',
        spanName: '常用网页'
    },
    ul: [{
        name: 'Music-Player',
        href: 'http://a-1.vip/Music-Player'
    }, {
        name: '音乐解析',
        href: 'http://a-1.vip/music'
    }, {
        name: '高清壁纸',
        href: 'http://a-1.vip/wallpaper'
    }, {
        name: 'BiliBili',
        href: 'https://m.bilibili.com/index.html'
    }, {
        name: 'YouTube',
        href: 'https://m.youtube.com/?hl=zh-CN'
    }]
}, {
    li: {
        spanClass: 'more',
        spanName: '更多资源'
    },
    ul: [{
        name: '今日热榜，让一切回归有序',
        href: 'https://tophub.today'
    }, {
        name: '最大资源网 - 全球最大在线电影资源网站',
        href: 'http://zuidazy.net'
    }, {
        name: '网盘、资源搜索',
        href: 'http://magnet.chongbuluo.com'
    }, {
        name: '优设导航 - 学设计从这里开始',
        href: 'https://hao.uisdc.com'
    }, {
        name: 'Web 开发技术 | MDN',
        href: 'https://developer.mozilla.org/zh-CN/docs/Web'
    }, {
        name: '【工具合集】宅工网',
        href: 'http://tools.zhai78.com'
    }, {
        name: '【最强工具网】在线文件转换',
        href: 'https://cn.office-converter.com'
    }, {
        name: 'bigjpg - 图片无损放大',
        href: 'http://bigjpg.com'
    }, {
        name: '蓝奏·云存储',
        href: 'https://pc.woozooo.com'
    }, {
        name: '酷安网',
        href: 'http://www.coolapk.com/apk'
    }, {
        name: '嗯哼？获取一张随机壁纸、',
        href: 'http://api.btstu.cn/sjbz/zsy.php'
    }, {
        name: '免费节点 lncn.org',
        href: 'https://lncn.org'
    }, {
        name: '欢哥网',
        href: 'http://52hg.3vfree.com'
    }]
}, {
    li: {
        spanClass: 'key',
        spanName: 'Logout'
    }
}];
// ······························ 封装的jQuery插件 ······························
$.fn.extend({
    navCon: function(data) {
        // navCon方法可以根据data数据生成列表结构、
        $.each(this, function(index, ele) {
            var _this = $(ele);
            _this.html('');
            data.forEach(function(e) {
                var li = $('<li><span class="icon ' + e.li.spanClass + '"></span><span>' + e.li.spanName + '</span></li>');
                _this.append(li);
                if (e.ul) {
                    var ul = $('<ul class="submenu"></ul>').append('<div class="expand-triangle"></div>');
                    e.ul.forEach(function(e) {
                        var li = $('<li><a href="' + e.href + '"><span>' + e.name + '</span></a></li>');
                        ul.append(li);
                    });
                    _this.append(ul);
                } else {
                    li.addClass('Logout');
                }
            });
        });
        return this;
    }
});
// $('#navigation').navCon(navDate);

// ·····························································
//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}
// ·····························································
// 获取随机壁纸、
function imageApi(typeSrc) {
    $.ajax({
        url: "http://api.a-1.vip/text/index.php",
        type: "get",
        dataType: "jsonp",
        data: {
            // type : imgSrc == 风景  imgUrl == 二次元  imgMzt == 妹子图
            type: typeSrc,
            cd: "imgSrc",
        }
    });
}
// 将壁纸渲染到背景、
function imgSrc(data) {
    // console.log(data);
    $('body .bingImage').prop('src', data.content);
}
// ·····························································
// 运行时间展示、
function runTime(y = 1970, m = 0, d = 1, h = 0, mm = 0, s = 0) {
    var diff = new Date() - new Date(y, m - 1, d, h, mm, s);
    var days = Math.floor(diff / (24 * 3600 * 1000));
    var hours = Math.floor((diff % (24 * 3600 * 1000)) / (3600 * 1000));
    var minutes = Math.floor(diff % (3600 * 1000) / (60 * 1000));
    var seconds = Math.floor(diff % (60 * 1000) / 1000);
    return days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
}
// ·····························································
// 获取随机一言、
function textApi() {
    $.ajax({
        url: "http://api.a-1.vip/text/?type=imgSrc",
        type: "get",
        dataType: "jsonp",
        data: {
            type: "cold",
            cd: "textCold",
        }
    });
}
// 展示它、
function textCold(data) {
    // console.log(data);
    $('p#text-cold').fadeOut(500, function() {
        $('p#text-cold').text(data.content).fadeIn(1000);
    });
}
// 统计展示、
function staApi() {
    $.ajax({
        url: "http://api.a-1.vip/statistics/index.php",
        type: "get",
        dataType: "jsonp",
        data: {
            name: "via",
            cd: "staVia",
        }
    });
}

function staVia(data) {
    var text = '微信交流群 | 当前访问量 - ' + data + '+';
    $('.mainmenu .wrap>.box>a').text(text);
}
