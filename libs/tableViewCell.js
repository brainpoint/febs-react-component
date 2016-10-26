'use strict';
/**
* Copyright (c) 2016 Copyright citongs All Rights Reserved.
* Author: lipengxiang
*/

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

function getTitleElement(data) {
  const d = ((!!data.props)?data:null);
  
  if (d) {
    return {d};
  }

  const tt = data.text;
  const sty   = data.style;
  const tintColor   = data.tintColor ? {color:data.tintColor} : null;

  return (
    <Text numberOfLines={1} lineBreakMode='tail' 
      style={[styles.tableCellText, tintColor, sty ]}>
      {tt}
    </Text>
  );
}

/**
* @desc view class
*/
export default class TableViewCell extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({left: this.props.left, right: this.props.right});  
  }

  componentWillReceiveProps(nextProps) {
    this.setState({left: nextProps.left, right: nextProps.right});  
  }

  /**
  * @desc:
  */
  set left(c)  { this.setState({left:c}); }
  get left()   { return (this.state.left); }
  set right(c) { this.setState({right:c}); }
  get right()  { return (this.state.right); }

  /**
  * @desc 
  */
  render() {
    if (this.props.onPress)
      return (
        <TouchableHighlight onPress={this.props.onPress}>
          <View style={[styles.tableCell, styles.split]}>
            {getTitleElement(this.state.left)}{this.state.right}
          </View>
        </TouchableHighlight>
      );
    else
      return (
        <View style={[styles.tableCell, styles.split]}>
          {getTitleElement(this.state.left)}{this.state.right}
        </View>
      );
  }
}

const LeftShape = {
  text: PropTypes.string,
  style: PropTypes.object,
  tintColor: PropTypes.string
};

TableViewCell.propTypes = {
  left: PropTypes.oneOfType([
    PropTypes.shape(LeftShape),
    PropTypes.element,
  ]),
  right: PropTypes.element,
  onPress: PropTypes.func,
};


/**
* @desc view style
*/
const styles = StyleSheet.create({

  /**
   * @desc a pixel line split
   */
  split: {
    borderBottomColor: '#f2f0f0',
    borderBottomWidth: 1,
    borderTopColor: '#f2f0f0',
    borderTopWidth: 1,
  },

  tableCell:  {
    backgroundColor:'#ffffff',
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
    height:          45,
    paddingLeft:     13,
    paddingRight:    13,
  },
  tableCellText: {
    fontSize: 15,
    color:  '#3e3e3e',
  },

});