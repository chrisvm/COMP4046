// global pointer to the hero
var hero;

function Hero () {
    this.loaded = false;

    if (arguments.length < 0) { return; }

    /* Create hero mesh */
    this.pos = {x:0, y:0};

    this.scene = arguments[0];

    if (arguments.length > 1) {
        // load from file if given
        this.filename = arguments[1];
        this.load_file(this.filename);
    } else {
        // create the geometry
        this.geometry = new THREE.BoxGeometry(0.5,0.3,0.6);
        this.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,0.3));
        this.geometry.merge(new THREE.SphereGeometry(0.2,20,20), new THREE.Matrix4().makeTranslation(0,0,0.8), 0);

        // create the material
        this.material = new THREE.MeshPhongMaterial( {color: 0xff0000} );
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.addMesh();
    }
}

Hero.prototype.load_file = function (filename) {
    var loader = new THREE.JSONLoader();

    var _hero = this;
    loader.load(filename, function (geometry, material) {
        var scale = 0.006;
        var transform = new THREE.Matrix4().makeRotationFromEuler(
            new THREE.Euler(degToRad(90), 0, degToRad(180), "ZXY")
        );
        transform.scale(new THREE.Vector3(scale, scale, scale));
        geometry.applyMatrix(transform);

        _hero.mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(material));
        _hero.addMesh();
    });
};

Hero.prototype.addMesh = function () {

    // add to the scene
    this.scene.add(this.mesh);

    // set pointers to mesh properties
    this.position = this.mesh.position;
    this.rotation = this.mesh.rotation;
    this.position.set(2.0, 2.0, 0);
};