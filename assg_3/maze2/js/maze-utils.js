var emissive_color;
var orbPos;

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function distance(x1,y1,x2,y2) {
    return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
}

function createXYPlaneGeometry (x, y, z, materialIndex) {
    var geometry = new THREE.Geometry();

    var nvertices = geometry.vertices.length;
    geometry.vertices.push(
        new THREE.Vector3(x, y, z),
        new THREE.Vector3(x + 1, y, z),
        new THREE.Vector3(x + 1, y + 1, z),
        new THREE.Vector3(x, y + 1, z)
    );

    var nfaces = geometry.faces.length;
    geometry.faces.push(
        new THREE.Face3(nvertices, nvertices + 1, nvertices + 2, null, null, materialIndex),
        new THREE.Face3(nvertices, nvertices + 2, nvertices + 3, null, null, materialIndex)
    );

    // append UV coordinates to each vertex in each face
    geometry.faceVertexUvs[0].push(
        [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(1, 0),
            new THREE.Vector2(1, 1)
        ],
        [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(1, 1),
            new THREE.Vector2(0, 1)
        ]
    );

    return geometry;
}

function createXZPlaneGeometry (x, y, z, materialIndex) {
    var geometry = new THREE.Geometry();

    var nvertices = geometry.vertices.length;
    geometry.vertices.push(
        new THREE.Vector3(x, y, z),
        new THREE.Vector3(x + 1, y, z),
        new THREE.Vector3(x + 1, y + 1, z),
        new THREE.Vector3(x, y + 1, z)
    );

    var nfaces = geometry.faces.length;
    geometry.faces.push(
        new THREE.Face3(nvertices, nvertices + 1, nvertices + 2, null, null, materialIndex),
        new THREE.Face3(nvertices, nvertices + 2, nvertices + 3, null, null, materialIndex)
    );

    // append UV coordinates to each vertex in each face
    geometry.faceVertexUvs[0].push(
        [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(1, 0),
            new THREE.Vector2(1, 1)
        ],
        [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(1, 1),
            new THREE.Vector2(0, 1)
        ]
    );

    geometry.applyMatrix(
        new THREE.Matrix4().makeRotationFromEuler(
            new THREE.Euler(degToRad(90), degToRad(90), 0, "XYZ")
        )
    );

    return geometry;
}

function createYZPlaneGeometry (x, y, z, materialIndex) {
    var geometry = new THREE.Geometry();

    var nvertices = geometry.vertices.length;
    geometry.vertices.push(
        new THREE.Vector3(x, y, z),
        new THREE.Vector3(x + 1, y, z),
        new THREE.Vector3(x + 1, y + 1, z),
        new THREE.Vector3(x, y + 1, z)
    );

    var nfaces = geometry.faces.length;
    geometry.faces.push(
        new THREE.Face3(nvertices, nvertices + 1, nvertices + 2, null, null, materialIndex),
        new THREE.Face3(nvertices, nvertices + 2, nvertices + 3, null, null, materialIndex)
    );

    // append UV coordinates to each vertex in each face
    geometry.faceVertexUvs[0].push(
        [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(1, 0),
            new THREE.Vector2(1, 1)
        ],
        [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(1, 1),
            new THREE.Vector2(0, 1)
        ]
    );

    geometry.applyMatrix(
        new THREE.Matrix4().makeRotationFromEuler(
            new THREE.Euler(degToRad(90), 0, 0, "XYZ")
        )
    );

    return geometry;
}

function createXYTile (x, y, z, materialIndex) {
    var geometry = createXYPlaneGeometry(x, y, z, materialIndex);
    return new THREE.Mesh(geometry, multimaterials);
}

function createXZTile (x, y, z, materialIndex) {
    var geometry = createXZPlaneGeometry(x, y, z, materialIndex);
    return new THREE.Mesh(geometry, multimaterials);
}

function createYZTile (x,y,z,materialIndex) {
    var geometry = createYZPlaneGeometry(x, y, z, materialIndex);
    return new THREE.Mesh(geometry, multimaterials);
}

function createFloorGeometry (maze) {
    var geometry = new THREE.Geometry();
    var mazeWidth = maze.w, mazeHeight = maze.h;
    var temp, matIndex, x, y;

    for (var index = 0; index < (mazeWidth * mazeHeight); index++) {
        x = index % mazeWidth;
        y = ~~(index / mazeWidth);
        console.log("Creating floor tile with index " + index + " x = " + x + " y = " + y);
        matIndex = maze.floor[index];
        temp = createXYPlaneGeometry(0, 0, 0, matIndex);
        geometry.merge(temp, new THREE.Matrix4().makeTranslation(x, y, 0), matIndex);
    }

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    return geometry;
}

function createFloorMesh(maze) {
    return new THREE.Mesh(createFloorGeometry(maze), multimaterials);
}

function createWallGeometry (maze) {
    var geometry = new THREE.Geometry();
    var mazeWidth = maze.w, mazeHeight = maze.h;
    var matIndex, x, y;

    for (var index = ((mazeWidth + 1) * mazeHeight) - 1; index >= 0; index--) {
        x = index % (mazeWidth + 1);
        y = ~~(index / (mazeWidth + 1));
        if (maze.yzwall[index] != 0) {
            matIndex = maze.yzwall[index];
            geometry.merge(
                createXZPlaneGeometry(0, 0, 0, matIndex),
                new THREE.Matrix4().makeTranslation(x, y, 0),
                matIndex
            );
        }
    }

    for (var index = (mazeWidth * (mazeHeight + 1)) - 1; index >= 0; index--) {
        x = index % mazeWidth;
        y = ~~(index / mazeWidth);
        if (maze.xzwall[index] != 0) {
            matIndex = maze.xzwall[index];
            geometry.merge(
                createYZPlaneGeometry(0, 0, 0, matIndex),
                new THREE.Matrix4().makeTranslation(x, y, 0),
                matIndex
            );
        }
    }

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    return geometry;
}

function createWallMesh(maze) {
    return new THREE.Mesh(createWallGeometry(maze), multimaterials);
}

function createOrbMesh(maze) {
    emissive_color = 0x00aa00;
    var geometry = new THREE.SphereGeometry(0.2, 32, 32);
    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: emissive_color
    });

    var ret = new THREE.Mesh(geometry, material);
    orbPos = new THREE.Vector3(maze.goal.x + 0.5, maze.goal.y + 0.5, 0.5);
    ret.position.copy(orbPos);
    return ret;
}