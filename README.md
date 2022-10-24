[toc]

# 重庆大学 软件工程计算机图形学——20205644

## 画线

### 要求：

1）对直线的几种绘制算法进行理解(DDA、Bresenham、中点画线法)；
2）编程实现实现三种算法绘制直线；
2）画出程序流程图；
3）编写程序的源程序；
4）编辑源程序并进行调试；
5）进行特殊模式的运行测试，并结合情况进行调整。

### 实现方式：

python，matplotlib库

### 运行方法：

运行程序

界面：

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/linepre1.png?raw=true" width="50%" height="50%"  />

在画板上任意点击两点后：

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/linepre2.png?raw=true" width="50%" height="50%"  />



关闭当前窗口后按住ctrl继续作图，按住shift退出程序

## 画圆&椭圆

### 要求：

1）实现绘制圆的中点算法和Bresenham算法。
2）实现绘制椭圆的中点算法。

### 实现方式：

python，matplotlib库

### 运行方法：

圆的运行界面：

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/circle_pre1.png?raw=true" width="50%" height="50%"  />

任意点击两点，第一个点时圆心，第二个是半径

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/circle_pre2%20-%20%E5%89%AF%E6%9C%AC.png?raw=true" width="50%" height="50%"  />

关闭当前窗口后按住ctrl继续作图，按住shift退出程序

椭圆运行界面：

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/ellipse_pre1.png?raw=true" width="50%" height="50%"  />

点击两点（椭圆的两个焦点），再点击一点（椭圆上的任意一点），三点确定一个椭圆

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/ellipse_pre2.png?raw=true" width="50%" height="50%"  />

关闭当前窗口后按住ctrl继续作图，按住shift退出程序

## 填充算法

### 要求：

1）实现多边形扫描线算法和种子填充法。

### 实现方式：

js，convas

### 运行方式：

#### 扫描线算法

点击html文件，用chrome打开

运行页面：

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/filling_1.png?raw=true" width="50%" height="50%"  />

点击确定边界

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/filling2.png?raw=true" width="50%" height="50%"  />

点击开始填充，会自动闭合图形并填充

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/filling3.png?raw=true" width="50%" height="50%"  />

使用开发者工具，查看AET和NET

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/filling4.png?raw=true"   />



#### 种子填充算法：

运行界面：

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/filling5.png?raw=true"   />

先确定边界，点击闭合图形，首尾相连

此时也可以继续添加多边形

或者点击图形设置种子点之后再点击填充button

运行速度较慢（四联通算法）（扫描线种子填充算法为舍友在四联通基础上进行的改动）

## 直线裁剪算法

### 要求：

实现直线和多边形的裁剪。

### 实现方式：

js，convas

### Cohen-Sutherland算法：

#### 算法：

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/Cohen-sutherland.jpg?raw=true" width="90%" height="50%"  />

#### 运行效果：

首先画很多线段

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/cspre1.png?raw=true" width="50%" height="50%"  />

点击创建方块按钮，点击矩形对角两个点选择矩形区域

之后点击进行裁剪按钮

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/cspre2.png?raw=true" width="50%" height="50%"  />

打开开发者工具

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/cspre3.png?raw=true" width="50%" height="50%"  />

查看相关信息

### Midpoint Subdivision Line Clipping算法：

#### 原理：



* 1、将直线的两端点P1、P2编码得：C1、C2；
* 2、判别
  根据C1和C2的具体值，可以有三种情况：
  - （1）C1=C2＝0，表明两端点全在窗口内，因而整个线段也在窗内，
              应予保留。
  - （2）C1&C2≠0，表明两端点必定处于某一边界的同一外侧，因而整个线段 
              全在窗外，应予舍弃。
  - （3）不属于上面两种情况，均需要求交点。
* 求交点
  - （1）令窗外端点为P1，如果窗外点不是P1，则P1和P2交换端点；
  - （2）保留窗内端点P2到暂存器里；
  - （3）对P1编码为C1；
  - （4）用中点公式求出中点 ，并编码得C；
  - （5）按照中点算法的求交规则：
    - 若P1和P同侧，移动P1点；if((C1&C)!=0)　P1=P;
    - 否则，移动P2点。 　　      else　　　　　 P2=P;
  - （6）流程转（3），直到P1和P2相差一个单位时：令交点为P2，取
         出暂存器的端点赋给P1，然后转向流程1。

#### 运行：

同上

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/mspre1.png?raw=true" width="50%" height="50%"  />

## 多边形裁剪算法

### 要求：

实现Weiler-Athenton多边形裁剪算法，编写裁剪的源程序，并能在计算机上编译运行，画出正确的图形。

### Weiler-Athenton多边形裁剪算法：

#### 步骤：

1. 建顶点表；

2. 求交点；

3. 裁剪… …

#### 详细流程：

* 1、顺时针输入被裁剪多边形顶点序列Ⅰ放入数组1中。
* 2、顺时针输入裁剪窗口顶点序列Ⅱ放入数组2中。
* 3、求出被裁剪多边形和裁剪窗口相交的所有交点，并给每个交点
       打上  “入”、“出”标记。
  　 然后将交点按顺序插入序列Ⅰ得到新的顶点序列Ⅲ，并放入数组3中；
      同样也将交点按顺序插入序列Ⅱ得到新的顶点序列Ⅳ，放入数组4中；
* 4、初始化输出数组Q，令数组Q为空。接着从数组3中寻找“入”点。
  　　　 如果“入”点没找到，程序结束。
* 5、如果找到“入”点，则将“入”点放入S中暂存。
* 6、将“入”点录入到输出数组Q中。并从数组3中将该“入”点的“入”点标记删去。
* 7、沿数组3顺序取顶点：
  + 如果顶点不是“出点”，则将顶点录入到输出数组Q中，流程转第7步。
  + 否则，流程转第8步。
* 8、沿数组4顺序取顶点：
       如果顶点不是“入点”，则将顶点录入到输出数组Q中，流程转第8步。
    否则，流程转第9步。
* 9、如果顶点不等于起始点S，流程转第6步，继续跟踪数组3。
   　 否则，将数组Q输出；
  　 流程转第4步，寻找可能存在的分裂多边形。
  　 算法在第4步：满足“入”点没找到的条件时，算法结束。

##### 运行环境chrome

#### 运行效果展示

首先画被裁多边形

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/WApre1.png?raw=true" width="50%" height="50%"  />

点击闭合图形button使被裁多边形首尾闭合

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/WApre2.png?raw=true" width="50%" height="50%"  />

点击创建区域button，并在画布上点击矩形两对角画矩形

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/WApre3.png?raw=true" width="50%" height="50%"  />

点击进行多边形裁剪

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/WApre5.png?raw=true" width="50%" height="50%"  />

打开开发者工具，查看相关信息

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/WApre6.png?raw=true" width="50%" height="50%"  />

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/WApre7.png?raw=true" width="50%" height="50%"  />



进行多次测试

<img src="https://github.com/Leevan001/ComputerGraphics_CQU/blob/main/pics/WApre8.png?raw=true" width="50%" height="50%"  />





## 文件目录

```
│  README.md
│  tree.txt
│  
├─20205644_filling
│  ├─扫描线填充算法
│  │      index.html
│  │      learning.js
│  │      
│  ├─种子填充算法
│  │      index.html
│  │      seed_filling.js
│  │      
│  └─种子填充算法 - 扫描线
│          index.html
│          seed_filling.js
│          
├─circlr&ellipse
│      drawcircle&ellipse.html
│      my_ ellipse.py
│      my_circle.py
│      
├─draw_line
│      my_Line2.0.py
│      
├─line_Cut
│  ├─line_cutCohen-Sutherland
│  │      index.html
│  │      line_cut.js
│  │      
│  └─Midpoint Subdivision Line Clipping
│          index.html
│          Midpoint SubdivisionLineClipping.js
│          
├─pics
│      circle_pre1 - 副本.png
│      circle_pre1.png
│      circle_pre2 - 副本.png
│      circle_pre2.png
│      Cohen-sutherland.jpg
│      cspre1.png
│      cspre2.png
│      cspre3.png
│      ellipse_pre1 - 副本.png
│      ellipse_pre1.png
│      ellipse_pre2 - 副本.png
│      ellipse_pre2.png
│      filling2.png
│      filling3.png
│      filling4.png
│      filling5.png
│      filling_1.png
│      linepre1.png
│      linepre2.png
│      mspre1.png
│      WApre1.png
│      WApre2.png
│      WApre3.png
│      WApre4.png
│      WApre5.png
│      WApre6.png
│      WApre7.png
│      WApre8.png
│      
└─Polygon clipping
    ├─Sutherland-Hodgeman多边形裁剪算法
    │      index.html
    │      WeilerAthenton.js
    │      
    └─Weiler-Atherton
            index.html
            WeilerAthenton.js
```



























