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

import { Navigator, AlertView } from '../index'


class app extends Component {

  show() {
    AlertView.show({text:'dfdf'}, [{text:'ok'}]);
  }

  render() {
    return (
      <AlertView>
        <Navigator
          initialRoute={{
            title:    {text: 'My Initial Scene'}, 
            component:Page    // Page中可以使用 props. 来操作.
          }}
        />
      </AlertView>
    );
  }
}

const styles = StyleSheet.create({});
AppRegistry.registerComponent('app', () => app);

//----------------------------------------------
// @desc: document.
//----------------------------------------------
/*
    将AlertView包裹在入口文件的render最外层, 全局只有一个时可以使用static函数或this.方法, 若存在多个则使用this.方法.
*/
/*
//----------------------------------------------
// @static method
//----------------------------------------------
//-------------
*   AlertView.hide();
      隐藏对话框.
*
//-------------
*   AlertView.isHidden();
      对话框当前是否是隐藏.
*
//-------------
*   AlertView.setDefaultStyle(buttonContainerStyle, viewStyle, toastViewStyle);
      设置全局默认样式.
*
//-------------
*   AlertView.show(content, buttonArray = null, buttonContainerStyle = null, viewStyle = null)
      显示对话框.
      @param content 显示的内容.
        1.属性对象
          {
            text:       PropTypes.string,
            tintColor:  PropTypes.string,
            style:      PropTypes.object,
          }
        2.或者为react元素，如<Text></Text>
      @param buttonArray 按钮数组.
        1.属性对象
          { 
            isDefault:PropTypes.boolean,            // 只能有一个按钮为默认, 点击事件最后将自动关闭对话框.
            text:     PropTypes.string.isRequired,
            tintColor:PropTypes.string,
            onPress:  PropTypes.func,   function(alertView, index)  // 参数为控件及按钮的索引.
            style:    PropTypes.object,
          }
        2.或者为react元素，如<Text></Text>
      @param buttonContainerStyle 按钮数组的容器样式. 默认样式为 2个按钮以下按行排列, 2个按钮以上按列排列.
        PropTypes.object
      @param viewStyle 警告框样式.
        PropTypes.object
*
//-------------
*   AlertView.toast(content, timeoutHide = 2000, viewStyle = null)
      显示提示框.
      @param content 显示的内容.
        1.属性对象
          {
            text:       PropTypes.string,
            tintColor:  PropTypes.string,
            style:      PropTypes.object,
          }
        2.或者为react元素，如<Text></Text>
      @param timeoutHide 多久之后关闭
      @param viewStyle 警告框样式.
        PropTypes.object
*
*/

