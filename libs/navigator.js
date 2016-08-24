'use strict';
/**
* Copyright (c) 2016 Copyright citongs All Rights Reserved.
* Author: lipengxiang
*/

import React,{ Component, PropTypes }        from 'react';
import {
  Platform
} from 'react-native';

module.exports = ((Platform.OS == 'web') 
                  ? require('./navigator.__web') 
                  : ((Platform.OS == 'android') ? require('./navigator.__android') : require('./navigator.__android') )); 