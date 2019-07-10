$('.n-l-t').click(function(){
  location.href="http://localhost/stage/list.html";
})

$('.n-r').click(function(){
  location.href="http://localhost/stage/index.html";
  
})

class Judg{
  constructor(){
    this.url='http://localhost/stage/data/item.json';
    this.goods=JSON.parse(localStorage.getItem('shopId'));
    this.count=0
    this.init()
    this.addEvent()

  };
  addEvent(){
    let that=this;
    $('.low').on('click','.del',function(event){
      that.id= $(event.target).parent().parent().attr('index')
      // console.log(that.id)
      $(event.target).parent().parent().remove();
      that.setDate()
    });
    $('.check1').change(function(){
      if($('.check1').is(":checked")){
        for(let i=0;i<$('.judg').length;i++){
          $('.judg').eq(i).prop('checked',true)
        }
        that.setPrice()
      //    if($('.jisuan').length>0){
      //     // $(`.jisuan`).parent().children().eq(0).children('input').prop('checked',false)
      //     that.count=0
      //     for(let i=0;i<$('.jisuan').length;i++){
      //     // console.log(1)
      //     $(`.jisuan${i}`).parent().children().eq(0).children('input').prop('checked',true)
      //     that.count+=$(`.jisuan${i}`).html()*1;
      //     //   console.log($('.jisuan').html())
      //   }
      //   // console.log(that.count)
      //   that.setPrice()
      //   // console.log(typeof($('.jisuan').html())) 
      //   }
      }
      // console.log($('.jisuan '))
     
    })
    $('.low').on('change','.judg',function(event){
      if($(this).is(":checked")){
        // that.id=$(this).parent().parent().parent().attr('index');
        // // console.log(that.id)
        // for(let i=0;i<$('.judg').length;i++){
        //   if($('.judg').eq(i).is(":checked")){
        //   that.count+=parseFloat($('.judg').eq(i).parent().parent().children().eq(5).html()) ;
        //   }
        
        // }
        // // that.target=$(this).parent().parent().children('li').eq(5).html()*1
        // that.count+=that.target;

        that.setPrice()
        // console.log($(this).parent().parent().children('li').eq(5).html())
        // console.log(typeof($(this).parent().parent().children('li').eq(3).html()))
        // console.log($(this).parent().parent().children('li').eq(4).val())
      }
      if($(this).is(":checked")==false){
        // that.id=$(this).parent().parent().parent().attr('index');
        // console.log(that.id)
        $('.check1').prop('checked',false)
        // that.target=-$(this).parent().parent().children('li').eq(5).html()*1
        // that.count+=that.target;

        that.setPrice()
        // console.log($(this).parent().parent().children('li').eq(5).html())
        // console.log(typeof($(this).parent().parent().children('li').eq(3).html()))
        // console.log($(this).parent().parent().children('li').eq(4).val())
      }
    });
    $('.low').on('click','.reduce',function(){
      if($(this).next().val()==1){
        $(this).next().val(1)
      }else{
        $(this).next().val(parseFloat($(this).next().val())-1)
      }
      that.num=parseFloat($(this).next().val())
      that.id=$(this).parent().parent().parent().attr('index')
      $(this).parent().next().html((parseFloat($(this).parent().prev().html().substr(1))*that.num).toFixed(2)) 
      // if($('.judg').is(":checked")){
        // console.log(1)
        // that.count=parseFloat($(this).parent().next().html())
        that.setPrice()
      // }
      that.changeLocal()
    });



    $('.low').on('click','.up',function(){
      $(this).prev().val(parseFloat($(this).prev().val())+1)
      that.num=parseFloat($(this).prev().val())
      that.id=$(this).parent().parent().parent().attr('index')
      $(this).parent().next().html((parseFloat($(this).parent().prev().html().substr(1))*that.num).toFixed(2)) ;

      // for(let i=0;i<$('.judg').length;i++){
       
      //   if($('.judg').eq(i).is(":checked")){
      //   that.count+=parseFloat($('.judg').eq(i).parent().parent().children().eq(5).html()) ;
      //   }
      
      // }
      // console.log(that.count)
      that.setPrice()
      
      that.changeLocal()





    });
    $('.low').on('click','.cont1',function(){
      $(this).focus()
      $(this).keydown(function(event){
        if(event.keyCode>57 ||event.keyCode<48){
          if(event.keyCode!=37&&event.keyCode!=39 && event.keyCode!=8&& event.keyCode!=116){
            event.preventDefault()
          }
        }
    
  })

      $(this).blur(function(){
        if(parseFloat($(this).val()==0)){
          $(this).val()=1
        }
        that.id=$(this).parent().parent().parent().attr('index')
        that.num=parseInt($(this).val()) ;
        $(this).parent().next().html((parseFloat($(this).parent().prev().html().substr(1))*that.num).toFixed(2)) 
        // if($('.judg').is(":checked")){
         
        //   that.count=parseFloat($(this).parent().next().html())
          that.setPrice()
        // }
        that.changeLocal()
        // console.log(that.num==
      })
    })

    
  };
  changeLocal(){

    for(let i=0;i<this.goods.length;i++){
      if(this.goods[i].id==this.id){
        this.goods[i].num=this.num
     
    }
    }

  localStorage.setItem('shopId',JSON.stringify(this.goods))
  }
  setPrice(){
    this.count=0
    for(let i=0;i<$('.judg').length;i++){
      if($('.judg').eq(i).is(":checked")){
        this.count+=parseFloat($('.judg').eq(i).parent().parent().children().eq(5).html())
      }
    }
    $('.total1').html((this.count).toFixed(2))
   
  }
  setDate(){
    for(var i=0;i<this.goods.length;i++){
      if(this.goods[i].id==this.id){
          this.goods.splice(i,1)
      }
  }
  localStorage.setItem('shopId',JSON.stringify(this.goods))
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
    let str=''
    for(let i=0;i<this.res.length;i++){
      for(let j=0;j<this.res[i].length;j++){
        for(let k=0;k<this.goods.length;k++){
          if(this.goods[k].id==this.res[i][j].id){
          str+=`
            <div class="load${k} load" index=${this.goods[k].id}>
            <ul>
            <li> <input type="checkbox" class="judg"></li>
            <li><img src="${this.res[i][j].img}" alt=""></li>
            <li> <p> ${this.res[i][j].name}</p></li>
            <li>${this.res[i][j].price}</li>
            <li> <button class="reduce">-</button> <input type="text" class="cont1" value=${this.goods[k].num}><button class="up">+</button></li>
            <li class="jisuan jisuan${k}">${parseFloat(this.res[i][j].price.substr(1)*1*this.goods[k].num).toFixed(2)}</li>
            <li class='del'>删除</li>
            </ul>
            </div>
          `
          }
        }
      }
    }
    $('.low').html(str)
  };
}
new Judg()
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
class Type{
  constructor(){
   this.goods=localStorage.getItem('loginId');
   if(this.goods){
     this.goods=JSON.parse(this.goods)
     for(let i=0;i<this.goods.length;i++){
       if(this.goods[i].type==1){
           console.log(1)
         $('.login').html('已登录')
         $('.register').html('退出')
       }
     }
   }
  }
 }
 new Type()

//  class ShopNum{
//    constructor(){
//     this.goods=localStorage.getItem('loginId');
//     if(this.goods){
//       this.goods=JSON.parse(this.goods)
//       for(let i=0;i<this.goods.length;i++){
//         if(this.goods[i].type==1){
//           this.goodsNum=localStorage.getItem('shopId');
//             if(this.goodsNum){
             
//                 $('.number').html(this.goodsNum.length)
              
//             }else{
//               $('.number').html(0)
//             }




//         }
//       }
//     }
//    }
//  }
//  new ShopNum()



