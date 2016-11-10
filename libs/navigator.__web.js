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

import deepEqual from 'deep-equal';
import path from 'path';
import { Router, Route, match, browserHistory } from 'react-router';

import {styles, NAV_BAR_HEIGHT, STATUS_BAR_HEIGHT} from './navigator.style';
import {getIconArrowLeft} from './icons';

var NaviRN = ReactNative.Navigator;

let history = browserHistory;
let historyProxy = {};

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; if (!source) continue; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
var _destIndex = 0;

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
    let pp = obj.props.path == '*' ? obj.props.path : (rootPath?path.join(rootPath, obj.props.path):obj.props.path);
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

let routerProps = {};


class EmptyView extends Component {}


//--------------------------------------------------------
// @desc: navigator; 
//--------------------------------------------------------
class Navigator extends Component {
  //this._willNavHidden;
  constructor(props) {
    // super(routerProps);
    // this._props = routerProps;
    // NavigatorRouter.Instance = this;
    super(props);
    this._props = props;
    this._getNavBarRender = this._getNavBarRender.bind(this);
    this._getCurNavHidden = this._getCurNavHidden.bind(this);
    this._getCurRoute = this._getCurRoute.bind(this);

    this._routes = getRouteInfos(this._props.children);

    // fix history.push error.
    if (window.location.protocol == 'file:') {
      historyProxy = {
        getCurrentLocation: history.getCurrentLocation,
        push: ()=>{},
        listen: ()=>{},
        goBack: ()=>{}
      };
    } else {
      historyProxy = history;
    }

    // get initialRoute
    let ctx = this;
    let location = historyProxy.getCurrentLocation();
    let curPath = location.pathname;
    match({location:curPath, routes:this._routes}, (err, redirectLocation, renderProps)=>{
      if (renderProps)
      {
        ctx._initialRoute = renderProps.routes.length > 0 ? renderProps.routes[renderProps.routes.length-1] : null;
        ctx._initialRoute = _extends({}, ctx._initialRoute, {params:renderProps.params, query:location.query, path:curPath}); 
      }
    });
    // get react-router routes.
    
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
    let ctx = this;

    if (this.__willPushPage) {
      this.resetTo(this.__willPushPage.path, this.__willPushPage);
    }
    
    this._unlisten = historyProxy.listen(function(location) {      
      let curRoute = ctx._getCurRoute();
      if (ctx._isDiffRouteAndLocation(curRoute.path)) {
        let route = ctx._getRouteByPath(location.pathname+location.search);
        if (route) {
          ctx.popToRoute(location.pathname+location.search);
        } else {
          ctx.resetTo(location.pathname+location.search);
        }
      }
    }.bind(this));
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
    this._unlisten();

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
  push(apath, props) {
    let barHide = this._getCurNavHidden();

    // get Route
    let ctx = this;
    match({location:apath, routes:this._routes}, (err, redirectLocation, renderProps)=>{
      if (renderProps)
      {
        if (renderProps.routes.length > 0)
        {
          if (this._isDiffRouteAndLocation(apath)) {
            let rout = renderProps.routes[renderProps.routes.length-1];
            rout = _extends({}, rout, props, {params:renderProps.params, query:renderProps.location.query, path:apath});
                      
            let route = ctx._getRouteByPath(apath);
            if (route) {
              _extends(route, rout);
            } else {
              route = rout;
            }
            
            if (ctx.refs.nav)
              ctx.refs.nav.push(route, ()=>{
                  historyProxy.push(apath);
              });
            else
              ctx.__willPushPage = route;

            if (ctx._getCurNavHidden(route) != barHide) {
              ctx.setState({});
            }
          }
        }
      }
    });
  }

  /**
   * @desc: replace
   */
  replace(apath, props)          { 
    let barHide = this._getCurNavHidden();

    // get Route
    let ctx = this;

    match({location:apath, routes:this._routes}, (err, redirectLocation, renderProps)=>{
      if (renderProps)
      {
        if (renderProps.routes.length > 0)
        {
          if (this._isDiffRouteAndLocation(apath)) {
            let rout = renderProps.routes[renderProps.routes.length-1];
            rout = _extends({}, rout, props, {params:renderProps.params, query:renderProps.location.query, path:apath});
              
            let route = ctx._getRouteByPath(apath);
            if (route) {
              _extends(route, rout);
            } else {
              route = rout;
            }

            if (ctx.refs.nav)
              ctx.refs.nav.replace(route, ()=>{
                  historyProxy.push(apath);
              });
            else
              ctx.__willPushPage = route;

            if (ctx._getCurNavHidden(route) != barHide) {
              ctx.setState({});
            }
          }
        }
      }
    });    
  }
  replacePrevious(apath, props)  {
    let barHide = this._getCurNavHidden();
    
    // get Route
    let ctx = this;
    match({location:apath, routes:this._routes}, (err, redirectLocation, renderProps)=>{
      if (renderProps)
      {
        if (renderProps.routes.length > 0)
        {
          let rout = renderProps.routes[renderProps.routes.length-1];
          rout = _extends({}, rout, props, {params:renderProps.params, query:renderProps.location.query, path:apath});
                              
          let route = ctx._getRouteByPath(apath);
          if (route) {
            _extends(route, rout);
          } else {
            route = rout;
          }

          ctx.refs.nav.replacePrevious(route);
          if (ctx._getCurNavHidden(route) != barHide) {
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
    let routes = this.refs.nav.getCurrentRoutes();
    if (routes.length > 1) {
      this.refs.nav.pop(()=>{
        historyProxy.goBack();
      });
      if (this._getCurNavHidden() != barHide) {
        this.setState({});
      }
    } else {
      let curRoute = this._getCurRoute();
      let ctx = this;
      match({location:curRoute.path, routes:this._routes}, (err, redirectLocation, renderProps)=>{
        if (renderProps)
        {
          if (renderProps.routes.length > 1)
          {
            let rout = renderProps.routes[renderProps.routes.length-2];
            rout = _extends({}, rout, {params:renderProps.params, query:renderProps.location.query}); 

            if (ctx.refs.nav)
              ctx.refs.nav.pushRouteToFront(rout, ()=>{
                ctx.refs.nav.pop(()=>{
                    historyProxy.push(rout.path);
                });
                if (ctx._getCurNavHidden() != barHide) {
                  ctx.setState({});
                }
              });
            else
              ctx.__willPushPage = rout;

          }
        }
      });
    } // if..else
  }

  popToTop()        { 
    let barHide = this._getCurNavHidden();

    if (!this._routeIsExist('/')) {
      let ctx = this;
      match({location:'/', routes:this._routes}, (err, redirectLocation, renderProps)=>{
        if (renderProps)
        {
          let route = renderProps.routes.length > 0 ? renderProps.routes[0] : null;
          route = _extends({}, route, {params:renderProps.params, query:renderProps.location.query, path:'/'});

          if (ctx.refs.nav)
            ctx.refs.nav.pushRouteToFront(route, ()=>{
              ctx.refs.nav.popToTop(()=>{
                  historyProxy.push('/');
              });
              if (ctx._getCurNavHidden() != barHide) {
                ctx.setState({});
              }
            });
          else
            ctx.__willPushPage = route;
        }
      });
    }
    else {
      this.refs.nav.popToTop(()=>{
        historyProxy.push('/');
      });      
      if (this._getCurNavHidden() != barHide) {
        this.setState({});
      }
    }
  }
  popToRoute(apath, props) { 
    let barHide = this._getCurNavHidden();

    let route = this._getRouteByPath(apath);
    if (route) {
      this.refs.nav.popToRoute(route, ()=>{
        historyProxy.push(route.path);
      });
      if (this._getCurNavHidden(route) != barHide) {
        this.setState({});
      }
    }
    else 
    {
      // get Route
      let ctx = this;
      match({location:apath, routes:this._routes}, (err, redirectLocation, renderProps)=>{
        if (renderProps)
        {
          if (renderProps.routes.length > 0)
          {
            let rout = renderProps.routes[renderProps.routes.length-1];
            rout = _extends({}, rout, props, {params:renderProps.params, query:renderProps.location.query, path:apath});
                                
            let route = ctx._getRouteByPath(apath);
            if (route) {
              _extends(route, rout);
            } else {
              route = rout;
            }

            if (ctx.refs.nav)
              ctx.refs.nav.popToRoute(route, ()=>{
                historyProxy.push(apath);
              });
            else
              ctx.__willPushPage = route;

            if (ctx._getCurNavHidden(route) != barHide) {
              ctx.setState({});
            }
          }
        }
      });
    }
  }

  resetTo(apath, props)    { 
    let barHide = this._getCurNavHidden();
            
    // get Route
    let ctx = this;
    match({location:apath, routes:this._routes}, (err, redirectLocation, renderProps)=>{
      if (renderProps)
      {
        if (renderProps.routes.length > 0)
        {
          let rout = renderProps.routes[renderProps.routes.length-1];
          rout = _extends({}, rout, props, {params:renderProps.params, query:renderProps.location.query, path:apath});
                              
          let route = ctx._getRouteByPath(apath);
          if (route) {
            _extends(route, rout);
          } else {
            route = rout;
          }

          if (ctx.refs.nav)
            ctx.refs.nav.resetTo(route);
          else
            ctx.__willPushPage = route;

          historyProxy.push(apath);
          if (ctx._getCurNavHidden(route) != barHide) {
            ctx.setState({});
          }
        }
      }
    });
  }

  _routeIsExist(apath) {
    if (this.refs && this.refs.nav)
    {
      let i = apath.indexOf('#');
      if (i > 0) { apath = apath.substring(0, i); }
      i = apath.indexOf('?');
      if (i > 0) { apath = apath.substring(0, i); }

      let routes = this.refs.nav.getCurrentRoutes();
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].path == apath)
          return true;
      }
    }
    return false;
  }

  _getRouteByPath(apath) {
    if (this.refs && this.refs.nav)
    {
      let i = apath.indexOf('#');
      if (i > 0) { apath = apath.substring(0, i); }
      i = apath.indexOf('?');
      if (i > 0) { apath = apath.substring(0, i); }

      let routes = this.refs.nav.getCurrentRoutes();
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].path == apath)
          return routes[i];
      }
    }
    return null;
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
    return this._initialRoute;
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
              Title:       (route, navigator, index, navState) => { return getTitleElement(this._props.defaultBarTitle, route.barTitle); },
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
                return getButtonElement(this._props.defaultBarLeftButton, route.barLeftButton, {marginLeft:8}, text, this._props.defaultBarLeftButtonTextAuto, hasBack, onPress); 
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

  _isDiffRouteAndLocation(apath) {
    let location = historyProxy.getCurrentLocation();
    let i = apath.indexOf('?');
    let pathname = apath;
    let query;
    if (i > 0) {
      pathname = apath.substring(0, i);
      let querystr = apath.substring(i+1);
      querystr = querystr.split('&');
      query = {};
      querystr.forEach(function(e) {
        let ee = e.split('=');
        query[ee[0]] = ee[1];
      });
    }
    query = query || {};

    i = apath.indexOf('#');
    let hash;
    if (i > 0) {
      pathname = apath.substring(0, i);
      hash = apath.substring(i);
    }
    hash = hash || '';

    if (!deepEqual(query, location.query)
      || (hash!=location.hash)
      || (location.pathname != pathname && !(pathname == '/' && location.pathname == '')))
    {
      return true;
    }

    return false;
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
}; // class Navigator.


// function getReactRouterRoutes(obj, rootPath) {
//   let apath = obj.props.path;
//   let children = null;

//   if (obj.props.children) {
//     if (obj.props.children instanceof Array)
//     {
//       children = [];
//       obj.props.children.forEach(function(element) {
//         children.push(getReactRouterRoutes(element, true));
//       });
//     }
//     else
//     {
//       children = getReactRouterRoutes(obj.props.children, true)
//     }
//   }

//   return (
//     <Route path={apath} component={rootPath ? EmptyView : Navigator}>
//       {children}
//     </Route>
//   );
// }


// class NavigatorRouter extends Component {
//   //this._willNavHidden;
//   constructor(props) {
//     super(props);
//     routerProps = props;

//     // get react-router routes.
//     this._config = getReactRouterRoutes(this.props.children);
//   }

//   render() {
//     return (
//         <Router history={browserHistory}>
//           {this._config}
//         </Router>
//       );
//   }
// }
//NavigatorRouter.SceneConfigs = ReactNative.Navigator.SceneConfigs;

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


exports.Route = Route;
module.exports = Navigator;