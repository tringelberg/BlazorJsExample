let mapInstance;
let pointsLayer;

export async function updatePointsAsync(points) {
    return new Promise((resolve, _) => {
        let style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({ color: "#ff0000" })
            })
        });

        let pointFeatures = points.map(point => {
            let feature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([point.longitude, point.latitude]))
            });
            feature.setStyle(style);

            return feature;
        });

        mapInstance.removeLayer(pointsLayer);

        pointsLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: pointFeatures
            })
        });

        mapInstance.addLayer(pointsLayer);

        resolve();
    })
}

export async function createMapAsync() {
    return new Promise((resolve, _) => {
        mapInstance = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM(),
                }),
            ],
            target: 'map-container',
            view: new ol.View({
                center: [0, 0],
                zoom: 1,
            }),
        });
        resolve();
    });
}

export function loadOpenLayersAsync() {
    return new Promise(async (resolve, _) => {
        await loadCssAsync("https://cdn.jsdelivr.net/npm/ol@v8.1.0/ol.css");
        await loadScriptAsync("https://cdn.jsdelivr.net/npm/ol@v8.1.0/dist/ol.js");
        resolve();
    });
}

function createPointStyle() {
    return new ol.style.Style({
        image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({ color: "#ff0000" })
        })
    });
}

function loadScriptAsync(src) {
    return new Promise((resolve, _) => {
        const scriptEl = document.createElement("script");
        scriptEl.setAttribute("src", src);
        scriptEl.onload = resolve;
        document.head.appendChild(scriptEl);
    });
}

function loadCssAsync(src) {
    return new Promise((resolve, _) => {
        const styleEl = document.createElement("link");
        styleEl.setAttribute("href", src);
        styleEl.setAttribute("rel", "stylesheet");
        styleEl.onload = resolve;
        document.head.appendChild(styleEl);
    })
}