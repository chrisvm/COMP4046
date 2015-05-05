// the canvas to be used
var canvas;

// the world scene
var scene;

// the renderer connected to the canvas
var renderer;

function initRendererAndScene () {
    // get the canvas
    canvas = document.getElementById("canvas");

    // init the renderer
    renderer = new THREE.WebGLRenderer({
        'canvas': canvas,
        maxLights: 6,
        preserveDrawingBuffer: true,
        shadowMapEnabled: true
    });

    // set the clear color
    renderer.setClearColor(0xffffff);

    // create the scene
    scene = new THREE.Scene();
}