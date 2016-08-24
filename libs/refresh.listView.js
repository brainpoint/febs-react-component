'use strict';

import React, { Component } from 'react';
import { ListView, Platform } from 'react-native';

import Refreshable from './refreshable';

class RefreshListView extends Refreshable {
    getScrollable() {
        return (
            <ListView 
                ref={(c) => {this.scroll = c;}} 
                scrollEnabled={this.state.scrollEnabled} 
                onScroll={this.onScroll} 
                scrollEventThrottle={200}
                {...this.props} />
        );
    }
}

RefreshListView.DataSource = ListView.DataSource;

module.exports = ((Platform.OS=='web')?ListView:RefreshListView);