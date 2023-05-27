function GetEstimatePricing() {
  // var localget = localStorage.getItem("UserCheckRes");
  // var jsonData = JSON.parse(localget);
  var get_ProposalId = localStorage.getItem('ProposalId');
  var set_ProposalId = "";
  if (get_ProposalId != "") {
    set_ProposalId = get_ProposalId;
  }
  var filter_val = JSON.stringify({
    "ProposalId": set_ProposalId,
    "IsActive": true
  });
  var result = callgetlist('GetEstimationAndPricing ', filter_val);
  if(result.length == 0){
    $("#proposal-title-6").html('Estimate Pricing');
}else{
  $("#proposal-title-6").html(result[0]['HeaderTitle']);
  // CKEDITOR.instances.estimate_pricing.setData(result[0]['EstimationSummary']);
  estimate_pricingDxEditor.option("value", result[0]['EstimationSummary'])
}
  return result;

}


function displayEstimatePricing() {
  // debugger
  var SavedEstimatePricing = GetEstimatePricing();
  var currencyId = "";
  if(SavedEstimatePricing.length != 0) {
    if (SavedEstimatePricing[0]['CurrencyId'] != "") {
      currencyId = SavedEstimatePricing[0]['CurrencyId'];
    }
  }
  HTML = EstimatePricing_computeHTML(SavedEstimatePricing);
  $("#displayEstimatePricing").html(HTML);
  /*$("#pdf_EstimatePricing").html(HTML);*/
  return currencyId;

}


function EstimatePricing_computeHTML(SavedEstimatePricing) {
  var html;

  if (SavedEstimatePricing.length == 0) {
    html += "<tr><td style='border: none;'><h6>No Data Found.!</h6></td></tr>";
  } else {
  html = "<table id='EstimateTable' class='table table-striped' rows='" + SavedEstimatePricing.length + "' cellspacing=0 border=1>";
  html += "<tbody>";
  html += "<tr style='height:33px;'>";
  html += "<td  rowspan=2>";
  html += "<nobr>#</nobr>";
  html += "</td>";
  html += "<td  rowspan=2>";
  html += "<nobr>Project Phases</nobr>";
  html += "</td>";
  html += "<td  colspan=2>";
  html += "<nobr>Man</nobr>";
  html += "</td>";
  html += "<td  rowspan=2>";
  html += "<nobr># of Resources</nobr>";
  html += "</td>";
  html += "<td  colspan=2>";
  html += "<nobr>Business</nobr>";
  html += "</td>";
  html += "<td  colspan=2>";
  html += "<nobr>Rate : <select name='currency' id='proposalCurrency' class='currency'> </select></nobr>";
  html += "</td>";
  html += "</tr>";
  html += "<tr style='height:33px;'>";
  html += "<td >";
  html += "<nobr>Hours</nobr>";
  html += "</td>";
  html += "<td >";
  html += "<nobr>Days</nobr>";
  html += "</td>";
  html += "<td>";
  html += "<nobr>Hours</nobr>";
  html += "</td>";
  html += "<td >";
  html += "<nobr>Days</nobr>";
  html += "</td>";
  html += "<td >";
  html += "<nobr>Per Hour Cost</nobr>";
  html += "</td>";
  html += "<td>";
  html += " <nobr>Total</nobr>";
  html += "</td>";
  html += "</tr>";
    var saved_currency = "$";
    var total_mHours = 0;
    var total_mDays = 0;
    var total_bHours = 0;
    var total_bDays = 0;
    var total_Total = 0;
    var total_id = 0;
    SavedEstimatePricing.forEach(function (key, item) {
      var projectId = key.PhaseId;
      var sample_id = item + 1;

      total_mHours += key.ManHours;
      total_mDays += key.ManDays;
      total_bHours += key.BusinessHours;
      total_bDays += key.BusinessDays;
      total_Total += key.Total;

      total_id += sample_id;
      if(key.NoOfResources == null || key.NoOfResources == 0){
        key.NoOfResources = 1;
      }
      html += "<tr style='height:33px;'class='row_" + item + "' id='row_" + projectId + "'>";
      html += "<td><input type='hidden' class='id_" + sample_id + "' value='" + projectId + "'><input type='hidden' class='phase' value='" + sample_id + "'> " + sample_id + "</td>";
      html += "<td><input type='hidden' class='title' value='" + key.ProjectPhases + "'><span id='projectPhase_" + sample_id + "'>" + key.ProjectPhases + "</span></td>";
      html += "<td><input type='hidden' class='mHours_" + sample_id + "' value='" + key.ManHours + "'><span id='mHours_" + sample_id + "'>" + key.ManHours + "</span></td>";
      html += "<td><input type='hidden' class='phase' value='" + key.ManDays + "'><span id='mDays_" + sample_id + "'>" + key.ManDays + "</span></td>";
      html += "<td><input min='0' type='number' class='Resource_" + sample_id + "' value='" + key.NoOfResources + "' onchange='Resource_change(this, event)'></td>";
      html += "<td><input type='hidden' class='bHours_" + sample_id + "' value='" + key.BusinessHours + "'><span id='bHours_" + sample_id + "'>" + key.BusinessHours + "</span></td>";
      html += "<td><input type='hidden' class='bDays_" + sample_id + "' value='" + key.BusinessDays + "'><span id='bDays_" + sample_id + "'>" + key.BusinessDays + "</span></td>";
      html += "<td><input min='0' type='number' class='rHours_" + sample_id + "' value='" + key.RateUSDPerHour + "' onchange='Rate_change(this, event)'></td>";
      if(key.Total == null)
      { key.Total = 0;}  
      html += "<td><input type='hidden' class='rTotal_" + sample_id + "' value='" + key.Total + "'><span  id='Total_" + sample_id + "'>" + key.Total + "</span></td>";
      html += "</tr>";

    });

    html += "<tr>";
    html += "<td></td>";
    html += "<td>TOTAL</td>";
    html += "<td>" + total_mHours + "</td>";
    html += "<td>" + total_mDays + "</td>";
    html += "<td></td>";
    html += "<td id='total_bHours'>" + total_bHours + "</td>";
    html += "<td id='total_bDays'>" + total_bDays + "</td>";
    html += "<td></td>";
    html += "<td id='total_Total'>" + total_Total + "</td>";
    html += "</tr>";
    html += "</tbody></table>"
  return html;
  }

  // html += "</tbody></table>"
  return html;
}

function Resource_change(ths) {
  var classname = ths.className;
  var id = classname.replace("Resource_", "");

  var Resources = $("." + classname).val();

  $(".Resource_" + id).attr("value", Resources);
  var ManHours = $(".mHours_" + id).val();

  if(ManHours != 0 && (Resources != "" && Resources != 0)){
    var BusinessHours = Math.round(ManHours / Resources);
    var BusinessDays = Math.round(BusinessHours / 8);
  
    $("#bHours_" + id).html(BusinessHours);
    $("#bDays_" + id).html(BusinessDays);
  
    $(".bHours_" + id).val(BusinessHours);
    $(".bDays_" + id).val(BusinessDays);
  
  
    var tds = $("#EstimateTable").attr("rows");
    var change_bHours = 0;
    var change_bDays = 0;
    for (var i = 1; i <= tds; i++) {
      change_bHours += parseInt($(".bHours_" + i).val());
      change_bDays += parseInt($(".bDays_" + i).val());
    }
  
    $("#total_bHours").html(change_bHours);
    $("#total_bDays").html(change_bDays);
  }
  else{
    $("." + classname).val(1)
  }
  if(ManHours == 0){
    $("." + classname).val(0)
  }
}

function Rate_change(ths) {  
  var classname = ths.className;
  var id = classname.replace("rHours_", "");

  var Rate = $("." + classname).val();

  $(".rHours_" + id).attr("value", Rate);
  var ManHours = $(".mHours_" + id).val();

  var Total = ManHours * Rate;

  $("#Total_" + id).html(Total);
  $(".rTotal_" + id).val(Total);


  var tds = $("#EstimateTable").attr("rows");
  var change_rTotal = 0;
  for (var i = 1; i <= tds; i++) {
    change_rTotal += parseInt($(".rTotal_" + i).val());

  }

  $("#total_Total").html(change_rTotal);



}


function post_EstimatePricing() {
  var get_ProposalId = localStorage.getItem('ProposalId');
  var estimatePricing_title = $("#proposal-title-6").html();
  var estimate_pricing_description = estimate_pricingDxEditor.option("value");
  var set_ProposalId = "";
  if (get_ProposalId != "") {
    set_ProposalId = get_ProposalId;
  } else {
    ProposalSwal("OOPS!","PropsalId not found","error")
    return false;
  }

  var currency = $('.currency').val();
  // This condition need implement based on user types
  // if (currency == "" || currency == null) {
  //   return false;
  // }
  // This condition need implement based on user types
  var tds = $("#EstimateTable").attr("rows");

  var localget = localStorage.getItem("UserCheckRes");
  var jsonData = JSON.parse(localget);
  var EmployeeID = jsonData['Data'][0]['EmployeeID'];

  var postData = [];
  var get_data;
  for (var i = 1; i <= tds; i++) {
    /*post[i] = [$(".Resource_"+i).val(),$("#bHours_"+i).html(),$("#bDays_"+i).html(),$(".rHours_"+i).val(),$("#Total_"+i).html()];
     */
    /*//console.log(post[i]);*/

    get_data = {
      "ProposalId": set_ProposalId,
      "PhaseId": $(".id_" + i).val(),
      "NumberOfResources": $(".Resource_" + i).val(),
      "Cost": $(".rHours_" + i).val(),
      "Estimatedby": EmployeeID,
      "PricingBy": "",
      "Isbillable": "",
      "CurrencyID": currency,
    };

    postData.push(get_data);
  }


  var Post_Data = JSON.stringify(postData);
  //console.log(Post_Data);

  data = {
    "Method": "PostRFPEstimationAndPricing",
    "Data": {
      "Title" : estimatePricing_title,
      "Data": Post_Data,
      "Description" : estimate_pricing_description
    }
  }

  var postCall = PostDataCall(data);
  if (postCall['IsSuccess'] == true) {
    //console.log(postCall['Message']);
    return true;
  } else {
    //console.log(postCall['Message']);
    //return true;
  }

}



function GetCurrencies(classname) {
  var filter_val = JSON.stringify({
    "IsActive": true
  });
  var result = callgetlist('GetCurrencies', filter_val);
  var options = "<option value=''>Select Currency</option>";
  for (var i = 0; i < result.length; i++) {
    options += "<option value='" + result[i].Id + "'>" + result[i].Code + "</option>";
  }
  $("." + classname).html(options);
}



function EstimatePricing_computeHTMLnew(SavedEstimatePricing) {

  var html = "<table id='EstimateTable' class='table table-striped' rows='" + SavedEstimatePricing.length + "' cellspacing=0 border=1>";
  html += "<tbody>";
  html += "<tr style='height:33px;'>";
  html += "<td  rowspan=2>";
  html += "<nobr>#</nobr>";
  html += "</td>";
  html += "<td  rowspan=2>";
  html += "<nobr>Project Phases</nobr>";
  html += "</td>";
  html += "<td  colspan=2>";
  html += "<nobr>Man</nobr>";
  html += "</td>";
  html += "<td  rowspan=2>";
  html += "<nobr># of Resources</nobr>";
  html += "</td>";
  html += "<td  colspan=2>";
  html += "<nobr>Business</nobr>";
  html += "</td>";
  html += "<td  colspan=2>";
  html += "<nobr>Rate : <select name='currency' class='currency'> </select></nobr>";
  html += "</td>";
  html += "</tr>";
  html += "<tr style='height:33px;'>";
  html += "<td >";
  html += "<nobr>Hours</nobr>";
  html += "</td>";
  html += "<td >";
  html += "<nobr>Days</nobr>";
  html += "</td>";
  html += "<td>";
  html += "<nobr>Hours</nobr>";
  html += "</td>";
  html += "<td >";
  html += "<nobr>Days</nobr>";
  html += "</td>";
  html += "<td >";
  html += "<nobr>Per Hour Cost</nobr>";
  html += "</td>";
  html += "<td>";
  html += " <nobr>Total</nobr>";
  html += "</td>";
  html += "</tr>";

  if (SavedEstimatePricing.length == 0) {
    html += "<tr colspan='4'><td>No Data Found.!</td></tr>";
  } else {
    var saved_currency = "$";
    var total_mHours = 0;
    var total_mDays = 0;
    var total_bHours = 0;
    var total_bDays = 0;
    var total_Total = 0;
    var total_id = 0;

    /* grouping code start here */
    var grouping_bDays = grouping_ManDays = grouping_ManHours = 0;
    var groups = {};
    var arr = {};
    for (var i = 0; i < SavedEstimatePricing.length; i++) {
      var groupName = SavedEstimatePricing[i].ProjectPhases;
      if (!groups[groupName]) {
        groups[groupName] = [];
        arr[groupName] = [];
      }

      grouping_bDays = grouping_bDays + SavedEstimatePricing[i].BusinessHours;
      grouping_ManDays = grouping_ManDays + SavedEstimatePricing[i].ManDays;
      grouping_ManHours = grouping_ManHours + SavedEstimatePricing[i].ManHours;

      groups[groupName]['BusinessHours'] = grouping_bDays;
      groups[groupName]['ManDays'] = grouping_ManDays;
      groups[groupName]['ManHours'] = grouping_ManHours;
      groups[groupName]['id'] = SavedEstimatePricing[i].Id;
      groups[groupName]['currencyId'] = SavedEstimatePricing[i].currencyId;

      setarray = {
        "Feature": SavedEstimatePricing[i].Feature,
        "SubFeature": SavedEstimatePricing[i].SubFeature
      }
      arr[groupName].push(setarray);

      groups[groupName]['details'] = arr[groupName];
    }

    SavedEstimatePricing = [];
    for (var projectPhase in groups) {
      //console.log(groups[projectPhase]['BusinessHours'])
      SavedEstimatePricing.push({
        projectPhase: projectPhase,
        BusinessHours: groups[projectPhase]['BusinessHours'],
        ManDays: groups[projectPhase]['ManDays'],
        ManHours: groups[projectPhase]['ManHours'],
        details: groups[projectPhase]['details'],
        currencyId: groups[projectPhase]['currencyId']
      });
    }
    /* grouping code ends here */
    //console.log(SavedEstimatePricing);
    SavedEstimatePricing.forEach(function (item, key) {
      var serial = key + 1;
      var bdays = kTotal = 0;
      var task_details = "";
      var tasks = item.details;
      tasks.forEach(function (items, keys) {
        task_details += "<br><span> <strong> Feature : </strong>" + items.Feature + "</span>";
        task_details += "<br><span> <strong> Sub Feature : </strong>" + items.SubFeature + "</span>";
      });
      html += "<tr style='height:33px;'class='row_" + key + "' >";
      html += "<td>" + serial + "</td>";
      html += "<td><span onclick='expand(this)' class='expandTitle' id='projectPhase_" + serial + "'>" + item.projectPhase + "<span class='sign'></span></span><br><span class='expandContent'>" + task_details + "</span></td>";
      html += "<td><span id='mHours_" + serial + "'>" + item.ManHours + "</span></td>";
      var calcManDays = Math.round(item.ManHours / 8);
      html += "<td><span id='mDays_" + serial + "'>" + /*item.ManDays*/ calcManDays + "</span></td>";
      html += "<td><input min='0' type='number' class='Resource_" + serial + "' value='" + item.NoOfResources + "' onchange='Resource_changeNew(this, event)'></td>";
      html += "<td><span id='bHours_" + serial + "'>" + item.BusinessHours + "</span></td>";
      bdays = Math.round(item.BusinessHours / 8);
      html += "<td><span id='bDays_" + serial + "'>" + bdays + "</span></td>";
      html += "<td><input min='0' type='number' class='rHours_" + serial + "' value='" + key.RateUSDPerHour + "' onchange='Rate_changeNew(this, event)'></td>";
      html += "<td><span  id='Total_" + serial + "'>" + kTotal + "</span></td>";
      html += "</tr>";

      total_mHours += item.ManHours;
      /*total_mDays += item.ManDays;*/
      total_mDays += calcManDays;
      total_bHours += item.BusinessHours;
      total_bDays += bdays;
      total_Total += kTotal;
    });

    html += "<tr>";
    html += "<td></td>";
    html += "<td>TOTAL</td>";
    html += "<td>" + total_mHours + "</td>";
    html += "<td>" + total_mDays + "</td>";
    html += "<td></td>";
    html += "<td id='total_bHours'>" + total_bHours + "</td>";
    html += "<td id='total_bDays'>" + total_bDays + "</td>";
    html += "<td></td>";
    html += "<td id='total_Total'>" + total_Total + "</td>";
    html += "</tr>";
  }

  html += "</tbody></table>"
  return html;
}


function expand(ths) {

  $(ths).toggleClass('expand').nextUntil('tr.expandContent').slideToggle(100);
  /*$(ths).siblings('.expandContent').toggle();*/
}


function Resource_changeNew(ths) {
  var classname = ths.className;
  var id = classname.replace("Resource_", "");

  var Resources = $("." + classname).val();

  $(".Resource_" + id).attr("value", Resources);
  var ManHours = $("#mHours_" + id).text();

  var BusinessHours = Math.round(ManHours / Resources);
  var BusinessDays = Math.round(BusinessHours / 8);

  $("#bHours_" + id).html(BusinessHours);
  $("#bDays_" + id).html(BusinessDays);

  $(".bHours_" + id).val(BusinessHours);
  $(".bDays_" + id).val(BusinessDays);


  var tds = $("#EstimateTable").attr("rows");
  var change_bHours = 0;
  var change_bDays = 0;
  for (var i = 1; i < tds; i++) {
    change_bHours += parseInt($("#bHours_" + i).text());
    change_bDays += parseInt($("#bDays_" + i).text());
  }

  $("#total_bHours").html(change_bHours);
  $("#total_bDays").html(change_bDays);

}


function Rate_changeNew(ths) {
  var classname = ths.className;
  var id = classname.replace("rHours_", "");

  var Rate = $("." + classname).val();

  $(".rHours_" + id).attr("value", Rate);
  var ManHours = $("#mHours_" + id).text();

  var Total = ManHours * Rate;

  $("#Total_" + id).html(Total);
  $(".rTotal_" + id).val(Total);


  var tds = $("#EstimateTable").attr("rows");

  var change_rTotal = 0;
  for (var i = 1; i < tds; i++) {
    change_rTotal += parseInt($("#Total_" + i).text());
  }

  $("#total_Total").html(change_rTotal);



}