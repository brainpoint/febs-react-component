'use strict';
/**
* Copyright (c) 2016 Copyright citongs All Rights Reserved.
* Author: lipengxiang
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {TimerMgr} from './';

/**
* @desc view class
*/
class  extends Component {

  constructor(props) {
    super(props);
    this.timerMgr = new TimerMgr();
  }

  componentWillUnmount() {
    this.timerMgr.dispose();
  }


}

/**
* @desc view style
*/
const styles = StyleSheet.create({
});

/**
* @desc view class
*    可在组件释放时自动释放所有的timeout计时器.
*     - 在constructor中:          this.timerMgr = new TimerMgr();
*     - 在componentWillUnmount中: this.timerMgr.dispose();
*     - 在使用计时器的函数中调用:   var t = this.timerMgr.setTimeout(fn, tm) / this.timerMgr.clearTimeout(t)
*     - 清理全部使用: this.timerMgr.clearAll();
*/