$(document).ready(function () {
    getOfferDispatchedCandidates();
});
var offerIdForUpdate  = ""
function getOfferDispatchedCandidates(){
    var filterData = JSON.stringify({
        IsActive: true,
    });
    
    callGetListSync("GetOfferDispatchedCandidates", filterData, function (e) {
        bindOfferDispatchedCandiadtesGrid(e)
    });   
}

function bindOfferDispatchedCandiadtesGrid(data){
    var offerDispatchGrid = $("#sdgd-rrmOfferDispatch").dxDataGrid({
        dataSource:data,
        filterRow: {
          visible: true,
          applyFilter: "auto"
          },
          repaintChangesOnly: true,
          highlightChanges: true,
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
          allowColumnResizing:true,
          showBorders: true,
          //columnAutoWidth: true,
          grouping: {
              autoExpandAll: true,
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
              emptyPanelText: "Drag a column header here to group by that column"
          },
          sorting: {
              mode: "multiple"
          },
          selection: {
              mode: "multiple"
          },
          editing: {
              mode: "popup",
              allowAdding: false,
              allowUpdating: false,
              useIcons: true
          },
          columnChooser: {
              enabled: true,
              mode:"select"
          },
          summary: {
              totalItems: [{
                  column: "RRMNo",
                  summaryType: "count"
              }
              // ...
              ],
              groupItems: [{
                  column: "RRMNo",
                  summaryType: "count"
              }]
          },
          rowAlternationEnabled: true,
          columnChooser: {
              enabled: true,
          },  
        onExporting: function (e) {
          var workbook = new ExcelJS.Workbook();
          var worksheet = workbook.addWorksheet("RRM Offer Dispatch");
    
          DevExpress.excelExporter
            .exportDataGrid({
              component: e.component,
              worksheet: worksheet,
              autoFilterEnabled: true,
              customizeCell: function (options) {
                var gridCell = options.gridCell;
                var excelCell = options.excelCell;
                if(!gridCell) {
                    return;
                }
                if (gridCell.rowType === "header") {
                    excelCell.font = { color: { argb: 'FFFFFF' } };
                    excelCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "757171" }, bgColor: { argb: "757171" } };
                    excelCell.alignment = { horizontal: 'left' };
                }
                if(gridCell.rowType === "data") {
                    if(gridCell.column.dataField === "IsConsultant") {
                        excelCell.font = { color: { argb: 'FFFFFF' } };
                        var dataVal = gridCell.data.IsConsultant;
                        if(dataVal === true){
                            excelCell.value = "Consultant"
                            excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "337AB7" } };
                        }
                        if(dataVal === false){
                            excelCell.value = "Full Time"
                            excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "5CB85C" } };
                        }
                    }
                    if(gridCell.column.dataField === "IsApprovedByHead") {
                        excelCell.font = { color: { argb: 'FFFFFF' } };
                        var dataVal = gridCell.data.IsApprovedByHead;
                        if(dataVal === 0){
                            excelCell.value = "Yet to accept"
                            excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "F0AD4E" } };
                        }
                        if(dataVal === 1){
                            excelCell.value = "Rejected"
                            excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "D9534F" } };
                        }
                        if(dataVal === 2){
                            excelCell.value = "Accepted"
                            excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "5CB85C" } };
                        } 
                    }
                }
              },
            })
            .then(function(dataGridRange) {
              setBorders( worksheet, dataGridRange);
              return Promise.resolve();
            })
            .then(function () {
              workbook.xlsx.writeBuffer().then(function (buffer) {
                saveAs(
                  new Blob([buffer], { type: "application/octet-stream" }),
                  "RRMOfferDispatch.xlsx"
                );
              });
            });
          e.cancel = true;
        },
        onToolbarPreparing: function (e) {
          var dataGrid = e.component;
          e.toolbarOptions.items.unshift({
            location: "after",
            widget: "dxButton",
            options: {
              icon: "refresh",
              onClick: function () {
                getOfferDispatchedCandidates();
              },
            },
          });
        },
        columns: [
            {
                dataField: "Sno",
                caption: "#",
                alignment:"left",
                width:70,
                cellTemplate: function (container, options) {
                  container.text(
                    offerDispatchGrid.pageIndex() * offerDispatchGrid.pageSize() + options.rowIndex + 1
                  );
              },
            },
            {
              dataField: "Id",
              caption: "Offer Id",
              visible: false
            },
            {
                dataField: "CandidateName",
                caption: "Candidate Name"
            },
            {
                dataField: "RRMNo",
                caption: "RRM No",
                cellTemplate: function (container, options) {  
                  var domActions = "";
                  domActions += "<a style='cursor:pointer' class='rrmdetailOfferDispatch' data-rrmid =" + options.data.RRMId + ">"+options.data.RRMNo+"</a>";
                  $("<div class='text-left'>").append($(domActions)).appendTo(container);
                }
            },
            {
                dataField: "RequirementName",
                caption: "Requirement Name",
                cellTemplate: function (container, options) {  
                  var domActions = "";
                  domActions += "<a style='cursor:pointer' class='rrmdetailOfferDispatch' data-rrmid =" + options.data.RRMId + ">"+options.data.RRMNo+"</a>";
                  $("<div class='text-left'>").append($(domActions)).appendTo(container);
                }
            },      
            {
                dataField: "ExpectedJoiningDate",
                caption: "Expected Joining Date",
                allowEditing: false,
                dataType :"date",
                allowFiltering: true,
                cellTemplate: function(container,options){
                    var rrmDate = convertDateFormatForRRMGrid(options.value)
                    $("<div>&nbsp")
                    .append(rrmDate)
                    .appendTo(container);
        }
            },
            {
              dataField: "IsConsultant",
              caption: "Full Time/Consultant",
              cellTemplate: function(container, options) {
                var fieldData = options.data.IsConsultant;
                if (fieldData == true) {
                    var html = "<label class='label label-primary m-l-sm'>Consultant</label>";
                }
                else if(fieldData == false) {
                    var html = "<label class='label label-success m-l-sm'>Full Time</label>";
                }
                $(html).appendTo(container);
              }
            },
            {
                dataField: "IsApprovedByHead",
                caption: "Approval Status",
                alignment:"left",
                cellTemplate: function (container, options) {
                    var fieldData = options.data.IsApprovedByHead;
                    if (fieldData == 0) {
                        var html = "<label class='label label-warning m-l-sm'>Yet to accept</label>";
                    }
                    else if(fieldData == 1) {
                        var html = "<label class='label label-danger m-l-sm'>Rejected</label>";
                    }
                    else if(fieldData == 2){
                        var html = "<label class='label label-success m-l-sm'>Accepted</label>";
                    }
                    $(html).appendTo(container);
                }, fixedPosition: "right"

            },
            {
              dataField: "Id",
              caption: "Action",
              allowGrouping: false,
              width:80,
              allowCollapsing: false,
              allReordering:false,
              allowFiltering: false,
              fixedPosition: "right", allowExporting: false,
              cellTemplate: function (container, options) {
                  var fieldData = options.data.Id;
                  var candiateId = options.data.CandidateId;
                  var rrmId = options.data.RRMId;      
                  if(options.data.IsApprovedByHead == 0){
                    var html = "<button class='btn btn-xs btn-primary edit-btn' onclick=editOfferDispatch('"+fieldData+"','"+candiateId+"','"+rrmId+"')><i title='Edit Offer' class='fas fa-edit'></i></button>";
                  }  
                  else{
                    var html = "<button class='btn btn-xs btn-primary edit-btn' onclick=viewOfferDispatch('"+fieldData+"','"+candiateId+"','"+rrmId+"')><i title='View Offer' class='fas fa-eye'></i></button>";
                    html += "<button class='btn btn-xs btn-primary edit-btn' onclick=deleteOfferDispatch('"+fieldData+"')><i title='Delete Offer' class='fas fa-trash'></i></button>";
                  }           
                  $(html).appendTo(container);          
              }, fixedPosition: "right", allowExporting:false
          }
        ]
      }).dxDataGrid("instance");
}

function getCandidatesForOfferDispatch(){
    var filterData = JSON.stringify({
        IsActive: true,
    });
    
    callGetListSync("GetCandidatesForOfferDispatch", filterData, function (data) {
        $("#sdd-CandidateForOfferDispatch").dxDropDownBox({
            valueExpr: "ValueExpression",
            placeholder: "Select a Candidate",
            displayExpr: "CandidateName",
            displayExpr: function(item){
              return item && item.RRMNo + "--->" + item.CandidateName;
            },
            showClearButton: false,
            dataSource: data,
            dropDownOptions: {
                width: 400
            },
            value:"",
            readOnly:false,            
            contentTemplate: function (e) {
                var value = e.component.option("value"),
                    $dataGrid = $("<div>").dxDataGrid({
                        dataSource: e.component.option("dataSource"),
                        columns: [
                            {
                                dataField:"RRMNo",
                                caption:"RRM No"
                            },
                            {
                                dataField:"CandidateName",
                                caption:"Candidate Name",
                                alignment:"right"
                            },
                            {
                                dataField:"InterviewScheduleId",
                                visible:false
                            },
                        ],
                        hoverStateEnabled: true,
                        paging: { enabled: true, pageSize: 10 },
                        filterRow: { visible: true },
                        scrolling: { mode: "infinite" },
                        height: 345,
                        selection: { mode: "single" },
                        selectedRowKeys: value,
                        onSelectionChanged: function (selectedItems) {
                            candidateSelectionChanged(selectedItems, e)
                        }
                    });

                dataGrid = $dataGrid.dxDataGrid("instance");
                
                e.component.on("valueChanged", function (args) {
                    var value = args.value;
                    dataGrid.selectRows(value, false);
                });

                return $dataGrid;
            }
        });
    });
        
}

function initializeDevExtremeControlsForOfferDispatch(id){    
  
    $("#sdtxt-CurrentForOfferDispatch").dxNumberBox({
        placeholder: "Current",
        readOnly:false,
        min:1,
        value:1
    });

    $("#sdtxt-ApproximateCTCForOfferDispatch").dxNumberBox({
        placeholder: "Approximate",
        readOnly:false,
        min:1,
        value:1
    });

    $("#sddb-ExpectedJoiningDateOfferDispatch").dxDateBox({
        type: "date",
        displayFormat:"dd MMM yyyy",
        value: new Date(),
        acceptCustomValue: false,
        readOnly:false,
        min: new Date(),

    });    

    if(id == null ){
      $("#sdchk-IsConsultantOfferDispatch").dxSwitch({
     
        switchedOnText:"Yes",
        switchedOffText:"No",
        readOnly:false,
        value:false,
       
        onValueChanged(data) {
          ConsultantfunctionforOfferDispatch (data.value); 
          // if(data.value == true)
          // {
          //   $("#sdr-ConsultantTypeOfferDispatch").dxRadioGroup("instance").option("visible",true);
          //  $("#ConsultantHoursOfferDispatch").show();
          //  $("#sdr-ConsultantHoursOfferDispatch").dxNumberBox("instance").option("visible",true);
          //  $("##sdtxt-ExpectedCTCForOfferDispatch").dxNumberBox("instance").option("visible",true);
           
          // }
          // else
          // {
          //   $("#sdr-ConsultantTypeOfferDispatch").dxRadioGroup("instance").option("visible",false);
          //  $("#ConsultantHoursOfferDispatch").hide();
          //  $("#ssdr-ConsultantHoursOfferDispatch").dxNumberBox("instance").option("visible",false);
          //  $("##sdtxt-ExpectedCTCForOfferDispatch").dxNumberBox("instance").option("visible",false);
          // }
        },
        
      }).dxSwitch('instance');
    }
    else{
      $("#sdchk-IsConsultantOfferDispatch").dxSwitch({
     
        switchedOnText:"Yes",
        switchedOffText:"No",
        readOnly:false,
       
        onValueChanged(data) {
          ConsultantfunctionforOfferDispatch (data.value); 
          // if(data.value == true)
          // {
          //   $("#sdr-ConsultantTypeOfferDispatch").dxRadioGroup("instance").option("visible",true);
          //  $("#ConsultantHoursOfferDispatch").show();
          //  $("#sdr-ConsultantHoursOfferDispatch").dxNumberBox("instance").option("visible",true);
          //  $("##sdtxt-ExpectedCTCForOfferDispatch").dxNumberBox("instance").option("visible",true);
         
          // }
          // else
          // {
          //   $("#sdr-ConsultantTypeOfferDispatch").dxRadioGroup("instance").option("visible",false);
          //  $("#ConsultantHoursOfferDispatch").hide();
          //  $("#ssdr-ConsultantHoursOfferDispatch").dxNumberBox("instance").option("visible",false);
          //  $("##sdtxt-ExpectedCTCForOfferDispatch").dxNumberBox("instance").option("visible",false);
         
          // }
        },
        
      }).dxSwitch('instance');
    }
   
    function ConsultantfunctionforOfferDispatch(dataValue){
      debugger
      if(dataValue == true)
      {
      $("#sdr-ConsultantTypeOfferDispatch").dxRadioGroup("instance").option("visible",true);
       $("#ConsultantHoursOfferDispatch").show();
       $("#sdr-ConsultantHoursOfferDispatch").dxNumberBox("instance").option("visible",true);
       $("#ExpectedCTCdivOfferDispatch").hide();
       $("#sdtxt-ExpectedCTCForOfferDispatch").dxNumberBox("instance").option("visible",false);     
       
      }
      else
      {
      $("#sdr-ConsultantTypeOfferDispatch").dxRadioGroup("instance").option("visible",false);
      $("#ConsultantHoursOfferDispatch").hide();
      $("#sdr-ConsultantHoursOfferDispatch").dxNumberBox("instance").option("visible",false);
      $("#ExpectedCTCdivOfferDispatch").show();
      $("#sdtxt-ExpectedCTCForOfferDispatch").dxNumberBox("instance").option("visible",true);
      }
    }

    $("#sdchk-IsConsultantOfferDispatch").dxSwitch("instance").option("disabled",false);

    var IsConsultantValue = $("#sdchk-IsConsultantOfferDispatch").dxSwitch("instance").option("value");

    const ConsultantType = [
      { id: true, text: 'FullTime Consultant' },
      { id: false, text: 'PartTime Consultant' }];
  
      if(IsConsultantValue == false)
      {
        $("#ConsultantHoursOfferDispatch").hide();
      }
      else
      {
        $("#ConsultantHoursOfferDispatch").show();
      }
  
      $("#sdr-ConsultantTypeOfferDispatch").dxRadioGroup({
        items: ConsultantType,
        layout: 'horizontal',   
        visible: IsConsultantValue == false ? false : true ,    
        valueExpr: 'id',
        displayExpr: 'text', 
     }).dxRadioGroup('instance');
  
     $("#sdr-ConsultantHoursOfferDispatch").dxNumberBox({     
      readOnly:false,
       min:1,       
       visible:IsConsultantValue == false ? false : true,
      }).dxNumberBox('instance');
  
      
      $("#sdtxt-ExpectedCTCForOfferDispatch").dxNumberBox({
        placeholder: "Expected",
        readOnly:false,
        min:1,
        value:1,
        visible : IsConsultantValue == false ? true : false , 
    }).dxNumberBox('instance');


    $("#sdtxt-NotesOfferDispatch").dxHtmlEditor({
        height: 300,
        toolbar: {
            items: [
                "undo", "redo", "separator",
                {
                    formatName: "size",
                    formatValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"] },
                {
                    formatName: "font",
                    formatValues: ["Arial", "Courier New", "Georgia", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Verdana"]
                },
                "separator", "bold", "italic", "strike", "underline", "separator",
                "alignLeft", "alignCenter", "alignRight", "alignJustify", "separator",
                "orderedList", "bulletList", "separator",
                {
                    formatName: "header",
                    formatValues: [false, 1, 2, 3, 4, 5]
                }, "separator",
                "color", "background", "separator",
                "link", "image", "separator",
                "clear", "codeBlock", "blockquote"
            ]
        },
        mediaResizing: {
            enabled: true
        },
        value:"",
        readOnly:false
    });
}

function addOfferDispatch(){
    $('#RRMOfferModal').appendTo("body").modal("show");
    $("#rrm_OfferDispatchTab").click();
    $("#rrm_OfferDispatchInterviewHistoryAccordian").html("<h3>Select a candidate to view interview history</h3>")
    $("#OfferDispatchType").html("- New")
    $("#offerId").html("")
    $("#btnUpdateOfferDispatch").hide();
    $("#btnSaveOfferDispatch").show();
    $("#lbl-IsOfferApproved").hide();
    $("#OfferApprovedStatus").html("")
    var id = null;
    initializeDevExtremeControlsForOfferDispatch();
    getCandidatesForOfferDispatch();
    $("#rrmDetailsOfferDispatchDiv").hide();
    $("#rrmDetailsOfferDispatchDivTitle").show();
    offerIdForUpdate = null;
    getOfferDispatchedCandidates();

}

function editOfferDispatch(id,candidateId,rrmId){
  $('#RRMOfferModal').appendTo("body").modal("show");
  $("#rrm_OfferDispatchTab").click();
  $("#OfferDispatchType").html("- Edit")
  $("#btnUpdateOfferDispatch").show();
  $("#btnSaveOfferDispatch").hide();
  var filterData = JSON.stringify({
    OfferId:id,
    IsActive: true
  });
  //var encryptedColumns = JSON.stringify(["CurrentCTC", "ApproximateCTC", "Notes"])

  var encryptedColumns = JSON.stringify(["CurrentCTC", "ApproximateCTC", "ExpectedCTC", "Notes"])

  initializeDevExtremeControlsForOfferDispatch(id);
  $("#rrmDetailsOfferDispatchDiv").show();
  $("#rrmDetailsOfferDispatchDivTitle").hide();
  getRRMDetailsForOfferDispatch(rrmId);
  callGetDecryptedListSync("GetOfferDispatchedCandidatesById", filterData,encryptedColumns, function (e) {
    var data = e[0];
    try{
      $("#sdd-CandidateForOfferDispatch").dxDropDownBox("dispose")
    }
    catch(e){
      
    }
    $("#sdd-CandidateForOfferDispatch").dxTextBox({
      readOnly:true,
      value:data.RRMNo+"--->"+data.CandidateName
    })
    // if(data.IsConsultant == true){
    //   $("#sdtxt-ApproximateCTCForOfferDispatch").dxNumberBox("instance").option("value",data.ApproximateHourlyPay);
    // }
    // if(data.IsConsultant == false){
    //   $("#sdtxt-ApproximateCTCForOfferDispatch").dxNumberBox("instance").option("value",data.ApproximateCTC);
    // }    

    if(data.IsConsultant == false){
      $("#sdtxt-ExpectedCTCForOfferDispatch").dxNumberBox("instance").option("value",data.ExpectedCTC);
    }

    $("#sdtxt-CurrentForOfferDispatch").dxNumberBox("instance").option("value",data.CurrentCTC);
    $("#sddb-ExpectedJoiningDateOfferDispatch").dxDateBox("instance").option("value",data.ExpectedJoiningDate);
    $("#sdchk-IsConsultantOfferDispatch").dxSwitch("instance").option("value",data.IsConsultant);
    $("#sdtxt-NotesOfferDispatch").dxHtmlEditor("instance").option("value",data.Notes);
    $("#sdr-ConsultantHoursOfferDispatch").dxNumberBox("instance").option("value",data.ConsultantHours);
    $("#sdr-ConsultantTypeOfferDispatch").dxRadioGroup("instance").option("value",data.IsFullTimeConsultant);
    
    if(data.IsApprovedByHead == 0){
      $("#OfferApprovedStatus").html("<div class='alert alert-info' role='alert'><b>Yet To Accept</b></div>")
    }
    if(data.IsApprovedByHead == 2){
      $("#OfferApprovedStatus").html("<div class='alert alert-success' role='alert'><b>Accepted</b></div>")
    }
    if(data.IsApprovedByHead == 1){
      $("#OfferApprovedStatus").html("<div class='alert alert-danger' role='alert'><b>Rejected</b></div>")
    }
    $("#lbl-IsOfferApproved").show();
    
    offerIdForUpdate = data.Id
  });   
  var filterData2 = JSON.stringify({
    "CandidateId":candidateId,
    "IsActive": true
  }); 
  callGetListSync("GetInterviewHistoryDetails", filterData2, function (data) {
    mapOfferDispatchPreviousInterviews(data)
  });   

  getOfferDispatchedCandidates();
}

function candidateSelectionChanged(selectedItems, e) {
    var keys = selectedItems.selectedRowKeys;
    var hasSelection = keys.length;
    if (keys.length > 0) {  
      e.component.option('value', keys[0].CandidateId+","+keys[0].RRMId+","+keys[0].InterviewScheduleId);    
        if (hasSelection) {
            e.component.close();
        }
        $("#rrmDetailsOfferDispatchDiv").show();
        $("#rrmDetailsOfferDispatchDivTitle").hide();
      getRRMDetailsForOfferDispatch(keys[0].RRMId)
      var filterData2 = JSON.stringify({
        "CandidateId":keys[0].CandidateId,
        "IsActive": true
      }); 
      callGetListSync("GetInterviewHistoryDetails", filterData2, function (data) {
        mapOfferDispatchPreviousInterviews(data)
      }); 
    }
}

function saveOfferDispatch(){
  var dropDownValue = $("#sdd-CandidateForOfferDispatch").dxDropDownBox("instance").option("value");
 //var ApproximateCTC = $("#sdtxt-ApproximateCTCForOfferDispatch").dxNumberBox("instance").option("value") == null ? 0 :$("#sdtxt-ApproximateCTCForOfferDispatch").dxNumberBox("instance").option("value");
  var ExpectedCTC = $("#sdtxt-ExpectedCTCForOfferDispatch").dxNumberBox("instance").option("value") == null ? 0 : $("#sdtxt-ExpectedCTCForOfferDispatch").dxNumberBox("instance").option("value");
  var currentCTC = $("#sdtxt-CurrentForOfferDispatch").dxNumberBox("instance").option("value") == null ? 0 : $("#sdtxt-CurrentForOfferDispatch").dxNumberBox("instance").option("value");
  var expectedJoiningDate = $("#sddb-ExpectedJoiningDateOfferDispatch").dxDateBox("instance").option("value");
  var isConsultant = $("#sdchk-IsConsultantOfferDispatch").dxSwitch("instance").option("value");
  var IsFullTimeConsultant = $("#sdr-ConsultantTypeOfferDispatch").dxRadioGroup("instance").option("value");

  if(IsFullTimeConsultant == true)
  {
    IsFullTimeConsultant = true
  }
  else
  {
    IsFullTimeConsultant = false;
  }

  var ConsultantHours = $("#sdr-ConsultantHoursOfferDispatch").dxNumberBox("instance").option("value");

  var Notes = $("#sdtxt-NotesOfferDispatch").dxHtmlEditor("instance").option("value");

 // if(dropDownValue == null || dropDownValue == undefined || dropDownValue == "" || ApproximateCTC == null || ApproximateCTC == undefined || ApproximateCTC == ""){
  if(dropDownValue == null || dropDownValue == undefined || dropDownValue == "" || dropDownValue == ''){
    $("#err-CandidateOfferDispatch").html("Please Select Candidate");
  }
    // if(ApproximateCTC == null || ApproximateCTC == undefined || ApproximateCTC == ""){
    //   $("#err-ApproximateCTCOfferDispatch").html("Please enter Expected")
    // }
  //}
  // if( == null || ExpectedCTC ==undefined ||  ExpectedCTC == ""){
  //   $("#err-ExpectedCTCOfferDispatch").html("Please enter Expected")
  // }

  // if(ExpectedCTC == null || ExpectedCTC ==undefined ||  ExpectedCTC == ""){
  //   $("#err-ExpectedCTCOfferDispatch").html("Please enter Expected")
  // }

  else if(Notes == null || Notes ==undefined ||  Notes == ""){
    $("#err-CandidateOfferDispatchNotes").html("Please Enter Notes");
  }
  else{
    $("#err-CandidateOfferDispatch").html("") 
    $("#err-CandidateOfferDispatchNotes").html("");
    $("#err-ApproximateCTCOfferDispatch").html("")
    var id = null;
    var candidateId = dropDownValue.split(",")[0]
    var rrmId = dropDownValue.split(",")[1]
    var interviewScheduleId = dropDownValue.split(",")[2]
    var RRMOfferDispatchSaveData = {
      Id:id,
      RRMId:rrmId,
      CandidateId:candidateId,
      InterviewScheduleId:interviewScheduleId,
      // CurrentCTC: currentCTC,
      // ApproximateCTC: ApproximateCTC,
      ExpectedJoiningDate: expectedJoiningDate,
      IsOfferApproved: 0,
      IsConsultant : isConsultant,
      IsFullTimeConsultant : IsFullTimeConsultant,
      ConsultantHours: ConsultantHours == null ? 0 : ConsultantHours,      
      // Notes: Notes,
      IsActive:1
    };

    debugger
    var RRMOfferDispatchSavePostCallData = {
      
        Method: "PostCandidateOfferDispatch",
    
        Data: RRMOfferDispatchSaveData,
        EncryptData:{
          CurrentCTC: currentCTC.toString(),
          ExpectedCTC : ExpectedCTC.toString(),
          ApproximateCTC: 0,
          Notes: Notes,
        }
    };

    var RRMOfferDispatchPostResult = PostDataCall(RRMOfferDispatchSavePostCallData);
    if(RRMOfferDispatchPostResult["IsSuccess"] != true){
      var RRMOfferDispatchPostSwal = {
        title: "OOPS",
        text: RRMOfferDispatchPostResult['Message'],
        icon: 'error'
      }
    }
      
    if(RRMOfferDispatchPostResult["IsSuccess"] == true){
      var RRMOfferDispatchPostSwal = {
        title: "Success",
        text: RRMOfferDispatchPostResult['Message'],
        icon: 'success'
      }      
    }
    rrmOfferDispatchSwal(RRMOfferDispatchPostSwal);
    $('#RRMOfferModal').modal("hide");
    getOfferDispatchedCandidates();
    resetOfferDispatch()
  }
}


function rrmOfferDispatchSwal(data){
  swal({
    title: data.title,
    text: data.text,
    icon: data.icon,
    button:"OK"
  });   
}

function updateOfferDispatch(){
  //var ApproximateCTC = $("#sdtxt-ApproximateCTCForOfferDispatch").dxNumberBox("instance").option("value");
  var ExpectedCTC = $("#sdtxt-ExpectedCTCForOfferDispatch").dxNumberBox("instance").option("value");

  var currentCTC = $("#sdtxt-CurrentForOfferDispatch").dxNumberBox("instance").option("value");
  var expectedJoiningDate = $("#sddb-ExpectedJoiningDateOfferDispatch").dxDateBox("instance").option("value");
  var isConsultant = $("#sdchk-IsConsultantOfferDispatch").dxSwitch("instance").option("value");
  var Notes = $("#sdtxt-NotesOfferDispatch").dxHtmlEditor("instance").option("value");
  var IsFullTimeConsultant = $("#sdr-ConsultantTypeOfferDispatch").dxRadioGroup("instance").option("value");

  if(IsFullTimeConsultant == true)
  {
    IsFullTimeConsultant = true
  }
  else
  {
    IsFullTimeConsultant = false;
  }

  var ConsultantHours = $("#sdr-ConsultantHoursOfferDispatch").dxNumberBox("instance").option("value");
  //if(ApproximateCTC == null || ApproximateCTC == undefined || ApproximateCTC == ""){
    // if(ApproximateCTC == null || ApproximateCTC == undefined || ApproximateCTC == ""){
    //   $("#err-ApproximateCTCOfferDispatch").html("Please enter Expected")
    // }
  //}
  // if(isConsultant == false){
    
  //    if(ExpectedCTC == null || ExpectedCTC == undefined || ExpectedCTC == ""){
  //     $("#err-ExpectedCTCOfferDispatch").html("Please enter Expected")
  //    }
  //   }
  
  // else{
    $("#err-CandidateOfferDispatchNotes").html("");
    $("#err-CandidateOfferDispatch").html("") 
    $("#err-ApproximateCTCOfferDispatch").html("")
    var RRMOfferDispatchSaveData = {
      Id:offerIdForUpdate,
      RRMId:null,
      CandidateId:null,
      InterviewScheduleId:null,
      // CurrentCTC: currentCTC,
      // ApproximateCTC: ApproximateCTC,
      ExpectedJoiningDate: expectedJoiningDate,
      IsOfferApproved: 0,
      IsConsultant : isConsultant,
      IsFullTimeConsultant : IsFullTimeConsultant,
      ConsultantHours: ConsultantHours,
      // Notes: Notes,
      IsActive:1
    };

    var RRMOfferDispatchSavePostCallData = {
        Method: "PostCandidateOfferDispatch",
        Data: RRMOfferDispatchSaveData,
        EncryptData:{
          CurrentCTC: currentCTC.toString(),
          ApproximateCTC: 0,
          ExpectedCTC: ExpectedCTC.toString(),
          Notes: Notes,
        }
    };
    
    var RRMOfferDispatchPostResult = PostDataCall(RRMOfferDispatchSavePostCallData);
    if(RRMOfferDispatchPostResult["IsSuccess"] != true){
      var RRMOfferDispatchPostSwal = {
        title: "OOPS",
        text: RRMOfferDispatchPostResult['Message'],
        icon: 'error'
      }
    }
      
    if(RRMOfferDispatchPostResult["IsSuccess"] == true){
      var RRMOfferDispatchPostSwal = {
        title: "Success",
        text: RRMOfferDispatchPostResult['Message'],
        icon: 'success'
      }      
    }
    rrmOfferDispatchSwal(RRMOfferDispatchPostSwal);
    $('#RRMOfferModal').modal("hide");
    getOfferDispatchedCandidates();
    resetOfferDispatch();
    
  getOfferDispatchedCandidates();
 // }

}

function resetOfferDispatch(){
  $("#offerId").html("");
  offerIdForUpdate = null
}

function viewOfferDispatch(id,candidateId,RRMId){
  editOfferDispatch(id,candidateId,RRMId);
  $("#btnUpdateOfferDispatch").hide();
  $("#btnSaveOfferDispatch").hide();
  $("#OfferDispatchType").html("- View")
  $("#sdtxt-CurrentForOfferDispatch").dxNumberBox("instance").option("readOnly",true);
  $("#sdtxt-NotesOfferDispatch").dxHtmlEditor("instance").option("readOnly",true);
  $("#sdtxt-ApproximateCTCForOfferDispatch").dxNumberBox("instance").option("readOnly",true);
  $("#sddb-ExpectedJoiningDateOfferDispatch").dxDateBox("instance").option("readOnly",true);
  $("#sdchk-IsConsultantOfferDispatch").dxSwitch("instance").option("disabled",true);
  $("#sdtxt-NotesOfferDispatch").dxHtmlEditor("instance").option("readOnly",true);
  $("#sdr-ConsultantHoursOfferDispatch").dxNumberBox("instance").option("readOnly",true);
  $("#sdr-ConsultantTypeOfferDispatch").dxRadioGroup("instance").option("readOnly",true);
  $("#sdtxt-ExpectedCTCForOfferDispatch").dxNumberBox("instance").option("readOnly",true);
}

$('ul#rrmDispatchTabs li').click(function(e)
{            
    var tab_details = $(this).attr("id");
    var currentTab = $("#"+tab_details + " > a ").attr("aria-controls");            
    $('ul#rrmDispatchTabs li').removeClass("active");
    $(this).addClass("active");
    $("#rrmOfferDispatchDetails .tab-pane").removeClass("active");
    $("#" + currentTab).addClass("active");
    new SimpleBar(document.getElementById('rrmOfferDispatchModalBody'));
});

function mapOfferDispatchPreviousInterviews(data){
  var result = data.reduce(function (r, a) {
    r[a.RRMNo] = r[a.RRMNo] || [];
    r[a.RRMNo].push(a);
    return r;
}, Object.create(null));


  var interviewCompletedState = false;
  var html = ""
  if(data != undefined && data.length > 0){
    $.each(result,function(id,items){

      if(items[0].SortOrder != null && items[0].SortOrder != ""){
        if(items[0].SortOrder == "2" || items[0].SortOrder =="3" || items[0].SortOrder == "6"){
            html += "<div>"
            html += "<div ><strong>"+ id +"</strong></div> <br>"
        }
    }

       items.forEach(function (key, item) {
        
        if(key.SortOrder == "2" || key.SortOrder == "3" || key.SortOrder == "6"){
          if(key.SortOrder == "2"){
              html += "<div class='panel panel-success'>"
          }
          if(key.SortOrder == "3"){
              html += "<div class='panel panel-danger'>"
          }
          if(key.SortOrder == "6"){
              html += "<div class='panel panel-warning'>"
          }
          html += "<div class='panel-heading' data-toggle='collapse' data-parent='#rrm_OfferDispatchInterviewHistoryAccordian' href='#collapseOfferDispatch"+key.Id+"' onclick=rrmOfferDispatchPanelClick('sdgd-RRMOfferDispatchInterviewHistory-"+key.Id+"') style='cursor:pointer'>"
          html += "<h3 class='panel-title'>"
          html += "<a data-toggle='collapse' data-parent='#rrm_OfferDispatchInterviewHistoryAccordian' href='#collapseOfferDispatch"+key.Id+"'>"
          if(key.SortOrder == "2"){
              html += key.RRMNo+"&nbsp;"+key.TypeName +"-"+key.RowNum+"</a> &nbsp;<label class='label label-success m-l-sm'>Passed</label><span style='float:right'>"+key.InterviewerName+"</span>"
          }
          if(key.SortOrder == "3"){
              html += key.RRMNo+"&nbsp;"+key.TypeName +"-"+key.RowNum+"</a> &nbsp;<label class='label label-danger m-l-sm'>Failed</label><span style='float:right'>"+key.InterviewerName+"</span>"
          }
          if(key.SortOrder == "6"){
              html += key.RRMNo+"&nbsp;"+key.TypeName +"-"+key.RowNum+"</a> &nbsp;<label class='label label-warning m-l-sm'>On-Hold</label><span style='float:right'>"+key.InterviewerName+"</span>"
          }                
          html += "</h3>"
          html += "</div>"
          html += "<div id='collapseOfferDispatch"+key.Id+"' class='panel-collapse collapse'>"
          html += "<div class='panel-body' style='overflow-y:scroll;height:300px;'>"
          html += "<div id='sdgd-RRMOfferDispatchInterviewHistory-"+key.Id+"'></div>"
          html += "<br><div><b>Remarks:</b></div>"
          html += "<div class='row'><div class='col-md-12' id='rrm-remarks-offer-dispatch'>"+key.Comments+"</div></div>"
          html +="</div>"
          html += "</div>"
          html += "</div> <br>"                
          interviewCompletedState = true;
          
      }
      })
      html += "</div>"
      })     
  }
  if(interviewCompletedState == true){
    $("#rrm_OfferDispatchInterviewHistoryAccordian").html(html);
    
        $.each(result,function(id,items){
           
          items.forEach(function (key, item) {
               
                var dataOnRRMId = [];
                if(key.SortOrder == "2" || key.SortOrder == "3" || key.SortOrder == "6"){
                    dataOnRRMId.push(key);
                    binDataGridsForOfferDispatchInterviewHistory(dataOnRRMId,"#sdgd-RRMOfferDispatchInterviewHistory-"+key.Id)
                }
            })
        });
  }  
  else{
      $("#rrm_OfferDispatchInterviewHistoryAccordian").html("<h3>No Previous Interview available for this candidate</h3>");
  } 
}

function binDataGridsForOfferDispatchInterviewHistory(data,id){
  rrmOfferDispatchInterviewHistoryGrid(data,id);
}

function rrmOfferDispatchInterviewHistoryGrid(interviewStages,id){   
  $(id).dxDataGrid({
      dataSource:interviewStages,
      repaintChangesOnly: true,
      highlightChanges: true,
      searchPanel: {
        visible: false
      },
      allowColumnReordering: true,
      showBorders: true,
      columnAutoWidth: true,
      grouping: {
        autoExpandAll: true,
      },
      pager: {
        showPageSizeSelector: true,
        allowedPageSizes: [5, 10, 20],
        showInfo: true,
      },
      paging: {
        pageSize: 10,
      },
      sorting: {
        mode: "multiple",
      },    
      rowAlternationEnabled: true,
      allowColumnReordering: true,
      allowColumnResizing: true,
      showBorders: true,  
      columns: [
        {
          dataField: "ProfilePicture",
          caption: "",
          allowGrouping: false,
          allowCollapsing: false,
          allReordering:false,
          allowFiltering: false,
          width:70,
          cellTemplate: function (container, options) {
              
            $("<div class='text-center'>")
            .append("<img id='imgRRMOfferDispatchInterviewHistory-"+options.data.Id+"' src='"+options.data.ProfilePicture+"' class='img-circle interviewer-image' width='25px' height='25px'></img><div id='imageTooltipRRMOfferDispatchInterviewHistory"+options.data.Id+"'></div>")
            .appendTo(container);
            prepareImageTooltipForRRMOfferDispatchInterviewHistory(options.data.Id,options.data.ProfilePicture,options.data.InterviewerName)
          }
        },
        {
          dataField: "RRMNo",
          caption: "RRM No."
        },
        {
          dataField: "RRMName",
          caption: "RRM Name"
        },
        {
          dataField: "InterviewerName",
          caption: "Interviewer"
        },
        {
          dataField: "Status",
          caption: "Status",
          width:180,
          cellTemplate: function (container, options) {
              $("<div>")
            .append("<span>"+options.data.TypeName+"-"+options.data.RowNum+" "+options.data.StatusName+"</span>")
            .appendTo(container);
          }
        },      
        {
          dataField: "ModeName",
          caption: "Mode"
        },
        {
          dataField: "InterviewDate",
          caption: "Date"
        },
        {
          dataField: "InterviewTime",
          caption: "Time"
        },
        {
          dataField: "InterviewDetails",
          caption: "Interview Details"
        },
        {
          dataField: "Comments",
          caption: "Remarks",
          visible:false
        },
        {
            dataField:"OverallMark",
            caption:"Score",
            width:180,
            cellTemplate:function(container, options){
                var meterhtml = "";
              if(options.data.OverallMark <= 4){
                  meterhtml += "<span class='scoremeter'><meter class='redmeter' min='0' max='10' value='"+options.data.OverallMark+"' tooltip='10' width='5px'></meter><b> "+options.data.OverallMark+"/10</b></span>"
              } 
              if(options.data.OverallMark < 8 && options.data.OverallMark >4){
                  meterhtml += "<span class='scoremeter'><meter class='orangemeter' min='0' max='10' value='"+options.data.OverallMark+"' tooltip='10' width='5px'></meter><b> "+options.data.OverallMark+"/10</b></span>"
              }
              if(options.data.OverallMark > 8){
                  meterhtml += "<span class='scoremeter'><meter class='greenmeter' min='0' max='10' value='"+options.data.OverallMark+"' tooltip='10' width='5px'></meter><b> "+options.data.OverallMark+"/10</b></span>"
              }  
              $(meterhtml).appendTo(container);  
            }
        }
      ]
    });
}

function prepareImageTooltipForRRMOfferDispatchInterviewHistory(Id,ProfilePicture,InterviewerName){
  $("#imageTooltipRRMOfferDispatchInterviewHistory"+Id).dxTooltip({
    target: "#imgRRMOfferDispatchInterviewHistory-"+Id,
    showEvent: "mouseenter",
    hideEvent: "mouseleave",
    closeOnOutsideClick: false,
    position: "right",
    contentTemplate: function(data) {
        data.html("<img width='150' height='150' src='"+ProfilePicture+"'><br/><b>"+InterviewerName+"</b>");
    }
});
}

function rrmOfferDispatchPanelClick(id){
  $("#"+id).dxDataGrid("instance").refresh();
  setTimeout(function(){
      new SimpleBar(document.getElementById('InterviewModalBody'));
  }, 1000);    
}

$(document).on("click", ".rrmRemarksOfferDispatch", function (e) {
  var comments =  $(this).attr("data-comments");
  if(comments =="" && comments == null){
      comments = "Comments Not Avalilable";
  }
  else{
   $("#rrm-remarks-offer-dispatch").html("");
   $("#rrm-remarks-offer-dispatch").html(comments);
  }
});

function deleteOfferDispatch(id){
  swal({
    title: "Are you sure?",
    text: "You want to delete this record?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willAssign) => {
    if (willAssign) {
      var DeleteOfferDispatch = {
        Id:id
      };
      var DeleteOfferDispatchPostCallData = {
          Method: "DeleteCandidateOfferDispatch",
          Data: DeleteOfferDispatch
      };
      var DeleteOfferDispatchPostResult = PostDataCall(DeleteOfferDispatchPostCallData);
      if(DeleteOfferDispatchPostResult["IsSuccess"] != true){
        var DeleteOfferDispatchPostSwal = {
          title: "OOPS",
          text: DeleteOfferDispatchPostResult['Message'],
          icon: 'error'
        }
      }
        
      if(DeleteOfferDispatchPostResult["IsSuccess"] == true){
        var DeleteOfferDispatchPostSwal = {
          title: "Success",
          text: DeleteOfferDispatchPostResult['Message'],
          icon: 'success'
        }      
      }

      rrmOfferDispatchSwal(DeleteOfferDispatchPostSwal);
      getOfferDispatchedCandidates();
    }
  });
}

function getRRMDetailsForOfferDispatch(rrmId){
  var filterData2 = JSON.stringify({
    IsActive: true,
    ResourceRequirementId : rrmId
  });

  callGetListSync("GetRRMById", filterData2, function (RRMData) {
      mapRRMDetailsForOfferDispatch(RRMData[0])
  })
}

function mapRRMDetailsForOfferDispatch(data){
  if(data.RRMNo != null && data.RRMNo != ""){
      $("#lbl_offerDispatchRRMNumberTab").html(data.RRMNo);
  }
  else{
      $("#lbl_offerDispatchRRMNumberTab").html("Not Available");
  }
  if(data.RequirementName != null && data.RequirementName != ""){
      $("#lbl_offerDispatchRRMNameTab").html(data.RequirementName)
  }
  else{
      $("#lbl_offerDispatchRRMNameTab").html("Not Available")
  }
  if(data.RequiredFor != null && data.RequiredFor != ""){
      $("#lbl_offerDispatchRRMRequiredFor").html(data.RequiredFor)
  }
  else{
      $("#lbl_offerDispatchRRMRequiredFor").html("Not Available")
  }
  if(data.Department != null && data.Department != ""){
      $("#lbl_offerDispatchRRMDepartment").html(data.Department)
  }
  else{
      $("#lbl_offerDispatchRRMDepartment").html("Not Available")
  }
  if(data.Designation != null && data.Designation != ""){
      $("#lbl_offerDispatchRRMDesignation").html(data.Designation)
  }
  else{
      $("#lbl_offerDispatchRRMDesignation").html("Not Available")
  }
  if(data.ExperiencerequiredInYrs != null && data.ExperiencerequiredInYrs != ""){
      $("#lbl_offerDispatchRRMExperience").html(data.ExperiencerequiredInYrs)
  }
  else{
      $("#lbl_offerDispatchRRMExperience").html("Not Available")
  }
  if(data['PlanA-SkillPlanInfo'] != null && data['PlanA-SkillPlanInfo'] != ""){
      $("#lbl_offerDispatchRRMPlanA").html(data['PlanA-SkillPlanInfo'])
  }
  else{
      $("#lbl_offerDispatchRRMPlanA").html("Not Available")
  }
  if(data['PlanB-SkillPlanInfo'] != null && data['PlanB-SkillPlanInfo'] != ""){
      $("#lbl_offerDispatchRRMPlanB").html(data['PlanB-SkillPlanInfo'])
  }
  else{
      $("#lbl_offerDispatchRRMPlanB").html("Not Available")
  }
  getRRMSkillDataGridForOfferDispatch(data.RRMId)
}

function getRRMSkillDataGridForOfferDispatch(RRMId){
  var filterData = JSON.stringify({
      "ResourceRequirementId": RRMId,
      "IsActive": true,
  });        

  callGetListAsync('GetResourceRequrirementSkill', filterData, function (e) {
      var GetSkillList = e;
      $("#sdgd_offerDispatchRRMSkillsGrid").dxDataGrid({
          dataSource: GetSkillList,
          showBorders: true,
          paging: {
              enabled: false
          },
          columns: [
              {
                  dataField:"SkillFamily",
                  caption:"Skill Family"
              },
              {
                  dataField:"Skill",
                  caption:"Skill"
              },
              {
                  dataField:"SkillVersion",
                  caption:"Skill Version"
              }
          ],
      });
  })
}

function setBorderCell(worksheet, row, column, borderValue) {
  const excelCell = worksheet.getCell(row, column);

  if(!excelCell.border) {
    excelCell.border = {};
  }

  Object.assign(excelCell.border, borderValue);
}

function setBorders( worksheet, cellsRange) {
  var borderStylePattern = { style: 'thin', color: { argb: 'FF7E7E7E' } };
  for(let i = cellsRange.from.row; i < cellsRange.to.row; i++) {
    for(let j = cellsRange.from.column; j <= cellsRange.to.column; j++) {
      setBorderCell(worksheet, i, j, { bottom: borderStylePattern });
      setBorderCell(worksheet, i, j, { right: borderStylePattern }); 
    }
  }
  for(let i = cellsRange.from.column; i <= cellsRange.to.column; i++) {
    setBorderCell(worksheet, cellsRange.from.row, i, { top: borderStylePattern });
  }
  for(let i = cellsRange.from.row; i <= cellsRange.to.row; i++) {
    setBorderCell(worksheet, i, cellsRange.from.column, { left: borderStylePattern });
  }
  for(let i = cellsRange.from.row; i <= cellsRange.to.row; i++) {
    setBorderCell(worksheet, i, cellsRange.to.column, { right: borderStylePattern });
  }
  for(let i = cellsRange.from.column; i <= cellsRange.to.column; i++) {
    setBorderCell(worksheet, cellsRange.to.row, i, { bottom: borderStylePattern });
  }
}