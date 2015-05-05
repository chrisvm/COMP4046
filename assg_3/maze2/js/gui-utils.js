// Global variables for the GUI/View
var params = {
    'az0': -20.0,
    'el0': 30.0,
    'd0' : 8.0
};

// dat.GUI instancing
var gui;
function initGUI() {
    gui = new dat.GUI({ autoPlace: true });

    gui.add(params, 'az0').min(-180).max(+180).listen();
    gui.add(params, 'el0').min(-90).max(+90).listen();
    gui.add(params, 'd0').min(+1).max(+100).listen();
}