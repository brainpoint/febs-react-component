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

import { Page } from '../index'

class app extends Component {
  render() {
    return (
      <Page horizontal={false}>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
      </Page>
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
// @static global style.
//----------------------------------------------
*   Page.dotStyle: style
      非当前页面的样式, 可设置backgroundColor颜色等.
*   Page.activeDotStyle: style
      非当前页面的样式, 可设置backgroundColor颜色等.
*   Page.dot: node
*   Page.activeDot: node
      直接使用node节点.
*/

/*
//----------------------------------------------
// @props
//----------------------------------------------
//-------------
*   horizontal: boolean
      设置方向, 默认为true
*
//-------------
*   loop: boolean
      是否可以循环, 默认为true
*
//-------------
*   index: number
      默认显示页面.
*
//-------------
*   showsButtons: boolean
      是否显示页面按钮, 默认为false
*
//-------------
*   autoplay: boolean
      是否自动播放, 默认为false
*   autoplayTimeout: number
      自动播放时间间隔, 默认为2500
*
//-------------
*   dotStyle: style
      非当前页面的样式, 可设置backgroundColor颜色等.
*   activeDotStyle: style
      非当前页面的样式, 可设置backgroundColor颜色等.
*   dot: node
*   activeDot: node
      直接使用node节点.
*   
*/