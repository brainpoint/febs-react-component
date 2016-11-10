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
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';

import path from 'path';
import { match } from 'react-router';

import {styles, NAV_BAR_HEIGHT, STATUS_BAR_HEIGHT} from './navigator.style';
import {getIconArrowLeft} from './icons';
var NaviRN = ReactNative.Navigator;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


/**
* @desc: NavbarButton
*/
class NavbarButton extends Component {
  render() {
    const { style, tintColor, text, autoBack } = this.props;

    let backRender;
    if (autoBack)
    {
      backRender = (getIconArrowLeft({tintColor:tintColor, marginRight: 5}));
    }

    return (
      <View style={[styles.debug, styles.navBarButton, style]}>
        {backRender}<Text numberOfLines={1} lineBreakMode='tail' style={[styles.navBarButtonText, { color: tintColor }, ]}>{text}</Text>
      </View>
    );
  }
}

NavbarButton.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  tintColor:  PropTypes.string,
  text:       PropTypes.string,
  onPress:    PropTypes.func,
  autoBack:   PropTypes.bool
};

NavbarButton.defaultProps = {
  style: {},
  text: '',
  tintColor: '#0076FF',
};


function getButtonElement(data, btn, style, textAuto, defaultBarLeftButtonTextAuto, hasBack, onPress) {
  const sty   = (btn?btn.style:null) || (data?data.style:null);
  const tintColor   = (((btn?btn.tintColor:null) || (data?data.tintColor:null))) || NavbarButton.defaultProps.tintColor;

  let autoBack = false;
  let text = (btn?btn.text:null);
  if (defaultBarLeftButtonTextAuto && text==null)
  {
    text = textAuto;
    autoBack = (hasBack) ? true : false;
  }
  else
  {
    text = text||(data?data.text:null);
  }  

  const d = btn ? ((!!btn.props)?btn:null) : (data?((!!data.props)?data:null):null);  
  return (
    <TouchableOpacity onPress={onPress}>
    <View style={[styles.debug, styles.navBarButtonContainer]}>
      {(d) ? (d) : (
        <NavbarButton
          autoBack={autoBack}
          text={text}
          style={[styles.debug, sty, style, ]}
          tintColor={tintColor}
        />
      )}
    </View>
    </TouchableOpacity>
  );
}

function getTitleElement(data, barTitle) {
  const d = barTitle ? ((!!barTitle.props)?barTitle:null) : ((!!data.props)?data:null);
  
  if (d) {
    return <View style={[styles.debug, styles.customTitle]}>{d}</View>;
  }

  const tt = (barTitle?barTitle.text:null) || data.text;
  const sty   = (barTitle?barTitle.style:null) || data.style;
  const tintColor   = ((barTitle?barTitle.tintColor:null) || data.tintColor);
  const tintColors  = tintColor ? {color:tintColor} : null;

  return (
    <View style={[styles.debug, styles.navBarTitleContainer]}>
      <Text numberOfLines={1} lineBreakMode='tail' 
        style={[styles.debug, styles.navBarTitleText, tintColors, sty ]}>
        {tt}
      </Text>
    </View>
  );
}


//--------------------------------------------------------
// @desc: Router  
//--------------------------------------------------------
function getRouteInfos(obj, rootPath) {
    let pp = rootPath?path.join(rootPath, obj.props.path):obj.props.path;
    let o = { 
      path:pp, 
      component:obj.props.component,
      barTitle: obj.props.barTitle,
      barLeftButton: obj.props.barLeftButton,
      barRightButton: obj.props.barRightButton,
      barTintColor: obj.props.barTintColor,
      barHidden: obj.props.barHidden,
      translucent: obj.props.translucent,
      configureScene: obj.props.configureScene,
      childRoutes:[] };
 
    if (obj.props.children) {
      if (obj.props.children instanceof Array)
        obj.props.children.forEach(function(element) {
          o.childRoutes.push(getRouteInfos(element, pp));      
        });
      else
        o.childRoutes.push(getRouteInfos(obj.props.children, pp));
    }

    return o;
}

export class Route extends Component {
}

//--------------------------------------------------------
// @desc: navigator 
//--------------------------------------------------------
class Navigator extends Component {
  //this._willNavHidden;
  constructor(props) {
    super(props);
    this._props = props;
    this._getNavBarRender = this._getNavBarRender.bind(this);
    this._getCurNavHidden = this._getCurNavHidden.bind(this);
    this._getCurRoute = this._getCurRoute.bind(this);

    this._routes = getRouteInfos(this._props.children);

    // get initialRoute
    let ctx = this;
    match({location:'/', routes:this._routes}, (err, redirectLocation, renderProps)=>{
      if (renderProps)
      {
        ctx._initialRoute = renderProps.routes.length > 0 ? renderProps.routes[renderProps.routes.length-1] : null;
        ctx._initialRoute = _extends({}, ctx._initialRoute, {params:renderProps.params}); 
      }
    });

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
    
    this.setState({navigationBarHidden:this._props.navigationBarHidden});
    if (Platform.OS == 'android') {
      this._androidListenter = ReactNative.BackAndroid.addEventListener('hardwareBackPress', () => {
        if (this.refs.nav && this.refs.nav.getCurrentRoutes().length > 1) {
          this.pop();
          return true;
        }
        if (!this.refs.nav)
          return true;

        return false;
      });
    }
  }

  componentWillUnmount() {
    if (Platform.OS == 'android') {
      this._androidListenter.remove();
    }
  }

  /**
  * @desc: 
  * @return: 
  */
  get navigationBarHeight() {
    return NAV_BAR_HEIGHT;
  }

  set navigationBarHeight(h) {
    console.log('can\'t set navigation bar height');
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
  * @desc:
  */
  set barTintColor(c) {
    this.setState({barTintColor:c});
  }
  get barTintColor() {
    return (this.state&&this.state.barTintColor)||(this._props&&this._props.defaultBarTintColor)||'#ffffff';
  }

  /**
  * @desc: 
  * @return: 
  */
  set onDidFocus(c) {
    var cr = this._getCurRoute();
    if (cr) {
      cr.onDidFocus = c;
      this.setState({});
    }
  }
  get onDidFocus() {
    var cr = this._getCurRoute();
    if (cr) {
      return cr.onDidFocus;
    }
    return null;
  }

  /**
  * @desc: 
  * @return: 
  */
  set onLeftButtonPress(c) {
    var cr = this._getCurRoute();
    if (cr) {
      cr.onLeftButtonPress = c;
      this.setState({});
    }
  }
  get onLeftButtonPress() {
    var cr = this._getCurRoute();
    if (cr) {
      return cr.onLeftButtonPress;
    }
    return null;
  }


  /**
  * @desc: 
  * @return: 
  */
  set onRightButtonPress(c) {
    var cr = this._getCurRoute();
    if (cr) {
      cr.onRightButtonPress = c;
      this.setState({});
    }
  }
  get onRightButtonPress() {
    var cr = this._getCurRoute();
    if (cr) {
      return cr.onRightButtonPress;
    }
    return null;
  }
  
  /**
  * @desc: push 
  */
  push(path, props) {
    let barHide = this._getCurNavHidden();

    // get Route
    let ctx = this;
    match({location:path, routes:this._routes}, (err, redirectLocation, renderProps)=>{
      if (renderProps)
      {
        if (renderProps.routes.length > 0)
        {
          let rout = renderProps.routes[renderProps.routes.length-1];
          if (props) {
            rout = _extends({}, rout, props, {params:renderProps.params});
          }
          ctx.refs.nav.push(rout);
          if (ctx._getCurNavHidden(rout) != barHide) {
            ctx.setState({});
          }
        }
      }
    });    
  }

  /**
   * @desc: replace
   */
  replace(path, props)          { 
    let barHide = this._getCurNavHidden();

    // get Route
    let ctx = this;
    match({location:path, routes:this._routes}, (err, redirectLocation, renderProps)=>{
      if (renderProps)
      {
        if (renderProps.routes.length > 0)
        {
          let rout = renderProps.routes[renderProps.routes.length-1];
          if (props) {
            rout = _extends({}, rout, props, {params:renderProps.params});
          }
          ctx.refs.nav.replace(rout);
          if (ctx._getCurNavHidden(rout) != barHide) {
            ctx.setState({});
          }
        }
      }
    });    
  }
  replacePrevious(path, props)  {
    let barHide = this._getCurNavHidden();
    
    // get Route
    let ctx = this;
    match({location:path, routes:this._routes}, (err, redirectLocation, renderProps)=>{
      if (renderProps)
      {
        if (renderProps.routes.length > 0)
        {
          let rout = renderProps.routes[renderProps.routes.length-1];
          if (props) {
            rout = _extends({}, rout, props, {params:renderProps.params});
          }
          ctx.refs.nav.replacePrevious(rout);
          if (ctx._getCurNavHidden(rout) != barHide) {
            ctx.setState({});
          }
        }
      }
    });
  }

  /**
  * @desc: back 
  */
  pop()             {
    let barHide = this._getCurNavHidden();
    this.refs.nav.pop();
    if (this._getCurNavHidden() != barHide) {
      this.setState({});
    }
  }
  popToTop()        { 
    let barHide = this._getCurNavHidden();
    this.refs.nav.popToTop();
    if (this._getCurNavHidden() != barHide) {
      this.setState({});
    }
  }
  popToRoute(path, props) { 
    let barHide = this._getCurNavHidden();
        
    // get Route
    let ctx = this;
    match({location:path, routes:this._routes}, (err, redirectLocation, renderProps)=>{
      if (renderProps)
      {
        if (renderProps.routes.length > 0)
        {
          let rout = renderProps.routes[renderProps.routes.length-1];
          if (props) {
            rout = _extends({}, rout, props, {params:renderProps.params});
          }
          ctx.refs.nav.popToRoute(rout);
          if (ctx._getCurNavHidden(rout) != barHide) {
            ctx.setState({});
          }
        }
      }
    });
  }

  resetTo(path, props)    { 
    let barHide = this._getCurNavHidden();
            
    // get Route
    let ctx = this;
    match({location:path, routes:this._routes}, (err, redirectLocation, renderProps)=>{
      if (renderProps)
      {
        if (renderProps.routes.length > 0)
        {
          let rout = renderProps.routes[renderProps.routes.length-1];
          if (props) {
            rout = _extends({}, rout, props, {params:renderProps.params});
          }
          ctx.refs.nav.resetTo(rout);
          if (ctx._getCurNavHidden(rout) != barHide) {
            ctx.setState({});
          }
        }
      }
    });
  }

  _getCurRoute(curRoute) {
    if (this.refs && this.refs.nav)
    {
      let route = curRoute;
      if (!route) {
        let routes = this.refs.nav.getCurrentRoutes();
        route = routes[routes.length-1];
        return route;
      }
      return route;
    }
    return null;
  }
  
  _getCurNavHidden(curRoute=null) {
    var has = this.state.navigationBarHidden;
    
    if (this.refs.nav)
    {
      let route = this._getCurRoute(curRoute);
      if (route && (route.barHidden===true||route.barHidden===false))
      {
        has = route.barHidden;
      }
    }
    return has;
  }

  _getNavBarRender() {
    let has;
    if (this._willNavHidden === true || this._willNavHidden === false)
      has = this._willNavHidden;
    else
      has = this._getCurNavHidden();
    
    const bar = (has === true) ? null : (
          <NaviRN.NavigationBar
            routeMapper={{
              Title:       (route, navigator, index, navState) => { return getTitleElement(this.props.defaultBarTitle, route.barTitle); },
              LeftButton:  (route, navigator, index, navState) => {
                let text;
                let hasBack = false;  
                if (this._props.defaultBarLeftButtonTextAuto)
                {
                  let routes = navigator.getCurrentRoutes();
                  let ii = routes.indexOf(route);
                  if (ii > 0)
                  {
                    text = routes[ii-1].barTitle;
                    if (text)   text = text.text;
                    hasBack = true;
                  }
                }

                const btn = route.barLeftButton; 
                let onPress     = route.onLeftButtonPress ||
                                  (
                                    btn
                                    ?(
                                      btn.onPress ||
                                       (
                                          this._props.defaultBarLeftButton&&this._props.defaultBarLeftButton.onPress 
                                            ? this._props.defaultBarLeftButton.onPress 
                                            : ((navi)=>this.pop())
                                       )
                                     )
                                    :((navi)=>this.pop())
                                  );                
                return getButtonElement(this._props.defaultBarLeftButton, route.barLeftButton, {marginLeft:8}, text, this.props.defaultBarLeftButtonTextAuto, hasBack, onPress); 
              },
              RightButton: (route, navigator, index, navState) => {
                const btn = route.barRightButton;
                let onPress     = route.onRightButtonPress ||
                                   (btn?btn.onPress:
                                      (
                                        this._props.defaultBarRightButton&&this._props.defaultBarRightButton.onPress 
                                        ? this._props.defaultBarRightButton.onPress 
                                        : null
                                      )
                                     );   
                return getButtonElement(this._props.defaultBarRightButton, route.barRightButton, {marginRight:8}, null, null, null, onPress); 
              },
            }}
            style={[styles.debug, styles.navBar, {backgroundColor: this.barTintColor}, {zIndex:1}, styles.split]}
          />
        );
    
    return bar;
  }

  render() {
    const contentOffset = ((this._willNavHidden===true||this._willNavHidden===false) ? this._willNavHidden : this._getCurNavHidden()) 
                          ? null : {marginTop: ((Platform.OS == 'ios') ? NAV_BAR_HEIGHT+STATUS_BAR_HEIGHT : NAV_BAR_HEIGHT) };
    
    return (
      <NaviRN
        ref = 'nav'
        configureScene = {(route, routeStack) => { return (route.configureScene?route.configureScene:this._props.configureScene); } }
        navigationBar = {this._getNavBarRender()}
        renderScene = {(route, navigator) => {
          if (!route.component)
            return <View/>;
          return <route.component ref={comp=>this._comp=comp} {...route.passProps}/> 
        }}
        sceneStyle = {contentOffset}
        initialRoute = {this._initialRoute}
        onWillFocus = {(route)=> {
          this._willNavHidden = this._getCurNavHidden(route);
          if (this._willNavHidden != this._getCurNavHidden()) {this.setState({});}
        }}
        onDidFocus = {(route)=> {
          route.onDidFocus && route.onDidFocus(route);
        }}
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
  defaultBarTintColor: PropTypes.string,
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
  navigationBarHidden: false,
  defaultBarTitle: {
    text: '',
  },
  defaultBarLeftButtonTextAuto: true,
  configureScene: Navigator.SceneConfigs.FloatFromRight
};

//AppRegistry.registerComponent('', () => );
module.exports = Navigator;