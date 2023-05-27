/* for Address info page */

var messageBox3 = document.getElementById("display_Address");
var data3 = [];
var addressData = [];
var messageBox3 = document.getElementById("display_Address");

function insert_Address(addressId = null) {

  var address = document.getElementById("address").value;
  var landmark = document.getElementById("landmark").value;
  var state = document.getElementById("state").value;
  var city = document.getElementById("city").value;
  var postal_code = document.getElementById("postal_code").value;

  var localget = localStorage.getItem("UserCheckRes");
  var jsonData = JSON.parse(localget);

  pincode_preg = /^((?!(0))[0-9]{6})$/;

  /*if(!pincode_preg.test(postal_code))
  {
    alert("sadsad");
  }*/
  var address_error = false;

  if (address == "" || landmark == "" || state == "" || city == "" || postal_code == "" ||
    landmark.length <= 3 || !pincode_preg.test(postal_code)) {
    if (address == "") {
      $('#address').addClass('input-error');
      $('#address_error').html("Select Address ");
    } else {
      $('#address').removeClass('input-error');
      $('#address_error').html("");
    }
    if (landmark == "") {
      $('#landmark').addClass('input-error');
      $('#landmark_error').html("Enter landmark ");
    } else if (landmark.length <= 3) {
      $('#landmark').addClass('input-error');
      $('#landmark_error').html('Atleast add more than 3 characters');
      address_error = true;
    } else {
      $('#landmark').removeClass('input-error');
      $('#landmark_error').html("");
    }
    if (state == "") {
      $('#state').addClass('input-error');
      $('#state_error').html("Select state ");
    } else {
      $('#state').removeClass('input-error');
      $('#state_error').html("");
    }
    if (city == "") {
      $('#city').addClass('input-error');
      $('#city_error').html("Select city ");
    } else {
      $('#city').removeClass('input-error');
      $('#city_error').html("");
    }
    if (postal_code == "") {
      $('#postal_code').addClass('input-error');
      $('#postal_code_error').html("Enter postal code ");
    } else if (!pincode_preg.test(postal_code)) {
      $('#postal_code').addClass('input-error');
      $('#postal_code_error').html("Enter valid postal code ");
      address_error = true;
    } else {
      $('#postal_code').removeClass('input-error');
      $('#postal_code_error').html(" ");
    }
    /*else if(postal_code != "")
    {
      if(postal_code.length < 6)
      {
        $('#postal_code').addClass('input-error'); 
        $('#address_error').html("Enter valid postal code ");
      }
      else
      {
        $('#postal_code').addClass('input-error'); 
        $('#postal_code_error').html(" ");
      }
    }*/
  }


  if (address != "" && landmark != "" && state != "" && city != "" && postal_code != "" && !address_error) {


    $('#address').removeClass('input-error');
    $('#address_error').html("");
    $('#landmark').removeClass('input-error');
    $('#landmark_error').html("");
    $('#state').removeClass('input-error');
    $('#state_error').html("");
    $('#city').removeClass('input-error');
    $('#city_error').html("");
    $('#postal_code').removeClass('input-error');
    $('#postal_code_error').html(" ");


    data3.push({
      address: address,
      landmark: landmark,
      state: state,
      city: city,
      postal_code: postal_code
    });
    addressData = [];
    // addressData ={
    //   AddressId: null,
    //   EmployeeId: jsonData['Data'][0]['EmployeeID'],
    //   AddressName:address,
    //   Address:landmark,
    //   CountryId: "40DE9F18-15D9-4820-8C0F-D4ECA6C5051C",
    //   StateId:state,
    //   CityId:city,
    //   PostalCode:postal_code
    // };

    if (addressId) {
      addressData = {
        AddressId: addressId,
        EmployeeId: jsonData['Data'][0]['EmployeeID'],
        AddressName: address,
        Address: landmark,
        CountryId: "40DE9F18-15D9-4820-8C0F-D4ECA6C5051C",
        StateId: state,
        CityId: city,
        PostalCode: postal_code
      };
    } else {
      addressData = {
        AddressId: null,
        EmployeeId: jsonData['Data'][0]['EmployeeID'],
        AddressName: address,
        Address: landmark,
        CountryId: "40DE9F18-15D9-4820-8C0F-D4ECA6C5051C",
        StateId: state,
        CityId: city,
        PostalCode: postal_code
      };
    }

    data = {
      "Method": "PostEmployeeAddress",
      "Data": addressData
    }

    var check;
    var dataEmployeeAddress1 = GetEmployeeAddress(check = true);
    ////console.log('address data',data);
    ////console.log('dataEmployeeAddress',dataEmployeeAddress1);


    var postCall = PostDataCall(data);
    jQuery(".address_status").attr("class", "address_status");
    jQuery(".address_status").html("");
    jQuery(".address_status").show();

    if (postCall['IsSuccess'] == true) {
      $(".address_status").addClass("data_success");
      if (addressId) {
        $(".address_status").html(postCall['Message']);
      } else {
        $(".address_status").html(postCall['Message']);
      }
    } else {
      $(".address_status").addClass("data_error");
      $(".address_status").html(postCall['Message']);
    }

    $("#add_address").attr("onclick", "insert_Address()");
    $("#add_address").attr("data-id", "");
    statusTimeOut();

    ////console.log(postCall);
    //return false;

    var dataEmployeeAddress = GetEmployeeAddress();
    ////console.log(dataEmployeeAddress);
    clearAndShow_Address();
    messageBox3.innerHTML = computeHTML_Address(dataEmployeeAddress);



  } else {
    ////console.log('address.js');
  }

}

function clearAndShow_Address() {
  // Clear our fields
  //document.getElementById("address").value = "";
  $("#address").find('option:eq(0)').prop('selected', true);
  document.getElementById("landmark").value = "";
  document.getElementById("state").value = "";
  //document.getElementById("city").value = "";
  getCity("");
  document.getElementById("postal_code").value = "";
  // messageBox3.innerHTML = computeHTML_Address();
}


function computeHTML_Address(empaddress) {

  var html = "<table id='myTable'>";
  html += "<tr>";
  html += "<th>Address</th>"
  html += "<th>Landmark</th>"
  html += "<th>State </th>"
  html += "<th>City</th>"
  html += "<th>Postal Code</th>"
  html += "<th>Action</th>"
  html += "</tr>";
  ////console.log(empaddress);
  empaddress.forEach(function (key, item) {
    var AddressId = key.Id;
    html += "<tr class='row_" + item + "' id='row_" + AddressId + "'>";
    html += "<td><input type='hidden' class='address' value='" + key.Name + "'> " + key.Name + "</td>"
    html += "<td><input type='hidden' class='landmark' value='" + key.Address + "'>" + key.Address + "</td>"
    html += "<td><input type='hidden' class='state' value='" + key.StateId + "'>" + key.StateName + "</td>"
    html += "<td><input type='hidden' class='city' value='" + key.CityId + "'>" + key.CityName + "</td>"
    html += "<td><input type='hidden' class='postal_code' value='" + key.PostalCode + "'>" + key.PostalCode + "</td>"
    html += "<td><button class='btn btn-previous edit-btn' onclick=editRow_Address('" + AddressId + "')><i class='fas fa-pencil-alt'></i></button>"
    html += "<button class='btn btn-previous delete-btn' onclick=deleteRow_Address('" + AddressId + "')><i class='fas fa-trash-alt'></i></button></td>"
    html += "</tr>";
  });
  html += "</table>"
  return html;
}


function editRow_Address(addressId) {
  var address = jQuery("#row_" + addressId + " td .address").val();
  var landmark = jQuery("#row_" + addressId + " td .landmark").val();
  var state = jQuery("#row_" + addressId + " td .state").val();
  var city = jQuery("#row_" + addressId + " td .city").val();
  var postal_code = jQuery("#row_" + addressId + " td .postal_code").val();
  var parent_fielset = jQuery("fieldset.addressFieldset");
  //alert(parent_fielset.attr('class'));
  parent_fielset.find("#address").val(address);
  parent_fielset.find("#landmark").val(landmark);
  parent_fielset.find("#state").val(state);
  getCity(state);
  parent_fielset.find("#city").val(city);
  parent_fielset.find("#postal_code").val(postal_code);
  parent_fielset.find("#add_address").attr("data-id", addressId);
  parent_fielset.find("#add_address").removeAttr("onclick");
  parent_fielset.find("#add_address").attr("onclick", "insert_Address('" + addressId + "')");
}


function deleteRow_Address(addressId) {

  if (confirm('Are you sure do you want to delete?')) {
    var localget = localStorage.getItem("UserCheckRes");
    var jsonData = JSON.parse(localget);
    //var filter_val = JSON.stringify({"EmployeeId": jsonData['Data'][0]['EmployeeID']});
    var EmployeeId = jsonData['Data'][0]['EmployeeID'];
    var EmployerId = addressId;

    if ($("#add_address").attr("data-id")) {
      var dataId = $("#add_address").attr("data-id");
      if (dataId == addressId) {
        clearAndShow_Address();
        jQuery("#add_address").attr("onclick", "insert_Address()");
        jQuery("#add_address").attr("data-id", "");
      }
    }


    data = {
      "Method": "DeleteEmployeeAddress",
      "Data": {
        "EmployeeId": EmployeeId,
        "AddressId": addressId
      }
    }

    var postCall = PostDataCall(data);
    //////console.log(postCall);
    jQuery(".address_status").attr("class", "address_status");
    jQuery(".address_status").html("");
    jQuery(".address_status").show();

    if (postCall['IsSuccess'] == true) {

      jQuery(".address_status").addClass("data_success");
      jQuery(".address_status").html(postCall['Message']);
      var row_class = $('#row_' + addressId).attr('class');
      $('#row_' + addressId).remove();
    } else {
      jQuery(".address_status").addClass("data_error");
      jQuery(".address_status").html(postCall['Message']);
      //////console.log('Something Went Wrong');
    }
    statusTimeOut();
  }

  //data3.splice(,1);
}



/* for Address info page */


function getCity(state) {
  var stateName = state;
  var filter_val = JSON.stringify({
    "StateId": stateName
  });
  var result = callgetlist('GetCities', filter_val);
  var options = "<option value=''>Select City</option>";
  for (var i = 0; i < result.length; i++) {
    options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
  }
  $("#city").html(options);

}


function GetEmployeeAddress(check = false) {
  if (check == false) {
    var filter_val = JSON.stringify({
      "CountryId": "40DE9F18-15D9-4820-8C0F-D4ECA6C5051C"
    });
    var result = callgetlist('GetStates', filter_val);
    var options = "<option value=''>Select State</option>";
    for (var i = 0; i < result.length; i++) {
      options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }
    $("#state").html(options);
  }
  var localget = localStorage.getItem("UserCheckRes");
  var jsonData = JSON.parse(localget);
  var filter_val = JSON.stringify({
    "EmployeeId": jsonData['Data'][0]['EmployeeID']
  });
  var result = callgetlist('GetEmployeeAddress', filter_val);
  return result;
}

function statusTimeOut() {
  setTimeout(function () {
    $(".address_status").fadeOut("slow", function () {
      $(".address_status").html("");
    });
  }, 1500);
}