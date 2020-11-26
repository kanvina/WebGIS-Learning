var LGIS = {}
LGIS.point = {}
LGIS.polyline={}
LGIS.polygon={}
var BaseMap
var Lmap = null
var polyline_list=[]
var point_list=[]


//初始化地图
LGIS.InitMap = function (id) {
    console.log('InitMap,para:', id)

    // 地图中心点，陕西
    let centerPoint = [35.63452, 109.132287];

    // 创建地图
    Lmap = L.map(id, {
        center: centerPoint,
        zoom: 5,
        minZoom: 1,
        maxZoom: 16,
    });

    // 创建图层
    let mapServerUrl = "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}";
    //let mapServerUrl = "http://t0.tianditu.gov.cn/cva_c/wmts?layer=cva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}";
    BaseMap = L.tileLayer(mapServerUrl, {
        class: 'backgrand',
        name: 'arcgis',
        zIndex: 0,
    }).addTo(Lmap);

    Lmap.off('dblclick')

}

//切换底图
LGIS.ChangeBackMap = function () {
    console.log('ChangeBackMap,para:')
    //删除底图
    BaseMap.remove()

    //添加新底图
    let map_url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    BaseMap = L.tileLayer(map_url, {
        class: 'backgrand',
        name: 'osm',
        zIndex: 1
    }).addTo(Lmap);
}

//点要素可视化
LGIS.point.show = function () {
    console.log('LGIS.point.show,para:')
    //定义标注图片
    let MarkerIcon = L.icon({
        html: "狗子",
        iconUrl: 'img/earthquake.png',
        iconSize: [20, 25],
        iconAnchor: [10,25]
    });
    
    //定义点标注
    let marker = L.marker([35.63452, 109.132287],{
        //设置标注样式，非必选
        icon: MarkerIcon
    });
    //定义圆代替点
    // let marker = L.circle([35.63452, 109.132287], {
    //     //outline颜色
    //     color: '#1848e7',
    //     //outline宽度
    //     weight: 1,
    //     //填充颜色
    //     fillColor: '#e69117',
    //     //半径
    //     radius: 10000,
    //     //透明度:0~1间
    //     fillOpacity: 1
    // })

    //加载点标注（点标注为图层）
    marker.addTo(Lmap)
    point_list.push(marker)

    //点标注绑定信息弹窗
    let popup_maker = marker.bindPopup("I am a popup")
    //打开弹窗
    // popup_maker.openPopup()
}

//线要素可视化
LGIS.polyline.show = function () {
    console.log('LGIS.polyline.show,para:')
    //拐点坐标
    let coordinates = [
        [35.63452, 109.132287],
        [36.63452, 109.132287],
        [36.63452, 110.132287]
    ]
    //定义多段线
    let polyline = L.polyline(coordinates, {
        //颜色
        color: '#ff0000',
        //宽度
        weight: 1,
    })
    polyline.addTo(Lmap);
    //标注绑定信息弹窗
    let popup_maker = polyline.bindPopup("I am a popup")
    //打开弹窗
    // popup_maker.openPopup()

}

//面要素可视化
LGIS.polygon.show = function (){
    console.log('LGIS.polygon.show,para:')
    //拐点坐标
    let coordinates = [
        [35.63452, 109.132287],
        [36.63452, 109.132287],
        [36.63452, 110.132287],
    ]
    //定义多边形
    let polygon = L.polygon(coordinates, {
        //outline颜色
        color: '#ffffff',
        //填充颜色
        fillColor:'#e69117',
        //outline宽度
        weight:1,
        //透明度:0~1间
        fillOpacity: 1
    })

    polygon.addTo(Lmap);
    //标注绑定信息弹窗
    let popup_maker = polygon.bindPopup("I am a popup")
    //打开弹窗
    // popup_maker.openPopup()
}

//点击显示经纬度
function ClickShowLngLat() {
    console.log('showLngLat,para:')

    /*on监听Lmap点击事件
    监听事件： 
    单击："click",
    右击："contextmenu", 
    双击："dblclick",
    鼠标移动："mousemove",
    其他："mouseover", "mousedown", "mouseup", "mouseout", "keypress"
    */
    Lmap.on('click', onMapClick);

    //回调函数，获取参数显示坐标
    function onMapClick(e){
        let lng=e.latlng.lng
        let lat=e.latlng.lat
        console.log('lng:',lng,'lat:',lat);
    }
   }

//动态绘制圆
function DrawCircle(){
    console.log('DrawCircle,para:')
    let r=0
    let start_point=null
    let circle=new L.circle()

    Lmap.on('click', onmouseClick);
    Lmap.on('contextmenu',onmouseContextmenu);
    Lmap.on('mousemove',onMove)

    //map.off(....) 关闭该事件

    function onmouseClick(e)
    {
        start_point=e.latlng
        //确定圆心
    }
    function onMove(e) {
        if(start_point) {
            //计算半径
            r = L.latLng(e.latlng).distanceTo(start_point)
            circle.setLatLng(start_point)
            circle.setRadius(r)
            circle.setStyle({color:'#ff0000',fillColor:'#ff0000',fillOpacity:1})
            Lmap.addLayer(circle)
        }
    }
    function onmouseContextmenu(e)
    {
        r = L.latLng(e.latlng).distanceTo(start_point)//计算半径
        L.circle(start_point,{radius:r,color:'#ff0000',fillColor:'#ff0000',fillOpacity:1}).addTo(Lmap)
        start_point=null
        r=0
    }

}

//动态绘制线
function DrawPolyline(){
    console.log('DrawPolyline,para:')
    let points = []
    let lines = new L.polyline(points,{name:'polyline'})
    let tempLines = new L.polyline([],{name:'tempLines'})
    Lmap.on('click', onClick);  
    Lmap.on('dblclick', onDoubleClick);

    //Lmap.off(....) 关闭该事件

    function onClick(e) {
    
        points.push([e.latlng.lat, e.latlng.lng])
        lines.addLatLng(e.latlng)
        polyline_list.push(lines.addTo(Lmap))
        let node=L.circle(e.latlng, {name:'node', color: '#ff0000', fillColor: 'ff0000', fillOpacity: 1 })
        point_list.push(node.addTo(Lmap))

        Lmap.on('mousemove', onMove)//双击地图

    }
    function onMove(e) {
        if (points.length > 0) {
            ls = [points[points.length - 1], [e.latlng.lat, e.latlng.lng]]
            tempLines.setLatLngs(ls)
            Lmap.addLayer(tempLines)
        }
    }
    function onDoubleClick(e) {
        points.pop()
        polyline_list.push(L.polyline(points,{name:'polyline'}).addTo(Lmap))
        points = []
        lines._latlngs=[]    
        Lmap.off('mousemove')
        tempLines.remove();
    }

}

//清除多段线
function ClearPolyline(){
    console.log('ClearPolyline,para:')
    for(let i =0;i<polyline_list.length;i++){
        polyline_list[i].remove()
    }

    for(let i =0;i<point_list.length;i++){
        point_list[i].remove()
    }
    

}
