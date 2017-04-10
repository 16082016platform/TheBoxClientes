'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
ViewModel = new Observable({
    isLoading: false,
    modalSolicitud: false,
    modalMensaje: false,

    validarNombre: false,
    validarCorreo: false,
    validarCelular: false,
});
module.exports = ViewModel;