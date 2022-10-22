//console.log('Hello World!');
var zuobiao=[],rect_flag=false,rect=[];
//console.log('Hello World!');
function getPoint(event) {
    canvas = document.getElementById('line_cut');
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
        if(zuobiao.length!=0&&(zuobiao.length%2==0))
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


function create_rec(){
    rect_flag=true; 
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
function line_cut(){
    rect_flag=false;
    [x1,y1]=rect[0];//矩形对角坐标
    [x2,y2]=rect[1];
    xmin=Math.min(x1,x2);
    xmax=Math.max(x1,x2);
    ymin=Math.min(y1,y2);
    ymax=Math.max(y1,y2);
    
    while(zuobiao.length>1){
        [line_x1,line_y1]=zuobiao.shift();
        [line_x2,line_y2]=zuobiao.shift();
        while(1){
            //确定点的区域
            var c1=0,c2=0;
            c1=encode(line_x1,line_y1,xmin,xmax,ymin,ymax);
            c2=encode(line_x2,line_y2,xmin,xmax,ymin,ymax);
            //console.log('c1',c1.toString(2),'c2',c2.toString(2));
            if((c1|c2)==0){//都在里面
                drawline2(line_x1,line_y1,line_x2,line_y2);
                console.log('cut后画线坐标：',line_x1,'|',line_y1,'|',line_x2,'|',line_y2);
                break;
            }else{
                if(c1==0){//（1）令窗外端点为P1，如果窗外点不是P1，则P1和P2交换端点；
                    [line_x1,line_x2]=exchange(line_x1,line_x2);
                    [c1,c2]=exchange(c1,c2);
                    [line_y1,line_y2]=exchange(line_y1,line_y2);
                }
                //（2）保留窗内端点P2到暂存器里
                tmp_linex2=line_x2,tmp_liney2=line_y2;
                while(Math.abs(line_x1-line_x2)>1||Math.abs(line_y1-line_y2)>1){
                    //（3）对P1编码为C1
                    c1=encode(line_x1,line_y1,xmin,xmax,ymin,ymax);
                    console.log('c1',c1.toString(2),'c2',c2.toString(2));
                    //（4）用中点公式求出中点 ，并编码得C
                    c_x=Math.round((line_x1+line_x2)/2);
                    c_y=Math.round((line_y1+line_y2)/2);
                    console.log("c_x",c_x,"c_y",c_y);
                    c=encode(c_x,c_y,xmin,xmax,ymin,ymax);
                    //（5）按照中点算法的求交规则：
                    //若P1和P同侧，移动P1点；if((C1&C)!=0)　P1=P;否则，移动P2点。else P2=P;
                    if((c1&c)!=0){
                        line_x1=c_x;
                        line_y1=c_y;
                    }else{
                        line_x2=c_x;
                        line_y2=c_y;
                    }//（6）流程转至（3），直到P1和P2相差一个单位时：令交点为P2，取出暂存器的端点赋给P1，然后转向流程1
                }
                line_x1=tmp_linex2,line_y1=tmp_liney2;
                console.log('执行完一次循环','p1:',line_x1,'.',line_y1,'p2:',line_x2,'.',line_y2);
            }
        }
    } 
}