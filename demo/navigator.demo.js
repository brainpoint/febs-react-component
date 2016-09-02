'use strict';
/**
* Copyright (c) 2016 Copyright citongs All Rights Reserved.
* Author: lipengxiang
*/


//----------------------------------------------
// @desc: demo.
//----------------------------------------------
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, } from 'react-native';

import { Navigator } from '../index'

class app extends Component {
  render() {
    return (
      <Navigator
        ref='nav'
        defaultTitle={{ text: 'Title', }}
        defaultLeftButton={{ text: 'Back', }}
        defaultRightButton={{ text: 'Forward', onPress:()=>this.refs.nav.pop() }} 
        defaultBarTintColor='#2112'
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
        initialRoute={{
          title:    {text: 'My Initial Scene'}, 
          component:Page    // Page中可以使用 props. 来操作.
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});
AppRegistry.registerComponent('app', () => app);

//----------------------------------------------
// @desc: document.
//----------------------------------------------

/*
//----------------------------------------------
// @static
//----------------------------------------------
//-------------
*   Navigator.SceneConfigs
      页面切换动画.
*
*   Navigator.Instance
      全局唯一实例对象.
*
//----------------------------------------------
// @props
//----------------------------------------------
//-------------
*   defaultBarTitle:
      1.属性对象
        {
          text:       PropTypes.string,
          tintColor:  PropTypes.string,
          image:      Image.propTypes.source (仅ios)
          style:      PropTypes.object,
        }
      2.或者为react元素，如<Text></Text>
*
//-------------
*   defaultBarLeftButton / defaultBarRightButton:
      1.属性对象
        { 
          text:             PropTypes.string.isRequired,
          tintColor:        PropTypes.string,
          onPress:          PropTypes.func,   方法形式为 function(navigator),
                                              如果对象存在属性 onLeftButtonPress/onRightButtonPress 则使用属性指定的方法, 
                                              否则才使用此属性指定的方法; 
                                              寻找按钮事件的顺序为: navigator.onLeftButtonPress > route.barLeftButton.onPress > defaultBarLeftButton.onPress
                                              如果任何事件都没有, leftButton默认为pop()后退.
          style:            PropTypes.object,
        }
      2.或者为react元素，如<Text></Text>
*
//-------------
*   defaultBarLeftButtonTextAuto : PropTypes.bool
      如果为true则, text自动为上一页面的标题, 忽略defaultLeftButton.text; 但不忽略route的leftButton.text
*
//-------------
*   defaultBarTintColor: PropTypes.string
      导航条背景色
*
//-------------
*   navigationBarHidden: PropTypes.bool
      是否隐藏导航条
*
//-------------
*   initialRoute:
      初始化的路由页面信息.
      {
        component:      PropTypes.node,
        barTitle:       this.PropTypes.defaultTitle       // 当无此属性时使用defaultBarTitle属性.
        barLeftButton:  this.PropTypes.defaultLeftButton  // 当无此属性时使用defaultBarLeftButton属性.
        barRightButton: this.PropTypes.defaultRightButton // 当无此属性时使用defaultBarRightButton属性.
        barTintColor:   this.PropTypes.defaultBarTintColor// 当无此属性时使用defaultBarTintColor属性.
        barHidden:      PropTypes.bool.
        passProps:      PropTypes.object   // 可将属性传递给页面
        translucent:    PropTypes.bool     // 是否半透明（仅ios）
        configureScene: Navigator.SceneConfigs.FloatFromBottom // 动画信息
      }
*
*
//-------------
*   configureScene: Navigator.SceneConfigs
      动画信息.
      默认为 Navigator.SceneConfigs.FloatFromBottom
*
*

//----------------------------------------------
// @method.
//----------------------------------------------
*
//-------------
*   push(route) 
      压入一个页面
//-------------
*   replace(route) 
      使用一个route替换当前页面
*   replacePrevious(route) 
      使用一个route替换stack前的一个页面
*
//-------------
*   pop() 
      回到前一个页面
*   popToTop() 
      回到最顶层的页面
*   popToRoute(route) 
      回到指定的页面
*
//-------------
*   resetTo(route)
      清除stack,并使用一个页面替换
*
//----------------------------------------------
// @property.
//----------------------------------------------
*
//-------------
*   get navigationBarHeight :number
      设置导航栏的状态.
//-------------
*   get/set navigationBarHidden :bool
      设置导航栏的状态.
//-------------
*   get/set onLeftButtonPress / onRightButtonPress :func
      当前页面的导航按钮的事件处理函数. 形式为 function(navigator),
      在其他组件中绑定导航按钮处理事件时,最好在componentWillMount中绑定 
//-------------
// (ios only)
*   get/set interactivePopGestureEnbaled:  PropTypes.bool
      是否允许回退手势.
*/

