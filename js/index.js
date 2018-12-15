$(function () {
    var commentData=[];
    $.get("http://localhost:3000/home", function (data) {
        let dataObj = {list: data};
        let html = template('content', dataObj);
        $('.bigNav').append(html);
        let html1 = template('content1', dataObj);
        $('.sort').append(html1);
        const $ul = $(".bannerNav>ul>li>ul")
        const $icon = $(".bannerNav>ul>li>img")
        $(".bannerNav>.bigNav>li").each(function (index) {
            $(this).hover(
                function () {
                    $($ul[index]).css({
                        display: "block",
                        top: -index * 30 + "px"
                    })
                    $(this).addClass("act")
                    $($icon[index]).prop({src: "./img/icon1.png"});
                },
                function () {
                    $($ul[index]).css({
                        display: "none",
                    })
                    $($icon[index]).prop({src: "./img/right.png"});
                    $(this).removeClass("act")
                }
            )
        })
    });
    $.get("http://localhost:3000/service", function (data) {
        let dataObj = {list: data};
        let html = template('content2', dataObj);
        $('.conList').append(html);
    })
    $.get("http://localhost:3000/comment", function (data) {
        commentData=data
        getData(0, data)
        addAttr(data.length, data)
    })
    var currentIndex=0;
    function addAttr(val, data) {
        for (let i = 0; i < val / 10; i++) {
            var a = `<a href='javascript:;'>${i + 1}</a>`;
            $(".showPage").append(a)
            if (i > 10) {
                return
            }
        }
        initA(data)
    }
    //上一页下一页点击事件
    $(".pageup").click(function () {
        if(currentIndex>0){
            getData(currentIndex-1,commentData)
            currentIndex--;
            const current = $(".showPage .on");
            $(".showPage a").removeClass('on');
            $(current).prev().addClass('on');
            $(window).scrollTop(820)
        }
    })
    $(".pagedown").click(function () {
        getData(currentIndex+1,commentData)
        currentIndex++
        const current = $(".showPage .on");
        $(".showPage a").removeClass('on');
        $(current).next().addClass('on');
        $(window).scrollTop(820)
    })
     //li绑定监听事件
    $(".nav-lists>li").each(function (index, li) {
        $(li).click(
            function () {
                $(li).addClass("active")
                $(li).siblings().removeClass("active")
            })
    })
    //轮播图
    new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay: true,
        effect: 'fade',
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
    })
    //首页固定效果
    let ishide = true;
    $(window).scroll(function () {
        if (scrollY === 0) {
            $('.header').css({
                transform: 'rotateX(0deg)',
                transformOrigin: '50% 0'
            });
            ishide = true;
        } else if (scrollY > 0) {
            if (ishide) {
                $('.header').css({
                    transform: 'rotateX(-180deg)',
                    transformOrigin: '50% 0'
                });
                ishide = false;
                setTimeout(() => {
                    $('.header').css({
                        transform: 'rotateX(0deg)',
                        transformOrigin: '50% 0'
                    });
                }, 300)
            }

        }
    });
    //分页绑定点击事件
    function initA(data) {
        $(".showPage>a:first-child").addClass("on")
        $(".showPage>a").each(function (index, a) {
            $(a).click(
                function () {
                    currentIndex=index;
                    $(a).addClass("on")
                    $(a).siblings().removeClass("on")
                    getData(index, data)
                    $(window).scrollTop(820)
                })
        })

    }
    //获取数据
    function getData(index, data) {
        $('.commentDiv .conments').hide()
        let currentArr = [];
        currentArr = data.slice(index * 10, (index + 1) * 10)
        let html = template('content3', {list: currentArr});
        $('.commentDiv').append(html);
    }
})
