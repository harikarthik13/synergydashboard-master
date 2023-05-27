function open_mode(familyId = null, familyName = null) {
  console.log({familyId});
  console.log({familyName});
  $('#skillfamilyId').data('familyId', familyId);
  $('#skillfamilyId').data('familyName', familyName);
  if (familyId && familyName){
    $("#family_name").val(familyName);
    $('#skill_family_modal_header').text('Update Skill Family');
  } else {
    $("#family_name").val("");
    $('#skill_family_modal_header').text('Add Skill Family');
  }
  $("#skillfamilyId").prop("disabled", false);
  $("#family_name_err").html("");
  $(".ApiResponse").html("");
  // $(".skillversionInputs").val("");
  $(".apiskilldetailsResponse").html("");
  $(".error_message").html("");
  $("#skillsetmodel")
    .appendTo("body")
    .modal("show");
}
$('#family_name').on('input', function () {
  $("#skillfamilyId").prop("disabled", false);
  $("#family_name_err").html(""); 
  $(".ApiResponse").html("");
});

function open_mode_skill(familyId = null, skillId = null, skillName = null) {

  $('#skillSetId').data('familyId', familyId);
  $('#skillSetId').data('skillId', skillId);
  $('#skillSetId').data('skillName', skillName);
  if (familyId && skillId && skillName){
    $("#skill_name").val(skillName);
    $('#skill__modal_header').text('Update Skill');
  } else {
    familyId = $("#skillsetFamilies").val();
    $("#skill_name").val("");
    $('#skill__modal_header').text('Add Skill');
  }
  if (!familyId){
    alert('Please select a Family first, before adding a Skill.');
    return false;
  }
  $("#skillSetId").prop("disabled", false);
  $("#skill_name_err").html("");
  $(".ApiResponse").html("");
  // $(".skillversionInputs").val("");
  $(".apiskilldetailsResponse").html("");
  $(".error_message").html("");
  $("#skillmodel")
    .appendTo("body")
    .modal("show");
}
$('#skill_name').on('input', function () {
  $("#skillSetId").prop("disabled", false);
  $("#skill_name_err").html(""); 
  $(".ApiResponse").html("");
});


function open_mode_version(familyId = null, skillName = null, versionId = null, versionName = null) {


$('#versionSetBtn').data('familyId', familyId);
  $('#versionSetBtn').data('skillName', skillName);
  $('#versionSetBtn').data('versionId', versionId);
  $('#skillSetId').data('versionName', versionName);
  if (familyId && skillName && versionId && versionName){
    $("#version_name").val(versionName);
    $('#version__modal_header').text('Update Version');
  } else {
    // skillId = $("#skillsets").val();
    // $("#version_name").val("");
    // $('#version__modal_header').text('Add Version');
  }
  if (!skillName){
    alert('Please select a Skill first, before adding a Version.');
    return false;
  }
  $("#versionSetBtn").prop("disabled", false);
  $("#version_name_err").html("");
  $(".ApiResponse").html("");
  // $(".skillversionInputs").val("");
  $(".apiskilldetailsResponse").html("");
  $(".error_message").html("");
  $("#versionmodel")
    .appendTo("body")
    .modal("show");
}
$('#version_name').on('input', function () {
  $("#versionSetBtn").prop("disabled", false);
  $("#version_name_err").html(""); 
  $(".ApiResponse").html("");
});

getSkillFamilies();
GetTechnologyandEnvironmentTypes();

function getSkillFamilies() {
  var filter_val = JSON.stringify({ IsActive: true });
  var result = callgetlist("GetProvisionalSkillFamilies", filter_val);
  var options = "<option value=''>Select Family</option>";
  for (var i = 0; i < result.length; i++) {
    options +=
      "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
  }
  $("#skillsetFamilies").html(options);
  $("#family_nm_err").html("");
  //
  getSkillSets('');
  renderSkillsetGrid(result);
}

function selectFamily(){
  var family_id = $("#skillsetFamilies").val();
  getSkillSets(family_id);
  $("#family_nm_err").html("");
}

function selectSkill(){
  $("#skills_err").html("");
}

function getSkillSets(family_id) {
  var filter_val = JSON.stringify({ ProvisionalFamilyId: family_id });
  var result = callgetlist("GetProvisionalSkills", filter_val);
  console.log({result});
  var options = "<option value=''>Select Skill</option>";
  for (var i = 0; i < result.length; i++) {
    options +=
      "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
  }
  $("#skillsets").html(options);
  $("#skills_err").html("");
}

function getSkillVersions(skill_id){
  
}

function GetTechnologyandEnvironmentTypes() {
  var filter_val = JSON.stringify({ IsActive: true });
  var result = callgetlist("GetTechnologyandEnvironmentTypes", filter_val);
  var options = "<option value=''>Select Environment</option>";
  for (var i = 0; i < result.length; i++) {
    options +=
      "<option value='" +
      result[i].ID +
      "'>" +
      result[i].Technology +
      "</option>";
  }
  $("#skillsetEnvironment").html(options);
}

function skillsetEnvironment() {
  var filter_val = JSON.stringify({ IsActive: true });
  var result = callgetlist("GetSkillFamilies", filter_val);

  var options = "<option value=''>Select Family</option>";
  for (var i = 0; i < result.length; i++) {
    options +=
      "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
  }
  $("#skillsetFamilies").html(options);
}

function clear_skillset_error()
{
  $(".ApiResponse").removeClass("success_message");
  $(".ApiResponse").removeClass("error_message");
  $(".ApiResponse").html("");
  $("#family_name_err").removeClass("error_message");
  $("#family_name_err").html(""); 
}

function ClearSkillDetails(){
  getSkillFamilies();
  $('#skillsetEnvironment').val('');
  $('#version').val('');
}

function SaveSkillFamilies() {
  $("#skillfamilyId").prop("disabled", true);
  var family_name = $("#family_name").val().trim();
  var family_id = $("#skillfamilyId").data('familyId');
  if (family_name == "") {
    $("#family_name").val(family_name);
    $("#family_name_err").html("Please Enter Family Name.");
    $(".ApiResponse").removeClass("success_message");
    $(".ApiResponse").removeClass("error_message");
    $(".ApiResponse").html("");
    return false;
  } else {
    $("#family_name_err").html("");
    $(".ApiResponse").removeClass("success_message");
    $(".ApiResponse").removeClass("error_message");
    $(".ApiResponse").html("");
  }
  if (!family_id) family_id = null;
  var family = {
    ProvisionalFamilyID: family_id,
    ProvisionalSkillFamilies  : family_name,
    IsActive: true
  };

  data = {
    Method: "PostProvisionalSkillFamilies",
    Data: family
  };

  var postCall = PostDataCall(data);

 /*  $(".ApiResponse").removeClass("success_message");
  $(".ApiResponse").removeClass("error_message");
 */
 

  if (postCall["IsSuccess"] == true) {
    $(".ApiResponse").addClass("success_message");
    $(".ApiResponse").html(postCall["Message"]);
    $("#family_name").val("");
    setTimeout(function() {
      $("#skillsetmodel").modal("hide");
    }, 500);
    getSkillFamilies();
  } else {
    $(".ApiResponse").addClass("error_message");
    $(".ApiResponse").html(postCall["Message"]);
    // $("#family_name").val("");
  }



  /* setTimeout(function() {
    $(".ApiResponse").fadeOut("slow", function() {
    $(".ApiResponse").html("");
    $("#skillfamilyId").prop("disabled", false);
    });
  }, 2500);
 */
  
}


function SaveSkillSet() {
  $("#skillSetId").prop("disabled", true);
  var family_id = $("#skillSetId").data('familyId');
  var skill_id = $("#skillSetId").data('skillId');
  var skill_name = $("#skill_name").val().trim();
  if (!family_id){
    family_id = $("#skillsetFamilies").val();
  }
  if (skill_name == "") {
    $("#skill_name").val(skill_name);
    $("#skill_name_err").html("Please Enter Skill Name.");
    $(".ApiResponse").removeClass("success_message");
    $(".ApiResponse").removeClass("error_message");
    $(".ApiResponse").html("");
    return false;
  } else {
    $("#skill_name_err").html("");
    $(".ApiResponse").removeClass("success_message");
    $(".ApiResponse").removeClass("error_message");
    $(".ApiResponse").html("");
  }

  var skill = {
    ProvisionalSkillID: skill_id,
    ProvisionalFamilyID : family_id,
    ProvisionalSkillName  : skill_name,
    IsActive: true,
    TypeId: ''
  };

  data = {
    Method: "PostProvisionalSkills",
    Data: skill
  };

  var postCall = PostDataCall(data);

 /*  $(".ApiResponse").removeClass("success_message");
  $(".ApiResponse").removeClass("error_message");
 */
 

  if (postCall["IsSuccess"] == true) {
    $(".ApiResponse").addClass("success_message");
    $(".ApiResponse").html(postCall["Message"]);
    $("#skill_name").val("");
    //
    getSkillSets(family_id);
    var datagrid = $("#sddgd-skillfamilies").dxDataGrid("instance"); 
    datagrid.refresh();
    setTimeout(function() {
      $("#skillmodel").modal("hide");
    }, 500);
  } else {
    $(".ApiResponse").addClass("error_message");
    $(".ApiResponse").html(postCall["Message"]);
    // $("#skill_name").val("");
  }

  
//   /* setTimeout(function() {
//     $(".ApiResponse").fadeOut("slow", function() {
//     $(".ApiResponse").html("");
//     $("#skillfamilyId").prop("disabled", false);
//     });
//   }, 2500);
//  */
  
}

$('#version').on('input', function () {
  $("#version_err").html("");
});

function SaveSkillVersion() {
  $("#versionSetBtn").prop("disabled", true);
  var family_id = $("#versionSetBtn").data('familyId');
  var skill_name = $("#versionSetBtn").data('skillName');
  var version_id = $("#versionSetBtn").data('versionId');
  var version_name = $("#version_name").val().trim();
  // if (!family_id){
  //   family_id = $("#skillsetFamilies").val();
  // }
  if (version_name == "") {
    $("#version_name").val(version_name);
    $("#version_name_err").html("Please Enter Version Name.");
    $(".ApiResponse").removeClass("success_message");
    $(".ApiResponse").removeClass("error_message");
    $(".ApiResponse").html("");
    return false;
  } else {
    $("#version_name_err").html("");
    $(".ApiResponse").removeClass("success_message");
    $(".ApiResponse").removeClass("error_message");
    $(".ApiResponse").html("");
  }

  var version = {
    ProvisionalFamilyID: family_id,
    ProvisionalSkillName: skill_name,
    TypeId: '',
    ProvisionalSkillVersion: version_name,
    ProvisionalSkillVersionID: version_id,
    IsActive: true
  };

  data = {
    Method: "PostProvisionalSkillandVersion",
    Data: version
  };

  var postCall = PostDataCall(data);

 /*  $(".ApiResponse").removeClass("success_message");
  $(".ApiResponse").removeClass("error_message");
 */
 

  if (postCall["IsSuccess"] == true) {
    $(".ApiResponse").addClass("success_message");
    $(".ApiResponse").html(postCall["Message"]);
    $("#version_name").val("");
    //
    // getSkillSets(family_id);
    var datagrid = $("#sddgd-skillfamilies").dxDataGrid("instance"); 
    datagrid.refresh();
    setTimeout(function() {
      $("#versionmodel").modal("hide");
    }, 500);
  } else {
    $(".ApiResponse").addClass("error_message");
    $(".ApiResponse").html(postCall["Message"]);
    // $("#skill_name").val("");
  }

  
//   /* setTimeout(function() {
//     $(".ApiResponse").fadeOut("slow", function() {
//     $(".ApiResponse").html("");
//     $("#skillfamilyId").prop("disabled", false);
//     });
//   }, 2500);
//  */
  
}

function SaveSkillDetails() {
  $("#family_nm_err").html("");
  $("#skills_err").html("");
  $("#version_err").html("");
  //
  var family_id = $("#skillsetFamilies").val();
  if (family_id == "") {
    $("#family_nm_err").html("Please Select Family Name.");
    return false;
  } else {
    $("#family_nm_err").html("");
  }

  var skill_id = $("#skillsets").val();
  var skill_name = '';
  if (skill_id == "") {
    $("#skills_err").html("Please Select Skill.");
    return false;
  } else {
    skill_name = $("#skillsets option:selected").text();
    $("#skills_err").html("");
  }

  // var newSkill = $("#skillsets").val().trim();
  // if (newSkill == "") {
  //   $("#skills_err").html("Please Enter Skills.");
  //   $("#newSkill").val(newSkill);
  //   return false;
  // } else {
  //   $("#newSkill").val(newSkill);
  //   $("#skills_err").html("");
  // }

  // var skillsetEnvironment = $("#skillsetEnvironment").val();
  // if (skillsetEnvironment == "") {
  //   $("#skillsetEnvironment_err").html("Please Select Skillset Environment.");
  //   return false;
  // } else {
  //   $("#skillsetEnvironment_err").html("");
  // }

  var version = $("#version").val().trim();
  var version_id = null;
  if (version == "") {
    $("#version_err").html("Please Enter Version.");
    $("#version").val(version);
    return false;
  } else {
    $("#version").val(version);
    $("#version_err").html("");
  }
  $("#addSkill").prop("disabled", true);

  var skillDetails = {
    ProvisionalFamilyID: family_id,
    ProvisionalSkillName: skill_name,
    TypeId: '',
    ProvisionalSkillVersion: version,
    ProvisionalSkillVersionID: version_id,
    IsActive: true
  };

  data = {
    Method: "PostProvisionalSkillandVersion",
    Data: skillDetails
  };
  var postCall = PostDataCall(data);
  $(".apiskilldetailsResponse").removeClass("success_message");
  $(".apiskilldetailsResponse").removeClass("error_message");

  if (postCall["IsSuccess"] == true) {
    $(".apiskilldetailsResponse").addClass("success_message");
    $(".apiskilldetailsResponse").html(postCall["Message"]);
    $(".skillversionInputs").val("");
    $("#skillsetFamilies").val("").change();
    //
    var datagrid = $("#sddgd-skillfamilies").dxDataGrid("instance"); 
    datagrid.refresh();
  } else {
    $(".apiskilldetailsResponse").addClass("error_message");
    $(".apiskilldetailsResponse").html(postCall["Message"]);
  }

  setTimeout(function() {
    $(".apiskilldetailsResponse").fadeOut("slow", function() {
      $(".apiskilldetailsResponse").html("");
      $("#addSkill").prop("disabled", false);
    });
  }, 2500);
}
function renderSkillsetGrid(data){
  var skillFamilyDataGrid = $("#sddgd-skillfamilies")
  .dxDataGrid({
    filterRow: {
      visible: true,
      applyFilter: "auto",
    },
    dataSource: data,
    export: {
      enabled: true,
      allowExportSelectedData: true,
    },
    searchPanel: {
      visible: true,
      width: 240,
      placeholder: "Search...",
    },
    headerFilter: {
      visible: true,
    },
    pager: {
      showPageSizeSelector: true,
      allowedPageSizes: [5, 10, 20],
      showInfo: true,
    },
    paging: {
      pageSize: 5,
    },
    groupPanel: {
      visible: true,
      emptyPanelText: "Drag a column"
    },
    sorting: {
      mode: "multiple",
    },
    selection: {
      mode: "multiple",
    },
    columnChooser: {
      enabled: true,
    },
    rowAlternationEnabled: true,
    filterPanel: { visible: true },
    allowColumnReordering: true,
    allowColumnResizing: true,
    showBorders: true,
    onToolbarPreparing: function (e) {
      var dataGrid = e.component;
      e.toolbarOptions.items.unshift({
        location: "after",
        widget: "dxButton",
        options: {
          icon: "refresh",
          onClick: function () {
            getSkillFamilies();
          },
        },
      });
    },
    columns:[
      {
        dataField: 'Id',
        caption:'Family Id'
      },
      {
        dataField: 'Name',
        caption:'Family Name'
      },
      {
        dataField: "",
        caption: "Action",
        width: 50,
        allowFiltering:false, 
        allowGrouping: false, 
        allowReordering: false, 
        allowSorting: false, 
        allowCollapsing: false, 
        allowExporting: false,
        cellTemplate: function (container, options) {
          var familyId = options.data["Id"];
          var familyName = options.data["Name"];
          var domActions = "";
          domActions +=
            `<button class='btn btn-xs btn-primary edit-btn' onclick='open_mode("${familyId}", "${familyName}")'><i class='fas fa-pencil-alt'></i></button>`
            domActions += `<button class='btn btn-xs btn-primary delete-btn' onclick='deleteSkillFamily("${familyId}")'><i class='fas fa-trash'></i></button>`
          $("<div class='text-center'>")
            .append($(domActions))
            .appendTo(container);
        }
      }
    ],
    masterDetail: {
      enabled: true,
      template(container, options) {
        const currentFamilyData = options.data;
        $('<div>')
          .addClass('master-detail-caption')
          .text(`${currentFamilyData.Name} 's Skills:`)
          .appendTo(container);
          //
          var filter_val = JSON.stringify({ ProvisionalFamilyId: currentFamilyData.Id });
          var result = callgetlist("GetProvisionalSkills", filter_val);
          //
          $('<div id="sddgd-skills">')
          .dxDataGrid({
            columnAutoWidth: true,
            showBorders: true,
            filterRow: {
              visible: true,
              applyFilter: "auto",
            },
            export: {
              enabled: true,
              allowExportSelectedData: true,
            },
            searchPanel: {
              visible: true,
              width: 240,
              placeholder: "Search...",
            },
            headerFilter: {
              visible: true,
            },
            pager: {
              showPageSizeSelector: true,
              allowedPageSizes: [5, 10, 20],
              showInfo: true,
            },
            paging: {
              pageSize: 5,
            },
            groupPanel: {
              visible: true,
              emptyPanelText: "Drag a column"
            },
            sorting: {
              mode: "multiple",
            },
            selection: {
              mode: "multiple",
            },
            columnChooser: {
              enabled: true,
            },
            rowAlternationEnabled: true,
            filterPanel: { visible: true },
            allowColumnReordering: true,
            allowColumnResizing: true,
            showBorders: true,
            onToolbarPreparing: function (e) {
              var dataGrid = e.component;
              e.toolbarOptions.items.unshift({
                location: "after",
                widget: "dxButton",
                options: {
                  icon: "refresh",
                  onClick: function () {
                    getSkillSets(currentFamilyData.Id);
                  },
                },
              });
            },
            columns: [
              {
                dataField: 'Id',
                caption:'Skill Id'
              },
              {
                dataField: 'Name',
                caption:'Skill Name'
              },
              {
                dataField: "",
                caption: "Action",
                width: 50,
                allowFiltering:false, 
                allowGrouping: false, 
                allowReordering: false, 
                allowSorting: false, 
                allowCollapsing: false, 
                allowExporting: false,
                cellTemplate: function (container, options) {
                  var skillId = options.data["Id"];
                  var skillName = options.data["Name"];
                  var domActions = "";
                  domActions += `<button class='btn btn-xs btn-primary edit-btn' onclick='open_mode_skill("${currentFamilyData.Id}", "${skillId}", "${skillName}")'><i class='fas fa-pencil-alt'></i></button>`
                  domActions += `<button class='btn btn-xs btn-primary delete-btn' onclick='deleteSkill("${currentFamilyData.Id}", "${skillId}")'><i class='fas fa-trash'></i</button>`
                  $("<div class='text-center'>")
                    .append($(domActions))
                    .appendTo(container);
                }
              }
            ],
            dataSource: new DevExpress.data.DataSource({
              store: new DevExpress.data.ArrayStore({
                key: 'Id',
                data: result,
              })
            }),
            masterDetail: {
              enabled: true,
              template(container, options) {
                const currentSkillData = options.data;
                $('<div>')
                  .addClass('master-detail-caption')
                  .text(`${currentSkillData.Name} 's Versions:`)
                  .appendTo(container);
                  //
                  var filter_val = JSON.stringify({ ProvisionalSkillId: currentSkillData.Id });
                  var result2 = callgetlist("GetProvisionalSkillVersions", filter_val);
                  console.log({result2});
                  //
                  $('<div id="sddgd-versions">')
                  .dxDataGrid({
                    columnAutoWidth: true,
                    showBorders: true,
                    filterRow: {
                      visible: true,
                      applyFilter: "auto",
                    },
                    export: {
                      enabled: true,
                      allowExportSelectedData: true,
                    },
                    searchPanel: {
                      visible: true,
                      width: 240,
                      placeholder: "Search...",
                    },
                    headerFilter: {
                      visible: true,
                    },
                    pager: {
                      showPageSizeSelector: true,
                      allowedPageSizes: [5, 10, 20],
                      showInfo: true,
                    },
                    paging: {
                      pageSize: 5,
                    },
                    groupPanel: {
                      visible: true,
                      emptyPanelText: "Drag a column"
                    },
                    sorting: {
                      mode: "multiple",
                    },
                    selection: {
                      mode: "multiple",
                    },
                    columnChooser: {
                      enabled: true,
                    },
                    rowAlternationEnabled: true,
                    filterPanel: { visible: true },
                    allowColumnReordering: true,
                    allowColumnResizing: true,
                    showBorders: true,
                    onToolbarPreparing: function (e) {
                      var dataGrid = e.component;
                      e.toolbarOptions.items.unshift({
                        location: "after",
                        widget: "dxButton",
                        options: {
                          icon: "refresh",
                          onClick: function () {
                            getSkillVersions(currentSkillData.Id);
                          },
                        },
                      });
                    },
                    columns: [
                      {
                        dataField: 'Id',
                        caption:'Version Id'
                      },
                      {
                        dataField: 'Name',
                        caption:'Version Name'
                      },
                      {
                        dataField: "",
                        caption: "Action",
                        width: 50,
                        allowFiltering:false, 
                        allowGrouping: false, 
                        allowReordering: false, 
                        allowSorting: false, 
                        allowCollapsing: false, 
                        allowExporting: false,
                        cellTemplate: function (container, options) {
                          var versionId = options.data["Id"];
                          var versionName = options.data["Name"];
                          var domActions = "";
                          domActions += `<button class='btn btn-xs btn-primary edit-btn' onclick='open_mode_version("${currentFamilyData.Id}", "${currentSkillData.Name}", "${versionId}", "${versionName}")'><i class='fas fa-pencil-alt'></i></button>`
                          domActions += `<button class='btn btn-xs btn-primary delete-btn' onclick='deleteVersion("${currentSkillData.Id}", "${versionId}")'><i class='fas fa-trash'></i</button>`
                          $("<div class='text-center'>")
                            .append($(domActions))
                            .appendTo(container);
                        }
                      }
                    ],
                    dataSource: new DevExpress.data.DataSource({
                      store: new DevExpress.data.ArrayStore({
                        key: 'Id',
                        data: result2,
                      })
                    }),
                  }).appendTo(container);
              }
            }
          }).appendTo(container);
      }
    }
  });
}

function deleteSkillFamily(family_id = null){
  if (!family_id){
    family_id = $("#skillsetFamilies").val();
  }
  var family = {
    ProvisionalSkillFamilyID: family_id,
  };
  //
  swal({
    title: "Delete",
    text: "Are you sure, Do you want to delete?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        data = {
          "Method": "DeleteProvisionalSkillFamilyById",
          "Data": family
        }
        var postCall = PostDataCall(data);

        if (postCall["IsSuccess"] == true) {
          swal({
            title: "Success!",
            text: "Deleted Successfully!",
            icon: "success",
            button: "ok!",
          })
          getSkillFamilies();
        } else {
        }
      }
    });
}

function deleteSkill(family_id, skill_id){
  var skill = {
    ProvisionalSkillID: skill_id,
  };
  //
  swal({
    title: "Delete",
    text: "Are you sure, Do you want to delete?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        data = {
          "Method": "DeleteProvisionalSkillById",
          "Data": skill
        }
        var postCall = PostDataCall(data);

        if (postCall["IsSuccess"] == true) {
          swal({
            title: "Success!",
            text: "Deleted Successfully!",
            icon: "success",
            button: "ok!",
          })
          getSkillSets(family_id);
          var datagrid = $("#sddgd-skillfamilies").dxDataGrid("instance"); 
          datagrid.refresh();
        } else {
        }
      }
    });
}

function deleteVersion(skill_id, version_id){
  var version = {
    ProvisionalSkillVersionID: version_id,
  };
  //
  swal({
    title: "Delete",
    text: "Are you sure, Do you want to delete?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        data = {
          "Method": "DeleteProvisionalSkillVersionById",
          "Data": version
        }
        var postCall = PostDataCall(data);

        if (postCall["IsSuccess"] == true) {
          swal({
            title: "Success!",
            text: "Deleted Successfully!",
            icon: "success",
            button: "ok!",
          })
          getSkillVersions(skill_id);
          var datagrid = $("#sddgd-skillfamilies").dxDataGrid("instance"); 
          datagrid.refresh();
        } else {
        }
      }
    });
}