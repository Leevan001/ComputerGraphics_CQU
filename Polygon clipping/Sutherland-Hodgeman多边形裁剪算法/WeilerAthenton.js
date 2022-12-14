var zuobiao=[],rect_flag=false,rect=[];
//console.log('Hello World!');
function getPoint(event) {
    canvas = document.getElementById('polygon_cut');
    ctx = canvas.getContext('2d');
    tmp_x = event.offsetX;
    tmp_y = event.offsetY;
    console.log('tmp_x :',tmp_x ,'tmp_y',tmp_y);
    //zuobiao.push([tmp_x,tmp_y]);
    ctx.beginPath();//开始绘制
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'blue';
    ctx.moveTo(tmp_x, tmp_y);//坐标起点
    ctx.lineTo(tmp_x+1, tmp_y+1);//终点,或者理解为下一个点
    ctx.stroke();//进行绘制
    //console.log("rect_flag",rect_flag);
    if (!rect_flag){
        zuobiao.push([tmp_x,tmp_y]);
        if(zuobiao.length>1)
        drawline();      
    }else{
        rect.push([tmp_x,tmp_y]);
        if(rect.length==2){
            console.log("进入画矩形步骤");
            [x1,y1]=rect[0];//矩形对角坐标
            [x2,y2]=rect[1];
            x=Math.min(x1,x2);
            y=Math.min(y1,y2);
            height=Math.abs(y1-y2);
            width=Math.abs(x1-x2);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(x,y,width,height);
        }
    }  
}
function exchange(x1,x2){
    return [x2,x1];
}
function encode(line_x1,line_y1,xmin,xmax,ymin,ymax){
    var c1=0;
    if(line_x1<xmin)c1+=1;//convas画布y轴向下
    if(line_x1>xmax)c1+=2;
    if(line_y1<ymin)c1+=4;
    if(line_y1>ymax)c1+=8;
    return c1;
}
function drawline(){
    //绘制线段
    ctx.beginPath();//开始绘制
    ctx.lineWidth = 2;
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

function drawline2(x1,y1,x2,y2){//将在区域内的直线变成黑色
    //绘制线段
    ctx.beginPath();//开始绘制
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'red';
    ctx.moveTo(x1,y1);//坐标起点
    //线的端点是圆，还可以是butt(正方)，square(正方，但是追加一段长为线段厚度一半的矩形区域)
    ctx.lineCap = 'square';
    ctx.lineWidth =1;
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function close_polygon(){
    ctx.moveTo(zuobiao[zuobiao.length-1][0],zuobiao[zuobiao.length-1][1]);//首尾闭合
    ctx.lineCap = 'square';
    ctx.lineWidth =1;
    ctx.lineTo(zuobiao[0][0], zuobiao[0][1]);
    ctx.stroke();
    zuobiao.push(zuobiao[0]);
}


function create_rec(){
    rect_flag=true; 
}
function polygon_cut(){
    rect_flag=false;
    [x1,y1]=rect[0];//矩形对角坐标
    [x2,y2]=rect[1];
    xmin=Math.min(x1,x2);
    xmax=Math.max(x1,x2);
    ymin=Math.min(y1,y2);
    ymax=Math.max(y1,y2);
    
    for(i=0;i<zuobiao.length-1;i++){
        [line_x1,line_y1]=zuobiao[i];
        [line_x2,line_y2]=zuobiao[i+1];
        while(1){
            //确定点的区域
            var c1=0,c2=0;
            c1=encode(line_x1,line_y1,xmin,xmax,ymin,ymax);
            c2=encode(line_x2,line_y2,xmin,xmax,ymin,ymax);
            console.log('c1',c1.toString(2),'c2',c2.toString(2));
            if((c1|c2)==0){//都在里面
                drawline2(line_x1,line_y1,line_x2,line_y2);
                break;
            }else if((c1&c2)!=0){//都在外面且同区域
                break;
            }else{
                if(c1==0){
                    [line_x1,line_x2]=exchange(line_x1,line_x2);
                    [c1,c2]=exchange(c1,c2);
                    [line_y1,line_y2]=exchange(line_y1,line_y2);
                }
                if(c1&1){
                
                    line_y1 = Math.round(line_y1 + ((xmin-line_x1) * (line_y1-line_y2)/(line_x1-line_x2)));
                    line_x1=xmin;
                }
                if(c1&2){
                    line_y1 = Math.round(line_y1 + ((xmax-line_x1) * (line_y1-line_y2)/(line_x1-line_x2)));
                    line_x1 = xmax;
                }
                if(c1&4){
                    line_x1 = Math.round(line_x1 + ((ymin-line_y1) * (line_x1-line_x2)/(line_y1-line_y2)));
                    line_y1 = ymin;
                }
                if(c1&8){
                    line_x1 = Math.round(line_x1 + ((ymax-line_y1) * (line_x1-line_x2)/(line_y1-line_y2)));
                    line_y1 = ymax;
                }
            }
        }
    }   
    
}