

function AJ_Success(result) {

    //   alert(result);
    xmlschema = result;

}

function jsonCallback(data) {

    //  alert(data);
}

function AJ_Error(result) {

    alert('Error while calling service ' + result);

}


function LoadLocalPage(url, callback) {

    $.get(url, function (data) {

        callback.call(null, data);
    });
}

function AngularAjax(ngHttp, data, callback, options) {
   
    var defaults = {

        Success: AJ_Success,
        Error: function () { },
        jsonCallback: 'jsonCallback',

        Data: {},
        Type: 'GET',
        DataType: 'JSONP',
        Complete: function (d) { alert(d); }
    };
    var options = $.extend(defaults, options);
   
    var url = SERVICE + data;    
    console.log(url);
    if (ngHttp != null) { $(".index-loader").show();
        ngHttp({
           
            method: options.Type, url: SERVICE + data, data: options.Data,           
            headers: {
                "Content-Type":"application/json; charset=utf-8"
            }

        }).success(function (e) {
            $(".index-loader").hide();
            var returnVal;
            try {
                returnVal = JSON.parse(e);
            }
            catch (err) {
                returnVal = e;

            }
            callback.call(null, returnVal);
        }).error(function (err) {
            $(".index-loader").hide();
            alert('Error occured in fetching data..' + err);
        });
    }
}


/*****************************************************************************************************************
    Author       : Manoranjan Dikshit
    Date         : 6 May 2015
    Description  : Function create for check the extension of file.
    Call Method  : checkFileType
    Parameters   : filename(name of the file with extensions) and extensions(pass file type that want to accept)
*****************************************************************************************************************/
function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

function checkFileType(filename, extensions) {
 
    var ext = getExtension(filename);

    for (ind = 0; ind < extensions.length; ind++) {
        if (extensions[ind].toLowerCase() == ext.toLowerCase()) {
            return true;
            break;
        }
    }
    
    return false;
}


