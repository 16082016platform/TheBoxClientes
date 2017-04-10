/*Mis vars*/
var helpers = require('./utils/widgets/helper');
var enums = require("ui/enums");
var viewModel = require('./components/homeView/homeView-view-model');
/* */

exports.resetCount = function () {
    c = 0;
}
exports.startCount = function (imagen, modelo) {
    //if (!timer_is_on) {
    clearCount();
    timer_is_on = 1;
    timedCount(imagen, modelo);
    //}
}
exports.stopCount = function () {
    clearTimeout(t);
    timer_is_on = 0;
    c = 0;
}

var c = 0, t, timer_is_on = 0, img, model;
function timedCount(imagen, modelo) {
    c++;
    t = setTimeout(function () { timedCount() }, 1000);
    
    if (c == 30) {
        c = 0;
        // clearCount();
        goToInicio();
    }


}
function clearCount() {
    clearTimeout(t);
    timer_is_on = 0;
    c = 0;
}
function goToInicio() {
    c = 0;
    viewModel.set("modalMensaje",false);
    viewModel.set("modalSolicitud",false);
}