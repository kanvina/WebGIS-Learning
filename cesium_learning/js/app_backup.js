//#region 加载censium，部分控件不显示
var viewer = new Cesium.Viewer("cesiumContainer", {
    // imageryProvider : new Cesium.ArcGisMapServerImageryProvider({
    //     url : '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
    // }),
    // geocoder: false, //查询
    homeButton: false, //主页
    sceneModePicker: false, //
    // baseLayerPicker: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
    vrButton: false
});
//#endregion

//#region 图层

//移除默认图层
// viewer.imageryLayers.remove(viewer.imageryLayers.get(0));

// var blue_map= new Cesium.UrlTemplateImageryProvider({
//     //调用影像服务 
//     url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"
//     // url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"

// })
// var layers= viewer.imageryLayers.addImageryProvider(blue_map);
// layers.alpha = 0.5; // 0.0 is transparent.  1.0 is opaque.
// layers.brightness = 2.0; // > 1.0 increases brightness.  < 1.0 decreases.
//#endregion

//#region 指定相机位置和方向

// //使用camera.setView()初始化view，使用Cartesian3和HeadingpitchRoll指定相机的位置和方向
// var initialPosition = new Cesium.Cartesian3.fromDegrees(114,30,50000);
// var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(0,-90,0);
// var homeCameraView = {
//     destination : initialPosition,
//     orientation : {
//         heading : initialOrientation.heading,
//         pitch : initialOrientation.pitch,
//         roll : initialOrientation.roll
//     }
// };
// // Set the initial view
// viewer.scene.camera.setView(homeCameraView);

// // Add some camera flight animation options
// homeCameraView.duration = 2.0;
// homeCameraView.maximumHeight = 2000;
// homeCameraView.pitchAdjustHeight = 2000;
// homeCameraView.endTransform = Cesium.Matrix4.IDENTITY;
// // Override the default home button
//  (function (e) {
//     e.cancel = true;
//     viewer.scene.camera.flyTo(homeCameraView);
// });

//#endregion

//#region 添加KML

// var kmlOptions = {
//     camera: viewer.scene.camera,
//     canvas: viewer.scene.canvas,
//     clampToGround: true
// };
// // Load geocache points of interest from a KML file
// var geocachePromise = Cesium.KmlDataSource.load('../data/hm.kml', kmlOptions);

// // Add geocache billboard entities to scene and style them
// geocachePromise.then(function (dataSource) {
//     // Add the new data as entities to the viewer
//     viewer.dataSources.add(dataSource);
// });

// // Add geocache billboard entities to scene and style them
// geocachePromise.then(function (dataSource) {
//     // Add the new data as entities to the viewer
//     viewer.dataSources.add(dataSource);
//     // Get the array of entities
//     var geocacheEntities = dataSource.entities.values;
//     for (var i = 0; i < geocacheEntities.length; i++) {
//         var entity = geocacheEntities[i];
//         if (Cesium.defined(entity.billboard)) {
//             // Adjust the vertical origin so pins sit on terrain
//             entity.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
//             // Disable the labels to reduce clutter
//             entity.label = undefined;
//             // Add distance display condition
//             entity.billboard.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(10.0, 2000000.0);
//             // Compute longitude and latitude in degrees
//             var cartographicPosition = Cesium.Cartographic.fromCartesian(entity.position.getValue(Cesium.JulianDate.now()));
//             var longitude = Cesium.Math.toDegrees(cartographicPosition.longitude);
//             var latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);
//             // Modify description
//             // Modify description
//             var description = '<table class="cesium-infoBox-defaultTable cesium-infoBox-defaultTable-lighter"><tbody>' +
//                 '<tr><th>' + "Longitude" + '</th><td>' + longitude.toFixed(5) + '</td></tr>' +
//                 '<tr><th>' + "Latitude" + '</th><td>' + latitude.toFixed(5) + '</td></tr>' +
//                 '</tbody></table>';
//             entity.description = description;

//         }
//     }
// });

//#endregion

//#region 添加geojson
var geojsonOptions = {
    clampToGround: true
};
// Load neighborhood boundaries from KML file
var neighborhoodsPromise = Cesium.GeoJsonDataSource.load('./data/hm_line.geojson', geojsonOptions);

// Save an new entity collection of neighborhood data
// var neighborhoods;
neighborhoodsPromise.then(function(dataSource) {
    // Add the new data as entities to the viewer
    viewer.dataSources.add(dataSource);
});

//Save an new entity collection of neighborhood data

// neighborhoodsPromise.then(function (dataSource) {
//     // Add the new data as entities to the viewer
//     viewer.dataSources.add(dataSource);
//     // Get the array of entities
//     var neighborhoodEntities = dataSource.entities.values;
//     for (var i = 0; i < neighborhoodEntities.length; i++) {
//         var entity = neighborhoodEntities[i];
//         if (Cesium.defined(entity.polygon)) {
//             // entity.name = entity.properties.neighborhood;
//             entity.polygon.material = Cesium.Color.fromRandom({
//                 maximumRed:0.5,
//                 maximumGreen: 0.5,
//                 blue: 0,
//                 alpha: 0.6
//             });
//             entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;

//             // Generate Polygon position
//             var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
//             var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
//             polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
//             entity.position = polyCenter;
//             // Generate labels
//             entity.label = {
//                 text: entity.name,
//                 showBackground: true,
//                 scale: 0.6,
//                 horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//                 verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
//                 distanceDisplayCondition: new Cesium.DistanceDisplayCondition(100.0, 2000000),
//                 disableDepthTestDistance: 100.0
//             };

//         }
//     }
// });

//#endregion

//#region 显示蓝黑底图 
// var entity_test = viewer.entities.add({
//     //面
//     polygon: {
//         hierarchy: Cesium.Cartesian3.fromDegreesArray([
//                     105,40,
//                     114,40,
//                     114,45,
//                     105,45
//         ]),
//         material: Cesium.Color.RED.withAlpha(0.5),
//         outline: false,
//         outlineColor: Cesium.Color.BLACK
//     }

//     //线
//     polyline: {
//         positions : Cesium.Cartesian3.fromDegreesArray([
//                     105,40,
//                     114,40,
//                     114,45,
//         ]),
//         witth:10,
//         material: Cesium.Color.RED.withAlpha(0.5),
//     }


// });

// viewer.zoomTo(entity_test);

// // 设置面高度
// entity_test.polygon.height = 250000;

// //抬高面，添加侧表面
// entity_test.polygon.extrudedHeight = 250000;

// //面添加本地图片
// var polygon =entity_test.polygon
// polygon.material = './data/polygon.jpg';


// //面添加网格
// var entity_meterial = entity_test.polygon
// entity_meterial.material = new Cesium.GridMaterialProperty({
//     color: Cesium.Color.YELLOW,
//     cellAlpha: 0.2,
//     lineCount: new Cesium.Cartesian2(8, 8),
//     lineThickness: new Cesium.Cartesian2(1, 1)
// });

// //面添加棋盘
// var entity_meterial = entity_test.polygon
// entity_meterial.material = new Cesium.CheckerboardMaterialProperty({
//     evenColor: Cesium.Color.WHITE,
//     oddColor: Cesium.Color.BLACK,
//     repeat: new Cesium.Cartesian2(4, 4)
// });

// //面添加条纹
// var entity_meterial = entity_test.polygon
// entity_meterial.material = new Cesium.StripeMaterialProperty({
//     evenColor : Cesium.Color.WHITE,
//     oddColor : Cesium.Color.BLACK,
//     repeat : 6
//   });

// //面添加轮廓
// var entity_meterial = entity_test.polygon
// entity_meterial.fill = false;
// entity_meterial.outline = true;
// entity_meterial.outlineColor = Cesium.Color.YELLOW;
// entity_meterial.outlineWidth = 2.0;


// //线轮廓
// var entity_polyline = entity_test.polyline
// entity_polyline.material = new Cesium.PolylineOutlineMaterialProperty({
//     color : Cesium.Color.ORANGE,
//     outlineWidth : 3,
//     outlineColor : Cesium.Color.BLACK
// });

//线光晕
// var entity_polyline = entity_test.polyline
// entity_polyline.material = new Cesium.PolylineGlowMaterialProperty({
//     glowPower : 0.2,
//     color : Cesium.Color.BLUE
// });

//#endregion

//#region 点标注显示

// var url_points = [1, 2, 3]
// var postion_list = [
//     [108.953726, 34.265776],
//     [109.953726, 35.265776],
//     [107.953726, 33.265776]
// ]

// function show_point() {

//     var layers = viewer.imageryLayers;
//     // viewer._cesiumWidget._creditContainer.style.display = "none";

//     for (i = 0; i < url_points.length; i++) {

//         var code_id = url_points[i]

//         viewer.entities.add({
//             name: '风机设备',
//             id: String(code_id),

//             position: Cesium.Cartesian3.fromDegrees(postion_list[i][0], postion_list[i][1]),
//             point: { //点
//                 pixelSize: 5,
//                 color: Cesium.Color.RED,
//                 outlineColor: Cesium.Color.WHITE,
//                 outlineWidth: 2
//             },
//             label: { //文字标签
//                 text: '风机设备',
//                 font: '14pt monospace',
//                 style: Cesium.LabelStyle.FILL,
//                 outlineWidth: 2,
//                 verticalOrigin: Cesium.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
//                 pixelOffset: new Cesium.Cartesian2(0, -50) //偏移量
//             },
//             billboard: { //图标
//                 image: '../data/polygon.jpg',
//                 width: 16,
//                 height: 16,
//                 pixelOffset: new Cesium.Cartesian2(0, -30)
//             }
//         });
//     }
// }

// var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
// handler.setInputAction(function (click) {
//     var pick = viewer.scene.pick(click.position);
//     //选中某模型   pick选中的对象
//     if (pick && pick.id) {
//         console.log(pick.id)
//         alert(pick.id._id);
//         var entity_move = viewer.entities.getById(pick.id._id)
//         viewer.entities.remove(entity_move)
//     }
// }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

// show_point()

//#endregion

//#region 计算相机高度
function getHeight() {
    if (viewer) {
        var scene = viewer.scene;
        var ellipsoid = scene.globe.ellipsoid;
        var height = ellipsoid.cartesianToCartographic(viewer.camera.position).height;
        console.log(height)
        return height;
    }
}
getHeight() 
//#endregion

//#region 计算相机范围
// function getCurrentExtent() {
//     // 范围对象
//     var extent = {};

//     // 得到当前三维场景
//     var scene = viewer.scene;

//     // 得到当前三维场景的椭球体
//     var ellipsoid = scene.globe.ellipsoid;
//     var canvas = scene.canvas;

//     // canvas左上角
//     var car3_lt = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, 0), ellipsoid);

//     // canvas右下角
//     var car3_rb = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(canvas.width, canvas.height), ellipsoid);

//     // 当canvas左上角和右下角全部在椭球体上
//     if (car3_lt && car3_rb) {
//         var carto_lt = ellipsoid.cartesianToCartographic(car3_lt);
//         var carto_rb = ellipsoid.cartesianToCartographic(car3_rb);
//         extent.xmin = Cesium.Math.toDegrees(carto_lt.longitude);
//         extent.ymax = Cesium.Math.toDegrees(carto_lt.latitude);
//         extent.xmax = Cesium.Math.toDegrees(carto_rb.longitude);
//         extent.ymin = Cesium.Math.toDegrees(carto_rb.latitude);
//     }

//     // 当canvas左上角不在但右下角在椭球体上
//     else if (!car3_lt && car3_rb) {
//         var car3_lt2 = null;
//         var yIndex = 0;
//         do {
//             // 这里每次10像素递加，一是10像素相差不大，二是为了提高程序运行效率
//             yIndex <= canvas.height ? yIndex += 10 : canvas.height;
//             car3_lt2 = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, yIndex), ellipsoid);
//         } while (!car3_lt2);
//         var carto_lt2 = ellipsoid.cartesianToCartographic(car3_lt2);
//         var carto_rb2 = ellipsoid.cartesianToCartographic(car3_rb);
//         extent.xmin = Cesium.Math.toDegrees(carto_lt2.longitude);
//         extent.ymax = Cesium.Math.toDegrees(carto_lt2.latitude);
//         extent.xmax = Cesium.Math.toDegrees(carto_rb2.longitude);
//         extent.ymin = Cesium.Math.toDegrees(carto_rb2.latitude);
//     }

//     // 获取高度
//     extent.height = Math.ceil(viewer.camera.positionCartographic.height);
//     console.log(extent.height)
//     return extent;
    
// }
// getCurrentExtent()

//#endregion
//#region 监听相机高度移动
viewer.scene.camera.moveEnd.addEventListener(function(){
    //获取当前相机高度
    getHeight()
})
//#endregion




// var content;
// var scene = viewer.scene;
// var infoDiv = '<div id="trackPopUp" class="trackPopUp">' +
//                   '<div id="trackPopUpContent" class="leaflet-popup" style="top:5px;left:0;">' +
//                     '<a class="leaflet-popup-close-button" href="#">×</a>' +
//                     '<div class="leaflet-popup-content-wrapper">' +
//                       '<div id="trackPopUpLink" class="leaflet-popup-content"></div>' +
//                     '</div>' +
//                     '<div class="leaflet-popup-tip-container">'+
//                       '<div class="leaflet-popup-tip"></div>'+
//                     '</div>'+
//                   '</div>' +
//                 '</div>';
        
// $("#cesiumContainer").append(infoDiv);

// var movePositionEventListener = undefined; // 位置跟随的事件监听

// var handler3D = new Cesium.ScreenSpaceEventHandler(scene.canvas);

// // 左键开始添加
// handler3D.setInputAction(function(movement) {		
//     var cartesian = viewer.scene.pickPosition(movement.position); // 可以拾取球皮和模型 不在球上则无拾取点
//     if (!cartesian) return;
    
//     $('#trackPopUp').show();
    
//     var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
//     var point = [cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180];
//     var destination = Cesium.Cartesian3.fromDegrees(point[0], point[1], 3000.0);
//     content = '<table><tbody>' +
//       '<tr><th>经度：</th><td><input class="dtInput" value=' + point[0].toFixed(6) + '></td></tr>' +
//       '<tr><th>纬度：</th><td><input class="dtInput" value=' + point[1].toFixed(6) + '></td></tr>' +
//       '<tr><th>高度：</th><td><input class="dtInput" value=' + cartographic.height.toFixed(6) +'></td></tr>' +
//     '</tbody></table>';
      
//     var obj = { position:movement.position, destination:destination, content:content };
    
//     infoWindow(obj);
//     function infoWindow(obj) {
//       $(".cesium-selection-wrapper").show();
//       $('#trackPopUpLink').empty();
//       $('#trackPopUpLink').append(obj.content);
    
//       function positionPopUp (c) {
//         var x = c.x - ($('#trackPopUpContent').width()) / 2;
//         var y = c.y - ($('#trackPopUpContent').height());
//         $('#trackPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + y + 'px, 0)');
//       }
      
//       $('#trackPopUp').show();
      
//       positionPopUp(obj.position);
    
//       if (movePositionEventListener) { // 先销毁上次的监听
//         movePositionEventListener = movePositionEventListener && movePositionEventListener();
//       }
//       // 每一帧渲染结束后，对位置进行更新
//       movePositionEventListener = viewer.scene.postRender.addEventListener(function () {
//         var screen = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, cartesian);
//         if ((obj.position.x != screen.x) || (obj.position.y != screen.y)) {
//           positionPopUp(screen);
//           obj.position = screen;
//         }
//       });
      
//       $('.leaflet-popup-close-button').click(function() {
//         $('#trackPopUp').hide();
//         $('#trackPopUpLink').empty();
//         $(".cesium-selection-wrapper").hide();
//         if (!handler3D) { // 如果无handler3D操作，移除当前的trackPopUp
//           $("#trackPopUp").remove(); 
//         }
//         if (movePositionEventListener) {
//           movePositionEventListener = movePositionEventListener && movePositionEventListener();
//         }
//       });	         
//     }  
// }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

// // 右键停止
// handler3D.setInputAction(function(movement) {
//     handler3D = handler3D && handler3D.destroy(); // 销毁整个鼠标事件
// }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);



