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

    if (this.props.disable) {
      return (
        <View style={[style, styles.btnDisable]} >
          {d ? d : <Text style={styles.btnDisableText}>{children}</Text>}
        </View>
      );
    }
    else {
      return (
        <TouchableOpacity  style={[Button.style ? Button.style : styles.btn, style]} onPress={onPress?onPress:null}>
          <View>
            {d ? d : <Text style={[Button.textStyle ? Button.textStyle : styles.btnText, textStyle]}>{children}</Text>}
          </View>
        </TouchableOpacity>
      );
    }
  }
}

/**
 * Props Validation
 * @type {Object}
 */
Button.propTypes = {
  onPress                          : React.PropTypes.func,
  style                            : View.propTypes.style,
  disable                          : React.PropTypes.bool,
};
Button.defaultProps = {
  disable                       : false,
};
Button.style = null;
Button.textStyle = null;

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
    backgroundColor: 'rgb(226, 222, 222)',
    borderColor: 'rgb(202, 202, 202)',
    borderRadius: 7,
    borderWidth: 1,
  },
  btnDisableText: {
    alignSelf: 'center',
    color: 'rgb(175, 172, 172)',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15,
  }
});
