# -*- coding = utf-8 -*-
# @Time : 2022/10/6 19:40
# @Author : CQU20205644
# @File : my_ ellipse.py
# @Software : PyCharm
import math
import sys
import keyboard
import numpy as np
import pyautogui as pag
import time
import os
import matplotlib.pyplot as plt
def ellipse(a,b):
    x_list=[]
    y_list=[]
    d=b*b+a*a*(-b+0.25);
    x=0
    y=b
    x_list.append(0)
    x_list.append(0)
    y_list.append(y)
    y_list.append(-y)
    special_x=round((a*a/math.sqrt(a**2+b**2)))#斜率为-1的那个点
    while(x!=special_x):
        if(d<0):
            d+=b*b*(3+2*x)
        else:
            y-=1
            d+=(3+2*x)*b*b+a*a*2*(1-y)
        x+=1
        x_list.append(x)
        x_list.append(x)
        x_list.append(-x)
        x_list.append(-x)
        y_list.append(y)
        y_list.append(-y)
        y_list.append(-y)
        y_list.append(y)
    d=b*b*(x+0.5)**2+a*a*(y-1)**2-a*a*b*b
    while(y>0):
        if(d<0):
            x+=1
            d+=b*b*2*(x+1)+a*a*(3-2*y)
        else:
            d+=a*a*(3-2*y)
        y-=1
        x_list.append(x)
        x_list.append(x)
        x_list.append(-x)
        x_list.append(-x)
        y_list.append(y)
        y_list.append(-y)
        y_list.append(-y)
        y_list.append(y)
    return [x_list,y_list]
# def my_plot(data):
#     plt.axis('equal')
#     plt.scatter(*data)
#     plt.show()

def my_show():
    # my_x_ticks = np.arange(-10, 10, 1)
    # my_y_ticks = np.arange(-10, 10, 1)
    plt.xlim(-20, 20)
    plt.ylim(-20, 20)
    # plt.xticks(my_x_ticks)
    # plt.yticks(my_y_ticks)
    plt.grid(True)
    plt.plot()
    pos = plt.ginput(3)
    plt.close()
    (x1, y1) = pos[0]
    (x2, y2) = pos[1]#焦点坐标
    (x3,y3)=pos[2]#椭圆上的一点
    if x1 < x2:
        x1, x2 = x2, x1
        y1, y2 = y2, y1
    k = (y1 - y2) / (x1 - x2 + 0.000000001)
    print('斜率是', k)
    #c=math.sqrt((x1-x2)**2+(y1-y2)**2)/2#焦距
    x_bias=(x1+x2)/2
    y_bias=(y1+y2)/2
    a=round((math.sqrt((x3-x1)**2+(y3-y1)**2)+math.sqrt((x3-x2)**2+(y3-y2)**2))/2)
    b=round(math.sqrt(a**2-((x1-x2)**2+(y1-y2)**2)/4))
    if(a<b):
        print('!!!!!!!!!!!')
    #[x,y]=ellipse(a,b)
    theta = math.atan(k)
    print(math.atan(k))
    a1 = math.cos(theta)
    a2 = math.sin(theta)
    row_data=np.array(ellipse(a,b))
    rotate_matrix= np.array([[a1, -a2], [a2, a1]])
    data=np.dot(rotate_matrix,row_data)
    data=data+np.array([[x_bias],[y_bias]])
    data=data.tolist()
    data[0].append(x_bias)
    data[1].append(y_bias)
    data[0].append(x1)
    data[0].append(x2)
    data[1].append(y1)
    data[1].append(y2)
    #print(data)
    plt.title('the center of the ellipse is'+'('+str(round(x_bias))+','+str(round(y_bias))+')')
    plt.axis('equal')
    plt.scatter(*data)
    plt.show()

my_show()
while True:
    if keyboard.is_pressed('ctrl'):
        print('press!')
        my_show()
    elif keyboard.is_pressed('shift'):
        break

# xy= ellipse(20,10)
# plt.title('midpoint_Ellipse')
# plt.grid(True)
# plt.axis('equal')
# plt.scatter(*xy,c='brown')
# plt.show()






