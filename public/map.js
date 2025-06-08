
// List of marker
// const markers = [
//     {x: 79, y: "", z: 378, name: '拠点', zoomMin: -1, zoomMax: 3, description: "ここは拠点。"},
//     {x: -400, y: "", z: -300, name: '村', zoomMin: -1, zoomMax: 3, description: "雪山の斜面に面した村。立地最悪。アイアンゴーレムが1体。"},
//     {x: -6, y: "", z: 0, name: 'リスポーン地点', zoomMin: 4, zoomMax: 7, description: "還る場所を無くした魂が辿り着く場所。"},
//     {x: 128, y: -18, z: 553, name: 'スケルトンスポナー', zoomMin: 1, zoomMax: 7, description: "落下式スケさんトラップ。"},
//     {x: -1529, y: "", z: 463, name: '海底遺跡', zoomMin: 1, zoomMax: 7, description: "深いところにあるため未探索"},
//     {x: 134, y: -25, z: 589, name: '試練の間', zoomMin: 1, zoomMax: 7, description: "おちゃが死にかけた。未探索"},
//     {x: -157, y: "", z: -364, name: 'イグルー', zoomMin: 1, zoomMax: 7, description: "村人ゾンビ蘇生中。"},
//     {x: 790, y: "", z: 675, name: '海底遺跡', zoomMin: 1, zoomMax: 7, description: "一部が地上に出ている。シーランタンあり。"},
//     {x: 769, y: "", z: 1471, name: '壊れたポータル', zoomMin: 1, zoomMax: 7, description: "鉄ツルハシがなくて金ブロック未回収。"},
//     {x: -603, y: "", z: 1096, name: '海底遺跡', zoomMin: 1, zoomMax: 7, description: "未探索。"},
//     // {x: -284, y: "", z: 1479, name: '炭鉱', zoomMin: 1, zoomMax: 7, description: "予定地。"},
//     {x: -2480, y: "", z: 800, name: '村', zoomMin: -1, zoomMax: 3, description: "村"},
//     {x: -2590, y: "", z: 1280, name: '村', zoomMin: -1, zoomMax: 3, description: "村"},
//     {x: -2010, y: "", z: 1960, name: '村', zoomMin: -1, zoomMax: 3, description: "村"},
//     {x: -395, y: 6, z: 1382, name: 'アメジストジオード', zoomMin: 1, zoomMax: 7, description: "「ジオード」が一発で変換できなくて予測変換が「時オードリー」。"},
//     {x: -588, y: "", z: 1668, name: '壊れたポータル', zoomMin: 1, zoomMax: 7, description: "チェストの中身回収済み。"},
//     {x: -475, y: -9, z: 1375, name: 'スケルトンスポナー', zoomMin: 1, zoomMax: 7, description: "逃げたので未制圧。"},
//     {x: -307, y: "", z: 248, name: '壊れたポータル', zoomMin: 1, zoomMax: 7, description: "水没。"},
//     {x: -1200, y: "", z: 1006, name: '海底遺跡', zoomMin: 1, zoomMax: 7, description: "未探索。"},
//     {x: -1099, y: "", z: 810, name: '海底遺跡', zoomMin: 1, zoomMax: 7, description: "未探索。"},
//     {x: -1199, y: "", z: 490, name: '海底遺跡', zoomMin: 1, zoomMax: 7, description: "未探索。"},
//     {x: -1499, y: "", z: 506, name: '海底遺跡', zoomMin: 1, zoomMax: 7, description: "未探索。"},
// ];

let markers = [];


// Size of map
const overworldChunkXMin = -177;
const overworldChunkXMax = 147;
const overworldChunkZMin = -149;
const overworldChunkZMax = 130;
const overworldChunkXMin_1 = 43;
const overworldChunkXMax_1 = 109;
const overworldChunkZMin_1 = 313;
const overworldChunkZMax_1 = 403;
const netherChunkXMin = -28;
const netherChunkXMax = 78;
const netherChunkZMin = -16;
const netherChunkZMax = 74;

const imageExtents = [
    [overworldChunkXMin * 16, (overworldChunkZMax + 1) * (-16), (overworldChunkXMax + 1) * 16, overworldChunkZMin * (-16)],
    [overworldChunkXMin_1 * 16, (overworldChunkZMax_1 + 1) * (-16), (overworldChunkXMax_1 + 1) * 16, overworldChunkZMin_1 * (-16)],
    [netherChunkXMin * 16, (netherChunkZMax + 1) * (-16), (netherChunkXMax + 1) * 16, netherChunkZMin * (-16)],
];

const layers = [
    {
        name: 'overworld',
        layers: [
            new ol.layer.Image({
                source: new ol.source.ImageStatic({
                    url: "./img/overworld_block.png",
                    imageExtent: imageExtents[0],
                    interpolate: false
                }),
                zIndex: 0,
            }),
            new ol.layer.Image({
                source: new ol.source.ImageStatic({
                    url: "./img/overworld_block_1.png",
                    imageExtent: imageExtents[1],
                    interpolate: false
                }),
                zIndex: 0,
            }),
        
        ],
        view: new ol.View({
            projection: new ol.proj.Projection({
                code: "pixel",
                units: "pixels",
                extent: imageExtents[0]
            }),
            center: [70, -350],
            zoom: 2,
            minZoom: -1,
            maxZoom: 7,
        })
    },
    {
        name: 'nether',
        layers: [
            new ol.layer.Image({
                source: new ol.source.ImageStatic({
                    url: "./img/nether_block.png",
                    imageExtent: imageExtents[2],
                    interpolate: false
                }),
                zIndex: 0
            })
        ],
        view: new ol.View({
            projection: new ol.proj.Projection({
                code: "pixel",
                units: "pixels",
                extent: imageExtents[2]
            }),
            center: [10, -50],
            zoom: 2,
            minZoom: -1,
            maxZoom: 7,
        })
    },
];

var coordinateDisplay = null;
var infoTitle = null;
var infoCoordinate = null;
var infoDescription = null;
var menuButton = null;
var dimentionMenu = null;

let currentLayers = layers[0].layers;
var currentDimention = 0;

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
        var dimention = markerFeature.get('dimention');

        if(dimention == currentDimention){
            var zoomMin = markerFeature.get('zoomMin');
            var zoomMax = markerFeature.get('zoomMax');
            if(zoom < zoomMin || zoomMax < zoom ){
                markerFeature.setStyle(new ol.style.Style({}));
            } else {
                markerFeature.setStyle(markerStyle)
            }
        } else {
            markerFeature.setStyle(new ol.style.Style({}));
        }
    });
}


async function loadCsv() {
    try{
        const res = await fetch('/api/data');
        if(!res.ok){
            throw new Error('Error: ${res.status}');
        }

        const data = await res.json();

        const headers = data[0];
        const entries = data.slice(1);

        return entries.map(row =>{
            const obj = {};
            headers.forEach((key, i) => {
                obj[key] = i < row.length ? row[i] : "";
            });
            obj.dimention = parseInt(obj.dimention);
            obj.x = parseFloat(obj.x);
            // obj.y = parseFloat(obj.y);
            obj.z = parseFloat(obj.z);
            obj.zoomMin = parseFloat(obj.zoomMin);
            obj.zoomMax = parseFloat(obj.zoomMax);
            return obj;
        });
    } catch (error) {
        console.error("can not fetch csv");
        return [{x: 79, y: "", z: 378, name: '拠点', zoomMin: -1, zoomMax: 3, description: "ここは拠点。"}];
    }
    // fetch(csvUrl)
    //     .then(response => response.json())
    //     .then(data => {
    //         const rows = data.values;
    //         const headers = rows[0];
    //         const entries = rows.slice(1);

    //         markers = entries.map(row =>{
    //             const obj = {};
    //             headers.forEach((key, i) => {
    //                 obj[key] = i < row.length ? row[i] : "";
    //             });
    //             obj.x = parseFloat(obj.x);
    //             obj.y = parseFloat(obj.y);
    //             obj.z = parseFloat(obj.z);
    //             obj.minZoom = parseFloat(obj.minZoom);
    //             obj.maxZoom = parseFloat(obj.maxZoom);
    //             return obj;
    //         });
    //     });
}

function getElement() {
    coordinateDisplay = document.getElementById("coordinate-display");
    infoTitle = document.getElementById("info-title");
    infoCoordinate = document.getElementById("info-coordinate");
    infoDescription = document.getElementById("info-description");
    toggleMarker = document.getElementById("toggle-marker");
    menuButton = document.getElementById("menuButton");
    dimentionMenu = document.getElementById("dimentionMenu");
}

function addMainLayer(markers) {

    // var imageExtent = [chunkXMin * 16, (chunkZMax + 1) * (-16), (chunkXMax + 1) * 16, chunkZMin * (-16)];

    // var imageLayer = new ol.layer.Image({
    //     source: new ol.source.ImageStatic({
    //         url: "./img/ochafuji.png",
    //         imageExtent: imageExtents[0],
    //         interpolate: false
    //     })
    // });

    map = new ol.Map({
        target: 'map',
        // layers: [currentLayers],
        view: layers[0].view
    });
    for (const layer of currentLayers) {
        map.addLayer(layer);
    }

    // map = new ol.Map({
    //     target: "map",
    //     layers: [imageLayer],
    //     view: new ol.View({
    //         projection: new ol.proj.Projection({
    //             code: "pixel",
    //             units: "pixels",
    //             extent: imageExtents[0]
    //         }),
    //         center: [70, -350],
    //         zoom: 2,
    //         minZoom: -1,
    //         maxZoom: 7,
    //     })
    // });

    
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
        source: vectorSource,
        zIndex: 1,
    });
    map.addLayer(vectorLayer);


    
    markers.forEach(function(marker) {
        var x = marker.x + 0.5;
        var z = - marker.z - 0.5;
        var markerFeature = new ol.Feature({
            geometry: new ol.geom.Point([x, z]),
            name: marker.name,
            dimention: marker.dimention,
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


    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        dimentionMenu.classList.toggle('hidden');
    });

    dimentionMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const id = parseInt(e.target.dataset.id, 10);
            const selected = layers[id];

            for (const layer of currentLayers) {
                map.removeLayer(layer);
            }
            for (const layer of selected.layers) {
                map.addLayer(layer);
            }
            currentLayers = selected.layers;

            currentDimention = id;

            map.setView(selected.view);
            updateMarker(vectorSource);
            map.getView().on('change:resolution', function () {
                updateMarker(vectorSource);
            });

            dimentionMenu.classList.add('hidden');
        }
        e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
        if (!menuButton.contains(e.target) && !dimentionMenu.contains(e.target)) {
            dimentionMenu.classList.add('hidden');
        }
    });

}

document.addEventListener('DOMContentLoaded', async () => {
    markers = await loadCsv();
    getElement();
    addMainLayer(markers);
});
