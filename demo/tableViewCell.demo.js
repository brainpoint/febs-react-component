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
import { TableViewCell, Icons } from '../index'

class app extends Component {
  render() {
    return (
      <TableViewCell
        left={'dfsadf'}
        right={Icons.getIconMinArrowRight()}
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
// @props
//----------------------------------------------
//-------------
*   left:
      1.属性对象
        {
          text:       PropTypes.string,
          tintColor:  PropTypes.string,
          style:      PropTypes.object,
        }
      2.或者为react元素，如<Text></Text>
*
//-------------
*   right:
      为react元素，如<Image/>
*
//-------------
*   onPress:
      点击后的处理函数, function() {}
*

//----------------------------------------------
// @method.
//----------------------------------------------
*
//-------------
*   get/set left :Object
      设置left内容.
//-------------
*   get/set right :Object
      设置right内容.
*

//----------------------------------------------
// @static.
//----------------------------------------------
*

*/