/* for Previous Employer page */



var messageBox = document.getElementById("display");
var dataEmployee = [];
var dataEmployeeApi = [];

function insert(empid) {

  /* var min_length = $(this).val().length;
   if( min_length < 3)
   {
     $(this).addClass('input-error');
     $(this).next('span').html('Atleast add more than 3 characters');
     
   }
   else
   {
     $(this).removeClass('input-error');
     $(this).next('span').html('');
   }*/



  var name = document.getElementById("name").value;
  var fdate = document.getElementById("fdate").value;
  var tdate = document.getElementById("tdate").value;

  var date1 = new Date(fdate);
  var date2 = new Date(tdate);
  //var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  //var year_diff = (Math.ceil(timeDiff / (1000 * 3600 * 24)))/365; 
  //$a = year_diff;

  var diff = Math.floor(date2.getTime() - date1.getTime());
  var day = 1000 * 60 * 60 * 24;
  //alert(diff);

  var days = Math.floor(diff / day);
  var months = Math.floor(days / 31);
  var years = Math.floor(months / 12);

  if (years >= 1) {
    var year_message = years + " years  \n"
    year_message += months + " months ";
    year_diff = year_message;
    //alert(year_message);
  } else {
    var month_message = months + " months ";
    year_diff = month_message;
    //alert(month_message); 

  }


  var fdate_date = moment(fdate).format("DD");
  var tdate_date = moment(tdate).format("DD");

  var fdate_year = moment(fdate).format("YYYY");
  var tdate_year = moment(tdate).format("YYYY");

  var fdate_month = moment(fdate).format("MM");
  var tdate_month = moment(tdate).format("MM");

  var newdate = new Date();
  var current_year = moment(newdate).format("YYYY");
  var current_month = moment(newdate).format("MM");
  var current_date = moment(newdate).format("DD");


  /*   alert(fdate_date);
     alert(current_date);*/

  if (name == "" || fdate == "" || tdate == "" || name.length <= 3) {
    if (name == "") {
      $('#name').addClass('input-error');
      $('#previous_employer_name_error').html("Enter previous Employer Name");
    } else if (name.length <= 3) {
      $('#name').addClass('input-error');
      $('#previous_employer_name_error').html('Atleast add more than 3 characters');
    } else {

      $('#name').removeClass('input-error');
      $('#previous_employer_name_error').html("");
    }

    if (fdate == "") {
      $('#fdate').addClass('input-error');
      $('#fdate_error').html("Enter From Date");

    } else {
      $('#fdate').removeClass('input-error');
      $('#fdate_error').html("");
    }

    if (tdate == "") {
      $('#tdate').addClass('input-error');
      $('#tdate_error').html("Enter To Date");

    } else {
      $('#tdate').removeClass('input-error');
      $('#tdate_error').html("");
    }

  } else if (fdate_date > current_date && (fdate_month == current_month && fdate_year == current_year)) {
    $('#name').removeClass('input-error');
    $('#previous_employer_name_error').html("");
    $('#fdate').removeClass('input-error');
    $('#fdate_error').html("");
    $('#tdate').removeClass('input-error');
    $('#tdate_error').html("");

    $('#fdate').addClass('input-error');
    $('#fdate_error').html("Future date cant be added! Please check To date");

  } else if (tdate_date > current_date && tdate_month == current_month && tdate_year == current_year) {
    $('#name').removeClass('input-error');
    $('#previous_employer_name_error').html("");
    $('#fdate').removeClass('input-error');
    $('#fdate_error').html("");
    $('#tdate').removeClass('input-error');
    $('#tdate_error').html("");

    $('#tdate').addClass('input-error');
    $('#tdate_error').html("Future date cant be added! Please check To date");

  } else if (fdate_year < 1996) {
    $('#name').removeClass('input-error');
    $('#previous_employer_name_error').html("");
    $('#fdate').removeClass('input-error');
    $('#fdate_error').html("");
    $('#tdate').removeClass('input-error');
    $('#tdate_error').html("");

    $('#fdate').addClass('input-error');
    $('#fdate_error').html("Invalid year! Please check From date");
  } else if (fdate_year > current_year) {
    $('#name').removeClass('input-error');
    $('#previous_employer_name_error').html("");
    $('#fdate').removeClass('input-error');
    $('#fdate_error').html("");
    $('#tdate').removeClass('input-error');
    $('#tdate_error').html("");

    $('#fdate').addClass('input-error');
    $('#fdate_error').html("Invalid year! Please check From date");

  } else if (fdate_month > current_month && fdate_year == current_year) {
    $('#name').removeClass('input-error');
    $('#previous_employer_name_error').html("");
    $('#fdate').removeClass('input-error');
    $('#fdate_error').html("");
    $('#tdate').removeClass('input-error');
    $('#tdate_error').html("");

    $('#fdate').addClass('input-error');
    $('#fdate_error').html("Future date cant be added! Please check From Date");

  } else if (tdate_year > current_year) {
    $('#name').removeClass('input-error');
    $('#previous_employer_name_error').html("");
    $('#fdate').removeClass('input-error');
    $('#fdate_error').html("");
    $('#tdate').removeClass('input-error');
    $('#tdate_error').html("");

    $('#tdate').addClass('input-error');
    $('#tdate_error').html("Invalid year! Please check To Date");

  } else if (tdate_month > current_month && tdate_year == current_year) {
    $('#name').removeClass('input-error');
    $('#previous_employer_name_error').html("");
    $('#fdate').removeClass('input-error');
    $('#fdate_error').html("");
    $('#tdate').removeClass('input-error');
    $('#tdate_error').html("");

    $('#tdate').addClass('input-error');
    $('#tdate_error').html("Future date cant be added! Please check To Date");

  } else if (fdate > tdate) {
    $('#name').removeClass('input-error');
    $('#previous_employer_name_error').html("");
    $('#fdate').removeClass('input-error');
    $('#fdate_error').html("");
    $('#tdate').removeClass('input-error');
    $('#tdate_error').html("");

    $('#fdate_error').html("From date should not be greater than To Date");
  } else if (name != "" && fdate != "" && tdate != "") {

    $('#name').removeClass('input-error');
    $('#previous_employer_name_error').html("");
    $('#fdate').removeClass('input-error');
    $('#fdate_error').html("");
    $('#tdate').removeClass('input-error');
    $('#tdate_error').html("");

    var localget = localStorage.getItem("UserCheckRes");
    var jsonData = JSON.parse(localget);
    dataEmployeeApi = [];

    if (empid) {
      dataEmployeeApi = {
        "EmployeeId": jsonData['Data'][0]['EmployeeID'],
        "EmployerId ": empid,
        "EmployerName": name,
        "FromDate": fdate,
        "ToDate": tdate
      };
    } else {
      dataEmployeeApi = {
        "EmployeeId": jsonData['Data'][0]['EmployeeID'],
        "EmployerName": name,
        "FromDate": fdate,
        "ToDate": tdate
      };
    }

    data = {
      "Method": "PostPreviousEmployerDetails",
      "Data": dataEmployeeApi
    }

    var date1 = new Date(fdate);
    var date2 = new Date(tdate);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    ////console.log('diffDays',diffDays);

    if (diffDays > 90) {
      var postCall = PostDataCall(data);

      jQuery(".status").attr("class", "status");
      jQuery(".status").html("");
      jQuery(".status").show();

      if (postCall['IsSuccess'] == true) {
        $(".status").addClass("data_success");
        if (empid) {
          $(".status").html(postCall['Message']);
        } else {
          $(".status").html(postCall['Message']);
        }
      } else {
        $(".status").addClass("data_error");
        $(".status").html(postCall['Message']);
      }

      setTimeout(function () {
        $(".status").fadeOut("slow", function () {
          $(".status").html("");
        });
      }, 1500);
    } else {
      alert('Experience should be of atleast 3 months');
    }



    jQuery("#pre_emp_action").attr("data-id", "");
    jQuery("#pre_emp_action").attr("onclick", "insert()");

    clearAndShow();
    var dataEmployee1 = GetPreviousEmployerDetails();
    messageBox.innerHTML = computeHTML(dataEmployee1);

  } else {

  }



}

function clearAndShow() { // Clear our fields
  document.getElementById("name").value = "";
  document.getElementById("fdate").value = "";
  document.getElementById("tdate").value = "";
  // messageBox.innerHTML = computeHTML(dataEmployee);
}

function computeHTML(dataemployee1) {
  var html = "<table id='myTable'>";
  html += "<tr>";
  html += "<th>Previous Employer Name</th>"
  html += "<th>From Date</th>"
  html += "<th>To Date</th>"
  html += "<th>Total Experience (in YY/MM format)</th>"
  html += "<th>Actions</th>"
  html += "</tr>";
  ////console.log(dataemployee1);
  dataemployee1.forEach(function (key, item) {
    var employeerId = key.Id;
    var FromDate = moment(key.FromDate).format("DD-MMM-YYYY");
    var ToDate = moment(key.ToDate).format("DD-MMM-YYYY");
    var FromDate = FromDate.replace("--", "-");
    var ToDate = ToDate.replace("--", "-");
    //alert(ToDate);
    html += "<tr class='row_" + item + "' id='row_" + employeerId + "'>";
    html += "<td><input type='hidden' class='name' value='" + key.Name + "'> " + key.Name + "</td>"
    html += "<td><input type='hidden' class='fdate' value='" + key.FromDate + "'>" + FromDate + "</td>"
    html += "<td><input type='hidden' class='tdate' value='" + key.ToDate + "'>" + ToDate + "</td>"
    html += "<td><input type='hidden' class='year_diff' value='" + key.Experience + "'>" + key.Experience + "</td>"
    html += "<td><button class='btn btn-previous edit-btn' onclick=editRow_Previous_emp('" + employeerId + "')><i class='fas fa-pencil-alt'></i></button>"
    html += "<button class='btn btn-previous delete-btn' onclick=deleteRow_Previous_emp('" + employeerId + "')><i class='fas fa-trash-alt'></i></button></td>"
    html += "</tr>";
  });
  html += "</table>"
  return html;
}

function editRow_Previous_emp(employeerId) {
  var name = jQuery("#row_" + employeerId + " td .name").val();
  var fdate = jQuery("#row_" + employeerId + " td .fdate").val();
  var tdate = jQuery("#row_" + employeerId + " td .tdate").val();
  var parent_fielset = jQuery("fieldset.previous_employer_field");
  parent_fielset.find("#name").val(name);
  var newfdate = moment(fdate).format("YYYY-MM-DD");
  var newtdate = moment(tdate).format("YYYY-MM-DD");
  if (newfdate.charAt(0) == '-') {
    newfdate = newfdate.substr(1);
  }
  if (newtdate.charAt(0) == '-') {
    newtdate = newtdate.substr(1);
  }
  parent_fielset.find("#fdate").val(newfdate);
  parent_fielset.find("#tdate").val(newtdate);
  parent_fielset.find("#pre_emp_action").attr("data-id", employeerId);
  parent_fielset.find("#pre_emp_action").removeAttr("onclick");
  parent_fielset.find("#pre_emp_action").attr("onclick", "insert('" + employeerId + "')");
}




function deleteRow_Previous_emp(employeerId) {

  if (confirm('Are you sure do you want to delete?')) {
    var localget = localStorage.getItem("UserCheckRes");
    var jsonData = JSON.parse(localget);
    //var filter_val = JSON.stringify({"EmployeeId": jsonData['Data'][0]['EmployeeID']});
    var EmployeeId = jsonData['Data'][0]['EmployeeID'];
    var EmployerId = employeerId;

    if ($("#pre_emp_action").attr("data-id")) {
      var dataId = $("#pre_emp_action").attr("data-id");
      if (dataId == employeerId) {
        if ($.trim($("#name")) != "") {
          $("#name").val("");
        }
        if ($.trim($("#fdate")) != "") {
          $("#fdate").val("");
        }
        if ($.trim($("#tdate")) != "") {
          $("#tdate").val("");
        }
        jQuery("#pre_emp_action").attr("onclick", "insert()");
        jQuery("#pre_emp_action").attr("data-id", "");
      }
    }



    data = {
      "Method": "DeletePreviousEmployer",
      "Data": {
        "EmployeeId": EmployeeId,
        "EmployerId": EmployerId
      }
    }
    var postCall = PostDataCall(data);
    jQuery(".status").attr("class", "status");
    jQuery(".status").html("");
    jQuery(".status").show();
    if (postCall['IsSuccess'] == true) {
      jQuery(".status").addClass("data_success");
      jQuery(".status").html(postCall['Message']);
      var row_class = $('#row_' + EmployerId).attr('class');
      jQuery('#row_' + EmployerId).remove();
      // var dataEmployee1 = GetPreviousEmployerDetails();
      // messageBox.innerHTML = computeHTML(dataEmployee1);
    } else {
      jQuery(".status").addClass("data_error");
      jQuery(".status").html(postCall['Message']);
      //////console.log('Something Went Wrong');
    }
    setTimeout(function () {
      $(".status").fadeOut("slow", function () {
        $(".status").html("");
      });
    }, 2500);
  }
}
/* for Previous Employer page */


function GetPreviousEmployerDetails() {
  var localget = localStorage.getItem("UserCheckRes");
  var jsonData = JSON.parse(localget);
  var filter_val = JSON.stringify({
    "EmployeeId": jsonData['Data'][0]['EmployeeID']
  });
  var result = callgetlist('GetPreviousEmployerDetails', filter_val);
  return result;

}