// console.log(1)
$('.user').blur(function(){
  let reg=/^[\da-z]{5}$/i
  if(reg.test( $('.user').val())){
    console.log('成功')
  }else{
    console.log('失败')
  }
})
class Reg{
  constructor(){
    
    console.log()

    let that=this;
    $('.reg').click(function(){
      that.user=$('.user').val();
      that.pass=$('.pass').val();
      that.setDate()
    })
  };
  setDate(){
    this.goodss=localStorage.getItem('loginId');
    if(this.goodss){
      this.goodss=JSON.parse(this.goodss)
      console.log(this.goodss)
      let flag=true;
      for(let i=0;i<this.goodss.length;i++){
        if(this.goodss[i].user==this.user){
          flag=false;
          // console.log(1)
          alert("当前用户名已被注册")
          return;
        }
      }
        if(flag){
          console.log(1)
          this.goodss.push({
            type:0,
            user:$('.user').val(),
            pass:$('.pass').val(),
          })
        }      
    }else{
      this.goodss=[{
        type:0,
        user:this.user,
        pass:this.pass
      }]
    }
    localStorage.setItem('loginId',JSON.stringify(this.goodss))
  }
}
new Reg()

class Log{
  constructor(){
    let that=this;
    $('.log').click(function(){
      that.user=$('.user').val();
      that.pass=$('.pass').val();
      that.judg()
      
    })
  };
  judg(){
    this.goodss=localStorage.getItem('loginId');
    if(this.goodss){
      this.goodss=JSON.parse(this.goodss);
      let flag=true;
      for(let i = 0;i<this.goodss.length;i++){
        if(this.goodss[i].user==this.user&&this.goodss[i].pass==this.pass){
          this.goodss[i].type=1;
          
          localStorage.setItem('loginId',JSON.stringify(this.goodss))
          flag=false;
          location.href="http://localhost/stage/index.html"
          }
        }
        if(flag){
          alert("用户名或密码输入错误");
        }
    }else{
      alert('请先注册再来登录')
    }
  }
}
new Log()

// class Type{
//   constructor(){
//    this.goods=localStorage.getItem('loginId');
//    if(this.goods){
//      this.goods=JSON.parse(this.goods)
//      for(let i=0;i<this.goods.length;i++){
//        if(this.goods[i].type==1){
//            console.log(1)
//          $('.login').html('已登录')
//          $('.register').html('退出')
//        }
//      }
//    }
//   }
//  }
//  new Type()