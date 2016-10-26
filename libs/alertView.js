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
  Easing,
  ActivityIndicator
} from 'react-native';

import TimerMgr from './timerMgr';

var screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

var g_instance;
var g_buttonContainerStyle;
var g_viewStyle;
var g_toastViewStyle;
var g_loadingViewStyle;
var view_width  = 280;
var view_height = 177;
var view_btn_height = 44;

var loading_size = 80;
var loading_size_content = 140;

/**
* @desc view class
*/
export default class AlertView extends Component {
  constructor(props) {
    super(props);
    g_instance = this;
    this.___timerMgr = new TimerMgr();

    this.state = {
      __alertViewOpacity:new Animated.Value(0),
      __alertViewHidden:true,
      __toastViewOpacity:new Animated.Value(0),
      __toastViewHidden:true,
      __loadingViewOpacity:new Animated.Value(0),
      __loadingViewHidden:true,
    };
    this.showAlert = this.showAlert.bind(this);
    this.isHiddenAlert = this.isHiddenAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    
    this.toast = this.toast.bind(this);
    
    this.showLoading = this.showLoading.bind(this);
    this.isHiddenLoading = this.isHiddenLoading.bind(this);
    this.hideLoading = this.hideLoading.bind(this);

    this.__getContentElement = this.__getContentElement.bind(this);
    this.__getButtonsElement = this.__getButtonsElement.bind(this);
    this.__getAlertViewElement = this.__getAlertViewElement.bind(this);
    this.__getToastContentElement = this.__getToastContentElement.bind(this);
    this.__getToastViewElement = this.__getToastViewElement.bind(this);
    this.__getLoadingContentElement = this.__getLoadingContentElement.bind(this);
    this.__getLoadingViewElement = this.__getLoadingViewElement.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.___timerMgr.dispose();
  }

  /**
  * @desc 
  */
  render() {
    return (
      <View style={{flex:1}}>
        {this.props.children}

        {/** loading */}
        {this.state.__loadingViewHidden ? null :
          (
            <Animated.View style={{flex:1, opacity:this.state.__loadingViewOpacity,position:'absolute',left:0,top:0, width:screen.width,height:screen.height}}>
              {this.__getLoadingViewElement()}
            </Animated.View>
          )
        }

        {/** alert */}
        {this.state.__alertViewHidden ? null :
          (
            <Animated.View style={{flex:1, opacity:this.state.__alertViewOpacity,position:'absolute',left:0,top:0, width:screen.width,height:screen.height}}>
              <View style={styles.backViewContainer}>
              </View>
              {this.__getAlertViewElement()}
            </Animated.View>
          )
        }

        {/** toast */}
        {this.state.__toastViewHidden ? null :
          (
            this.__getToastViewElement()
          )
        }
      </View>
    );
  }

  showAlert(content, buttonArray, buttonContainerStyle, viewStyle) {
    this._av_content = content;
    this._av_buttonArray = buttonArray || [{text:'ok'}];
    this._av_buttonContainerStyle = buttonContainerStyle || g_buttonContainerStyle;
    this._av_viewStyle = viewStyle || g_viewStyle;

    this.setState({__alertViewHidden:false});
    Animated.timing(this.state.__alertViewOpacity, {
                toValue: 1,
                easing: Easing.linear,
                duration: 150
            }).start();
  };

  hideAlert() {
    Animated.timing(this.state.__alertViewOpacity, {
                toValue: 0,
                easing: Easing.linear,
                duration: 150
            }).start();
    this.___timerMgr.setTimeout(()=>{this.setState({__alertViewHidden:true});}, 150);
  }

  isHiddenAlert() {
    return this.state.__alertViewHidden;
  }

  showLoading(content, viewStyle) {
    this._av_content_loading = content;
    this._av_viewStyle_loading = viewStyle || g_loadingViewStyle;

    this.setState({__loadingViewHidden:false});
    Animated.timing(this.state.__loadingViewOpacity, {
                toValue: 1,
                easing: Easing.linear,
                duration: 150
            }).start();
  };

  hideLoading() {
    Animated.timing(this.state.__loadingViewOpacity, {
                toValue: 0,
                easing: Easing.linear,
                duration: 150
            }).start();
    this.___timerMgr.setTimeout(()=>{this.setState({__loadingViewHidden:true});}, 150);
  }
  
  isHiddenLoading() {
    return this.state.__loadingViewHidden;
  }

  toast(content, timeoutHide, viewStyle) {
    this._av_content_toast = content;
    this._av_viewStyle_toast = viewStyle || g_toastViewStyle;

    this.___timerMgr.clearTimeout(this.__timerToast);
    this.___timerMgr.clearTimeout(this.__timerToast2);

    const foo = ()=>{
      // showAlert.
      this.setState({__toastViewHidden:false});
      Animated.timing(this.state.__toastViewOpacity, {
                  toValue: 0.8,
                  easing: Easing.linear,
                  duration: 150
              }).start();

      // hide.
      this.__timerToast = this.___timerMgr.setTimeout(()=>{
          Animated.timing(this.state.__toastViewOpacity, {
            toValue: 0,
            easing: Easing.linear,
            duration: 250
          }).start();

          this.__timerToast = this.___timerMgr.setTimeout(()=>{this.setState({__toastViewHidden:true});}, 250);
      }, (timeoutHide||2000));
    };

    // is showAlert.
    if (!this.state.__toastViewHidden) {
      Animated.timing(this.state.__toastViewOpacity, {
                  toValue: 0,
                  easing: Easing.linear,
                  duration: 100
              }).start();
      this.__timerToast2 = this.___timerMgr.setTimeout(()=>{
          foo();
      }, 110);
    } else {
      foo();
    }
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
      let stycFont = {};

      let isDefault = false;
      if (unIsDefault && element.isDefault || btns.length == 1) {
        unIsDefault = false;
        stycFont.fontWeight = '600';
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
        <TouchableOpacity key={i} onPress={()=>{element.onPress&&element.onPress(this, i); isDefault&&this.hideAlert();}}>
        <View style={[styles.buttonOneContainer, styc]}>
          <Text numberOfLines={1} lineBreakMode='tail' 
            style={[styles.buttonTextContainer, tintColors, sty, stycFont ]}>
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


  /**
  * @desc: 
  * @return: 
  */
  __getToastContentElement() {
    const d = this._av_content_toast ? ((!!this._av_content_toast.props)?this._av_content_toast:null) : null;
    
    if (d || !this._av_content_toast) {
      return this._av_content_toast;
    }

    const tt = this._av_content_toast.text;
    const sty   = this._av_content_toast.style;
    const tintColor   = this._av_content_toast.tintColor;
    const tintColors  = tintColor ? {color:tintColor} : null;

    var t = (<Text numberOfLines={1} lineBreakMode='tail' 
          style={[styles.toastContentTextContainer, tintColors, sty ]}>
          {tt}
        </Text>);

    return (
      <View style={styles.toastContentContainer}>
        {t}
      </View>
    );
  }

  /**
  * @desc: 
  * @return: 
  */
  __getToastViewElement() {
    var viewStyle = this._av_viewStyle_toast;

    var sh2 = {top:20, justifyContent:'flex-start', alignItems:'flex-start', opacity:this.state.__toastViewOpacity};

    return (
      <Animated.View style={[styles.toastViewContainer, sh2, viewStyle]}>
        {this.__getToastContentElement()}
      </Animated.View>
    );
  }

  
  /**
  * @desc: 
  * @return: 
  */
  __getLoadingContentElement() {
    const d = this._av_content_loading ? ((!!this._av_content_loading.props)?this._av_content_loading:null) : null;
    if (d) {
      return this._av_content_loading;
    }

    const tt = this._av_content_loading ? this._av_content_loading.text : null;
    const sty   = this._av_content_loading ? this._av_content_loading.style : null;
    const tintColor   = this._av_content_loading ? this._av_content_loading.tintColor : null;
    const tintColors  = tintColor ? {color:tintColor} : {color:'#ffffff'};

    const view_sty = this._av_content_loading ? {width:loading_size_content,height:loading_size_content} : null;

    var t = (<Text numberOfLines={4} lineBreakMode='tail' 
          style={[styles.contentTextContainer, tintColors, sty ]}>
          {tt}
        </Text>);

    return (
      <View style={[styles.loadingContentContainer, view_sty]}>
        <ActivityIndicator style={{alignSelf: 'center', color:'#ffffff', marginTop: 10,height: 20}}/>
        {t}
      </View>
    );
  }

  /**
  * @desc: 
  * @return: 
  */
  __getLoadingViewElement() {
    var viewStyle = this._av_viewStyle_loading;

    var sh2 = {bottom:(screen.height)/2 + 30};
    
    const view_sty = this._av_content_loading ? {right:(screen.width-loading_size_content)/2, bottom:(screen.height-loading_size_content)/2 + 30, width:loading_size_content,height:loading_size_content} : null;

    return (
      <View style={[styles.loadingViewContainer, sh2, view_sty, view_sty, viewStyle]}>
        {this.__getLoadingContentElement()}
      </View>
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
    // borderColor:     '#e2e0e0',
    // borderWidth:     1,
    zIndex:          1000001
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
    marginTop:      5,
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
  toastViewContainer: {
    flex:            1,
    top:             20,
    position:        'absolute',
    right:           (screen.width-view_width)/2,
    bottom:          (screen.height-view_height)/2 + 30,
    flexDirection:   'column',
    alignItems:      'center',
    justifyContent:  'center',
    width:           view_width,
    height:          36,
    backgroundColor: '#1a1a1a',
    borderRadius:    10,
    borderWidth:     1,
    zIndex:          2000000
  },
  toastContentTextContainer: {
    fontSize:       14, 
    color:          '#fff',
    textAlign:      'center',
    width:           view_width,
  },
  toastContentContainer: {
    flex:            1,
    width:           view_width,
    padding:         5,
    justifyContent:  'center',
    alignItems:      'center',
  },
  loadingViewContainer: {
    flex:            1,
    position:        'absolute',
    right:           (screen.width-loading_size)/2,
    bottom:          (screen.height-loading_size)/2 + 30,
    flexDirection:   'column',
    alignItems:      'center',
    justifyContent:  'flex-start',
    width:           loading_size,
    height:          loading_size,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius:    6,
    // borderColor:     '#e2e0e0',
    // borderWidth:     1,
    zIndex:          1000000
  },
  loadingContentContainer: {
    height:          loading_size,
    width:           loading_size,
    padding:         10,
    justifyContent:  'center',
  },
});


/**
* @desc: 显示对话框
* @param content:     显示的内容
* @param buttonArray: 按钮数组
* @param buttonContainerStyle: 按钮组的容器样式; 默认样式为 2按钮以下按行排列, 2按钮以上按列排列.
*/
AlertView.showAlert = function(content, buttonArray, buttonContainerStyle, viewStyle) {
  g_instance && g_instance.showAlert(content, buttonArray, buttonContainerStyle, viewStyle);
};

AlertView.hideAlert = function() {
  g_instance && g_instance.hideAlert();
}

AlertView.isHiddenAlert = function() {
  return !g_instance || g_instance.isHiddenAlert();
}

/**
* @desc: 显示加载对话框
* @param content:     显示的内容
*/
AlertView.showLoading = function(content, viewStyle) {
  g_instance && g_instance.showLoading(content, viewStyle);
};


AlertView.hideLoading = function() {
  g_instance && g_instance.hideLoading();
}

AlertView.isHiddenLoading = function() {
  return !g_instance || g_instance.isHiddenLoading();
}

AlertView.setDefaultStyle = function(opt) {
  g_buttonContainerStyle = opt.buttonContainerStyle;
  g_viewStyle = opt.viewStyle;
  g_toastViewStyle = opt.toastViewStyle;
  g_loadingViewStyle = opt.loadingViewStyle;
}

AlertView.toast = function(content, timeoutHide, viewStyle) {
  g_instance && g_instance.toast(content, timeoutHide, viewStyle);
};
