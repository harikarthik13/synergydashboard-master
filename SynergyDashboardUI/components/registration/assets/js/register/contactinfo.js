/* for contact info page */

var data1 = [];
var contactInfoApi = [];
var messageBox1 = document.getElementById("display_ContactInfo");

function insert_ContactInfo(ContactId) {
  var localget = localStorage.getItem("UserCheckRes");
  var jsonData = JSON.parse(localget);

  // var contact_type = document.getElementById("contact_type").value;
  var relationship = document.getElementById("relationship").value;
  var Contactname = document.getElementById("Contactname").value;
  var phno = document.getElementById("phno").value;
  var email = document.getElementById("email").value;
  var contact_error = false;
  var selectedIndex;
  var option;

  if (relationship != "") {
    selectedIndex = document.getElementById("relationship").selectedIndex;
    option = document.getElementById("relationship").options[selectedIndex]['textContent'];
  }

  if (
    relationship == "" ||
    Contactname == "" ||
    Contactname.length <= 3 ||
    (phno == "" && email == "" && !contact_error)
  ) {
    contact_error = true;
    if (relationship == "") {
      $("#relationship").addClass("input-error");
      $("#relationship_error").html("Select realationship ");
      return;
    } else {
      $("#relationship").removeClass("input-error");
      $("#relationship_error").html("");
    }
    if (Contactname == "") {
      $("#Contactname").addClass("input-error");
      $("#Contactname_error").html("Enter name ");
    } else if (Contactname.length <= 3) {
      $("#Contactname").addClass("input-error");
      $("#Contactname_error").html("Atleast add more than 3 characters");
    } else {
      $("#Contactname").removeClass("input-error");
      $("#Contactname_error").html("");
    }
    if (phno == "") {
      $("#phno").addClass("input-error");
      if (option.search('Primary') == 0 || option.search('Secondary') == 0) {
        $("#phno_error").html("Enter phone number");
      }
      else {
        $("#phno_error").html(
          "Enter either phone number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(or)"
        );
      }
    } else {
      $("#phno").removeClass("input-error");
      $("#phno_error").html("");
    }
    if (email == "") {
      $("#email").addClass("input-error");
      if (option.search('Primary') == 0 || option.search('Secondary') == 0) {
        $("#email_error").html('Enter mail id');
      }
      else {
        $("#email_error").html("email id");
      }

    } else {
      $("#email").removeClass("input-error");
      $("#email_error").html("");
    }
  }

  // var address_error = false;
  // dataEmployeeAddress1.forEach((de) => {
  //     if (de.Address == data.Data.Address) {
  //       address_error = true;
  //     }
  // });
  /* if(phno == "" && email == ""  && !contact_error)
   {   
     contact_error = true;
      if(phno == "")
       {
         $('#phno').addClass('input-error'); 
         $('#phno_error').html("Enter phone number");
       }
       else
       {
         $('#phno').removeClass('input-error'); 
         $('#phno_error').html("");
       }
       if(email == "")
       {
         $('#email').addClass('input-error'); 
         $('#email_error').html("Enter email id");
       }
       else
       {
         $('#email').removeClass('input-error'); 
         $('#email_error').html("");
       }
   }*/
  if (phno != "" && !contact_error) {
    if (phno.length < 10) {
      contact_error = true;
      $("#phno").addClass("input-error");
      $("#phno_error").html("Enter valid phone number");
    } else if (phno.length > 10) {
      contact_error = true;
      $("#phno").addClass("input-error");
      $("#phno_error").html("Enter valid phone number");
    }
  }
  if (option.search('Primary') == 0 && email == "" || option.search('Secondary') == 0 && email == "") {
    $("#email_error").html("Enter email id");
    contact_error = true;
  }
  if (email != "" && !contact_error) {
    if (!validateEmail(email)) {
      contact_error = true;
      $("#email_error").html("Enter valid email id");
    }
  }

  if (!contact_error) {
    $("#relationship").removeClass("input-error");
    $("#relationship_error").html("");
    $("#Contactname").removeClass("input-error");
    $("#Contactname_error").html("");
    $("#phno").removeClass("input-error");
    $("#phno_error").html("");
    $("#email").removeClass("input-error");
    $("#email_error").html("");

    if (email == "") {
      email = null;
    }

    var contactInfoApi = [];
    var contactInfoPhoneApi = [];
    if (ContactId) {
      //check contact id have email id and phone id to update
      if (ContactId.indexOf("--") != -1) {
        var contactArr = ContactId.split("--");
        var contactId = contactArr[0];
        var contactphoneId = contactArr[1];
        // for email updation
        contactInfoApi = {
          ContactId: contactId,
          EmployeeId: jsonData["Data"][0]["EmployeeID"],
          RelationshipId: relationship,
          ContactName: Contactname,
          Email: email,
          Phone: null
        };
        // for phone updation
        contactInfoPhoneApi = {
          ContactId: contactphoneId,
          EmployeeId: jsonData["Data"][0]["EmployeeID"],
          RelationshipId: relationship,
          ContactName: Contactname,
          Phone: phno,
          Email: null
        };
        data = {
          Method: "PostEmployeeContact",
          Data: contactInfoApi
        };

        dataPhone = {
          Method: "PostEmployeeContact",
          Data: contactInfoPhoneApi
        };
        var postCall = PostDataCall(data);
        var postCallPhone = PostDataCall(dataPhone);
      } else {
        contactId = ContactId;
        // for normal updation
        contactInfoApi = {
          ContactId: contactId,
          EmployeeId: jsonData["Data"][0]["EmployeeID"],
          RelationshipId: relationship,
          ContactName: Contactname,
          Email: email,
          Phone: phno
        };

        data = {
          Method: "PostEmployeeContact",
          Data: contactInfoApi
        };

        var postCall = PostDataCall(data);
      }
    } else {
      //new entry
      contactInfoApi = {
        ContactId: null,
        EmployeeId: jsonData["Data"][0]["EmployeeID"],
        RelationshipId: relationship,
        ContactName: Contactname,
        Phone: phno,
        Email: email
      };

      data = {
        Method: "PostEmployeeContact",
        Data: contactInfoApi
      };

      var postCall = PostDataCall(data);
    }

    // var dataEmployeeAddress1 = GetContactInfo();
    // ////console.log('address data',data);
    // ////console.log('dataEmployeeAddress',dataEmployeeAddress1);

    // var address_error = false;
    // dataEmployeeAddress1.forEach((de) => {
    //     if (de.RelationshipId == data.Data.RelationshipId) {
    //       address_error = true;
    //     }
    // });

    //if(!address_error || ContactId) {

    ////console.log(postCall);
    jQuery(".contact_status").attr("class", "contact_status");
    jQuery(".contact_status").html("");
    jQuery(".contact_status").show();

    if (postCall["IsSuccess"] == true) {
      $(".contact_status").addClass("data_success");
      if (ContactId) {
        $(".contact_status").html(postCall["Message"]);
      } else {
        $(".contact_status").html(postCall["Message"]);
      }
    } else {
      $(".contact_status").addClass("data_error");
      $(".contact_status").html(postCall["Message"]);
    }

    $("#ContactInfoBtn").attr("onclick", "insert_ContactInfo()");
    $("#ContactInfoBtn").attr("data-id", "");
    setTimeout(function () {
      $(".contact_status").fadeOut("slow", function () {
        $(".contact_status").html("");
      });
    }, 1500);

    clearAndShow_ContactInfo();
    var dataEmployeeContact_show = GetContactInfo();
    messageBox1.innerHTML = computeHTML_ContactInfo(dataEmployeeContact_show);
    // } else {
    //   alert("Relationship you have selected is already in our database please select diffrent Relationship")
    // }
    $("#relationship")[0]['disabled'] = false;
  }
}

$('#relationship').on('change', function () {
  if (this.value != "") {
    $("#relationship_error").html("");
  }
});

function GetContactInfo() {
  var filter_val = "";
  var relationresult = callgetlist("GetRelationships", filter_val);
  var options = "<option value=''>Select Relationship</option>";

  var localget = localStorage.getItem("UserCheckRes");
  var jsonData = JSON.parse(localget);
  var resultFinal = [];
  var filter_val = JSON.stringify({
    EmployeeId: jsonData["Data"][0]["EmployeeID"]
  });
  var result = callgetlist("GetEmployeeContacts", filter_val);
  var primary_index = result.findIndex(function (item) { return item['Relationship'] == "Primary Number(Current Number)" });
  var Secondary_index = result.findIndex(function (item) { return item['Relationship'] == "Secondary Number(Current Number)" });
  if (primary_index != -1) {
    relationresult = relationresult.filter(function (item) { return item['Name'].toLowerCase().indexOf('primary') });
  }
  if (Secondary_index != -1) {
    relationresult = relationresult.filter(function (item) { return item['Name'].toLowerCase().indexOf('secondary') });
  }
  for (var i = 0; i < relationresult.length; i++) {
    options +=
      "<option value='" +
      relationresult[i].Id +
      "'>" +
      relationresult[i].Name +
      "</option>";
  }
  $("#relationship").html(options);
  ////console.log(result);
  // To remove duplicate of row while adding contacts email and phone no.
  // resultFinal = groupBy(result, "RelationshipId", function (s, t) {
  //   //console.log(s);
  //   //console.log(t);
  //   t.Email = t.Email ? t.Email + "," + s.Email : s.Email;
  //   t.Email = t.Email.replace(/,/g, "");
  //   t.Phone = t.Phone ? t.Phone + "," + s.Phone : s.Phone;
  //   t.Phone = t.Phone.replace(/,/g, "");
  //   t.Id = t.Id ? t.Id + "--" + s.Id : s.Id;
  //   t.RelationshipId = t.RelationshipId ? t.RelationshipId : s.RelationshipId
  //   if (t.Id.indexOf("--") != -1) {
  //     var EmailId = t.Id.split("--");
  //     t.EmailId = EmailId[0];
  //   } else {
  //     t.EmailId = "null";
  //   }
  //   //t.Id = t.Id ? t.Id : 'Null';
  //   t.PhoneId = s.Id ? s.Id : "Null";
  //   //t.Ids = s.Id ? s.Id : s.Id;
  //   t.Name = t.Name ? t.Name : s.Name;
  //   t.Relationship = t.Relationship ? t.Relationship : s.Relationship;
  // });

  var resultContPhone = result.filter(function (item) { return item['Phone'] });
  var resultContEmail = result.filter(function (item) { return item['Email'] });
  for (i = 0; i < resultContPhone.length; i++) {
    var resultObj = {};
    var filteredArray = resultContEmail.filter(function (item) { return item['Name'] == resultContPhone[i]['Name'] && item['RelationshipId'] == resultContPhone[i]['RelationshipId'] });
    //console.log(filteredArray);
    if (filteredArray.length > 0) {
      resultObj['Id'] = filteredArray[0]['Id'] + '--' + resultContPhone[i]['Id'];
      resultObj['EmailId'] = filteredArray[0]['Id'];
      resultObj['PhoneId'] = resultContPhone[i]['Id'];
      resultObj['Email'] = filteredArray[0]['Email'];
      resultObj['Phone'] = resultContPhone[i]['Phone'];
      resultObj['Name'] = resultContPhone[i]['Name'];
      resultObj['Relationship'] = resultContPhone[i]['Relationship'];
      resultObj['RelationshipId'] = resultContPhone[i]['RelationshipId'];
      resultFinal.push(resultObj);
    }
    else {
      resultObj['Id'] = resultContPhone[i]['Id'];
      resultObj['EmailId'] = "null";
      resultObj['PhoneId'] = resultContPhone[i]['Id'];
      resultObj['Email'] = "";
      resultObj['Phone'] = resultContPhone[i]['Phone'];
      resultObj['Name'] = resultContPhone[i]['Name'];
      resultObj['Relationship'] = resultContPhone[i]['Relationship'];
      resultObj['RelationshipId'] = resultContPhone[i]['RelationshipId'];
      resultFinal.push(resultObj);

    }
  }

  for (var j = 0; j < resultContEmail.length; j++) {
    var resultObj = {};
    var filteredArray = resultContPhone.filter(function (item) { return item['Name'] == resultContEmail[j]['Name'] && item['RelationshipId'] == resultContEmail[j]['RelationshipId'] });
    if (filteredArray.length == 0) {
      resultObj['Id'] = resultContEmail[j]['Id'];
      resultObj['EmailId'] = resultContEmail[j]['Id'];
      resultObj['PhoneId'] = "null";
      resultObj['Email'] = resultContEmail[j]['Email'];
      resultObj['Phone'] = "";
      resultObj['Name'] = resultContEmail[j]['Name'];
      resultObj['Relationship'] = resultContEmail[j]['Relationship'];
      resultObj['RelationshipId'] = resultContEmail[j]['RelationshipId'];
      resultFinal.push(resultObj);
    }

  }

  ////console.log(resultFinal);
  // end
  return resultFinal.sort((a, b) => a.Relationship.localeCompare(b.Name));

  //return result;
}

// To remove duplicate of row while adding contacts email and phone no.
function groupBy(array, key, fn) {
  var hash = Object.create(null);
  return array.reduce(function (r, o) {
    if (!hash[o[key]]) {
      hash[o[key]] = {};
      hash[o[key]][key] = o[key];
      r.push(hash[o[key]]);
    }
    fn(o, hash[o[key]]);
    return r;
  }, []);
}
//end

function clearAndShow_ContactInfo() {
  // Clear our fields
  // document.getElementById("contact_type").value = "";
  document.getElementById("relationship").value = "";
  document.getElementById("Contactname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phno").value = "";
  //messageBox1.innerHTML = computeHTML_ContactInfo();
}

function computeHTML_ContactInfo(data1) {
  var html = "<table id='myTable'>";
  html += "<tr>";
  // html += "<th>Contact type</th>"
  html += "<th>Relationship</th>";
  html += "<th>Name</th>";
  html += "<th>Phone number</th>";
  html += "<th>Email id</th>";
  html += "<th>Action</th>";
  html += "</tr>";

  ////console.log(data1);

  data1.forEach(function (key, item) {
    var ContactId = key.Id;

    html += "<tr class='row_" + item + "' id='row_" + ContactId + "'>";
    // html += "<td><input type='hidden' class='contact_type' value='"+ key.contact_type +"'>" + key.contact_type + "</td>"
    html +=
      "<td><input type='hidden' class='contactRelationship' value='" +
      key.RelationshipId +
      "'> " +
      key.Relationship +
      "</td>";
    html +=
      "<td><input type='hidden' class='contactname' value='" +
      key.Name +
      "'>" +
      key.Name +
      "</td>";
    html +=
      "<td><input type='hidden' class='contactphno' value='" +
      key.Phone +
      "'>" +
      key.Phone +
      "</td>";
    html +=
      "<td><input type='hidden' class='contactemail' value='" +
      key.Email +
      "'>" +
      key.Email +
      "</td>";
    html +=
      "<td><button class='btn  edit-btn' onclick=editRow_ContactInfo('" +
      ContactId +
      "')><i class='fas fa-pencil-alt'></i></button>";
    html +=
      "<button class='btn btn-previous delete-btn' onclick=deleteRow_ContactInfo('" +
      ContactId +
      "')><i class='fas fa-trash-alt'></i></button></td>";
    html += "</td>";
    html += "</tr>";
  });
  html += "</table>";
  return html;
}

function deleteRow_ContactInfo(ContactId) {
  var result = confirm("Want to delete contact info?");
  if (result) {
    var localget = localStorage.getItem("UserCheckRes");
    var jsonData = JSON.parse(localget);
    var employee_id = jsonData["Data"][0]["EmployeeID"];

    if ($("#ContactInfoBtn").attr("data-id")) {
      var dataId = $("#ContactInfoBtn").attr("data-id");
      if (dataId == ContactId) {
        clearAndShow_ContactInfo();
        jQuery("#ContactInfoBtn").attr("onclick", "insert_ContactInfo()");
        jQuery("#ContactInfoBtn").attr("data-id", "");
      }
    }
    //check contact id have email id and phone id to delete
    var data = [];
    if (ContactId.indexOf("--") != -1) {
      var contactId = ContactId.split("--");
      var contactEId = contactId[0];
      var contactPId = contactId[1];
      data = {
        Method: "DeleteEmployeeContact",
        Data: {
          EmployeeId: employee_id,
          ContactId: contactEId
        }
      };

      dataP = {
        Method: "DeleteEmployeeContact",
        Data: {
          EmployeeId: employee_id,
          ContactId: contactPId
        }
      };
      //delete first row
      var postCall = PostDataCall(data);
      //delete second row
      var postCall = PostDataCall(dataP);
    } else {
      // normal deletion
      data = {
        Method: "DeleteEmployeeContact",
        Data: {
          EmployeeId: employee_id,
          ContactId: ContactId
        }
      };
      var postCall = PostDataCall(data);
    }

    jQuery(".contact_status").attr("class", "contact_status");
    jQuery(".contact_status").html("");
    jQuery(".contact_status").show();

    if (postCall["IsSuccess"] == true) {
      jQuery(".contact_status").addClass("data_success");
      jQuery(".contact_status").html(postCall["Message"]);
      var dataEmployeeContact_show = GetContactInfo();
      messageBox1.innerHTML = computeHTML_ContactInfo(dataEmployeeContact_show);
      var row_class = $("#row_" + ContactId).attr("class");
      $("#row_" + ContactId).remove();
    } else {
      jQuery(".contact_status").addClass("data_error");
      jQuery(".contact_status").html(postCall["Message"]);
      //////console.log('Something Went Wrong');
    }
    setTimeout(function () {
      $(".contact_status").fadeOut("slow", function () {
        $(".contact_status").html("");
      });
    }, 1500);
  }
}

function editRow_ContactInfo(ContactId) {
  var contactRelationship = jQuery(
    "#row_" + ContactId + " td .contactRelationship"
  ).val();
  var contactname = jQuery("#row_" + ContactId + " td .contactname").val();
  var contactphno = jQuery("#row_" + ContactId + " td .contactphno").val();
  var contactemail = jQuery("#row_" + ContactId + " td .contactemail").val();
  var parent_fielset = jQuery("fieldset.contact_info");
  var filter_val = "";
  var options = "<option value=''>Select Relationship</option>";
  var relationresult = callgetlist("GetRelationships", filter_val);
  for (var i = 0; i < relationresult.length; i++) {
    options +=
      "<option value='" +
      relationresult[i].Id +
      "'>" +
      relationresult[i].Name +
      "</option>";
  }
  $("#relationship").html(options);
  parent_fielset.find("#relationship").val(contactRelationship);
  parent_fielset.find("#Contactname").val(contactname);
  parent_fielset.find("#phno").val(contactphno);
  parent_fielset.find("#email").val(contactemail);
  parent_fielset.find("#ContactInfoBtn").attr("data-id", ContactId);
  parent_fielset.find("#ContactInfoBtn").removeAttr("onclick");
  parent_fielset
    .find("#ContactInfoBtn")
    .attr("onclick", "insert_ContactInfo('" + ContactId + "')");
  //alert(ContactId);
}

/* Email validation */

function validateEmail(email) {
  var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (filter.test(email)) {
    return true;
  } else {
    return false;
  }
}
