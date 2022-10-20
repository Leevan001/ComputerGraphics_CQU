# -*- coding = utf-8 -*-
# @Time : 2022/10/6 15:05
# @Author : CQU20205644
# @File : my_circle.py
# @Software : Pybharm
import math
import sys
import keyboard
import numpy as np
import pyautogui as pag
import time
import os
import matplotlib.pyplot as plt


def draw_midCircle(r, xb, yb):
    t=time.clock()
    x = 0
    y = r
    d = 1.25 - r
    x_list = []
    y_list = []
    x_list.append(xb)
    y_list.append(yb)
    while (x < y):
        x_list.append(x + xb)
        x_list.append(y + xb)
        x_list.append(x + xb)
        x_list.append(y + xb)
        x_list.append(-y + xb)
        x_list.append(-x + xb)
        x_list.append(-x + xb)
        x_list.append(-y + xb)
        y_list.append(y + yb)
        y_list.append(x + yb)
        y_list.append(-y + yb)
        y_list.append(-x + yb)
        y_list.append(-x + yb)
        y_list.append(-y + yb)
        y_list.append(y + yb)
        y_list.append(x + yb)
        if(d<0):
            d+=2*x+3
        else:
            d+=2*(x-y)+5
            y-=1
        x+=1
    return [x_list,y_list],time.clock()-t
def draw_Bresenham(r, xb, yb):
    t=time.clock()
    x = 0
    y = r
    d1 = 1
    d2=2*(1-r)
    x_list = []
    y_list = []
    x_list.append(xb)
    y_list.append(yb)
    while (x < y):
        x_list.append(x + xb)
        x_list.append(y + xb)
        x_list.append(x + xb)
        x_list.append(y + xb)
        x_list.append(-y + xb)
        x_list.append(-x + xb)
        x_list.append(-x + xb)
        x_list.append(-y + xb)
        y_list.append(y + yb)
        y_list.append(x + yb)
        y_list.append(-y + yb)
        y_list.append(-x + yb)
        y_list.append(-x + yb)
        y_list.append(-y + yb)
        y_list.append(y + yb)
        y_list.append(x + yb)
        if(abs(d1)>abs(d2)):
            y-=1
            d1=d2+1+2*x
            d2=d2+2*(1+x-y)
        else:
            d1=d1+1+2*x
            d2=d1+2*(1+x-y)
        x=x+1
    return [x_list, y_list], time.clock() - t


def my_plot(x1,y1,r):
    plt.figure(figsize=(10, 20))
    xy, t = draw_midCircle(r, x1, y1)
    str_title='The centre of a circle('+str(x1)+','+str(y1)+')'+' Radius length:'+ str(r)
    plt.suptitle(str_title)
    plt.subplot(211)
    plt.title("MidPointCircle"+"  runtime:"+str(t))
    plt.axis('equal')
    plt.scatter(*xy)
    plt.subplot(212)
    xy, t = draw_Bresenham(r, x1, y1)
    plt.title("Bresenham" + "  runtime:" + str(t))
    #plt.grid(True)
    plt.axis('equal')
    plt.scatter(*xy)
    # ax[0].set_title('Two points entered by the mouse')
    # ax[0].grid(True)
    # ax[0].scatter(*xy)
    # ax[0].set_xlim(-10,10)
    # ax[0].set_ylim(-10, 10)
    # #ax[0].axies('equal')
    # ax[1].set_title('Two points entered by the mouse')
    # ax[1].grid(True)
    # ax[1].scatter(*xy)
    plt.show()
def my_final():
    plt.grid(True)
    my_x_ticks = np.arange(-10, 10, 1)
    my_y_ticks = np.arange(-10, 10, 1)
    plt.xlim(-10, 10)
    plt.ylim(-10, 10)
    plt.xticks(my_x_ticks)
    plt.yticks(my_y_ticks)
    plt.plot()
    pos = plt.ginput(2)
    #print(pos)
    plt.close()
    list_prams = []
    (x1,y1)=pos[0]
    (x2,y2)=pos[1]
    list_prams.append(round(x1))
    list_prams.append(round(y1))
    r=round(math.sqrt(((x1-x2)**2+(y1-y2)**2)))
    list_prams.append(r)
    print(list_prams)
    # line_DDA(*list_prams)
    # print(midpoint_line(*list_prams))
    my_plot(*list_prams)
my_final()
while True:
    if keyboard.is_pressed('ctrl'):
        print('press!')
        my_final()
    elif keyboard.is_pressed('shift'):
        break


