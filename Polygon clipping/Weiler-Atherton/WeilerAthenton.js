var Coordinate=[],rect_flag=false,rect=[],intersection=[],my_rect=[],cross=[],cr_flag=false,newCoordinate=[],final_ans=[],changemyCoor=[];
class myPoint{//构建点
    constructor(x,y,state){//state 0表示多边形，1表示入边，2表示出边
        this.x=x;
        this.y=y;
        this.state=state;
        this.flag=false;//是否已经遍历
    }
    point(){
        return [this.x,this.y];
    }
}
//console.log('Hello World!');
function getPoint(event) {
    canvas = document.getElementById('polygon_cut');
    ctx = canvas.getContext('2d');
    tmp_x = event.offsetX;
    tmp_y = event.offsetY;
    console.log('tmp_x :',tmp_x ,'tmp_y',tmp_y);
    //Coordinate.push([tmp_x,tmp_y]);
    ctx.beginPath();//开始绘制
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'blue';
    ctx.moveTo(tmp_x, tmp_y);//坐标起点
    ctx.lineTo(tmp_x+1, tmp_y+1);//终点,或者理解为下一个点
    ctx.stroke();//进行绘制
    //console.log("rect_flag",rect_flag);
    if (!rect_flag){
        Coordinate.push(new myPoint(tmp_x,tmp_y,0));
        if(Coordinate.length>1)
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

function dis(x1,y1,x2,y2){//计算两点间的距离的平方，用于排序
    return (x1-x2)**2+(y1-y2)**2;
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
function findpoint(bias,x,y,myarray){
    var tmpi;
    for(tmpi=bias;tmpi<myarray.length;tmpi++){
        if(x==myarray[tmpi].x&&y==myarray[tmpi].y){
            return tmpi;
        }
    }
    return -1;
}
function direction(x1,y1,x2,y2){//判断被裁多边形的笔顺，传入两个向量，矢量叉积判断
    if(x1*y2-x2*y1>0){
        return true;//顺时针
    }else{
        return false;
    }
}
function drawline(){
    //绘制线段
    ctx.beginPath();//开始绘制
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'blue';
    start_x=Coordinate[Coordinate.length-2].x,start_y=Coordinate[Coordinate.length-2].y;
    end_x=Coordinate[Coordinate.length-1].x,end_y=Coordinate[Coordinate.length-1].y;
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
    ctx.moveTo(Coordinate[Coordinate.length-1].x,Coordinate[Coordinate.length-1].y);//首尾闭合
    ctx.lineCap = 'square';
    ctx.lineWidth =1;
    ctx.lineTo(Coordinate[0].x, Coordinate[0].y);
    ctx.stroke();
    Coordinate.push(Coordinate[0]);
}

function insertPoint(tmpline_x1,tmpline_y1,tmpline_x2,tmpline_y2,myCoordinate,line_x1,line_y1,flag){
    //插入到被裁剪多边形中
    var tmpflag;
    if(flag==false)tmpflag=1;
    else tmpflag=2;
    var tmpStart=findpoint(0,tmpline_x1,tmpline_y1,myCoordinate);//寻找线段两个端点在数组中的位置，
    var tmpEnd=findpoint(tmpStart,tmpline_x2,tmpline_y2,myCoordinate);//最后插入的范围一定在tmpStart和tmpEnd之间
    console.log('tmpStart',tmpStart,'tmpEnd',tmpEnd);
    if((tmpEnd-tmpStart)>1){
        console.log('进入排序');
        var tmpindex=tmpStart+1;
        var tmpdis=dis(line_x1,line_y1,tmpline_x1,tmpline_y1);
        //console.log('tmpdis',tmpdis)
        for(;tmpindex<tmpEnd;tmpindex++){
            if(tmpdis<dis(myCoordinate[tmpindex].x,myCoordinate[tmpindex].y,tmpline_x1,tmpline_y1)){
                console.log('正在插入');
                myCoordinate.splice(tmpindex,0,new myPoint(line_x1,line_y1,tmpflag));
                break;
            }
        }
        if(tmpindex==tmpEnd)myCoordinate.splice(tmpindex,0,new myPoint(line_x1,line_y1,tmpflag));
    }else myCoordinate.splice(tmpEnd,0,new myPoint(line_x1,line_y1,tmpflag));
}

function create_rec(){
    rect_flag=true; 
}

function polygon_cut(){
    console.log('---------');
    rect_flag=false;
    [x1,y1]=rect[0];//矩形对角坐标
    [x2,y2]=rect[1];
    xmin=Math.min(x1,x2);
    xmax=Math.max(x1,x2);
    ymin=Math.min(y1,y2);
    ymax=Math.max(y1,y2);
    my_rect.push(new myPoint(xmin,ymax,0));
    my_rect.push(new myPoint(xmin,ymin,0));
    my_rect.push(new myPoint(xmax,ymin,0));
    my_rect.push(new myPoint(xmax,ymax,0));//初始化my_rect,顺时针
    my_rect.push(new myPoint(xmin,ymax,0));

    ////深拷贝一份Coordinate，将在里面进行插入
    // for(i=0;i<Coordinate.length;i++){
    //     newCoordinate.push(new myPoint(Coordinate[i].x,Coordinate[i].y,Coordinate[i].state));
    // }
    newCoordinate=Array.from(Coordinate);
    
    for(i=0;i<Coordinate.length-1;i++){
        [tmpline_x1,tmpline_y1]=[line_x1,line_y1]=Coordinate[i].point();
        [tmpline_x2,tmpline_y2]=[line_x2,line_y2]=Coordinate[i+1].point();//需要保存原有信息
        while(1){
            //确定点的区域
            var c1=0,c2=0;
            c1=encode(line_x1,line_y1,xmin,xmax,ymin,ymax);
            c2=encode(line_x2,line_y2,xmin,xmax,ymin,ymax);
            //console.log('--------i',i)
            // console.log('line_x1',line_x1,'line_y1',line_y1);
            // console.log('c1',c1.toString(2),'c2',c2.toString(2));

            if((c1|c2)==0){//都在里面
                console.log('开始画线');
                drawline2(line_x1,line_y1,line_x2,line_y2);
                //利用向量性质判断是否为焦点和焦点顺序
                if((tmpline_x1-tmpline_x2)*(line_x1-line_x2)<0){
                    //交换顺序
                    [line_x1,line_x2]=exchange(line_x1,line_x2);
                    [line_y1,line_y2]=exchange(line_y1,line_y2);
                }
                if(line_x1!=tmpline_x1&&line_x1!=tmpline_x2){
                    if(!cr_flag){//是入点                       
                        cross.push(new myPoint(line_x1,line_y1,1));//cross只是用于测试交点是否准确
                        //插入到被裁剪多边形中
                        insertPoint(tmpline_x1,tmpline_y1,tmpline_x2,tmpline_y2,newCoordinate,line_x1,line_y1,cr_flag);
                        //插入到矩形中
                        if(line_x1==xmin){
                            insertPoint(xmin,ymax,xmin,ymin,my_rect,line_x1,line_y1,cr_flag);
                        }else if(line_x1==xmax){
                            insertPoint(xmax,ymin,xmax,ymax,my_rect,line_x1,line_y1,cr_flag);
                        }else if(line_y1==ymin){
                            insertPoint(xmin,ymin,xmax,ymin,my_rect,line_x1,line_y1,cr_flag);
                        }else{
                            insertPoint(xmax,ymax,xmin,ymax,my_rect,line_x1,line_y1,cr_flag);
                        }
                        cr_flag=true;
                    }else{//出点
                        cross.push(new myPoint(line_x1,line_y1,2));
                        //插入到被裁剪多边形中
                        insertPoint(tmpline_x1,tmpline_y1,tmpline_x2,tmpline_y2,newCoordinate,line_x1,line_y1,cr_flag);
                        //插入到矩形中
                        if(line_x1==xmin){
                            insertPoint(xmin,ymax,xmin,ymin,my_rect,line_x1,line_y1,cr_flag);
                        }else if(line_x1==xmax){
                            insertPoint(xmax,ymin,xmax,ymax,my_rect,line_x1,line_y1,cr_flag);
                        }else if(line_y1==ymin){
                            insertPoint(xmin,ymin,xmax,ymin,my_rect,line_x1,line_y1,cr_flag);
                        }else{
                            insertPoint(xmax,ymax,xmin,ymax,my_rect,line_x1,line_y1,cr_flag);
                        }
                        cr_flag=false;
                    }
                }
                if(line_x2!=tmpline_x1&&line_x2!=tmpline_x2){
                    if(!cr_flag){//是入点
                        cross.push(new myPoint(line_x2,line_y2,1));
                        //插入到被裁剪多边形中
                        insertPoint(tmpline_x1,tmpline_y1,tmpline_x2,tmpline_y2,newCoordinate,line_x2,line_y2,cr_flag);
                        //插入到矩形中
                        if(line_x2==xmin){
                            insertPoint(xmin,ymax,xmin,ymin,my_rect,line_x2,line_y2,cr_flag);
                        }else if(line_x2==xmax){
                            insertPoint(xmax,ymin,xmax,ymax,my_rect,line_x2,line_y2,cr_flag);
                        }else if(line_y2==ymin){
                            insertPoint(xmin,ymin,xmax,ymin,my_rect,line_x2,line_y2,cr_flag);
                        }else{
                            insertPoint(xmax,ymax,xmin,ymax,my_rect,line_x2,line_y2,cr_flag);
                        }
                        cr_flag=true;
                    }else{//出点
                        cross.push(new myPoint(line_x2,line_y2,2));
                        //插入到被裁剪多边形中
                        insertPoint(tmpline_x1,tmpline_y1,tmpline_x2,tmpline_y2,newCoordinate,line_x2,line_y2,cr_flag);
                        //插入到矩形中
                        if(line_x2==xmin){
                            insertPoint(xmin,ymax,xmin,ymin,my_rect,line_x2,line_y2,cr_flag);
                        }else if(line_x2==xmax){
                            insertPoint(xmax,ymin,xmax,ymax,my_rect,line_x2,line_y2,cr_flag);
                        }else if(line_y2==ymin){
                            insertPoint(xmin,ymin,xmax,ymin,my_rect,line_x2,line_y2,cr_flag);
                        }else{
                            insertPoint(xmax,ymax,xmin,ymax,my_rect,line_x2,line_y2,cr_flag);
                        }
                        cr_flag=false;
                    }
                }
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
    console.log('cross',cross);
    console.log('Coordinate',Coordinate);
    // console.log('newCoordinate',newCoordinate);
    // console.log('my_rect',my_rect);
    //识别被裁出来的图形
    //将两数组末尾元素（实际上是第一个点坐标）去除
    my_rect.pop();
    newCoordinate.pop();
    console.log('----------');
    if(direction(Coordinate[1].x-Coordinate[0].x,Coordinate[1].y-Coordinate[0].y,Coordinate[2].x-Coordinate[0].x,Coordinate[2].y-Coordinate[0].y)){
        console.log('顺时针');
    }else{
        console.log('逆时针');
        // console.log('newCoordinate',newCoordinate);
        // console.log(newCoordinate.length);
        // console.log('------------');
        //进行newCoordinate反转并改变state
        var len=newCoordinate.length;
        for(i=len-1;i>=0;i--){
            if(newCoordinate[i].state==1)changemyCoor.push(new myPoint(newCoordinate[i].x,newCoordinate[i].y,2));
            else if(newCoordinate[i].state==2)changemyCoor.push(new myPoint(newCoordinate[i].x,newCoordinate[i].y,1));
            else changemyCoor.push(new myPoint(newCoordinate[i].x,newCoordinate[i].y,0));
        }
        newCoordinate=changemyCoor;
        //改变rec中的入出标志
        len=my_rect.length;
        for(i=0;i<len;i++){
            if(my_rect[i].state==1)my_rect[i].state=2;
            else if(my_rect[i].state==2)my_rect[i].state=1;
        }
        // console.log('my_rect',my_rect);
        // console.log('changemyCoor',changemyCoor);
        //console.log(changemyCoor.length);
        //console.log('------------');
        // for(i=0;i<len;i++){
        //     console.log(newCoordinate[i].flag);
        // }
        //console.log('newCoordinate',newCoordinate);//当打印引用数据类型时，在引用数据发生改变后，其打印的值也会被实时修改！！！！！！
        // for(i=0;i<len;i++){
        //     console.log(newCoordinate[i].flag);
        // }
    }
    console.log('----------');
    console.log('newCoordinate',newCoordinate);
    console.log('my_rect',my_rect);
    //var i;
    for(i=0;i<newCoordinate.length;i++){
        if(newCoordinate[i].state==1&&newCoordinate[i].flag==false){
            var tmpans=[];
            while(1){
                //console.log("进入循环");
                //console.log('tmpans',tmpans);
                if(i>=newCoordinate.length-1||findpoint(0,newCoordinate[i].x,newCoordinate[i].y,tmpans)!=-1){
                    break;//跳出循环
                }
                while(newCoordinate[i].state!=2){
                    newCoordinate[i].flag=true;
                    tmpans.push(new myPoint(newCoordinate[i].x,newCoordinate[i].y,newCoordinate[i].state));
                    i+=1;
                }
                //1和2是成对出现的
                newCoordinate[i].flag=true;
                tmpans.push(new myPoint(newCoordinate[i].x,newCoordinate[i].y,newCoordinate[i].state));
                //此时跳转到裁剪矩形数组
                var j=findpoint(0,newCoordinate[i].x,newCoordinate[i].y,my_rect);
                j+=1;
                if(j>=my_rect.length)j=0;
                while(my_rect[j].state!=1){
                    tmpans.push(new myPoint(my_rect[j].x,my_rect[j].y,my_rect[j].state));
                    j+=1;
                    if(j>=my_rect.length)j=0;
                }
                tmpans.push(new myPoint(my_rect[j].x,my_rect[j].y,my_rect[j].state));
                //再跳到被裁多边形
                i=findpoint(0,my_rect[j].x,my_rect[j].y,newCoordinate);
                newCoordinate[i].flag=true;
                i+=1;
                //console.log(tmpans);
            }
            final_ans.push(tmpans);
        }
    }
    console.log('----------');
    console.log('final_ans',final_ans);
    console.log('----------');
}