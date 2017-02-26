'use strict';
/**
* Copyright (c) 2016 Copyright citongs All Rights Reserved.
* Author: lipengxiang
*/

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

/**
* @desc view class
*/
export default class Button extends Component {

  static propTypes = {
    onPress                          : React.PropTypes.func,
    style                            : View.propTypes.style,
    disabled                         : React.PropTypes.bool,
  };

  static defaultProps = {
    disabled                       : false,
  };
  static style = null;
  static textStyle = null;
  static disabledStyle = null;
  static disabledTextStyle = null;

  constructor(props) {
    super(props);
  }

  get text() {
    return (this.state ? this.state.text : null) || this.props.children;
  }

  set text(t) {
    this.setState({text:t});
  }

  /**
  * @desc 
  */
  render() {
    const {style, textStyle, onPress} = this.props;
    const children = this.text;
    const d = children ? ((!!children.props)?children:null) : null;

    if (this.props.disabled) {
      return (
        <View style={[styles.btnDisable, style, styles.btnDisableBg, Button.disabledStyle]} >
          {d ? d : <Text style={[styles.btnDisableText, textStyle, styles.btnDisableTextColor, Button.disabledTextStyle]}>{children}</Text>}
        </View>
      );
    }
    else {
      return (
        <TouchableOpacity  style={[styles.btn, Button.style, style]} onPress={onPress?onPress:null}>
          <View>
            {d ? d : <Text style={[styles.btnText, Button.textStyle, textStyle]}>{children}</Text>}
          </View>
        </TouchableOpacity>
      );
    }
  }
}


/**
* @desc view style
*/
const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    backgroundColor: '#1aac19',
    borderRadius: 7,
    borderColor: '#2d8f37',
    borderWidth: 1,
  },
  btnText: {
    alignSelf: 'center',
    color: '#ffffff',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15,
  },
  btnDisable: {
    justifyContent: 'center',
    borderRadius: 7,
    borderWidth: 1,
  },
  btnDisableBg: {
    backgroundColor: 'rgb(226, 222, 222)',
    borderColor: 'rgb(202, 202, 202)',
  },
  btnDisableText: {
    alignSelf: 'center',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15,
  },
  btnDisableTextColor: {
    color: 'rgb(175, 172, 172)',
  }
});
