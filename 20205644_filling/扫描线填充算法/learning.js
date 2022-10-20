var zuobiao=[],AET,NET,Ymax=0,Ymin,index;
var test=[[5,1],[11,3],[11,8],[5,5],[2,7],[2,2],[5,1]];
//var test2=[[3,1,2],[3,-1,3],[4,1,2],[7,2,2]];
    //获取鼠标点击的坐标
function getPoint(event) {
    canvas = document.getElementById('line_filling');
    ctx = canvas.getContext('2d');
    tmp_x = event.offsetX;
    tmp_y = event.offsetY;
    console.log('tmp_x :',tmp_x ,'tmp_y',tmp_y);
    zuobiao.push([tmp_x,tmp_y]);
    //console.log(flag);
    ctx.beginPath();//开始绘制
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.moveTo(tmp_x, tmp_y);//坐标起点
    ctx.lineTo(tmp_x+1, tmp_y+1);//终点,或者理解为下一个点
    ctx.stroke();//进行绘制
    if (zuobiao.length>1){
        drawline();      
    }   
}
function drawline(){
    //绘制线段
    ctx.beginPath();//开始绘制
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'blue';
    start_x=zuobiao[zuobiao.length-2][0],start_y=zuobiao[zuobiao.length-2][1];
    end_x=zuobiao[zuobiao.length-1][0],end_y=zuobiao[zuobiao.length-1][1];
    ctx.moveTo(start_x,start_y);//坐标起点
    //线的端点是圆，还可以是butt(正方)，square(正方，但是追加一段长为线段厚度一半的矩形区域)
    ctx.lineCap = 'square';
    ctx.lineWidth =1;
    ctx.lineTo(end_x, end_y);
    ctx.stroke();
}

function filling_start(){
    ctx.moveTo(zuobiao[zuobiao.length-1][0],zuobiao[zuobiao.length-1][1]);//首尾闭合
    ctx.lineCap = 'square';
    ctx.lineWidth =1;
    ctx.lineTo(zuobiao[0][0], zuobiao[0][1]);
    ctx.stroke();
    zuobiao.push([zuobiao[0][0],zuobiao[0][1]]);

    // generate_NET_AET(test);
    // console.log(NET);
    generate_NET_AET(zuobiao)
    final_draw();

}

function final_draw(){
    ctx.strokeStyle = 'green';
    for(i=Ymin;i<Ymax;i++){
        for(j=0;j<AET[i].length;j+=2){
            ctx.moveTo(AET[i][j],i);
            ctx.lineCap = 'square';
            ctx.lineWidth =1;
            ctx.lineTo(AET[i][j+1], i);
            ctx.stroke();
        }

    }
    
}

//generate_NET_AET(test)
//final_draw()

function generate_NET_AET(data){
        //寻找最大的y坐标
        console.log('正在生成NET');
        for(i=0;i<data.length;i++){
            if(Ymax<data[i][1]){
                Ymax=data[i][1];
            }
        }
        console.log(Ymax);
        NET=new Array(Ymax);
        for(i=0;i<data.length-1;i++){
            if(data[i][1]<data[i+1][1]){//分两大类讨论
                if(NET[data[i][1]]==undefined){
                    NET[data[i][1]]=[];
                    NET[data[i][1]].push([data[i][0],(data[i][0]-data[i+1][0])/(data[i][1]-data[i+1][1]),data[i+1][1]]);//[x,dx,ymax]                                     
                }else{
                NET[data[i][1]].push([data[i][0],(data[i][0]-data[i+1][0])/(data[i][1]-data[i+1][1]),data[i+1][1]]);
                }
            }else{
                if(NET[data[i+1][1]]==undefined){
                    NET[data[i+1][1]]=[];
                    NET[data[i+1][1]].push([data[i+1][0],(data[i][0]-data[i+1][0])/(data[i][1]-data[i+1][1]),data[i][1]]);//[x,dx,ymax]                                     
                }else{
                NET[data[i+1][1]].push([data[i+1][0],(data[i][0]-data[i+1][0])/(data[i][1]-data[i+1][1]),data[i][1]]);
                }
            }
        }
        for(i=0;i<Ymax;i++){
            if(NET[i]!=undefined){
                NET[i].sort(compare());
            }
        }
        console.log(NET);

        //生成AET
        console.log("正在生成AET");
        Ymin=data[0][1];//寻找y最小的点，提升性能
        for(i=1;i<data.length;i++){
            if(Ymin>data[i][1]){
                Ymin=data[i][1];
            }
        }
        AET=new Array(Ymax);
        //AET.fill([],Ymin,Ymax);共享内存，这个方法不能用
        for(i=Ymin;i<Ymax;i++){
            if(NET[i]!=undefined){
                index=0;
                while(index<NET[i].length){
                    for(j=i;j<NET[i][index][2];j++){
                        if(AET[j]==undefined)AET[j]=[];
                        AET[j].push(NET[i][index][0]+Math.round((j-i)*NET[i][index][1]));
                    }
                    index+=1;
                }
            }
        }
        for(i=Ymin;i<Ymax;i++){
            if(AET[i]!=undefined){
                AET[i].sort(function(a, b){return a - b});
            }
        }
        console.log(AET)
        
}



 function  compare() {//对NET进行排序
    return  function( object1,  object2) {
      var value1  = object1[0];
      var value2  = object2[0];
      if (value2  < value1) {
        return  1;
     }  else  if (value2  > value1) {
        return  - 1;
     }  else {
        if(object1[1]>=object2[1]){
            return 1;
        }else{
            return -1;
        }
     }
   }
 }

 