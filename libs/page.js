'use strict';
/**
* Copyright (c) 2016 Copyright citongs All Rights Reserved.
* Author: lipengxiang
*/

import React,{ Component, PropTypes }        from 'react';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  ViewPagerAndroid,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import TimerMgr  from './timerMgr';

var {
  width, 
  height
} = Dimensions.get('window');

/**
* @desc view class
*/
export default class Page extends Component {
  /**
   * autoplay timer
   * @type {null}
   */
  //this.autoplayTimer = null;

  constructor(props) {
    super(props);
    this.timerMgr = new TimerMgr();
    this.state = this.initState(props);
    this.onScrollBegin    = this.onScrollBegin.bind(this);
    this.onScrollEnd      = this.onScrollEnd.bind(this);
    this.onScrollEndDrag  = this.onScrollEndDrag.bind(this);
    this.updateIndex      = this.updateIndex.bind(this);
    this.scrollBy         = this.scrollBy.bind(this);
    this.scrollViewPropOverrides         = this.scrollViewPropOverrides.bind(this);
  }

  componentDidMount() {
    this.autoplay()
  }

  componentWillUnmount() {
    this.timerMgr.dispose();
  }

  componentWillReceiveProps(props) {
    this.setState(this.initState(props))
  };

  initState(props) {
    // set the current state
    const state = this.state || {}

    let initState = {
      isScrolling: false,
      autoplayEnd: false,
      loopJump: false,
    }

    initState.total = props.children ? props.children.length || 1 : 0

    if (state.total === initState.total) {
      // retain the index
      initState.index = state.index
    } else {
      // reset the index
      initState.index = initState.total > 1 ? Math.min(props.index, initState.total - 1) : 0
    }

    // Default: horizontal
    initState.dir = props.horizontal === false ? 'y' : 'x'
    initState.width = (props.style && props.style.width) || width;
    initState.height = (props.style && props.style.height) || height;
    initState.offset = {}

    if (initState.total > 1) {
      var setup = initState.index
      if ( this.isLoop ) {
        setup++
      }
      initState.offset[initState.dir] = initState.dir === 'y'
        ? initState.height * setup
        : initState.width * setup
    }
    return initState
  };

  get isLoop() {
    return this.props.loop;// && Platform.OS != 'web';
  }

  /**
  * @desc: 
  * @return: 
  */
  loopJump() {
    if(this.state.loopJump){
      if (this._prePageIndex == this.state.index)
        return;
        
      var i = this.state.index + (this.isLoop ? 1 : 0);

      if (this.refs.scrollView.setPageWithoutAnimation)
        this.refs.scrollView.setPageWithoutAnimation(i);
      else if (this.refs.scrollView.setPage)
        this.refs.scrollView.setPage(i);
    }
  };

  /**
   * Automatic rolling
   */
  autoplay() {
    if(
      !Array.isArray(this.props.children)
      || !this.props.autoplay
      || this.state.isScrolling
      || this.state.autoplayEnd
    ) {
      return
    }

    this.timerMgr.clearTimeout(this.autoplayTimer)

    this.autoplayTimer = this.timerMgr.setTimeout(() => {
      if(
        !this.isLoop && (
          this.props.autoplayDirection
            ? this.state.index === this.state.total - 1
            : this.state.index === 0
        )
      ) {
        return this.setState({ autoplayEnd: true })
      }

      this.scrollBy(this.props.autoplayDirection ? 1 : -1)
    }, this.props.autoplayTimeout)
  };

  /**
   * Scroll begin handle
   * @param  {object} e native event
   */
  onScrollBegin(e) {
    // update scroll state
    this.setState({ isScrolling: true })

    this.timerMgr.setTimeout(() => {
      this.props.onScrollBeginDrag && this.props.onScrollBeginDrag(e, this.state, this)
    })
  };

  /**
   * Scroll end handle
   * @param  {object} e native event
   */
  onScrollEnd(e) {
    // update scroll state
    this.setState({
      isScrolling: false
    })

    // making our events coming from android compatible to updateIndex logic
    if (!e.nativeEvent.contentOffset) {
      if (this.state.dir === 'x') {
        e.nativeEvent.contentOffset = {x: e.nativeEvent.position * this.state.width}
      } else {
        e.nativeEvent.contentOffset = {y: e.nativeEvent.position * this.state.height}
      }
    }

    this._prePageIndex = this.state.index; 
    this.updateIndex(e.nativeEvent.contentOffset, this.state.dir)

    // Note: `this.setState` is async, so I call the `onMomentumScrollEnd`
    // in setTimeout to ensure synchronous update `index`
    
    this.timerMgr.setTimeout(() => {
      this.autoplay()
      this.loopJump();

      // if `onMomentumScrollEnd` registered will be called here
      this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd(e, this.state, this)
    })
  };

  /*
   * Drag end handle
   * @param {object} e native event
   */
  onScrollEndDrag(e) {
    let { contentOffset } = e.nativeEvent
    let { horizontal, children } = this.props
    let { offset, index } = this.state
    let previousOffset = horizontal ? offset.x : offset.y
    let newOffset = horizontal ? contentOffset.x : contentOffset.y

    if (previousOffset === newOffset && (index === 0 || index === children.length - 1)) {
      this.setState({
        isScrolling: false
      })
    }
  };

  /**
   * Update index after scroll
   * @param  {object} offset content offset
   * @param  {string} dir    'x' || 'y'
   */
  updateIndex(offset, dir) {

    let state = this.state
    let index = state.index
    let diff = offset[dir] - state.offset[dir]
    let step = dir === 'x' ? state.width : state.height
    let loopJump = false;

    // Do nothing if offset no change.
    if(!diff) return

    // Note: if touch very very quickly and continuous,
    // the variation of `index` more than 1.
    // parseInt() ensures it's always an integer
    index = parseInt(index + Math.round(diff / step))

    if(this.isLoop) {
      if(index <= -1) {
        //index = state.total - 1
        index %= state.total;
        index += state.total;
                
        offset[dir] = step * state.total
        loopJump = true;
      }
      else if(index >= state.total) {
        index %= state.total;
        offset[dir] = step
        loopJump = true;
      }
    }    

    this.setState({
      index: index,
      offset: offset,
      loopJump: loopJump,
    })
  };

  /**
   * Scroll by index
   * @param  {number} index offset index
   */
  scrollBy(index) {
    if (this.state.isScrolling || this.state.total < 2) return
    let state = this.state
    let diff = (this.isLoop ? 1 : 0) + index + this.state.index
    let x = 0
    let y = 0
    if(state.dir === 'x') x = diff * state.width
    if(state.dir === 'y') y = diff * state.height

    if (Platform.OS === 'ios' || this.props.children.length <= 1) {
      this.refs.scrollView && this.refs.scrollView.scrollTo({ x, y })
    } else {
      this.refs.scrollView && this.refs.scrollView.setPage(diff)
    }

    // update scroll state
    this.setState({
      isScrolling: true,
      autoplayEnd: false,
    })

    // trigger onScrollEnd manually in android
    if (!(Platform.OS === 'ios' || this.props.children.length <= 1)) {
      this.timerMgr.setTimeout(() => {
        this.onScrollEnd({
          nativeEvent: {
            position: diff,
          }
        });
      }, 0);
    }

  };

  scrollViewPropOverrides() {
    var props = this.props
    var overrides = {}

    /*
    const scrollResponders = [
      'onMomentumScrollBegin',
      'onTouchStartCapture',
      'onTouchStart',
      'onTouchEnd',
      'onResponderRelease',
    ]
    */

    for(let prop in props) {
      // if(~scrollResponders.indexOf(prop)
      if(typeof props[prop] === 'function'
        && prop !== 'onMomentumScrollEnd'
        && prop !== 'renderPagination'
        && prop !== 'onScrollBeginDrag'
      ) {
        let originResponder = props[prop]
        overrides[prop] = (e) => originResponder(e, this.state, this)
      }
    }
    
    return overrides
  };

  /**
   * Render pagination
   * @return {object} react-dom
   */
  renderPagination() {

    // By default, dots only show when `total` > 2
    if(this.state.total <= 1) return null

    let dots = []
    let ActiveDot = this.props.activeDot || <View style={[styles.activeDot,this.activeDotStyle]} />;
    let Dot = this.props.dot || <View style={[styles.dot,this.dotStyle]} />;
    for(let i = 0; i < this.state.total; i++) {
      dots.push(i === this.state.index
        ?
        React.cloneElement(ActiveDot, {key: i})
        :
        React.cloneElement(Dot, {key: i})
      )
    }

    return (
      <View pointerEvents='none' style={[styles['pagination_' + this.state.dir], this.props.paginationStyle]}>
        {dots}
      </View>
    )
  };

  renderTitle() {
    let child = this.props.children[this.state.index]
    let title = child && child.props.title
    return title
      ? (
        <View style={styles.title}>
          {this.props.children[this.state.index].props.title}
        </View>
      )
      : null
  };

  renderNextButton() {
    let button;

    if (this.isLoop || this.state.index != this.state.total - 1) {
      button = this.props.nextButton || <Text style={styles.buttonText}>›</Text>
    }

    return (
      <TouchableOpacity onPress={() => button !== null && this.scrollBy.call(this, 1)}>
        <View>
          {button}
        </View>
      </TouchableOpacity>
    )
  };

  renderPrevButton() {
    let button = null

    if (this.isLoop || this.state.index != 0) {
       button = this.props.prevButton || <Text style={styles.buttonText}>‹</Text>
    }

    return (
      <TouchableOpacity onPress={() => button !== null && this.scrollBy.call(this, -1)}>
        <View>
          {button}
        </View>
      </TouchableOpacity>
    )
  };

  renderButtons() {
    return (
      <View pointerEvents='box-none' style={[styles.buttonWrapper, {width: this.state.width, height: this.state.height}, this.props.buttonWrapperStyle]}>
        {this.renderPrevButton()}
        {this.renderNextButton()}
      </View>
    )
  };

  renderScrollView(pages) {
     if (Platform.OS === 'ios' || this.props.children.length <= 1)
        return (
          <ScrollView ref="scrollView"
            {...this.props}
            {...this.scrollViewPropOverrides()}
                      contentContainerStyle={[styles.wrapper, this.props.style, {overflow:'hidden'}]}
                      contentOffset={this.state.offset}
                      onScrollBeginDrag={this.onScrollBegin}
                      onMomentumScrollEnd={this.onScrollEnd}
                      onScrollEndDrag={this.onScrollEndDrag}
                      >
            {pages}
          </ScrollView>
        );
     else
        return (
          <ViewPagerAndroid ref="scrollView"
              {...this.props}
              initialPage={this.isLoop ? this.state.index + 1 : this.state.index}
              onPageSelected={this.onScrollEnd}
              style={{flex: 1, overflow:'hidden'}}>
              {pages}
          </ViewPagerAndroid>
        );
  };

  /**
   * Default render
   * @return {object} react-dom
   */
  render() {
    let state = this.state
    let props = this.props
    let children = props.children
    let index = state.index
    let total = state.total
    let loop = this.isLoop
    let dir = state.dir
    let key = 0

    let pages = []
    let pageStyle = [{width: state.width, height: state.height}, styles.slide]

    // For make infinite at least total > 1
    if(total > 1) {

      // Re-design a loop model for avoid img flickering
      pages = Object.keys(children)
      if(loop) {
        pages.unshift(total - 1 + '')
        pages.push('0')
      }

      pages = pages.map((page, i) =>
        <View style={pageStyle} key={i}>{children[page]}</View>
      )
    }
    else pages = <View style={pageStyle}>{children}</View>

    return (
      <View style={[styles.container, {
        width: state.width,
        height: state.height
      }]}>
        {this.renderScrollView(pages)}
        {props.showsPagination && (props.renderPagination
          ? this.props.renderPagination(state.index, state.total, this)
          : this.renderPagination())}
        {this.renderTitle()}
        {this.props.showsButtons && this.renderButtons()}
      </View>
    )
  }
}

/**
 * Props Validation
 * @type {Object}
 */
Page.propTypes = {
  horizontal                       : React.PropTypes.bool,
  children                         : React.PropTypes.node.isRequired,
  style                            : View.propTypes.style,
  pagingEnabled                    : React.PropTypes.bool,
  showsHorizontalScrollIndicator   : React.PropTypes.bool,
  showsVerticalScrollIndicator     : React.PropTypes.bool,
  bounces                          : React.PropTypes.bool,
  scrollsToTop                     : React.PropTypes.bool,
  removeClippedSubviews            : React.PropTypes.bool,
  automaticallyAdjustContentInsets : React.PropTypes.bool,
  showsPagination                  : React.PropTypes.bool,
  showsButtons                     : React.PropTypes.bool,
  loop                             : React.PropTypes.bool,
  autoplay                         : React.PropTypes.bool,
  autoplayTimeout                  : React.PropTypes.number,
  autoplayDirection                : React.PropTypes.bool,
  index                            : React.PropTypes.number,
  renderPagination                 : React.PropTypes.func,
};

Page.defaultProps = {
  horizontal                       : true,
  pagingEnabled                    : true,
  showsHorizontalScrollIndicator   : false,
  showsVerticalScrollIndicator     : false,
  bounces                          : false,
  scrollsToTop                     : false,
  removeClippedSubviews            : true,
  automaticallyAdjustContentInsets : false,
  showsPagination                  : true,
  showsButtons                     : false,
  loop                             : true,
  autoplay                         : false,
  autoplayTimeout                  : 2500,
  autoplayDirection                : true,
  index                            : 0,
  dotStyle                         : null,
  activeDotStyle                   : null,
};

/**
* @desc view style
*/
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
  },

  wrapper: {
    backgroundColor: 'transparent',
  },

  slide: {
    backgroundColor: 'transparent',
  },

  pagination_x: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent',
  },

  pagination_y: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent',
  },

  title: {
    height: 30,
    justifyContent: 'center',
    position: 'absolute',
    paddingLeft: 10,
    bottom: -30,
    left: 0,
    flexWrap: 'nowrap',
    width: 250,
    backgroundColor: 'transparent',
  },

  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  buttonText: {
    fontSize: 50,
    color: '#007aff',
    fontFamily: 'Arial',
  },
  activeDot: {
    backgroundColor: '#007aff',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  dot: {
    backgroundColor:'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  }
})
