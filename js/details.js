//放大镜
class Enlarg{
  constructor(){
  this.box=document.querySelector(".main-l");
  this.box1=document.querySelector(".main-c");
  this.img=document.querySelector(".main-c img");
  this.span=document.querySelector(".main-l span");
  this.addEvent()
  };
  init(){
   
  this.span.style.width=this.box.offsetWidth*this.box1.offsetWidth/this.img.offsetWidth+"px";
  this.span.style.height=this.box.offsetHeight*this.box1.offsetHeight/this.img.offsetHeight+"px";
  };
  addEvent(){
      var that=this;
  this.box.onmouseover=function(){
      that.over()
  };
  this.box.onmouseout=function(){
      that.out()
  }
  this.box.onmousemove=function(eve){
      var e=eve||window.event;
      that.move(e)
  }
  };
  over(){
  this.span.style.display="block";
  this.box1.style.display="block";
  this.init();
  };
  out(){
  this.span.style.display="none";
  this.box1.style.display="none";
  };
  move(e){
  
  var l=e.offsetX-this.span.offsetWidth/2;
  var t=e.offsetY-this.span.offsetHeight/2;
  if(l<0) l=0;
  if(t<0) t=0;
  if(l>this.box.offsetWidth-this.span.offsetWidth) l=this.box.offsetWidth-this.span.offsetWidth;
  if(t>this.box.offsetHeight-this.span.offsetHeight) t=this.box.offsetHeight-this.span.offsetHeight;
  this.span.style.left=l+"px";
  this.span.style.top=t+"px";

  var spanx=l/(this.box.offsetWidth-this.span.offsetWidth);
  var spany=t/(this.box.offsetHeight-this.span.offsetHeight);

  var imgx=spanx*(this.box1.offsetWidth-this.img.offsetWidth);
  var imgy=spany*(this.box1.offsetHeight-this.img.offsetHeight);
    // console.log(imgx)
    // console.log(imgy)
  this.img.style.left=imgx+"px";
  this.img.style.top=imgy+"px";
  }

}
new Enlarg()

//渲染数据
class Judg{
  constructor(){
    this.url='http://localhost/stage/data/item.json';
    this.goods=JSON.parse(localStorage.getItem('goodsId'))
    // console.log(this.goods[0].id)
    this.init()
   
    // localStorage.setItem('goodsId',JSON.stringify(this.goods))
    // this.goods=JSON.parse(localStorage.getItem('goods'));


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
    // console.log(this.goods.length)
   let str=''
    for(let i=0;i<this.res.length;i++){
      for(let j=0;j<this.res[i].length;j++){
        for(let k=0;k<this.goods.length;k++){
        if(this.goods[k].id==this.res[i][j].id){
          $('.main-l').children('img').attr("src",this.res[i][j].img);
          $('.main-c').children('img').attr("src",this.res[i][j].img);
          $('.main-l').children('span').css({
            display:'block'
          })
          $('.main-r').children('h3').html(this.res[i][j].name);
          $('.main-r').children('p').eq(0).html(`商品号 ${this.res[i][j].id}`);
          $('.main-r').children('span').html(this.res[i][j].price);
          // $('main-r').children('button').attr(`shopId`,this.res[i][j].id)
          str+=`<button shopid=${this.res[i][j].id}>加入购物车</button>`
        //   str+=`<div class="main-l">
        //   <img src="${this.res[i][j].img}" alt="" title="${this.res[i][j].name}">
        //   <span></span>
        //   <p></p>
        // </div>
        // <div class="main-c">
        //   <img src="${this.res[i][j].img}" >
        // </div>
        // <div class="main-r">
        //   <h3>${this.res[i][j].name}</h3>
        //   <p>商品号 ${this.res[i][j].id}</p>
        //   <span>${this.res[i][j].price}</span>
        //   <p>促销 满立减 711半价抢8日</p>
        //    <p>服务 本商品由邮乐网邮乐新乡馆提供
        //       并进行相关配送和售后等服务。</p> 
        //   <a href="javascript:;" shopId=${this.res[i][j].id}>加入购物车</a>
        // </div>`
      }
        }
      }
    }
    $('.button').html(str)
   
  }
}
new Judg()


// http://localhost/stage/list.html

$('.t-l').click(function(){
  location.href="http://localhost/stage/index.html";
})

  


class Goods{
  constructor(){
      let that=this;
      $('.button').on('click','button',function(){
        $('.number').html( $('.number').html()+1)
          // console.log($(this))
          that.id=$(this).attr('shopid')
          // console.log(that.id)
          that.setDate()
      })
  };
  setDate(){
    this.goodsid=localStorage.getItem('shopId');
    if(this.goodsid){
          this.goodsid=JSON.parse(this.goodsid);
          var flag=true;
          for(var i=0;i<this.goodsid.length;i++){
              if(this.id==this.goodsid[i].id){
                  this.goodsid[i].num++
                  flag=false;
              }
          }
          if(flag){
              this.goodsid.push({
                  id:this.id,num:1
              })
          }
          

      }else{
          this.goodsid=[{
              id:this.id,num:1
          }]
      }
      localStorage.setItem('shopId',JSON.stringify(this.goodsid))
  }
}
// this.goods=localStorage.getItem('goods');
//         if(this.goods){
//             this.goods=JSON.parse(this.goods);
//             var flag=true;
//             for(var i=0;i<this.goods.length;i++){
//                 if(this.id==this.goods[i].id){
//                     this.goods[i].num++
//                     flag=false;
//                 }
//             }
//             if(flag){
//                 this.goods.push({
//                     id:this.id,num:1
//                 })
//             }
            

//         }else{
//             this.goods=[{
//                 id:this.id,num:1
//             }]
//         }
//         localStorage.setItem('goods',JSON.stringify(this.goods))
new Goods()


class Type{
 constructor(){
  this.goods=localStorage.getItem('loginId');
  if(this.goods){
    this.goods=JSON.parse(this.goods)
    for(let i=0;i<this.goods.length;i++){
      if(this.goods[i].type==1){
        $('.login').html('已登录')
        $('.register').html('退出')
      }
    }
  }
 }
}
new Type()

class Toggle{
  constructor(){
    $('.shoptoggle').click(function(){
      this.goods=localStorage.getItem('loginId');
      let flag=true;
      if(this.goods){
        this.goods=JSON.parse(this.goods)
        for(let i=0;i<this.goods.length;i++){
          if(this.goods[i].type==1){
            flag=false;
            location.href="http://localhost/stage/car.html"
          }
        }
        if(flag){
          alert("请先登录")
        }
      }else{
        alert("请先登录")
      }
    })
  }
}
new Toggle()

class Sign{
  constructor(){
    $('.register').click(function(){
      
      this.goods= localStorage.getItem('loginId');
      if(this.goods){
     
        this.goods=JSON.parse(this.goods)
        
        for(let i=0;i<this.goods.length;i++){
         this.goods[i].type=0
          }
          localStorage.setItem('loginId',JSON.stringify(this.goods))
        }
      
    })
  }
}
new Sign()
class ShopNum{
  constructor(){
   this.goods=localStorage.getItem('loginId');
   if(this.goods){
     this.goods=JSON.parse(this.goods)
     for(let i=0;i<this.goods.length;i++){
       if(this.goods[i].type==1){
         this.goodsNum=localStorage.getItem('shopId');
           if(this.goodsNum){
             this.goodsNum=JSON.parse(this.goodsNum)
            
               $('.number').html(this.goodsNum.length)
           }else{
             $('.number').html(0)
           }




       }
     }
   }
  }
}
new ShopNum()