# -*- coding = utf-8 -*-
# @Time : 2022/9/27 21:05
# @Author : CQU20205644
# @File : my_Line2.0.py
# @Software : PyCharm

import sys

import keyboard
import numpy as np
import pyautogui as pag
import time
import os


# for _ in range(2):
#     screenWidth, screenHeight = pag.size()
#     x, y = pag.position()
#     print("Screen size: (%s %s),  Position : (%s, %s)\n" % (screenWidth, screenHeight, x, y))
#     time.sleep(2)
# print(0)
# keyboard.wait('a')
# #在按下a之前后面的语句都不会执行，下面同理
# print(1)
# keyboard.wait('b')
# print(2)
# keyboard.wait('c')
# print(3)
# keyboard.wait('enter')
# print(4)
import matplotlib.pyplot as plt
def line_DDA(x1, y1, x2, y2):  # DDA
    # plt.figure(1)
    # plt.grid(True)
    # plt.title('DDA_line')
    # plt.axis('equal')
    x_list=[]
    y_list=[]
    t=time.clock()
    dx = x2 - x1
    dy = y2 - y1
    if (abs(dx) - abs(dy) > 0):
        n = abs(dx)  #与k只有关，斜率大就dy，否则dx
    else:
        n = abs(dy)
    xinc = dx / n
    yinc = dy / n
    x = x1
    y = y1
    plt.scatter(x,y)
    for k in range(n):
        #plt.scatter(int(x + 0.5), int(y + 0.5))
        x_list.append(int(x + 0.5))
        y_list.append(int(y + 0.5))
        x += xinc
        y += yinc
    #plt.show()
    return [x_list,y_list],time.clock()-t


def line_Bresenham(x0, y0, x1, y1):#改进版的bresenham,全是整形数字计算
    # plt.figure(2)
    # plt.grid(True)
    # plt.title('Bresenham_line')
    # plt.axis('equal')
    x_list=[]
    y_list=[]
    t=time.clock()
    if(x1<x0):
        x0,x1=x1,x0
        y1,y0=y0,y1
    dx=2*(x1-x0)
    dy=2*(y1-y0)
    if(dy>=0):
        if(dy<=dx):#k>=0且<=1
            e = -dx
            y = y0
            for x in range(x0, x1):
                #plt.scatter(x, y)
                x_list.append(x)
                y_list.append(y)
                e = e + dy
                if (e >= 0):
                    y = y + 1
                    e = e - dx
        else:
            e=-dy
            x=x0
            for y in range(y0,y1):
                #plt.scatter(x,y)
                x_list.append(x)
                y_list.append(y)
                e=e+dx
                if(e>=0):
                    x=x+1
                    e=e-dy
    else:
        if(dx>=-dy):
            e = dx
            y = y0
            for x in range(x0, x1):
                #plt.scatter(x, y)
                x_list.append(x)
                y_list.append(y)
                e = e + dy
                if (e <= 0):
                    y = y - 1
                    e = e + dx
        else:
            e=-dy
            x=x1
            for y in range(y1,y0):
                #plt.scatter(x,y)
                x_list.append(x)
                y_list.append(y)
                e=e-dx
                if(e<=0):
                    x=x-1
                    e=e-dy
    return [x_list, y_list], time.clock() - t



    #plt.show()

def midpoint_line(x0, y0, x1, y1):
    x_list=[]
    y_list=[]
    t=time.clock()
    if(x0>x1):
        x0,x1=x1,x0
        y1,y0=y0,y1
    a=y0-y1
    b = x1 - x0
    if(a*b<=0):
        if (b > -a):
            d1 = 2 * a
            d2 = 2 * a + 2 * b
            d = 2 * a + b
            y = y0
            for x in range(x0, x1):
                x_list.append(x)
                y_list.append(y)
                if (d < 0):
                    y = y + 1
                    d = d + d2
                else:
                    d = d + d1
        else:
            d1=2*b
            d2=2*(a+b)
            d=a+2*b
            x=x0
            for y in range(y0,y1):
                x_list.append(x)
                y_list.append(y)
                if(d<0):
                    d=d+d1
                else:
                    x=x+1
                    d=d+d2
    else:
        if(a<=b):
            d=a*a-b
            d1=2*a
            d2=2*(a-b)
            y=y0
            for x in range(x0,x1):
                x_list.append(x)
                y_list.append(y)
                if(d<0):
                    d=d+d1
                else:
                    d=d+d2
                    y=y-1
        else:
            d=-2*b+a
            d1=2*(a-b)
            d2=-2*b
            x=x0
            for y in range(y0,y1,-1):
                x_list.append(x)
                y_list.append(y)
                if(d<=0):
                    x=x+1
                    d=d+d1
                else:
                    d=d+d2
    return [x_list,y_list],time.clock()-t

def myplot(x0, y0, x1, y1):
    f, ax = plt.subplots(2, 2,figsize = (10,10))
    f.suptitle(" press ctrl to continue, and shift will exit the program")

    my_x_ticks = np.arange(-10, 10, 1)
    my_y_ticks = np.arange(-10, 10, 1)


    ax[0][0].grid(True)
    #ax[0][0].axis('equal')
    ax[0][0].set_xlim(-10,10)
    ax[0][0].xaxis.set_ticks(my_x_ticks)
    ax[0][0].set_ylim(-10, 10)
    ax[0][0].yaxis.set_ticks(my_y_ticks)
    ax[0][0].axvline(x=0, ls="-", color="grey", linewidth=1)
    ax[0][0].axhline(y=0, ls="-", color="grey", linewidth=1)

    ax[0][0].scatter([x0,x1],[y0,y1])
    ax[0][0].set_title('Two points entered by the mouse')
    xy,t=line_DDA(x0, y0, x1, y1)
    #ax[0][1].axis('equal')
    ax[0][1].set_xlim(-10,10)
    ax[0][1].xaxis.set_ticks(my_x_ticks)
    ax[0][1].set_ylim(-10, 10)
    ax[0][1].yaxis.set_ticks(my_y_ticks)
    ax[0][1].axvline(x=0, ls="-", color="grey", linewidth=1)
    ax[0][1].axhline(y=0, ls="-", color="grey", linewidth=1)

    ax[0][1].scatter(*xy)
    ax[0][1].grid(True)
    ax[0][1].set_title('DDA'+'runtime'+str(format(t, '.7f')))
    xy,t=line_Bresenham(x0, y0, x1, y1)
    #ax[1][0].axis('equal')
    ax[1][0].set_xlim(-10,10)
    ax[1][0].xaxis.set_ticks(my_x_ticks)
    ax[1][0].set_ylim(-10, 10)
    ax[1][0].yaxis.set_ticks(my_y_ticks)
    ax[1][0].axvline(x=0, ls="-", color="grey", linewidth=1)
    ax[1][0].axhline(y=0, ls="-", color="grey", linewidth=1)

    ax[1][0].scatter(*xy)
    ax[1][0].grid(True)
    ax[1][0].set_title('Bresenham'+'runtime'+str(format(t, '.7f')))
    xy,t=midpoint_line(x0, y0, x1, y1)
    #ax[1][1].axis('equal')
    ax[1][1].set_xlim(-10,10)
    ax[1][1].xaxis.set_ticks(my_x_ticks)
    ax[1][1].set_ylim(-10, 10)
    ax[1][1].yaxis.set_ticks(my_y_ticks)
    ax[1][1].axvline(x=0, ls="-", color="grey", linewidth=1)
    ax[1][1].axhline(y=0, ls="-", color="grey", linewidth=1)
    ax[1][1].scatter(*xy)
    ax[1][1].grid(True)
    ax[1][1].set_title('midpoint'+'runtime'+str(format(t, '.7f')))
    plt.show()

# x=range(1,10)
# y=[2*v for v in x]
# print(x, y)
# plt.plot(x, y)
def my_final():
    plt.grid(True)
    my_x_ticks = np.arange(-10, 10, 1)
    my_y_ticks = np.arange(-10, 10, 1)
    plt.xlim(-10, 10)
    plt.ylim(-10, 10)


    plt.axvline(x=0, ls="-", color="black", linewidth=2)
    plt.axhline(y=0, ls="-", color="black", linewidth=2)
    #plt.annotate('local maximun', xy=(-10, 0), xytext=(10, 0), arrowprops=dict(facecolor='black', shrink=0.05))

    plt.xticks(my_x_ticks)
    plt.yticks(my_y_ticks)
    plt.plot()
    pos = plt.ginput(2)
    print(pos)
    plt.close()
    list_prams = []
    for x, y in pos:
        list_prams.append(round(x))
        list_prams.append(round(y))
    print(list_prams)
    # line_DDA(*list_prams)
    # print(midpoint_line(*list_prams))
    myplot(*list_prams)

my_final()
while True:
    if keyboard.is_pressed('ctrl'):
        print('press!')
        my_final()
    elif keyboard.is_pressed('shift'):
        break
#my_final()
# def test_a():
#     print('aaa')
#
# def test(x):
#     print(x)
# keyboard.add_hotkey('1', test_a)
#     #按f1输出aaa
# keyboard.add_hotkey('ctrl+alt', test, args=('b',))
#     #按ctrl+alt输出b
# keyboard.wait()
