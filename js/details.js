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