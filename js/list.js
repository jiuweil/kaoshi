$('.n-l-t').mouseenter(function(){
  $('.ul').stop().show()
})
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
$('.n-l').mouseleave(function(){
  $('.ul').stop().hide()
  
})

//分页
class Page{
  constructor(options){
      this.url=options.url;
      this.box=options.box;
      this.right=options.right;
      this.left=options.left;
      this.aul=options.aul;
      this.list=options.list;
      this.num=options.num;
      this.index=options.index;
      this.init();
      this.addEvent()
  };
  addEvent(){
      var that=this;
      this.left.click(function(){
          that.changeIndex(1)
      });
      this.right.click(function(){
          that.changeIndex(2)
      });
      $(this.aul).on('click','li',function(){
         that.index=$(this).index();
         that.active();
         that.display()
      })
      
  };
  changeIndex(direct){
      if(direct==1){
          if(this.index==0){
              this.index=this.maxNum-1
          }
          else{
              this.index--
          };
      }else{
          if(this.index==this.maxNum-1){
              this.index=0
          }
          else{
              this.index++
          };
      }
      this.active()
      this.display()
  }
  init(){
      var that=this;
      $.ajax({
          url:this.url,
          success:function(res){
              // console.log(res)
              that.res=res;
              that.load();
              that.display()
              // console.log(that.res[6].length)
          }
      })
      // ajax(this.url,function(res){
      //     that.res=JSON.parse(res);
      //     that.load()
      //     that.display()
      // })
  };
  display(){
    let str="";
            // console.log(this.res.length)
            
         for(let i=this.index*this.num;i<this.num*this.index+this.num;i++){
          if(i<this.res[6].length){
                str+=`<li goodsid=${this.res[6][i].id}>
                            <a href="javascript:;">
                            <img src="${this.res[6][i].img}" alt="">
                            <p>${this.res[6][i].name}</p>
                            <span>${this.res[6][i].price}</span>
                            <a href="javascript:;">${this.res[6][i].store}</a>
                            <a href="javascript:;">${this.res[6][i].city}</a>
                            </a>
                        </li>`
          }
           
        }
      this.list.html(str);
  }
  load(){
      var str=""
      this.maxNum=Math.ceil(this.res[6].length/this.num);
      for(var i=0;i<this.maxNum;i++){
          str+=`<li>${i+1}</>`;
      }
  // console.log(str)
  //    console.log(this.aul)
      $(this.aul).html(str);
      this.ali=$('#pageWarp').find('ul').children('li');
      this.active();
  };
  active(){
      this.ali=$('#pageWarp').find('ul').children('li');
      for(var i=0;i<this.ali.length;i++){
          this.ali.eq(i).attr('class',"");
      };
      this.ali.eq(this.index).attr('class','active1');
  }
}
new Page({
  box:$('#pageWarp'),
  left:$('#btnL'),
  right:$('#btnR'),
  list:$('.box').find('ul'),
  aul:$('#pageWarp').find('ul'),
  index:0,
  num:30,
  url:'http://localhost/stage/data/item.json'

});


class Goods{
    constructor(){
        let that=this;
        $('.box').on('click','li',function(event){
            // console.log($(this))
            that.id=$(this).attr('goodsid')
            // console.log(that.id)
            
        })
    }
}
new Goods()