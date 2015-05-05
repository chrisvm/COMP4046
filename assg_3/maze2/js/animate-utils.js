// last time animate was called
var lastTime = 0;

// time passed since last call
var elapsed = 0;

function animate() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
        elapsed = (timeNow - lastTime)/1000;
    }
    lastTime = timeNow;

    /* Hero collision detection */
    var d2 = dx*dx + dy*dy
    if (d2>0) {
        // If we are moving, check for collisions
        // TODO
    }

    /* Update Hero Position */
    posx += dx * elapsed * 1 / 0.4;    // Move 1 unit in 0.4s
    posy += dy * elapsed * 1 / 0.4;
    az += daz * elapsed * 360 / 2;     // Turn 360 deg in 2s

    if (hero.position && hero.rotation) {
        hero.position.set(posx, posy, 0);
        hero.rotation.set(0, 0, degToRad(az), "ZXY");
    }

    /* Cameras update */
    var az0 = params.az0, el0 = params.el0, d0 = params.d0

    // Uncomment to look at maze center instead of origin
    var target = new THREE.Vector3(0,0,0);
    cameras[0].position.set(
        target.x - d0*Math.cos(degToRad(el0))*Math.sin(degToRad(az0)),
        target.y - d0*Math.cos(degToRad(el0))*Math.cos(degToRad(az0)),
        target.z + d0*Math.sin(degToRad(el0))
    );

    cameras[0].up.set(0,0,1);
    cameras[0].lookAt(target);
    cameras[0].updateMatrixWorld();
    cameraHelpers[0].update();

    cameras[1].position.set(posx,posy, 0.85);
    // Euler angles in ZXY order:
    // First rotate az degrees around Z for the direction, then
    // rotate 90 deg around X to get the direction Z_camera pointing backward
    cameras[1].rotation.set(degToRad(90) + input.mousey, 0, degToRad(az) + input.mousex, "ZXY");
    cameras[1].updateMatrixWorld();
    cameraHelpers[1].update();
}

function tick() {
    requestAnimationFrame(tick);
    input.handle();
    animate();
    renderer.render(scene, camera);
}