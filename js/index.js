//轮播图
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
$(".title-content").banner({
    aimg:$(".title-content").find('li'),	
    isList:true,			
    autoPlay:true,			
    moveTime:200,			
    index:0
})
$(".title-content1").banner({
    aimg:$(".title-content1").find('li'),	
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
});
//移动出现最上方的搜索框
    $(document).scroll(function(){
        if($(document).scrollTop()>647){
            $('#float').css({
                display:"block"
            })
        }else{
            $('#float').css({
                display:"none"
            }) 
        }
})
//数据的第一次渲染，以及选项卡效果
class Tab{
    constructor(){
        this.index=0;
        this.maxNum=5;
        this.init();
        this.addEvent()
    };
    addEvent(){
        let that=this;
        $('.tab-index').find('li').mouseenter(function(){
            // if(that.index>$(this).index()){
            //     console.log(1)
            //    $('.tab-items').find('ul').css({top:-279,position:'relative;'}).stop().animate({
            //        top:0
            //   },1000)
            // // .end().eq(that.index).css({top:0}).stop().animate({
            // //     top:279
            // // },1000)

            // //    $(".shop").on("click",".small li",function(){
            //     //     $(this).addClass("active").siblings().removeClass("active");
            //     //     $(".big").eq($(this).index()).css({top:-440,display:"block"}).stop().animate({
                
            //     //       // display:"block",
            //     //       top:0
                     
            //     //     },1000).siblings().css({display:"none",top:-440})
            //     //     // console.log(1)
            //     //   })
            // }else if(that.index<$(this).index()){
            //     console.log(2)
            // }
            that.index=$(this).index();
            
            $(this).css({
                background:"#fdf3f2",
                borderBottom:"1px solid red"
            }).siblings().css({
                background:"",
                borderBottom:"none"
            })
            that.display() 
            // $('.tab-items').find('li').eq(that.index).stop().slidedown().siblings().stop().slideUp()
        });
        $('.tab-items').on('mouseenter','li',function(){
            $(this).css({
                boxShadow:"0 16px 30px -14px rgba(0,36,100,0.3)",
            }).parent().siblings().find('li').css({
                boxShadow:"none"
            })
            // console.log(1)
        }).on('mouseleave','li',function(){
            $(this).css({
                boxShadow:"none"
            })
        }) 
    }
    init(){
        let that=this;
        $.ajax({
            url:"http://localhost/stage/data/item.json",
            success:function(res){
                that.res=res;
                that.display()
            }
        })
    };
    display(){
        // console.log(this.res[0].length)
        let str="";
        for(let i=this.index*this.maxNum;i<this.maxNum*this.index+this.maxNum;i++){
            str+=`
                    <li goodsid=${this.res[0][i].id}>
                    <a href="details.html">
                        <img src="${this.res[0][i].img}" title="${this.res[0][i].name}">
                        <p>${this.res[0][i].name}</p>
                        <span>${this.res[0][i].price}</span>
                    </a>
                    </li>
                `
        }
        $('.tab-items').find('ul').html(str);
    }
}
new Tab()
//渲染楼层数据
class Load{
    constructor(){
        this.url="http://localhost/stage/data/item.json"
        this.init()
    };
    init(){
        let that=this;
        $.ajax({
            url:this.url,
            success:function(res){
                that.res=res;
                that.display()
            }
        })
    };
    display(){
        // console.log(this.res.length)
        for(let i=1;i<this.res.length-1;i++){
            // this.list = $("<dd class='list'></dd>")
            let str="";
            for(let j=0;j<this.res[i].length;j++){
                str+=`<li goodsid=${this.res[i][j].id}>
                    <a href="details.html"> <img src="${this.res[i][j].img}" title="${this.res[i][j].name}">
                    <p>${this.res[i][j].name}</p>
                    <span>${this.res[i][j].price}</span>
                    </a>
                    </li>  `
            }
            $(`.display${i}`).find('ul').html(str)
              // $(`.display`).find('ul').html(str+ $('.display').find('dl').html() 
        }  
    }
}
new Load()
//渲染最后的逛一逛
class Gofor{
    constructor(){
        this.url="http://localhost/stage/data/item.json";
        this.init()
    };
    init(){
        let that=this;
        $.ajax({
            url:this.url,
            success:function(res){
                that.res=res;
                that.display()
            }
        })
    };
    display(){
        let str="";
        // console.log(this.res.length)
        for(let i=0;i<this.res[6].length;i++){
            str+=`<li goodsid=${this.res[6][i].id}>
                    <a href="details.html">
                        <img src="${this.res[6][i].img}" alt="">
                        <p>${this.res[6][i].name}</p>
                        <span>${this.res[6][i].price}</span>
                        <a href="javascript:;">${this.res[6][i].store}</a>
                        <a href="javascript:;">${this.res[6][i].city}</a>
                        </a>
                    </li>`
        }
        $(".gofor").find('ul').html(str)
    }
}
new Gofor()
//获取id，存储数据库，并跳转至详情页
class ItemGoods{
    constructor(){
        let that=this;
        $('.tab-items').on('click','li',function(event){
            // console.log($(this))
            that.id=$(this).attr('goodsid')
            // console.log(that.id)
            that.setDate()
        })
    };
    setDate(){
        this.goods=[{
            id:this.id
        }]
        localStorage.setItem('goodsId',JSON.stringify(this.goods))
    }
}
new ItemGoods()

class DisGoods{
    constructor(){
        let that=this;
        $('.display').on('click','li',function(event){
            // console.log($(this))
            that.id=$(this).attr('goodsid')
            // console.log(that.id)
            that.setDate()
        })
    };
    setDate(){
        this.goods=[{
            id:this.id
        }]
        localStorage.setItem('goodsId',JSON.stringify(this.goods))
    }
}
new DisGoods()

class GoGoods{
    constructor(){
        let that=this;
        $('.gofor').on('click','li',function(event){
            // console.log($(this))
            that.id=$(this).attr('goodsid')
            // console.log(that.id)
            that.setDate()
        })
    };
    setDate(){
        this.goods=[{
            id:this.id
        }]
        localStorage.setItem('goodsId',JSON.stringify(this.goods))
    }
}
new GoGoods()

$('.n-l-t').click(function(){
    location.href="http://localhost/stage/list.html";
})

     

    
 

  

