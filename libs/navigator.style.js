'use strict';
/**
* Copyright (c) 2016 Copyright citongs All Rights Reserved.
* Author: lipengxiang
*/

import React, { Component, PropTypes } from 'react';
import ReactNative, {
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';

//const moduleNameDimensions = ((Platform.OS == 'web') ? 'ReactDimensions' : 'Dimensions');
// import Dimensions from 'Dimensions';

var ScreenSize = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

/**
* @desc view style
*/
var NAV_BAR_HEIGHT = 44;
var STATUS_BAR_HEIGHT = 20;

var styles = StyleSheet.create({
  /**
   * @desc debug border.
   */
  debug: {
    // borderWidth: 1,
    // borderColor: 'red',
  },

  split: {
    borderBottomColor: '#e2e0e0',
    borderBottomWidth: 1,
  },

  statusBar: {
    height: STATUS_BAR_HEIGHT,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: ((Platform.OS == 'android') ? NAV_BAR_HEIGHT : NAV_BAR_HEIGHT+STATUS_BAR_HEIGHT),
    paddingTop: ((Platform.OS == 'ios') ? STATUS_BAR_HEIGHT : 0), 
    marginTop: ((Platform.OS == 'web') ? -STATUS_BAR_HEIGHT : 0), 
  },
  customTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 7,
    alignItems: 'center',
    width: ScreenSize.width-150,
  },
  navBarButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: ((Platform.OS == 'ios') ? 'center' : 'flex-start'),
    paddingTop: ((Platform.OS == 'ios') ? 0 : 12),
    height: NAV_BAR_HEIGHT,
  },
  navBarButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  navBarButtonText: {
    fontSize: 16,
    letterSpacing: 0.5,
    maxWidth: 100
  },
  navBarButtonBackText: {
    fontSize: 16,
    fontWeight: '700',
  },
  navBarTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: ((Platform.OS == 'android') ? 8 : 0),
    width: ScreenSize.width-150,
  },
  navBarTitleText: {
    justifyContent: 'center',
    fontSize: 17,
    letterSpacing: 0.5,
    color: '#333',
    fontWeight: '500',
    maxWidth: ScreenSize.width-150,
  },
});


exports.styles          = styles;
exports.NAV_BAR_HEIGHT  = NAV_BAR_HEIGHT;
exports.STATUS_BAR_HEIGHT  = STATUS_BAR_HEIGHT;
