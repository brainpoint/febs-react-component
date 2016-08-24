'use strict';

import React, { Component } from 'react';
import {
    ScrollView, Platform
} from 'react-native';

import Refreshable from './refreshable';

class RefreshScrollView extends Refreshable {

    constructor(props) {
        super(props);
    }

    getScrollable(refreshControl) {
        return (
            <ScrollView 
                ref={(c) => {this.scroll = c;}}
                refreshControl={refreshControl} 
                scrollEnabled={this.state.scrollEnabled} 
                onScroll={this.onScroll}
                scrollEventThrottle={200}>
                {this.props.children}
            </ScrollView>
        );
    }
}

module.exports = ((Platform.OS=='web')?ScrollView:RefreshScrollView);