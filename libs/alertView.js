'use strict';
/**
* Copyright (c) 2016 Copyright citongs All Rights Reserved.
* Author: lipengxiang
*/

import React,{ Component, PropTypes }        from 'react';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';

import TimerMgr from './timerMgr';

var screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

var g_instance;
var view_width  = 280;
var view_height = 177;
var view_btn_height = 44;

/**
* @desc view class
*/
export default class AlertView extends Component {
  constructor(props) {
    super(props);
    g_instance = this;
    this.timerMgr = new TimerMgr();

    this.state = {__alertViewOpacity:new Animated.Value(0), __alertViewHidden:true};
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.__getContentElement = this.__getContentElement.bind(this);
    this.__getButtonsElement = this.__getButtonsElement.bind(this);
    this.__getAlertViewElement = this.__getAlertViewElement.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.timerMgr.dispose();
  }

  /**
  * @desc 
  */
  render() {
    return (
      <View style={{flex:1}}>
        {this.props.children}

        {this.state.__alertViewHidden?
          null
          :
          (
            <Animated.View style={{flex:1, opacity:this.state.__alertViewOpacity,position:'absolute',left:0,top:0, width:screen.width,height:screen.height}}>
              <View style={styles.backViewContainer}>
              </View>
              {this.__getAlertViewElement()}
            </Animated.View>
          )
        }
      </View>
    );
  }

  show(content, buttonArray, buttonContainerStyle, viewStyle) {
    this._av_content = content;
    this._av_buttonArray = buttonArray;
    this._av_buttonContainerStyle = buttonContainerStyle;
    this._av_viewStyle = viewStyle;

    this.setState({__alertViewHidden:false});
    Animated.timing(this.state.__alertViewOpacity, {
                toValue: 1,
                easing: Easing.linear,
                duration: 150
            }).start();
  };

  hide() {
    Animated.timing(this.state.__alertViewOpacity, {
                toValue: 0,
                easing: Easing.linear,
                duration: 150
            }).start();
    this.timerMgr.setTimeout(()=>{this.setState({__alertViewHidden:true});}, 150);
  }

  isHidden() {
    return this.state.__alertViewHidden;
  }

  /**
  * @desc: 
  * @return: 
  */
  __getContentElement() {
    const d = this._av_content ? ((!!this._av_content.props)?this._av_content:null) : null;
    
    if (d || !this._av_content) {
      return this._av_content;
    }

    const tt = this._av_content.text;
    const sty   = this._av_content.style;
    const tintColor   = this._av_content.tintColor;
    const tintColors  = tintColor ? {color:tintColor} : null;

    var t = (<Text numberOfLines={4} lineBreakMode='tail' 
          style={[styles.contentTextContainer, tintColors, sty ]}>
          {tt}
        </Text>);

    return (
      <View style={styles.contentContainer}>
        {t}
      </View>
    );
  }


  /**
  * @desc: 
  * @return: 
  */
  __getButtonsElement() {
    var btns = this._av_buttonArray;
    var btnStyle = this._av_buttonContainerStyle;
    
    const d = btns ? ((!!btns.props)?btns:null) : null;
    
    if (d || !btns) {
      return btns;
    }

    var unIsDefault = true;
    var children = [];
    for (var i = 0; i < btns.length; i++) {
      let element = btns[i];
    
      const tt = element.text;
      const sty   = element.style;
      const tintColor   = element.tintColor;
      const tintColors  = tintColor ? {color:tintColor} : null;
      let styc = {};

      let isDefault = false;
      if (unIsDefault && element.isDefault || btns.length == 1) {
        unIsDefault = false;
        styc.fontWeight = 600;
        isDefault = true;
      }
      
      if (btns.length == 1) {
        styc.borderTopColor = '#e2e0e0';
        styc.borderTopWidth   = 1;
        styc.width = view_width;
      }
      else if (btns.length == 2) {
        styc.width = view_width/2;
        if (i == 0) {
          styc.borderRightColor = '#e2e0e0';
          styc.borderRightWidth   = 1;
        }
        styc.borderTopColor = '#e2e0e0';
        styc.borderTopWidth   = 1;
      }
      else {
        styc.width = view_width;
        styc.borderTopColor = '#e2e0e0';
        styc.borderTopWidth   = 1;
      }

      let e = (
        <TouchableOpacity onPress={()=>{element.onPress&&element.onPress(this, i); isDefault&&this.hide();}}>
        <View style={[styles.buttonOneContainer, styc]}>
          <Text numberOfLines={1} lineBreakMode='tail' 
            style={[styles.buttonTextContainer, tintColors, sty ]}>
            {tt}
          </Text>
        </View>
        </TouchableOpacity>
      );
      children.push(e);
    }

    if (btnStyle)
      return (
        <View style={btnStyle}>
          {children}
        </View>
      );
    else
      return (
        <View style={btns.length==2?styles.buttonContainerRow:[styles.buttonContainerColumn, {height:btns.length*view_btn_height}]}>
          {children}
        </View>
      );
  }

  /**
  * @desc: 
  * @return: 
  */
  __getAlertViewElement() {
    var btns = this._av_buttonArray;
    var viewStyle = this._av_viewStyle;

    var height = btns ? (btns.length-1)*view_btn_height+view_height : 0;
    var sh = btns ? ((btns&&btns.length>2)? {height:height}: null) : null;
    var sh2 = {bottom:(screen.height-height)/2 + 30};

    if (height < screen.height*0.8)
      return (
        <View style={[styles.alertViewContainer, sh, sh2, viewStyle]}>
          {this.__getContentElement()}
          {this.__getButtonsElement()}
        </View>
      );
    else
      return (
        <ScrollView style={[styles.alertViewContainer, {width:view_width+4, height:screen.height*0.8, bottom:(screen.height*0.2)/2 + 30, justifyContent:'flex-start', alignItems:'flex-start'}]} 
        contentContainerStyle={[sh, {width:view_width}, viewStyle]} >
          {this.__getContentElement()}
          {this.__getButtonsElement()}
        </ScrollView>
      );
  }
}

/**
* @desc view style
*/
const styles = StyleSheet.create({
  backViewContainer: {
    flex:            1,
    opacity:         0.2,
    backgroundColor: '#000',
    zIndex:          999999
  },
  alertViewContainer: {
    flex:            1,
    position:        'absolute',
    right:           (screen.width-view_width)/2,
    bottom:          (screen.height-view_height)/2 + 30,
    flexDirection:   'column',
    alignItems:      'center',
    justifyContent:  'flex-start',
    width:           view_width,
    height:          view_height,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius:    6,
    borderColor:     '#e2e0e0',
    borderWidth:     1,
    zIndex:          1000000
  },
  contentContainer: {
    height:          view_height-view_btn_height,
    width:           view_width,
    padding:         20,
    justifyContent:  'center',
  },
  contentTextContainer: {
    fontSize:       16, 
    color:          '#000',
    textAlign:      'center',
  },
  buttonContainerRow: {
    flexDirection:   'row',
    justifyContent:  'flex-start',
    // borderTopColor:  '#e2e0e0',
    // borderTopWidth:  1,
    height:          view_btn_height,
    width:           view_width,
  },
  buttonContainerColumn: {
    flexDirection:   'column',
    justifyContent:  'flex-start',
    // borderTopColor:  '#e2e0e0',
    // borderTopWidth:  1,
    height:          view_btn_height,
    width:           view_width,
  },
  buttonOneContainer: {
    height:         view_btn_height,
    flexDirection:   'row',
    justifyContent:  'center',
    alignItems:      'center',
  },
  buttonTextContainer: {
    fontSize:       18, 
    color:          '#0076FF',
  },
});


/**
* @desc: 显示对话框
* @param content:     显示的内容
* @param buttonArray: 按钮数组
* @param buttonContainerStyle: 按钮组的容器样式; 默认样式为 2按钮以下按行排列, 2按钮以上按列排列.
*/
AlertView.show = function(content, buttonArray, buttonContainerStyle, viewStyle) {
  g_instance && g_instance.show(content, buttonArray, buttonContainerStyle, viewStyle);
};


AlertView.hide = function() {
  g_instance && g_instance.hide();
}

AlertView.isHidden = function() {
  return !g_instance || g_instance.isHidden();
}