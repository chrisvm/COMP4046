// current camera selected
var camera;

// all the created cameras
var cameras;

// all the created cameraHelpers and axis helpers
var cameraHelpers;
var axisHelper;

function initCameras(scene) {
    /* Create cameras */
    cameras = [];
    cameraHelpers = [];

    // Note: look in animate() for the setting of cameras position and orientation
    cameras[0] = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.005, 100);
    cameras[1] = new THREE.PerspectiveCamera( 100, canvas.width / canvas.height, 0.005, 100);

    var W = Math.max(maze.w, maze.h);
    cameras[2] = new THREE.OrthographicCamera( -1, W+1, W+1, -1, -10, 10);

    // Define current camera
    var cameraId = 0;
    camera = cameras[cameraId];

    initHelpers();
}

function initHelpers() {
    /* Helpers */
    for (var i = 0; i < cameras.length; i++) {
        cameraHelpers[i] = new THREE.CameraHelper(cameras[i]);
        cameraHelpers[i].visible = false; // Set to true to show cameras positions
        scene.add(cameraHelpers[i]);
    }

    axisHelper = new THREE.AxisHelper(1); // Axis length = 2
    axisHelper.material.linewidth = 7;
    axisHelper.position.set(0,0,0);
    scene.add( axisHelper );
}
