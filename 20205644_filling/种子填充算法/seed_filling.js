//console.log('Hello World');
var zuobiao=[];
var canvas = document.getElementById('seed_filling_area');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var mystack=[];
var flag=true;
var imageData;
// ctx.strokeStyle = 'green';
// ctx.moveTo(0,0);//坐标起点
// ctx.lineTo(1,1);//终点,或者理解为下一个点
// ctx.stroke();//进行绘制
// imageData=ctx.getImageData(0, 0, width, height).data;
// console.log(imageData);

    //获取鼠标点击的坐标
function getPoint(event) {
    // canvas = document.getElementById('seed_filling_area');
    // ctx = canvas.getContext('2d');
    tmp_x = event.offsetX;
    tmp_y = event.offsetY;
    zuobiao.push([tmp_x,tmp_y]);
    //console.log(flag);

    // ctx.beginPath();//开始绘制
    // ctx.lineWidth = 1;
    // ctx.strokeStyle = 'black';
    // ctx.moveTo(tmp_x, tmp_y);//坐标起点
    // ctx.lineTo(tmp_x+1, tmp_y+1);//终点,或者理解为下一个点
    // ctx.stroke();//进行绘制

    if (zuobiao.length>1&&flag){
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

function pix_close(){//首尾闭合
    ctx.moveTo(zuobiao[zuobiao.length-1][0],zuobiao[zuobiao.length-1][1]);//首尾闭合
    ctx.lineCap = 'square';
    ctx.lineWidth =1;
    ctx.lineTo(zuobiao[0][0], zuobiao[0][1]);
    ctx.stroke();
    zuobiao=[];
    flag=false;
    //zuobiao.push([zuobiao[0][0],zuobiao[0][1]]);
    // console.log('height',height);
    // console.log('width',width);
    // console.log(ctx.getImageData(0, 0, width, height));
}

function filling_start(){//进行填充
    console.log('进行填充');
    console.log(zuobiao);
    imageData=ctx.getImageData(0, 0, width, height);//获取画布已有信息
    console.log(imageData);
    mystack.push(zuobiao[0]);
    console.log('栈的长度',mystack.length);
    while(mystack.length!=0){//四联通
        [tmp_x,tmp_y]=mystack.pop();
        console.log('x',tmp_x,'y',tmp_y);
        console.log('栈的长度',mystack.length);
        if(if_colored(tmp_x+1,tmp_y)==false){//说明没有着色
            mystack.push([tmp_x+1,tmp_y]);
            draw_dot(tmp_x+1,tmp_y);
            console.log('栈的长度',mystack.length);
        }
        if(if_colored(tmp_x-1,tmp_y)==false){//说明没有着色
            mystack.push([tmp_x-1,tmp_y]);
            draw_dot(tmp_x-1,tmp_y);
            console.log('栈的长度',mystack.length);
        }
        if(if_colored(tmp_x,tmp_y+1)==false){//说明没有着色
            mystack.push([tmp_x,tmp_y+1]);
            draw_dot(tmp_x,tmp_y+1);
            console.log('栈的长度',mystack.length);
        }
        if(if_colored(tmp_x,tmp_y-1)==false){//说明没有着色
            mystack.push([tmp_x,tmp_y-1]);
            draw_dot(tmp_x,tmp_y-1);
            console.log('栈的长度',mystack.length);
        }
        ctx.putImageData(imageData, 0, 0);//显示在画布上
    }
}

//判断是否已经着色
function if_colored(x, y) {//设置中点画圆算法画布上的像素点颜色
    console.log('调用函数if_colored',x,y);
    var index = getStartIndex(x, y);
    console.log(imageData.data[index+3]);
    console.log('index',index);
    if(imageData.data[index+3]!=0){
        console.log('返回',true);
        return true;
    }
    else{
        console.log('返回',false);
        return false;
    }
}

function getStartIndex(x, y) {//rgba，获取在(x,y)在一维数组中的起始位置

    return y * width * 4 + x * 4;
}

function draw_dot(x, y) {//设置中点画圆算法画布上的像素点颜色
    console.log('调用函数draw_dot');
    var index = getStartIndex(x, y);
    imageData.data[index + 3] = 255;
    //ctx.putImageData(imageData, 0, 0);//显示在画布上
}

function add_newpic(){//添加新的多边形
    flag=true;
}
//本打算一个点一个点显示的，但是被浏览器优化了，只能一起显示