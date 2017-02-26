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
let Route = Navigator.Route;

class app extends Component {

  routeConfig(){
    return (
      <Route path="/" component={Index}>
        <Route path="about" component={About} >
          <Route path="inbox" component={Inbox}/>
          <Route path="messages/:id" component={Message} />
        </Route>
        <Route path="*" component={<View>404</View>}/>
      </Route>
    );
  }

  render() {
    return (
      <Navigator
        ref='nav'
        defaultTitle={{ text: 'Title', }}
        defaultLeftButton={{ text: 'Back', }}
        defaultRightButton={{ text: 'Forward', onPress:()=> Navigator.pop() }} 
        defaultBarTintColor='#2112'
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
      >
        {/* route 可嵌套定义. */}
        {this.routeConfig()}

      </Navigator>
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
//----------------------------------------------
// @route 配置
//----------------------------------------------
//-------------
*   Route: 可以包含如下的属性.
      {
        component:      PropTypes.node,
        barTitle:       this.PropTypes.defaultTitle       // 当无此属性时使用defaultBarTitle属性.
        barLeftButton:  this.PropTypes.defaultLeftButton  // 当无此属性时使用defaultBarLeftButton属性.
        barRightButton: this.PropTypes.defaultRightButton // 当无此属性时使用defaultBarRightButton属性.
        barTintColor:   this.PropTypes.defaultBarTintColor// 当无此属性时使用defaultBarTintColor属性.
        barHidden:      PropTypes.bool.
        translucent:    PropTypes.bool     // 是否半透明（仅ios）
        configureScene: Navigator.SceneConfigs.FloatFromBottom // 动画信息
      }
*
      - Route可以嵌套定义.但要严格按照父子顺序排序, 便于系统查找上下级关系.
      - 当地址是 /:id 此方式带参数的时, route.params.xxx 为参数.
      - 地址的查询参数 ?xx= 可以在 , route.query.xxx 中查询

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
*   push(path, props) 
      压入一个页面
       - props: 可以包含如下的属性. 可以覆盖route配置中的数据.
            {
            barTitle:       this.PropTypes.defaultTitle       // 当无此属性时使用defaultBarTitle属性.
            barLeftButton:  this.PropTypes.defaultLeftButton  // 当无此属性时使用defaultBarLeftButton属性.
            barRightButton: this.PropTypes.defaultRightButton // 当无此属性时使用defaultBarRightButton属性.
            barTintColor:   this.PropTypes.defaultBarTintColor// 当无此属性时使用defaultBarTintColor属性.
            barHidden:      PropTypes.bool.
            translucent:    PropTypes.bool     // 是否半透明（仅ios）
            configureScene: Navigator.SceneConfigs.FloatFromBottom // 动画信息
            passProps:      PropTypes.object   // 可将属性传递给页面
            }
//-------------
*   replace(path, props) 
      使用一个route替换当前页面

*   replacePrevious(path, props) 
      使用一个route替换stack前的一个页面
*
//-------------
*   pop() 
      回到前一个页面
*   popToTop() 
      回到最顶层的页面
*   popToRoute(path, props) 
      回到指定的页面
*
//-------------
*   resetTo(path, props)
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
// (ios only)
*   get/set interactivePopGestureEnbaled:  PropTypes.bool
      是否允许回退手势.

//-------------
*   get/set onLeftButtonPress / onRightButtonPress :func
      当前页面的导航按钮的事件处理函数. 形式为 function(ev),
      在其他组件中绑定导航处理事件时,最好在componentWillMount中绑定 
//-------------
*   get/set onDidFocus :func
      当前页面的完成加载后的事件处理函数. 形式为 function(route),
      在其他组件中绑定导航处理事件时,最好在componentWillMount中绑定 
*/

