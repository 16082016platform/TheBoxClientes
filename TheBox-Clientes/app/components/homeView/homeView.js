'use strict';
var isInit = true,
    service = require('./homeView-service'),
    viewModel = require('./homeView-view-model');

var frameModule = require("ui/frame");
var imageModule = require("ui/image");
var color_1 = require("color");
var enums = require("ui/enums");
var http = require("http");
var common = require('~/common.js');
var app = require("application");
var platform = require("platform");

exports.resetCount = function () {
    common.resetCount();
}

var page;
function pageLoaded(args) {
    page = args.object;
    page.bindingContext = viewModel;
    viewModel.set('isLoading', true);
    colorHint();
    common.startCount();
    if (isInit) {
        isInit = false;
    }

    var View = android.view.View;
    if (app.android) {
        var window = app.android.startActivity.getWindow();
        // set the status bar to Color.Transparent
        var decorView = window.getDecorView();
        decorView.setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
            | View.SYSTEM_UI_FLAG_FULLSCREEN // hide status bar
            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
    }
}
exports.pageLoaded = pageLoaded;

exports.tapVideo = function (args) {
    viewModel.set("modalSolicitud", true);
    viewModel.set("modalMensaje", false);
    common.resetCount();
    page.getViewById("enviar").visibility = "visible";
}

function colorHint() {
    var color = new color_1.Color("#aaaaaa"),
        correo = page.getViewById("correo"),
        nombre = page.getViewById("nombre"),
        celular = page.getViewById("celular");
    if (page.android) {
        correo.android.setHintTextColor(color.android);
        nombre.android.setHintTextColor(color.android);
        celular.android.setHintTextColor(color.android);
    }
    else if (page.ios) {
        var placeholder = correo.ios.valueForKey("placeholderLabel");
        placeholder.textColor = color.ios;
        var placeholder = nombre.ios.valueForKey("placeholderLabel");
        placeholder.textColor = color.ios;
        var placeholder = celular.ios.valueForKey("placeholderLabel");
        placeholder.textColor = color.ios;
    }
}



exports.maxLengthCelular = function (args) {
    var textfield = args.object;
    if (textfield.android) {
        var legth = parseInt(9);
        var array = [];
        array[0] = new android.text.InputFilter.LengthFilter(legth);
        textfield.android.setFilters(array);
    } else {
        var legth = parseInt(9);
        var uiTextView = textfield.ios;
        let tf = textfield;
        var newWeakRef = new WeakRef(uiTextView);
        let newDelegate = test.newUITextFieldDelegateImpl.initWithOriginalDelegate(tf._delegate, legth);
        uiTextView.delegate = newDelegate;
        tf._delegate = newDelegate;
    }
}

function textChange(args) {
    common.resetCount();
    var textfield = args.object;
    switch (textfield.id) {
        case "nombre":
            page.getViewById("nombre").color = "#ffffff";
            viewModel.set('validarDni', false);
            break;
        case "correo":
            page.getViewById("correo").color = "#ffffff";
            viewModel.set('validarTelefono', false);
            break;
        default://celular
            page.getViewById("celular").color = "#ffffff";
            viewModel.set('validarCorreo', false);
            break;
    }
}
exports.textChange = textChange;

function validarTextField() {
    limpiarErrores();
    var valido = true;
    if (page.getViewById("nombre").text.length == 0) {
        page.getViewById("nombre").color = "red";
        valido = false;
        viewModel.set('validarNombre', true);
        // var label = page.getViewById("validarNombre");
        animarLabel(page.getViewById("nombre"));
    }

    if (isNaN(page.getViewById("celular").text) || page.getViewById("celular").text.length == 0 || page.getViewById("celular").text.length !== 9) {
        page.getViewById("celular").color = "red";
        valido = false;
        viewModel.set('validarCelular', true);
        // var label = page.getViewById("validarCelular");
        animarLabel(page.getViewById("celular"));
    }

    var correo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(page.getViewById("correo").text);
    if (correo) {
        // valido = true;
    } else {
        page.getViewById("correo").color = "red";
        valido = false;
        viewModel.set('validarCorreo', true);
        // var label = page.getViewById("validarCorreo");
        animarLabel(page.getViewById("correo"));
    }

    return valido;
}

function animarLabel(label) {
    label.translateX = "-100";
    label.animate({
        translate: { x: 0, y: 0 },
        duration: 500,
        curve: enums.AnimationCurve.spring
    })
}


function limpiarErrores() {
    page.getViewById("nombre").color = "#ffffff";
    page.getViewById("celular").color = "#ffffff";
    page.getViewById("correo").color = "#ffffff";

    // page.getViewById("validarDni").visibility = false;
    // page.getViewById("validarTelefono").visibility = false;
    // page.getViewById("validarCorreo").visibility = false;

    viewModel.set('validarNombre', false);
    viewModel.set('validarCelular', false);
    viewModel.set('validarCorreo', false);

}

function limpiarTextFiled() {
    page.getViewById("correo").text = "";
    page.getViewById("celular").text = "";
    page.getViewById("nombre").text = "";
}



exports.tapEnviar = function (args) {
    common.resetCount();

    page.getViewById("nombre").dismissSoftInput();
    page.getViewById("correo").dismissSoftInput();
    page.getViewById("celular").dismissSoftInput();

    if (validarTextField()) {
        var btn = args.object;
        btn.visibility = "collapsed";

        viewModel.set("isLoading", true);


        var tienda = new Array(6);
        tienda[0] = "067334a0-0b1d-11e7-b200-bbf17e89428c";
        tienda[1] = "01cd5340-0b1d-11e7-ac2a-ed032b886c01";
        tienda[2] = "f6f54b30-0b1c-11e7-a2db-17761183e30d";
        tienda[3] = "ef7ce8e0-0b1c-11e7-bff3-eba5aca004cc";
        tienda[4] = "e75c5fb0-0b1c-11e7-ac2a-ed032b886c01";
        tienda[5] = "55163cc0-0b1c-11e7-ac2a-ed032b886c01";
        var i = Math.floor(Math.random() * 5) + 0;

        var solicitud = JSON.stringify({
            "tienda": tienda[i],
            "punto": "1",
            "nombre": page.getViewById("nombre").text,
            "correo": page.getViewById("correo").text,
            "celular": page.getViewById("celular").text,
        });
        http.request({
            url: "https://api.everlive.com/v1/vz6t75zmvcfw57c8/solicitudes",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: solicitud
        }).then(function () {
            sendEmailCliente();
        }, function (e) {
            onRequestFail(e);
        });

    } else {
        viewModel.set("isLoading", false);
    }
} 

function sendEmailCliente() {
    viewModel.set("modalMensaje", true);

    var data = JSON.stringify({
        "TemplateName": "Bienvenida",
        "Recipients": [page.getViewById("correo").text],
        "Context": {
            "NotificationSubject": "Bienvenido a The Box!",
            "MessageBody": page.getViewById("nombre").text
        }
    });

    http.request({
        url: "https://api.everlive.com/v1/vz6t75zmvcfw57c8/Functions/NotifyAdminTemplate",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: data
    }).then(function (response) {
        // viewModel.set("modalSolicitud", true);
        // viewModel.set("modalMensaje", true);
        page.getViewById("nombre").text = "";
        page.getViewById("correo").text = "";
        page.getViewById("celular").text = "";
    }, function (e) {
        onRequestFail(e);
    });
}

function onRequestFail(err) {
    //// alert(JSON.stringify(err));
    errores(err);
    return err;
}

function errores(err) {
    viewModel.set("isLoading", false);
    page.getViewById("enviar").visibility = "visible";
    switch (err.code) {
        case 201:
            alert("Error. DNI ya registrado");
            break;
        case 211:
            alert("Error. Correo ya registrado");
            break;
        default:
            alert("Ocurrio un error, inténtelo nuevamente. Gracias.");
            break;
    }
}


exports.tapGoToTienda = function (args) {
    viewModel.set("modalSolicitud", false);
    viewModel.set("modalMensaje", false);
    viewModel.set("modalTienda", true);
}

exports.tapGoToBack = function (args) {
    var tienda = page.getViewById("tienda");
    if (tienda.url == "https://www.thebox.com.pe/" ) {
        viewModel.set("modalSolicitud", true);
        viewModel.set("modalMensaje", false);
        viewModel.set("modalTienda", false);
    } else {
        tienda.goBack();
    }
}


