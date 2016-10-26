'use strict';
/**
* Copyright (c) 2016 Copyright citongs All Rights Reserved.
* Author: lipengxiang
*/

import React,{ Component, PropTypes }        from 'react';
import {
  Image,
  PixelRatio
} from 'react-native';

const imageName = ((PixelRatio.get() <= 1) 
                  ? ''
                  : ((PixelRatio.get() <= 2) ? '@2x' : '@3x')); 

function getIconArrowLeft(style=null) {
  var img = require('../images/arrowLeft');
  img = ((PixelRatio.get() <= 1) ? img._1 : ((PixelRatio.get() <= 2) ? img._2 : img._3)); 
  return (<Image source={{uri:img}} style={[{alignSelf:'center', width:13, height:22}, style]}/>);
}

function getIconCross(style=null) {
  var img = require('../images/cross');
  img = ((PixelRatio.get() <= 1) ? img._1 : ((PixelRatio.get() <= 2) ? img._2 : img._3)); 
  return (<Image source={{uri:img}} style={[{alignSelf:'center', width:18, height:18}, style]}/>);
}

function getIconSearch(style=null) {
  var img = require('../images/search');
  img = ((PixelRatio.get() <= 1) ? img._1 : ((PixelRatio.get() <= 2) ? img._2 : img._3)); 
  return (<Image source={{uri:img}} style={[{alignSelf:'center', width:18, height:18}, style]}/>);
}

function getIconChecked(style=null) {
  var img = require('../images/checked.js');
  img = ((PixelRatio.get() <= 1) ? img._1 : ((PixelRatio.get() <= 2) ? img._2 : img._3)); 
  return (<Image source={{uri:img}} style={[{alignSelf:'center', width:18, height:18}, style]}/>);
}

function getIconUnCheck(style=null) {
  var img = require('../images/uncheck.js');
  img = ((PixelRatio.get() <= 1) ? img._1 : ((PixelRatio.get() <= 2) ? img._2 : img._3)); 
  return (<Image source={{uri:img}} style={[{alignSelf:'center', width:18, height:18}, style]}/>);
}

function getIconEdit(style=null) {
  var img = require('../images/edit.js');
  img = ((PixelRatio.get() <= 1) ? img._1 : ((PixelRatio.get() <= 2) ? img._2 : img._3)); 
  return (<Image source={{uri:img}} style={[{alignSelf:'center', width:18, height:18}, style]}/>);
}

function getIconDelete(style=null) {
  var img = require('../images/delete.js');
  img = ((PixelRatio.get() <= 1) ? img._1 : ((PixelRatio.get() <= 2) ? img._2 : img._3)); 
  return (<Image source={{uri:img}} style={[{alignSelf:'center', width:18, height:18}, style]}/>);
}

function getIconRight(style=null) {
  var img = require('../images/right.js');
  img = ((PixelRatio.get() <= 1) ? img._1 : ((PixelRatio.get() <= 2) ? img._2 : img._3)); 
  return (<Image source={{uri:img}} style={[{alignSelf:'center', width:18, height:18}, style]}/>);
}

function getIconMinArrowRight(style=null) {
  return (<Image source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMjRDRjgxMDA2NTkxMUUzOTlGODg2Qjk3NUJENUU1RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4RjRCMjFGNjA2RTAxMUUzOTlGODg2Qjk3NUJENUU1RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkYyNENGODBFMDY1OTExRTM5OUY4ODZCOTc1QkQ1RTVEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkYyNENGODBGMDY1OTExRTM5OUY4ODZCOTc1QkQ1RTVEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+19PHKwAAAWZJREFUeNpi+P//PwMy3rFjR9zHjx/zgOwgIGZDl0fHTAxIYMuWLbnPnz+fu23btqJPnz7JAYV8gJiNAQ9gBJkCAmvXrs0CapoMZIIN5eTkfOjl5TWBj4/vIZC7FYh/4TRg/vz59kD2XiBmRpYkxhCYASCNC4A4Bl0BuiFAtSiGwMLgLxAnAPESdAO+f/8uDwyTAqD35IFc78TERDZsBiAbspQUQ5jQ1IIMiSfFEFgYoKsHhclCII4mFCZMOKKXWJcosOBJI3/FxMRS37596/b3719RdEOOHDnC9/Lly1u4XMAgISHB8fXr153omkFAUFBwElBzE4jNgkvz58+f9wANsMam+f379/kwPgsOzfuBmi0IacaIRgUFBU5g4BwiVjOKAUDNPK9evTr87ds3U2I1I3uB68mTJ1v//PljTIpmZBfYATVbk6oZ2YAdQJwMTUBEa0YPRFDSTQEZwsHB0UyMZhAACDAA4IAAH4fdRdAAAAAASUVORK5CYII='}} style={[{width:8, height:10}, style]}/>);
}

function getIconMinArrowDown(style=null) {
  return (<Image source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNzdEQkRGODA2RTAxMUUzOTlGODg2Qjk3NUJENUU1RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDNzdEQkRGOTA2RTAxMUUzOTlGODg2Qjk3NUJENUU1RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM3N0RCREY2MDZFMDExRTM5OUY4ODZCOTc1QkQ1RTVEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM3N0RCREY3MDZFMDExRTM5OUY4ODZCOTc1QkQ1RTVEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+GFwi7gAAAVFJREFUeNqs1M1KhUAUAOA0FyohucifnaveIEiyuw5foaCkXVC9QYsWraPWaT2AOyOIop9tL9GNAhVCUBS5KHZGNAZJnQsdOHiYOfPhMI5UVVUL/xmM4zhtvQX5CpnNsX4R0rAs66UdoJvnLqTHMMydpmlLc2DXkI+u6x7g4B7kFWooimIShuEzoBwhtoPqOI4vPc87RBOUbdtF0/AbPM+/CYIw8X0/78FuILfxQYqiClVV92mWZc+6K7IsW0uS5ElRFJYEQwHOl67ry3Se5yeiKF50G9I0XQf0AUN7MY7jpqZpnsOuPutDiaLouAfdAPRekiSOAPuoD7adaFD0POqgm7CLKZQrAxiav4Wc0XhD35uWZUmE4d/hKEqC/QmOoUNYL9iHdjG4trPuOnpoazhKgtU/h7ELi1BZlr8Nw4jHMCIQRRAEp4CtQvk+hKH4EWAAf6WsEeuLovMAAAAASUVORK5CYII='}} style={[{width:10, height:8}, style]}/>);
}

function getIconMinArrowLeft(style=null) {
  return (<Image source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADJGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYyNENGODEwMDY1OTExRTM5OUY4ODZCOTc1QkQ1RTVEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhGNEIyMUY2MDZFMDExRTM5OUY4ODZCOTc1QkQ1RTVEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjI0Q0Y4MEUwNjU5MTFFMzk5Rjg4NkI5NzVCRDVFNUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjI0Q0Y4MEYwNjU5MTFFMzk5Rjg4NkI5NzVCRDVFNUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7X08crAAABnElEQVQ4T52UT0sCURTF1RH/oiTYuEhmFkHQJnBvQRQUOqu2RSG0lmgZ1KJPULSstD6Ci2S2FUIQ7VvFuBNbiEM0QzhN5+r4UHozWj84zH33cQ7X92b0VyoV3zREIpFT0zSPUO5DN9QrlUq+ABWTSKVS5zAfoxSgK2iP+sTEADJ3Op2ysyQo5BrapIVnAMfcJxgMNvB4oNo1wM0ci8VestlsEeUnrbkBHuZnURSXNU37cFq/A9zM8Xj8KZlMrsBsOK0+YwEe5kYikVhttVqm02KwAA/zI8zrPDPRD8hkMic8syAI7wjYcDMTAbxNC/l8Xo9Go02nx7Asa7bdbl+ipLvnQhNoOJxmoVA444WAbegW4oYIsixbuVzuLRwOi5IkveKUF3u93oyzP2QJmodqkE0NAr7BGVSr1S887v4zCbuFP4TQl8hCWAAxZcgOxEL8ts1+0ighqKjrulyv1w8Mw5AHbYYFreEG78cmGMFrkm/0y2SmhdsEQ2gSBZNINAn+VObS6fShoigXg21AARMUgra63W5ZVdXd8T3b9wM34tTkgbYAowAAAABJRU5ErkJggg=='}} style={[{width:8, height:10}, style]}/>);
}


function getIconClose(style=null) {
  return (<Image source={{uri:'data:image/png;base64,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'}} style={[{width:44, height:44}, style]}/>);
}


function getIconCloseCircle(style=null) {
  var img = require('../images/closeCircle.js');
  img = ((PixelRatio.get() <= 1) ? img._1 : ((PixelRatio.get() <= 2) ? img._2 : img._3)); 
  return (<Image source={{uri:img}} style={[{alignSelf:'center', width:18, height:18}, style]}/>);
}


exports.getIconArrowLeft        = getIconArrowLeft;
exports.getIconCross            = getIconCross;
exports.getIconMinArrowRight    = getIconMinArrowRight;
exports.getIconMinArrowDown     = getIconMinArrowDown;
exports.getIconMinArrowLeft     = getIconMinArrowLeft;
exports.getIconClose            = getIconClose;
exports.getIconCloseCircle      = getIconCloseCircle;
exports.getIconSearch           = getIconSearch;
exports.getIconChecked          = getIconChecked;
exports.getIconUnCheck          = getIconUnCheck;
exports.getIconEdit             = getIconEdit;
exports.getIconDelete           = getIconDelete;
exports.getIconRight            = getIconRight;
