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

import { Button } from '../index'

class app extends Component {
  render() {
    return (
      <Button onPress={(ev)=>{}}>确定</Button>
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
*   Button.style: View.propTypes.style
      全局按钮的默认样式
      
*   Button.textStyle: Text.propTypes.style
      全局按钮的文字部分默认样式
*/

//----------------------------------------------
// @props
//----------------------------------------------
//-------------
/*   disabled: PropTypes.boolean
      
*
//-------------
/*   onPress: PropTypes.func
      事件处理函数 (ev)=> {}
*
//-------------
*    textSytle: PropTypes.string
      文字样式
*
//----------------------------------------------
// @property.
//----------------------------------------------
*
//-------------
*   get/set text :string/PropTypes.element
      获取文字部分.
*/