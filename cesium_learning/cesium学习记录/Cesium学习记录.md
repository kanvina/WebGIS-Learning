## Cesium学习记录

来源：

cesium token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwOGQyMTk4Yi1kNTAxLTRhOTktODA1NS0xZmM3ZTM5OWViOTciLCJpZCI6MjMzNjIsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1ODMyNDc2NDB9.TObH13SSruQjzlqvaaJQ9scOUrQN2VaM5ZuuVdX23D0

- ### **Viewer**

  Viewer：可交互容器。

  ```javascript
  var viewer = new Cesium.Viewer('cesiumContainer');
  ```

  ###### Viewer相关组件：

  Geocoder : 一种地理位置搜索工具，用于显示相机访问的地理位置。默认使用微软的Bing地图。

  HomeButton : 首页位置，点击之后将视图跳转到默认视角。

  SceneModePicker : 切换2D、3D 和 Columbus View (CV) 模式。

  BaseLayerPicker : 选择三维数字地球的底图（imagery and terrain）。

  NavigationHelpButton : 帮助提示，如何操作数字地球。

  Animation :控制视窗动画的播放速度。

  CreditsDisplay : 展示商标版权和数据源。

  Timeline : 展示当前时间和允许用户在进度条上拖动到任何一个指定的时间。

  FullscreenButton : 视察全屏按钮。

  隐藏组件使用示例：

  ```javascript
  var viewer = new Cesium.Viewer('cesiumContainer', {
      geocoder: false
      baseLayerPicker: false
  });
  ```

  移除默认图层

  ```javascript
  viewer.imageryLayers.remove(viewer.imageryLayers.get(0));
  ```


- 
- 
- 
- 
- 
- 