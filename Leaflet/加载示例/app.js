// $.get('test.json', function (data) {

//     var n=data;
//     var n=data

// });




var bluemap=L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}');
var google_map= L.tileLayer('http://mt1.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile');
var google_img= L.tileLayer('http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}&s=Gali');
            // 创建地图实例
var map = L.map('map', {
    center: [45.51, 122.2],
    zoom: 6,
    layers:[bluemap]
    });

var baseLayers = {
"蓝黑地图": bluemap,
"谷歌地图": google_map,
"谷歌影像":google_img
};

L.control.layers(baseLayers).addTo(map);

// 绘制一条折线
var latlngs = [
        [45.51, 122.68],
        [44.877, 122.43],
        [44.04, 118.2],
        [45.51, 122.68]
        
 ];
  //根据提供的三点坐标绘制折线
 var polyline = L.polygon(latlngs, { color: 'red' });
 polyline.addTo(map);
