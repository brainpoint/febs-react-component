'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    RefreshControl,
    PanResponder,
    Animated,
    Easing,
    Dimensions,
    StyleSheet,
    ActivityIndicator,
    Platform,
    UIManager
} from 'react-native';

// const padding = 2; //scrollview与外面容器的距离
const pullOkMargin = 100; //下拉到ok状态时topindicator距离顶部的距离
const defaultTopIndicatorHeight = 40; //顶部刷新指示器的高度
const isDownGesture = (x, y) => {
    return y > 0 && (y > Math.abs(x));
};
const isUpGesture = (x, y) => {
    return y < 0 && (Math.abs(x) < Math.abs(y));
};
const isVerticalGesture = (x, y) => {
    return (Math.abs(x) < Math.abs(y));
};

export default class extends Component {
    constructor(props) {
        super(props);
        this.defaultScrollEnabled = !(this.props.onPulling || this.props.onPullOk || this.props.onPullRelease); //定义onPull***属性时scrollEnabled为false
        var topIndicatorHeight = this.props.topIndicatorHeight ? this.props.topIndicatorHeight : defaultTopIndicatorHeight;
        this.defaultXY = {x: 0, y: topIndicatorHeight * -1};
        this.pullOkMargin = this.props.pullOkMargin ? this.props.pullOkMargin : pullOkMargin;
        this.state = Object.assign({}, props, {
            pullPan: new Animated.ValueXY(this.defaultXY),
            scrollEnabled: this.defaultScrollEnabled,
            height: 0,
            topIndicatorHeight: topIndicatorHeight,
            gesturePosition: {x: 0, y: 0}
        });
        this.onScroll = this.onScroll.bind(this);
        this.onLayout = this.onLayout.bind(this);
        this.isPullState = this.isPullState.bind(this);
        this.resetDefaultXYHandler = this.resetDefaultXYHandler.bind(this);
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this.onShouldSetPanResponder.bind(this),
            onMoveShouldSetPanResponder: this.onShouldSetPanResponder.bind(this),
            onPanResponderGrant: () => {},
            onPanResponderMove: this.onPanResponderMove.bind(this),
            onPanResponderRelease: this.onPanResponderRelease.bind(this),
            onPanResponderTerminate: this.onPanResponderRelease.bind(this),
        });
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    onShouldSetPanResponder(e, gesture) {
        if (!isVerticalGesture(gesture.dx, gesture.dy)) { //非向上 或向下手势不响应
            return false;
        }
        if (this.props.onPulling || this.props.onPullOk || this.props.onPullRelease) {
            return !this.state.scrollEnabled;
        }
        return false;
    }

    onPanResponderMove(e, gesture) {
        this.state.gesturePosition = {x: this.defaultXY.x, y: gesture.dy};
        if (isUpGesture(gesture.dx, gesture.dy)) { //向上滑动
            if(this.isPullState()) {
                this.resetDefaultXYHandler()
            } else if(this.props.onPushing && this.props.onPushing(this.state.gesturePosition)) {
                // do nothing, handling by this.props.onPushing
            } else {                
                this.scroll.scrollTo({y: gesture.dy * -1, animated:false});
                // this.state.pullPan.setOffset({x: 0, y: gesture.dy});
            }
            return;
        } else if (isDownGesture(gesture.dx, gesture.dy)) { //下拉
            this.state.pullPan.setValue({x: this.defaultXY.x, y: this.defaultXY.y + gesture.dy / 3});
            if (gesture.dy < this.state.topIndicatorHeight + this.pullOkMargin) { //正在下拉
                if (!this.state.pulling) {
                    this.props.onPulling && this.props.onPulling(this.resetDefaultXYHandler);
                }
                this.setState({pulling: true, pullok: false, pullrelease: false});
            } else { //下拉到位
                if (!this.state.pullok) {
                    this.props.onPullOk && this.props.onPullOk(this.resetDefaultXYHandler);
                }
                this.setState({pulling: false, pullok: true, pullrelease: false});
            }
        }
    }

    onPanResponderRelease(e, gesture) {
        if (this.state.pulling) { //没有下拉到位
            this.resetDefaultXYHandler(); //重置状态
        }
        if (this.state.pullok) {
            if (!this.state.pullrelease) {
                this.props.onPullRelease && this.props.onPullRelease(this.resetDefaultXYHandler);
            }
            this.setState({pulling: false, pullok: false, pullrelease: true}); //完成下拉，已松开
            Animated.timing(this.state.pullPan, {
                toValue: {x: 0, y: 0},
                easing: Easing.linear,
                duration: 300
            }).start();
        }
    }

    onScroll(e) {
        if (e.nativeEvent.contentOffset.y <= 0) {
            if (this.state.scrollEnabled != this.defaultScrollEnabled)
                this.setState({scrollEnabled: this.defaultScrollEnabled});
        } else if(!this.isPullState()) {
            this.setState({scrollEnabled: true});
        }
    }

    scrollToBottom() {
        // scroll to bottom.
        var innerScrollView = this.scroll.getScrollResponder().getInnerViewNode();
        var scrollView = this.scroll.getScrollResponder().getScrollableNode();

        UIManager.measure(innerScrollView,
            (...arg) => {// x y width height pageX pageY
                let contentHeight = arg[3];
                let innerScrollViewY = arg[1];
                UIManager.measure(scrollView,
                    (...arg2) => { // scrollViewX, scrollViewY, scrollViewWidth, scrollViewHeight
                        let scrollHeight = arg2[3];
                        if (contentHeight >= scrollHeight) { // 小于等于0说明没有滚动条不用滚动
                            let scrollY = contentHeight - scrollHeight + innerScrollViewY;// 内容高-容器高
                            this.scroll.scrollTo({y: scrollY});
                        }
                    });
            }
        );
    }

    scrollToTop() {
        // scroll to top.
        var innerScrollView = this.scroll.getScrollResponder().getInnerViewNode();
        var scrollView = this.scroll.getScrollResponder().getScrollableNode();

        UIManager.measure(innerScrollView,
            (...arg) => {// x y width height pageX pageY
                let contentHeight = arg[3];
                let innerScrollViewY = arg[1];
                UIManager.measure(scrollView,
                    (...arg2) => { // scrollViewX, scrollViewY, scrollViewWidth, scrollViewHeight
                        let scrollHeight = arg2[3];
                        if (contentHeight >= scrollHeight) { // 小于等于0说明没有滚动条不用滚动
                            //let scrollY = contentHeight - scrollHeight + innerScrollViewY;// 内容高-容器高
                            this.scroll.scrollTo({y: -innerScrollViewY});
                        }
                    });
            }
        );
    }

    isPullState() {
        return this.state.pulling || this.state.pullok || this.state.pullrelease;
    }

    resetDefaultXYHandler() {
        this.setState({pulling: false, pullok: false, pullrelease: false});
        this.state.pullPan.setValue(this.defaultXY);

        this.scrollToTop();
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.isPullEnd && this.state.pullrelease) {
            this.resetDefaultXYHandler();
        }
    }

    onLayout(e) {
        this.setState({width: e.nativeEvent.layout.width});
        this.setState({height: e.nativeEvent.layout.height});
    }

    render() {
        let refreshControl = this.props.refreshControl;
        if (this.props.refreshControl == null && this.props.refreshing != null && this.props.onRefresh != null) {
            refreshControl = <RefreshControl refreshing={this.props.refreshing} onRefresh={this.props.onRefresh} />;
        }
        let topIndicator;
        if (this.props.topIndicatorRender == null) {
            topIndicator = (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: defaultTopIndicatorHeight}}>
                    <ActivityIndicator size="small" color="gray" style={{marginRight:5}} />
                    {this.state.pulling ? <Text>下拉刷新...</Text> : null}
                    {this.state.pullok ? <Text>松开刷新...</Text> : null}
                    {this.state.pullrelease ? <Text>刷新中...</Text> : null}
                </View>
            );
        } else {
            let {pulling, pullok, pullrelease} = this.state;
            topIndicator = this.props.topIndicatorRender(pulling, pullok, pullrelease, this.state.gesturePosition);
        }

        return (
            <View style={[styles.wrap, this.props.style]} onLayout={this.onLayout}>
                <Animated.View ref={(c) => {this.ani = c;}} style={[this.state.pullPan.getLayout()]}>
                    {topIndicator}
                    <View {...this.panResponder.panHandlers} style={{width: this.state.width, height: this.state.height}}>
                        {this.getScrollable(refreshControl)}
                    </View>
                </Animated.View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    wrap: {
        flex: 1,
        flexDirection: 'column',
        zIndex:-999,
    }
});
