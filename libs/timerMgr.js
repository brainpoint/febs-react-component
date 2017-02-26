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
*     - 清理全部使用: this.timerMgr.clearAll();
*/
class TimerMgr {
  constructor() {
    this._timeoutList = [];
    this._requestAniList = [];
    // this._intervalList = [];
  }

  dispose() {
    this.clearAll();
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

  requestAnimationFrame(fn) {
    if (!fn) return null;
    let ctx = this;
    let t = TimerMgr.requestAnimationFrame(function(tm){
      fn(tm);
      let i = ctx._requestAniList.indexOf(t);
      if (i >= 0)
        ctx._requestAniList.splice(i, 1);
    });
    if (t)
      this._requestAniList.push(t);
    return t;
  }

  cancelAnimationFrame(t) {
    if (!t) return;
    TimerMgr.cancelAnimationFrame(t);
    let i = this._requestAniList.indexOf(t);
    if (i >= 0)
      this._requestAniList.splice(i, 1);
  }

  clearAllTimeout() {
    for(let t of this._timeoutList) {
      if (t) {
        clearTimeout(t);
      }
    }
    this._timeoutList = [];
  }
  
  clearAllAnimationFrame() {
    for(let t of this._requestAniList) {
      if (t) {
        TimerMgr.cancelAnimationFrame(t);
      }
    }
    this._requestAniList = [];
  }
  
  clearAll() {
    this.clearAllTimeout();
    this.clearAllAnimationFrame();
  }


};


/**
* @desc: timer
*/

// window.requestAnimationFrame / window.cancelAnimationFrame
var lastTime = 0;
TimerMgr.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

TimerMgr.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

if (!TimerMgr.requestAnimationFrame) {
    TimerMgr.requestAnimationFrame = (callback)=>{
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = setTimeout(()=>{ callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}

if (!TimerMgr.cancelAnimationFrame) {
    TimerMgr.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}


/**
* @desc: export
*/
export default TimerMgr;