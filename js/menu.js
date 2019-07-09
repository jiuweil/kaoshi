// class Tab{
//     constructor(){
//         this.index=0;
//         this.maxNum=5;
//         this.init();
//         this.addEvent()
//     };
//     addEvent(){
//         let that=this;
//         $('.tab-index').find('li').mouseenter(function(){
//             that.index=$(this).index();
//             $(this).css({
//                 background:"#fdf3f2",
//                 borderBottom:"1px solid red"
//             }).siblings().css({
//                 background:"",
//                 borderBottom:"none"
//             })
           
//             that.display() 
//             // $('.tab-items').find('li').eq(that.index).stop().slidedown().siblings().stop().slideUp()
//         });
//         $('.tab-items').on('mouseenter','li',function(){
//             $(this).css({
//                 boxShadow:"0 16px 30px -14px rgba(0,36,100,0.3)",
//             }).parent().siblings().find('li').css({
//                 boxShadow:"none"
//             })
//             // console.log(1)
//         }).on('mouseleave','li',function(){
//             $(this).css({
//                             boxShadow:"none"
//                         })
//         }) 
           
//     }
//     init(){
//         let that=this;
//         $.ajax({
//             url:"http://localhost/stage/data/item.json",
//             success:function(res){
//                 that.res=res;
//                 that.display()
//             }
//         })
//     };
//     display(){
//         // console.log(this.res[0].length)
//         let str="";
//         for(let i=this.index*this.maxNum;i<this.maxNum*this.index+this.maxNum;i++){
//             str+=`<ul>
//                     <li>
//                         <img src="${this.res[0][i].img}" title="${this.res[0][i].name}">
//                         <p>${this.res[0][i].name}</p>
//                         <span>${this.res[0][i].price}</span>
//                     </li>
//                 </ul>`
//         }
//         $('.tab-items').html(str);
//     }
// }
// new Tab()
    //  console.log(1)
// class Load{
//     constructor(){
//         this.url="http://localhost/stage/data/item.json"
//         this.init()
//     };
//     init(){
//         let that=this;
//         $.ajax({
//             url:this.url,
//             success:function(res){
//                 that.res=res;
//                 that.display()
//             }
//         })
//     };
//     display(){
       
//         // console.log(this.res.length)
//         for(let i=1;i<this.res.length;i++){
//             // this.list = $("<dd class='list'></dd>")
//             let str="";
//             for(let j=0;j<this.res[i].length;j++){
//                 str+=`<li index=${this.res[i][j].id}>
//                     <a href=""> <img src="${this.res[i][j].img}" title="${this.res[i][j].name}"></a>
//                     <p>${this.res[i][j].name}</p>
//                     <span>${this.res[i][j].price}</span>
//                     </li>  `
//             }
//             $(`.display${i}`).find('ul').html(str)
//               // $(`.display`).find('ul').html(str+ $('.display').find('dl').html() 
//         }  
//     }
// }


// new Load()

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
        console.log(this.res.length)
        for(let i=0;i<this.res[6].length;i++){
            str+=`<li index=${this.res[6][i].id}>
                        <img src="${this.res[6][i].img}" alt="">
                        <p>${this.res[6][i].name}</p>
                        <span>${this.res[6][i].price}</span>
                        <a href="javascript:;">${this.res[6][i].store}</a>
                        <a href="javascript:;">${this.res[6][i].city}</a>
                    </li>`
        }
        $(".gofor").find('ul').html(str)
    }
}
new Gofor()