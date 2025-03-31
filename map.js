
// List of marker
const markers = [
    {x: 79, y: "", z: 378, name: '拠点', zoomMin: -1, zoomMax: 3, description: "ここは拠点。"},
    {x: -400, y: "", z: -300, name: '村', zoomMin: -1, zoomMax: 3, description: "雪山の斜面に面した村。立地最悪。アイアンゴーレムが1体。"},
    {x: -6, y: "", z: 0, name: 'リスポーン地点', zoomMin: 4, zoomMax: 7, description: "還る場所を無くした魂が辿り着く場所。"},
    {x: 128, y: -18, z: 553, name: 'スケルトンスポナー', zoomMin: 1, zoomMax: 7, description: "スケさんトラップ建設予定地。"},
    {x: -1529, y: "", z: 463, name: '海底遺跡', zoomMin: 1, zoomMax: 7, description: "深いところにあるため未探索"},
];

// Size of map
const chunkXMin = -166;
const chunkXMax = 48;
const chunkZMin = -34;
const chunkZMax = 127;

var coordinateDisplay = null;
var infoTitle = null;
var infoCoordinate = null;
var infoDescription = null;

var map = null;

var markerStyle = new ol.style.Style({
    // image: new ol.style.Circle({
    //     radius: 10,
    //     fill: new ol.style.Fill({
    //         color: "rgba(255, 202, 202, 0.7)"
    //     }),
    //     stroke: new ol.style.Stroke({
    //         color: 'black',
    //         width: 1
    //     })
    // }),
    image: new ol.style.Icon({
        // from https://illustcenter.com/2023/06/06/sdesign_00247/
        src: './img/sdesign_00247.png',
        scale: 0.1,
        anchor: [0.5, 1],
    }),
});

function updateMarker(vectorSource) {
    var zoom = map.getView().getZoom();
    vectorSource.getFeatures().forEach(markerFeature => {
    var zoomMin = markerFeature.get('zoomMin');
    var zoomMax = markerFeature.get('zoomMax');
    if(zoom < zoomMin || zoomMax < zoom ){
        markerFeature.setStyle(new ol.style.Style({}));
    } else{
        markerFeature.setStyle(markerStyle)
    }
    });
}


function loadCsv() {
    // TODO
}

function getElement() {
    coordinateDisplay = document.getElementById("coordinate-display");
    infoTitle = document.getElementById("info-title");
    infoCoordinate = document.getElementById("info-coordinate");
    infoDescription = document.getElementById("info-description");
    toggleMarker = document.getElementById("toggle-marker");
}

function addMainLayer() {

    var imageExtent = [chunkXMin * 16, (chunkZMax + 1) * (-16), (chunkXMax + 1) * 16, chunkZMin * (-16)];

    var imageLayer = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            url: "./img/ochafuji.png",
            imageExtent: imageExtent,
            interpolate: false
        })
    });

    map = new ol.Map({
        target: "map",
        layers: [imageLayer],
        view: new ol.View({
            projection: new ol.proj.Projection({
                code: "pixel",
                units: "pixels",
                extent: imageExtent
            }),
            center: [70, -350],
            zoom: 2,
            minZoom: -1,
            maxZoom: 7,
        })
    });

    
    map.on('pointermove', function (event) {
        var coordinate = map.getEventCoordinate(event.originalEvent);
        var x = Math.round(coordinate[0] - 0.5);
        var z = Math.round(coordinate[1] + 0.5);
        z = (-1) * z;
        var ChunkX = Math.floor(x/16);
        var ChunkZ = Math.floor(z/16);
        coordinateDisplay.innerText = `X: ${x}, Z: ${z}\n Chunk:(${ChunkX}, ${ChunkZ})`;
    });


    var vectorSource = new ol.source.Vector();
    var vectorLayer = new ol.layer.Vector({
        source: vectorSource
    });
    map.addLayer(vectorLayer);


    
    markers.forEach(function(marker) {
        var x = marker.x + 0.5;
        var z = - marker.z - 0.5;
        var markerFeature = new ol.Feature({
            geometry: new ol.geom.Point([x, z]),
            name: marker.name,
            x_pos: marker.x,
            y_pos: marker.y,
            z_pos: marker.z,
            zoomMin: marker.zoomMin,
            zoomMax: marker.zoomMax,
            description: marker.description,
        });            
        markerFeature.setStyle(markerStyle);

        vectorSource.addFeature(markerFeature);
    });


    updateMarker(vectorSource);
    map.getView().on('change:resolution', function () {
        updateMarker(vectorSource);
    });


    const info = new ol.Overlay({
        element: document.getElementById('info'),
        offset: [0, -40],
        positioning: 'bottom-center'
    });
    map.addOverlay(info);

    map.on('pointermove', function (event) {
        const markerFeature = map.forEachFeatureAtPixel(event.pixel, function (markerFature) {
            return markerFature;
        });
        if(markerFeature){
            var coordinate = markerFeature.getGeometry().getCoordinates();
            
            infoTitle.innerHTML = markerFeature.get("name");
            if(markerFeature.get("y_pos") == ""){
                infoCoordinate.innerHTML = " (" + markerFeature.get("x_pos") + ", " + markerFeature.get("z_pos") + " )";
            } else {
                infoCoordinate.innerHTML = " (" + markerFeature.get("x_pos") + ", " + markerFeature.get("y_pos") + ", " + markerFeature.get("z_pos") + " )";
            }
            infoDescription.innerHTML = markerFeature.get('description')
            info.setPosition(coordinate);
            info.getElement().style.display = "block";   
        }else{
            info.getElement().style.display = "none";   
        }
    });

    toggleMarker.addEventListener('change', function() {
        if (this.checked) {
            vectorLayer.setVisible(true);
        } else {
            vectorLayer.setVisible(false);
        }
    });

}


$(function() {
    loadCsv();

    getElement();

    addMainLayer();

    
});
