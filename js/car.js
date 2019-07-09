$('.n-l-t').click(function(){
  location.href="http://localhost/stage/list.html";
})

$('.n-r').click(function(){
  location.href="http://localhost/stage/index.html";
  
})

class Judg{
  constructor(){
    this.url='http://localhost/stage/data/item.json';
    this.goods=JSON.parse(localStorage.getItem('shopId'))
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
    $('.low').on('change','.judg',function(event){
      if($(this).is(":checked")){
        that.id=$(this).parent().parent().parent().attr('index');
        console.log(that.id)
        this.target=$(this).parent().parent().children('li').eq(5).html()
        that.setPrice()


        // console.log($(this).parent().parent().children('li').eq(5).html())
        // console.log(typeof($(this).parent().parent().children('li').eq(3).html()))
        // console.log($(this).parent().parent().children('li').eq(4).val())
      }
      
    });
    
  };
  setPrice(){
    // console.log(1)
    console.log(this.id)
    for(let i=0;i<this.res.length;i++){
      for(let j=0;j<this.res[i].length;j++){
        if(this.res[i][j].id==this.id){
          this.num=this.res[i][j].num;
          this.price=this.res[i][j].price.substr(1)
          // this.target=
          console.log( parseFloat("22.333"))
          // this.price=this.res[i][j].price.splice
      }
    }
  }
  }
  setDate(){
    for(var i=0;i<this.goods.length;i++){
      if(this.goods[i].id==this.id){
          this.goods.splice(i,1)
      }
  }
  localStorage.setItem('goods',JSON.stringify(this.goods))
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
            <li> <button class="low">-</button> <input type="text" class="cont" value=${this.goods[k].num}><button class="up">+</button></li>
            <li>0.00</li>
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



  