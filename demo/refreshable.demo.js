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
import { RefreshListView, RefreshScrollView } from '../index'

class app extends Component {
  render() {
    return (
      <ListView
        dataSource={ds}
        renderHeader={this.renderHeader}
        renderRow={(rowData) =>
          <ProductCell url={rowData.url} desc={rowData.desc} price={rowData.price} price_v={rowData.price_v} stock={utils_string.format_number(rowData.stock)} price_src={rowData.price_src}/>
        }

        onPulling={(resolve)=>resolve()} 
        onPullOk={(resolve)=>resolve()} 
        onPullRelease={(resolve)=>resolve()} 
        topIndicatorRender={(pulling, pullok, pullrelease) =>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
              <ActivityIndicator size="small" color="gray" />
              {pulling ? <Text>下拉刷新pulling...</Text> : null}
              {pullok ? <Text>松开刷新pullok......</Text> : null}
              {pullrelease ? <Text>玩命刷新中pullrelease......</Text> : null}
            </View> 
        } 
        topIndicatorHeight={60}
      />
    );
  }
}

const styles = StyleSheet.create({});
AppRegistry.registerComponent('app', () => app);

//----------------------------------------------
// @desc: document.
//    only iOS/Android
//----------------------------------------------

/*
//----------------------------------------------
// @props
//----------------------------------------------

//-------------
*  onPulling: function(resolve) {}   // resolve: function(){}
      当下拉时的处理函数.
//-------------
*  onPullOk: function(resolve) {}   // resolve: function(){}
      当下拉完成时的处理函数.
//-------------
*  onPullRelease: function(resolve) {}   // resolve: function(){}
      当释放时的处理函数. 调用resolve() 之后将完成更新.
//-------------
*  topIndicatorRender: function(pulling, pullok, pullrelease) {}
      自定义提示内容
//-------------
*  topIndicatorHeight: number
      自定义提示内容的高度.
*
*
//----------------------------------------------
// @method
//----------------------------------------------

//-------------
*  scrollToTop()
    移到顶部
*
//-------------
*  scrollToBottom()
    移到底部
*
*/
