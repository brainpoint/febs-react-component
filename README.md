# Citong React Component

> A component framework for React Native / React Web.

### example
  see the files in path: ./demo/*.*
  ```js
  import React, { Component } from 'react';
  import { AppRegistry, StyleSheet, } from 'react-native';

  import { Navigator } from '../index'

  class app extends Component {
    render() {
      return (
        <Navigator
          ref='nav'
          defaultTitle={{ text: 'Title', }}
          defaultLeftButton={{ text: 'Back', }}
          defaultRightButton={{ text: 'Forward', onPress:()=>this.refs.nav.pop() }} 
          defaultBarTintColor='#2112'
          configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
          initialRoute={{
            title:    {text: 'My Initial Scene'}, 
            component:Page    // Page中可以使用 props. 来操作.
          }}
        />
      );
    }
  }

  const styles = StyleSheet.create({});
  AppRegistry.registerComponent('app', () => app);
  ```

### React Native/Web compatible

#### Components
* AlertView
* Icons
* Navigator
* Page
* RefreshListView    (from npm)
* RefreshScrollView  (from npm)
* TableViewCell
* TimerMgr
