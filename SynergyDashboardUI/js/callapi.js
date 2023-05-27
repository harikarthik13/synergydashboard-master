var SynergyAPIURL = "http://172.16.2.30:85/synergydashboardapi_dev/api/Synergy/";
var SpreadSheetURL = "http://203.223.189.45/GoogleSheetAPI/GoogleSheetService.svc/";
var companyFilesPath = SynergyAPIURL.replace("api/Synergy/", "") + "companycustomizationfiles/"
var imageFilesPath = SynergyAPIURL.replace("api/Synergy/", "") + "images/"
synergyCallAPI = (function () {
    var _synergyAPICall ={};
    _synergyAPICall.result;

    //GetList
    _synergyAPICall.callGetList = function(selectedData, isAsync, filterData = "", callGetListCallback){
        var result;
        $.ajax({
                url: SynergyAPIURL + "GetData?query=" + selectedData + "&filters=" + filterData,
                type: "GET",
                dataType: 'json',
                async: isAsync,
                headers: {
                    "SecurityToken": localStorage.getItem("securityToken"),
                }
            })
            .done(function(data) {
                result = data.Data;
                callGetListCallback(result);
            })
            .fail(function() {
                alert("fail");
            });
    }

    _synergyAPICall.callGetDecryptedList = function(selectedData, isAsync, filterData = "", encryptedColumns, callGetDecryptedListCallback){
        var result;
        $.ajax({
                url: SynergyAPIURL + "GetData?query=" + selectedData + "&filters=" + filterData + "&encryptedColumns=" + encryptedColumns,
                type: "GET",
                dataType: 'json',
                async: isAsync,
                headers: {
                    "SecurityToken": localStorage.getItem("securityToken"),
                }
            })
            .done(function(data) {
                debugger;
                result = data.Data;
                callGetDecryptedListCallback(result);
            })
            .fail(function() {
                alert("fail");
            });
    }

    //Post Data Call
    _synergyAPICall.postDataCall = function(Request,isAsync, postDataCallCallBack) {
        $.ajax({
                url: SynergyAPIURL + "PostData",
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify(Request),
                dataType: "json",
                async: false,
                headers: {
                    "SecurityToken": localStorage.getItem("securityToken"),
                }
            })
            .done(function(data) {
                $("#imageloader").hide();
                result = data;
                postDataCallCallBack(result);
            })
            .fail(function() {
                alert("fail");
            });
    }

    //Callback for getlist - Async and Sync calls will exist through this function after API calls
    var callGetListSallback = function(e){
        return e;
    }

    //Callback for postData - Async and Sync calls will exist through this function after API calls
    var postDataCallCallBack = function(e){
        return e;
    }

    return _synergyAPICall;
});

//SynergyAPI is a function for this js, all methods public only inside this file will be accessed through this key
var synergyAPI = synergyCallAPI();

$(document).ready(function(){
    //howSyncAsyncWorks();
})

//Used for debugging purpose 
function howSyncAsyncWorks(){
    var filterData = JSON.stringify({
        "IsActive": true
    });
    // console.log("1. Main ThreadStart RRM");
     callGetListAsync('GetRRM', filterData, function(e){
        //  console.log("2. Inside Async function in RRM");
        //  console.log(e)
     });

    //  console.log("3. After Async function in Main thread");

     callGetListSync('GetRRM', filterData, function(e){
        // console.log("4. Inside Sync function in RRM");
     });
    //  console.log("5. After Sync 1 function in Main thread");

    //  console.log("6. Main thread continues after Sync 1");

     callGetListSync('GetRRM', filterData, function(e){
        // console.log("7. Inside Sync function in RRM");
     });
    //  console.log("8. After Sync 1 function in Main thread");
    //  console.log("9. Main thread continues");
}

//Makes a sync call to get the list of requested API
function callGetListSync(selectedData, filterData = "",callGetListSyncCallBack){
    synergyAPI.callGetList(selectedData, false, filterData,function(e){
        callGetListSyncCallBack(e);
    });
}

//Makes a sync call to get the list of requested API
function callGetDecryptedListSync(selectedData, filterData = "",encryptedColumns = "",callGetDecryptedListCallBack){
    synergyAPI.callGetDecryptedList(selectedData, false, filterData,encryptedColumns, function(e){
        callGetDecryptedListCallBack(e);
    });
}

//Makes a async call to get the list of requested API
function callGetListAsync(selectedData, filterData = "", callGetListAsyncCallBack){
    synergyAPI.callGetList(selectedData, true, filterData, function(e){
        callGetListAsyncCallBack(e);
    });
}

//Not to be accessed outside
function callGetListSyncCallBack(e){
    return e;
}

//Not to be accessed outside
function callGetListAsyncCallBack(e){
    return e;
}

//Makes sync call to post the data to the API
function PostDataCallSync(request, PostDataCallSyncCallBack) {
    synergyAPI.postDataCall(request, false, function(e){
        PostDataCallSyncCallBack(e);
    });
}

//Makes async call to post the data to the API
function PostDataCallAsync(request, PostDataCallAsyncCallBack) {
    synergyAPI.postDataCall(request, true, function(e){
        PostDataCallAsyncCallBack(e);
    });
}

//Not to be called outside
function PostDataCallSyncCallBack(e){
    return e;
}

//Not to be called outside
function PostDataCallAsyncCallBack(e){
    return e;
}

/**
 * CallGet list method
 * @deprecated [#1] since version 2.3 [#2].
 */
function callgetlist(selectedData, filterData = "", encryptedColumns = "") { 
    // console.warn("[Deprecation] Synergy CallAPI.js: Function:callgetlist - This function will be deprecated. Use callGetListSync or callGetListAsync for calling Synergy API"); 
    var result;
    //console.log(SynergyAPIURL + "GetData?query=" + selectedData + "&filters=" + filterData);
    $.ajax({
            url: SynergyAPIURL + "GetData?query=" + selectedData + "&filters=" + filterData + "&encryptedColumns=" + encryptedColumns,
            type: "GET",
            dataType: 'json',
            async: false,
            headers: {
                "SecurityToken": localStorage.getItem("securityToken"),
            }
            //headers: myHeaders,

        })
        .done(function(data) {
            //console.log(data)
            result = data.Data;
        })
        .fail(function() {
            alert("fail");
        });

    return result;
}

//Generic devextreme Grid Json. Parameter send unique gridName
function getDevExtremeGridJson(gridName){
    var dataGrid = {
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        stateStoring: {
            enabled: true,
            type: "localStorage",
            storageKey: gridName
        },
        export: {
            enabled: true,
            allowExportSelectedData: true
        },
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Search..."
        },
        headerFilter: {
            visible: true
        },
        filterPanel: { visible: true },
        allowColumnReordering: true,
        showBorders: true,
        columnAutoWidth: true,
        rowAlternationEnabled: true,
        allowColumnResizing: true,
        grouping: {
            autoExpandAll: true,
        },
        selection: {
            mode: "multiple"
        },
           summary: {
            totalItems: [],
            groupItems: []
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 20],
            showInfo: true
        },
        paging: {
            pageSize: 10
        },
        groupPanel: {
            visible: true,
            emptyPanelText: "Drag a column"
        },
        sorting: {
            mode: "multiple"
        },

        editing: {
            mode: "popup",
            allowAdding: false,
            allowUpdating: false,
            useIcons: true
        },
        columnChooser: {
            enabled: true
        },
        
        columnFixing: {
            enabled: true
        },
        columns: []
    }

    return dataGrid;
}

function callgetlist_login(selectedData, filterData = "") {
    var result;
    $.ajax({
            url: SynergyAPIURL + "GetData?query=" + selectedData + "&filters=" + filterData,
            type: "GET",
            dataType: 'json',
            async: false
        })
        .done(function(data) {
            result = data.Data;
        })
        .fail(function() {
            alert("fail");
        });

    return result;
}

function callgetlist_json() {
    var result;
    $.ajax({
            url: "json/project_list.json",
            type: "GET",
            dataType: 'json',
            async: false
        })
        .done(function(data) {
            result = data.Data;
        })
        .fail(function() {
            alert("fail");
        });
    return result;
}

function project_details_json(selectedValue) {
    var result;
    $.ajax({
            url: "json/project_detail.json",
            type: "GET",
            dataType: 'json',
            async: false
        })
        .done(function(data) {
            result = data.Data;
        })
        .fail(function() {
            alert("fail123");
        });
    return result;
}

//Post ajax request 445//

/**
 * PostDataCall list method
 * @deprecated [#1] since version 2.3 [#2].
 */
function PostDataCall(Request) {
    // console.warn("[Deprecation] Synergy CallAPI.js Function:PostDataCall - This function will be deprecated. Use PostDataCallSync or PostDataCallAsync for calling Synergy API"); 
    $(".loader").show();
    $.ajax({
            url: SynergyAPIURL + "PostData",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(Request),
            dataType: "json",
            async: false,
            headers: {
                "SecurityToken": localStorage.getItem("securityToken"),
            }
        })
        .done(function(data) {
            $("#imageloader").hide();
            $(".loader").hide();
            result = data;
        })
        .fail(function() {
            $(".loader").hide();
            alert("fail");
        });
    //console.log(result);
    return result;
}


function PostDataCall_login(Request) {
    $.ajax({
            url: SynergyAPIURL + "PostData",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(Request),
            dataType: "json",
            async: false

        })
        .done(function(data) {
            $("#imageloader").hide();
            result = data;
        })
        .fail(function() {
            alert("fail");
        });
    //console.log(result);
    return result;
}
//Post ajax request 445//

function callgetSpreadSheetData(spreadsheetId,SheetValue) { 
    var result;
    $.ajax({
            url: SpreadSheetURL + "getsheetdata?spreadsheetId=" + spreadsheetId + "&range=" + SheetValue,
            type: "GET",
            dataType: 'json',
            async: false

        })
        .done(function(data) {
            //console.log(data)
            result = data;
        })
        .fail(function() {
            alert("fail");
        });

    return result;
}

function callgetDirectoryList() { 
    var result;
    $.ajax({
            url: SynergyAPIURL + "GetFileDirectories",
            type: "GET",
            dataType: 'json',
            async: false

        })
        .done(function(data) {
            //console.log(data)
            result = data.Data;
        })
        .fail(function() {
            alert("fail");
        });

    return result;
}

function postFileGeneric(formData){
    
    var result;
    $.ajax({
        url: SynergyAPIURL + "PostFile",
        type: 'POST',
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        dataType: false,
        processData: false,
        data: formData,
        headers: {
          "SecurityToken": localStorage.getItem("securityToken"),
        }
        })
        .done(function(data) {
           // console.log(data)
            result = data.Data;
        })
        .fail(function() {
            alert("fail");
        });
        return result;
}
async function postCompanyCustamiziation(formData){
    var result;
    await $.ajax({
        url: SynergyAPIURL + "SaveCompanyConfiguration",
        type: 'POST',
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        dataType: false,
        processData: false,
        data: formData,
        headers: {
          "SecurityToken": localStorage.getItem("securityToken"),
        }
        })
        .done(function(data) {
           // console.log(data)
            result = data.Data;
        })
        .fail(function() {
            alert("fail");
        });
    return result;
}

function postFileGenericrpm(formData){
    var result;
    $.ajax({
        url: SynergyAPIURL + "PostFile",
        type: 'POST',
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        dataType: false,
        processData: false,
    	data: {contentDetails:formData.contentDetails,content:formData.content},
        headers: {
          "SecurityToken": localStorage.getItem("securityToken"),
        }
        })
        .done(function(data) {
            //console.log(data)
            result = data.Message;
        })
        .fail(function() {
            alert("fail");
        });
        return result;
}

function sendMessage(messageFormData){
    var result;
        $.ajax({
        url: SynergyAPIURL + "SendMessage",
        type: 'POST',
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        dataType: false ,
        processData: false,
        data: messageFormData,
        headers: {
        "SecurityToken": localStorage.getItem("securityToken"),
        }
    })
    .done(function(data) {
        console.log(data)
        result = data;
    })
    .fail(function() {
        alert("fail");
    });
    
    return result;
}

function convertDateFormatForRRMGrid(date){
    if(date != null && date != ""){
        var date=date;
        var dates = date.toLocaleString().split(",")[0];
        var getDate = dates.split("/")[0];
        if(getDate.length == 1){
            dates= "0"+ dates;
        }
        var dateChanged= dates.replace(/\//g, "-");
        dateChanged=dateChanged.replace("T00:00:00","");	
        dateChanged = dateChanged.split('-');
    
            var mm=parseInt(dateChanged[1]);
            var month=(moment().month(mm-1).format("MMM"));
            dateChanged=dateChanged[0]+"-"+month+"-"+dateChanged[2];
            return dateChanged;
    }
}


function GenerateEmployeeProfilePictures(selectedData,filters = null){
    var result;
    $.ajax({
            url: SynergyAPIURL + "GenerateEmployeeProfilePictures?query=" + selectedData + "&filters={}",
            type: "GET",
            dataType: 'json',
            async: false,
            headers: {
                "SecurityToken": localStorage.getItem("securityToken"),
            }
        })
        .done(function(data) {
            result = data.Data;
        })
    return result;
}