'use strict';
/**
* Copyright (c) 2016 Copyright citongs All Rights Reserved.
* Author: lipengxiang
*/

/**
* @desc view class
*    可在组件释放时自动释放所有的timeout计时器.
*     - 在constructor中:          this.timerMgr = new TimerMgr();
*     - 在componentWillUnmount中: this.timerMgr.dispose();
*     - 在使用计时器的函数中调用:   var t = this.timerMgr.setTimeout(fn, tm) / this.timerMgr.clearTimeout(t)
*/
export default class {
  constructor() {
    this._timeoutList = [];
    // this._intervalList = [];
  }

  dispose() {
    for(let t of this._timeoutList) {
      if (t) {
        clearTimeout(t);
      }
    }
    this._timeoutList = null;

    // for(let t of this._intervalList) {
    //   if (t) {
    //     clearInterval(t);
    //   }
    // }
    // this._intervalList = [];
  }

  setTimeout(fn, tm) {
    let ctx = this;
    let t = setTimeout(function() {
      fn();
      let i = ctx._timeoutList.indexOf(t);
      if (i >= 0)
        ctx._timeoutList.splice(i, 1);
    }, tm);
    if (t)
      this._timeoutList.push(t);
    return t;
  }

  clearTimeout(t) {
    if (!t) return;
    clearTimeout(t);
    let i = this._timeoutList.indexOf(t);
    if (i >= 0)
      this._timeoutList.splice(i, 1);
  }

  
  // setInterval(fn, tm) {
  //   let ctx = this;
  //   let t = setInterval(function() {
  //     fn();
  //     let i = ctx._intervalList.indexOf(t);
  //     t = null;
  //     if (i >= 0)
  //       ctx._intervalList.splice(i, 1);
  //   }, tm);
  //   if (t)
  //     this._intervalList.push(t);
  // }

};