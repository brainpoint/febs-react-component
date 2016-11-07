'use strict';
/**
* Copyright (c) 2016 Copyright citongs All Rights Reserved.
* Author: lipengxiang
*/

import React, { Component, PropTypes } from 'react';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {styles, NAV_BAR_HEIGHT, STATUS_BAR_HEIGHT} from './navigator.style';
var NaviRN = ReactNative.NavigatorIOS;


function extendObjs(des, src){
   if (src)
   for( var i in src){
       if(!(i in des)){
           des[i] = src[i];
       }
   } 
   return des;
}

/**
* @desc: navigator 
*/
class Navigator extends Component {

  // this._routeStack.

  constructor(props) {
    super(props);
    this.getNavRoute = this.getNavRoute.bind(this);

    this._bindMethod(this);
  }

  _bindMethod(ctx) {
    Object.defineProperty(Navigator,"navigationBarHeight", {
      get: function () {return ctx.navigationBarHeight;},
      set: function (x) { ctx.navigationBarHeight = x; } 
    });
    Object.defineProperty(Navigator,"navigationBarHidden", {
      get: function () {return ctx.navigationBarHidden;},
      set: function (x) { ctx.navigationBarHidden = x; } 
    });
    Object.defineProperty(Navigator,"barTintColor", {
      get: function () {return ctx.barTintColor;},
      set: function (x) { ctx.barTintColor = x; } 
    });
    Object.defineProperty(Navigator,"onDidFocus", {
      get: function () {return ctx.onDidFocus;},
      set: function (x) { ctx.onDidFocus = x; } 
    });
    Object.defineProperty(Navigator,"onLeftButtonPress", {
      get: function () {return ctx.onLeftButtonPress;},
      set: function (x) { ctx.onLeftButtonPress = x; } 
    });
    Object.defineProperty(Navigator,"onRightButtonPress", {
      get: function () {return ctx.onRightButtonPress;},
      set: function (x) { ctx.onRightButtonPress = x; } 
    });
    Navigator.push              = ctx.push.bind(ctx);
    Navigator.replace           = ctx.replace.bind(ctx);
    Navigator.replacePrevious   = ctx.replacePrevious.bind(ctx);
    Navigator.pop               = ctx.pop.bind(ctx);
    Navigator.popToTop          = ctx.popToTop.bind(ctx);
    Navigator.popToRoute        = ctx.popToRoute.bind(ctx);
    Navigator.resetTo           = ctx.resetTo.bind(ctx);
  }

  componentDidMount() {
    // this.push(this.props.initialRoute);
    // this.setState({navigationBarHidden:this.props.navigationBarHidden});
  }

  componentWillMount() {
    this.state = {
      navigationBarHidden:this.props.navigationBarHidden, 
      barTintColor:this.props.defaultBarTintColor,
      interactivePopGestureEnbaled:false
    };

    this._routeStack = [];
  }

  componentWillUnmount() {
  }

  /**
  * @desc: 
  * @return: 
  */
  get navigationBarHeight() {
    return NAV_BAR_HEIGHT;
  }

  /**
  * @desc: navigationBarHidden
  */
  set navigationBarHidden(r) {
    this.setState({navigationBarHidden:r});
  }
  get navigationBarHidden() {
    return this.state&&this.state.navigationBarHidden === true;
  }

  /**
  * @desc: navigationBarHidden
  */
  set interactivePopGestureEnbaled(r) {
    this.setState({interactivePopGestureEnbaled:r});
  }
  get interactivePopGestureEnbaled() {
    return this.state&&this.state.interactivePopGestureEnbaled === true;
  }

  /**
  * @desc: push 
  */
  push(route) {
    this.refs.nav.push(this.getNavRoute(route));
  }

  /**
   * @desc: replace
   */
  replace(route)          { this.refs.nav.replace(this.getNavRoute(route)); }
  replacePrevious(route)  { this.refs.nav.replacePrevious(this.getNavRoute(route)); }

  /**
  * @desc: back 
  */
  pop()             { this.refs.nav.pop(); }
  popToTop()        { this.refs.nav.popToTop(); }
  popToRoute(route) { this.refs.nav.popToRoute(this.getNavRoute(route)); }

  resetTo(route)    { this._routeStack = []; this.refs.nav.resetTo(this.getNavRoute(route)); }

  getLeftTitle(routeProp) {
    let autoBack = false;
    let text = (routeProp.barLeftButton?routeProp.barLeftButton.text:null);
    if (this.props.defaultLeftButtonTextAuto && !text)
    {
      return null;
    }
    else
    {
      text = text||data.text||'';
      return text;
    }
  }

  getNavRoute(routeProp) {
    for (let i = this._routeStack.length-1; i >= 0; i--) {
      if (this._routeStack[i].props === routeProp) {
        return this._routeStack[i].navRoute;
      }
    }

    let r = {
          component:    routeProp.component,
          title:        (routeProp.barTitle?routeProp.barTitle.text:null)||this.props.defaultBarTitle.text,
          };
    const titleImage =  (routeProp.barTitle?routeProp.barTitle.image:null)||this.props.defaultBarTitle.image;
    if (titleImage)
      r.titleImage = titleImage;
    const passProps  =  routeProp.passProps;
    if (passProps)
      r.passProps = passProps;

    // backButtonIcon: 
    // backButtonTitle:
    // leftButtonIcon:
    const leftButtonTitle   =  this.getLeftTitle(routeProp);
    if (leftButtonTitle)
      r.leftButtonTitle = leftButtonTitle;
    const onLeftButtonPress =  (routeProp.barLeftButton?routeProp.barLeftButton.onPress:null)||this.props.defaultBarLeftButton.onPress;
    if (onLeftButtonPress)
      r.onLeftButtonPress = onLeftButtonPress;
    // rightButtonIcon:   ,
    const rightButtonTitle  =  (routeProp.barRightButton?routeProp.barRightButton.text:null)||this.props.defaultBarRightButton.text;
    if (rightButtonTitle)
      r.rightButtonTitle = rightButtonTitle;
    const onRightButtonPress =   (routeProp.barRightButton?routeProp.barRightButton.onPress:null)||this.props.defaultBarRightButton.onPress;
    if (onRightButtonPress)
      r.onRightButtonPress = onRightButtonPress;
    // wrapperStyle:
    const navigationBarHidden =  (routeProp.barHidden?true:this.state.navigationBarHidden);
    if (navigationBarHidden)
      r.navigationBarHidden = navigationBarHidden;
    else if (this._routeStack.length > 0 && routeProp !== this._routeStack[0].props)
    {
      if (r.passProps.style)
        r.passProps.style.marginTop = NAV_BAR_HEIGHT+STATUS_BAR_HEIGHT;
      else
        r.passProps.style = {marginTop:NAV_BAR_HEIGHT+STATUS_BAR_HEIGHT};
    }
    // else
    //   r.itemWrapperStyle = {marginTop: NAV_BAR_HEIGHT};
    // shadowHidden:
    const tintColor           =  (routeProp.barLeftButton?routeProp.barLeftButton.tintColor:null)||(routeProp.barRightButton?routeProp.barRightButton.tintColor:null)||this.props.defaultBarLeftButton.tintColor;
    if (tintColor)
      r.tintColor = tintColor;
    const barTintColor        =  routeProp.barTintColor||this.props.defaultBarTintColor;
    if (barTintColor)
      r.barTintColor = barTintColor;
    const titleTextColor      =  (routeProp.barTitle?routeProp.barTitle.tintColor:null)||this.props.defaultBarTitle.tintColor;
    if (titleTextColor)
      r.titleTextColor = titleTextColor;
    // translucent:
    
    this._routeStack.push({props:routeProp, navRoute:r});
    return r;
  }

  render() {  
    return (
      <NaviRN
        ref = 'nav'
        // renderScene = {(route, navigator) => <route.component navigator={this} style={contentOffset}  {...route.passProps}/> }
        initialRoute = {this.getNavRoute(this.props.initialRoute)}
        interactivePopGestureEnbaled={this.state.interactivePopGestureEnbaled}
        style={{flex:1}}
      />
    );
  }
} // class Navigator.

/**
* @desc: 
* @return: 
*/
const ButtonShape = {
  text: PropTypes.string,
  style: PropTypes.object,
  tintColor: PropTypes.string,
  onPress: PropTypes.func,
};

const TitleShape = {
  text: PropTypes.string,
  tintColor: PropTypes.string,
  style: PropTypes.object,
};


Navigator.SceneConfigs = ReactNative.Navigator.SceneConfigs;
Navigator.propTypes = {
  navigationBarHidden: PropTypes.bool,
  barTintColor: PropTypes.string,
  defaultBarLeftButton: PropTypes.oneOfType([
    PropTypes.shape(ButtonShape),
    PropTypes.element,
  ]),
  defaultBarRightButton: PropTypes.oneOfType([
    PropTypes.shape(ButtonShape),
    PropTypes.element,
  ]),
  defaultBarTitle: PropTypes.oneOfType([
    PropTypes.shape(TitleShape),
    PropTypes.element,
  ]),
  };

Navigator.defaultProps = {
  defaultBarTitle: {
    text: '',
    tintColor: 'black',
  },
  defaultBarLeftButton: {
    text: '',
    tintColor: '#0076FF',
  },
  defaultBarRightButton: {
    text: '',
    tintColor: '#0076FF',
  },
  defaultBarTintColor: 'white',
  defaultLeftButtonTextAuto: true
};


//AppRegistry.registerComponent('', () => );
module.exports = Navigator;