
var _USELOCAL = false

//var SERVICE = _USELOCAL ? 'http://192.168.100.10/sortnew/WebAPI/api/' : 'http://test.protatechindia.com/louisiana/api/api/'
//var SERVER_PATH = _USELOCAL ? 'http://192.168.100.10/sortnew/WebAPI/api/' : 'http://test.protatechindia.com/louisiana/api/api/';

var SERVICE = _USELOCAL ? 'http://localhost:1000/WebApi/api/' : 'http://localhost:1000/WebApi/api/'
var SERVER_PATH = _USELOCAL ? 'http://localhost:1000/WebApi/api/' : 'http://localhost:1000/WebApi/api/';


var LOADING_GIF = 'images/no-image.jpg'
var LOGGEDINUSERID = 0;

function getUrlVars() {

    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function GetData(obj, _url) {

    return data;
}

function CallData(obj, _url, callback, options) {

    var modifiedURL = '';
    if (options != undefined && options.Type == "POST") {
        var info = {};
        var _queryParams = _url.split('|');
        var _queryString = '';
        for (var i = 0; i < _queryParams.length; i++) {
            var param;
            var params = _queryParams[i].split('?');
            param = params.length > 1 ? params[1] : params[0];
            if (params.length > 1) {
                modifiedURL = params[0];
            }
            var prop = $.trim($(obj).prop(param));

            info[param] = prop
            // param = '"' + param + '":"' + prop + '"';
            //  console.log(param + ": " + prop);
            //  params[params.length > 1 ? 1 : 0] = param;
            // _queryParams[i] = param;
        }

        // var data = "{" + _queryParams.join(',') + "}";
        options.Data = JSON.stringify(info);
        console.log(options.Data);

        // alert(options.Data);
    }
    else {

        var _queryParams = _url.split('|');
        var _queryString = '';
        for (var i = 0; i < _queryParams.length; i++) {
            var param;
            var params = _queryParams[i].split('?');
            param = params.length > 1 ? params[1] : params[0];

            var prop = $.trim($(obj).prop(param));
            param += '=' + prop;
            params[params.length > 1 ? 1 : 0] = param;
            _queryParams[i] = params.join('?');

        }

        modifiedURL = _queryParams.join('&');

    }
    AngularAjax(obj.AngularHTTP, modifiedURL, callback, options);

}


var Base64 = {

    keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this.keyStr.charAt(enc1) +
                this.keyStr.charAt(enc2) +
                this.keyStr.charAt(enc3) +
                this.keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    },

    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            window.alert("There were invalid base64 characters in the input text.\n" +
                "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return output;
    }
};

function PreventRefresh() {

    //document.onkeydown = function () {
    //    switch (event.keyCode) {
    //        case 116: //F5 button
    //            event.returnValue = false;
    //            event.keyCode = 0;
    //            return false;
    //        case 82: //R button
    //            if (event.ctrlKey) {
    //                event.returnValue = false;
    //                event.keyCode = 0;
    //                return false;
    //            }
    //    }
    //}
}



