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
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {styles, NAV_BAR_HEIGHT, STATUS_BAR_HEIGHT} from './navigator.style';
import {getIconArrowLeft} from './icons';
var NaviRN = ReactNative.Navigator;

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
  onPress: () => ({}),
};


/**
* @desc: status bar
*/
function customizeStatusBar(data) {
  if (Platform.OS === 'ios') {
    if (data.style) {
      StatusBar.setBarStyle(data.style);
    }
    const animation = data.hidden ?
    (data.hideAnimation || Navigator.defaultProps.statusBar.hideAnimation) :
    (data.showAnimation || Navigator.defaultProps.statusBar.showAnimation);

    StatusBar.showHideTransition = animation;
    StatusBar.hidden = data.hidden;
  }
}

function getButtonElement(data, btn, style, textAuto, defaultBarLeftButtonTextAuto, hasBack) {
  const sty   = (btn?btn.style:null) || (data?data.style:null);
  const tintColor   = ((btn?btn.tintColor:null) || (data?data.tintColor:null));
  const onPress     = (btn?btn.onPress:null) || (data?data.onPress:null);

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



/**
* @desc: navigator 
*/
class Navigator extends Component {
  //this._willNavHidden;
  constructor(props) {
    super(props);
    Navigator.Instance = this;
    this._getNavBarRender = this._getNavBarRender.bind(this);
    this._getCurNavHidden = this._getCurNavHidden.bind(this);
  }

  componentDidMount() {
    // this.push(this.props.initialRoute);
    // this.setState({navigationBarHidden:this.props.navigationBarHidden});
  }

  componentWillMount() {
    this.setState({navigationBarHidden:this.props.navigationBarHidden});
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
    return (this.state&&this.state.barTintColor)||this.props.defaultBarTintColor||'#ffffff';
  }
  
  /**
  * @desc: push 
  */
  push(route) {
    let barHide = this._getCurNavHidden();
    this.refs.nav.push(route);
    if (this._getCurNavHidden(route) != barHide) {
      this.setState({});
    }
  }

  /**
   * @desc: replace
   */
  replace(route)          { 
    let barHide = this._getCurNavHidden();
    this.refs.nav.replace(route);
    if (this._getCurNavHidden(route) != barHide) {
      this.setState({});
    }
  }
  replacePrevious(route)  { this.refs.nav.replacePrevious(route); }

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
  popToRoute(route) { 
    let barHide = this._getCurNavHidden();
    this.refs.nav.popToRoute(route);
    if (this._getCurNavHidden() != barHide) {
      this.setState({});
    }
  }

  resetTo(route)    { 
    let barHide = this._getCurNavHidden();
    this.refs.nav.resetTo(route);
    if (this._getCurNavHidden() != barHide) {
      this.setState({});
    }
  }
  
  _getCurNavHidden(curRoute=null) {
    var has = this.state.navigationBarHidden;
    
    if (this.refs.nav)
    {
      let route = curRoute;
      if (!route) {
        let routes = this.refs.nav.getCurrentRoutes();
        route = routes[routes.length-1];
      }
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
                if (this.props.defaultBarLeftButtonTextAuto)
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

                return getButtonElement(this.props.defaultBarLeftButton, route.barLeftButton, {marginLeft:8}, text, this.props.defaultBarLeftButtonTextAuto, hasBack); 
              },
              RightButton: (route, navigator, index, navState) => { return getButtonElement(this.props.defaultBarRightButton, route.barRightButton, {marginRight:8}); },
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
        configureScene = {(route, routeStack) => { return (route.configureScene?route.configureScene:this.props.configureScene); } }
        navigationBar = {this._getNavBarRender()}
        renderScene = {(route, navigator) => {
          return <route.component {...route.passProps}/> 
        }}
        sceneStyle = {contentOffset}
        initialRoute = {this.props.initialRoute}
        onWillFocus = {(route)=> {
          this._willNavHidden = this._getCurNavHidden(route);
          if (this._willNavHidden != this._getCurNavHidden()) {this.setState({});}
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

const StatusBarShape = {
  style: PropTypes.oneOf(['light-content', 'default', ]),
  hidden: PropTypes.bool,
  tintColor: PropTypes.string,
  hideAnimation: PropTypes.oneOf(['fade', 'slide', 'none', ]),
  showAnimation: PropTypes.oneOf(['fade', 'slide', 'none', ])
};

Navigator.SceneConfigs = ReactNative.Navigator.SceneConfigs;
Navigator.propTypes = {
  statusBar: PropTypes.shape(StatusBarShape),
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
  statusBar: {
    style: 'default',
    hidden: (Platform.OS == 'web' ? true : false),
    hideAnimation: 'slide',
    showAnimation: 'slide',
  },
  navigationBarHidden: false,
  defaultBarTitle: {
    text: '',
  },
  defaultBarLeftButtonTextAuto: true,
  configureScene: Navigator.SceneConfigs.FloatFromBottom
};

//AppRegistry.registerComponent('', () => );
module.exports = Navigator;