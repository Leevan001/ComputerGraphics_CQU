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



















