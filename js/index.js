
$(".ul1").banner({
    aimg:$("#banner").find("li"),	
    isList:true,			
    autoPlay:true,			
    moveTime:200,			
    index:0
})

$(".content").banner({
    aimg:$(".content").find("img"),	
    isList:true,			
    autoPlay:true,			
    moveTime:200,			
    index:0
})

//三级菜单
$('.li').mouseenter(function(){
    $(this).css({
        background:"white"
    }).children('.ban-nav').stop().show().parent().siblings().css({
        background: ""
    }).children('.ban-nav').stop().hide()
})
$('.li').mouseleave(function(){

    $(this).css({
        background:""
    }).children('.ban-nav').stop().hide()
})


