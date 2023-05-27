var fullBenchData;
var partBenchData;

$( document ).ready(function() {
    var sheetID = "1URop7XuHOWaGbOhEbNyh0KorjNCvCY802BK9V5HNkvw";
    fullBenchrange = "BenchSummary2!W:X";
    fullBenchData =  callgetSpreadSheetData(sheetID,fullBenchrange);
    var fullTime = 0;
    var partTime = 0;
    var totalTime = 0;
    for(let i=1;i<fullBenchData['Data'].length;i++){
        fullTime = fullTime+Number(fullBenchData['Data'][i][1]);
    }
    partBenchrange = "BenchSummary2!z:AA";
    partBenchData = callgetSpreadSheetData(sheetID,partBenchrange);
    for(let j=1;j<partBenchData['Data'].length;j++){
        partTime = partTime+Number(partBenchData['Data'][j][1])
    }
    totalTime = fullTime + partTime;
    $('#resourceTbl').find('#fullTime')[0]['textContent'] = fullTime;
    $('#resourceTbl').find('#partTime')[0]['textContent'] = partTime;
    $('#resourceTbl').find('#totalTime')[0]['textContent'] = totalTime;
});
 

function open_model(benchType) {
    var title = "";
    var result;
    var contentHtml ="";
    var rowData ="";
    var total =0.00;
    var resourceItems;
    $("#benchTbl tbody").empty();
    if(benchType == "full"){
        title = "Full Time Bench Count";       
        result = fullBenchData;
    }
    else if(benchType == "part"){
        title = "Part Time Bench Count";
        result = partBenchData;
    }
    else if(benchType == "total"){
        title = "Total Bench Count";
        var a = fullBenchData['Data'];
        var b = partBenchData['Data'];
        var arrayList1 = a.map(function(v) {return v[0];});
        arrayList1.shift();
        var arrayList2 = b.map(function(v) {return v[0];});
        arrayList2.shift();
        var c = arrayList1.concat(arrayList2);
        //console.log(c);
        resourceItems = c.filter((item, pos) => c.indexOf(item) === pos)
    }
    
    if(benchType != "total" && result['Data']){
        $("#benchTbl thead").empty();
        var thead1 = '<tr><th colspan="3" style="text-align: center;" id="tblTitle">Full Time Bench Resources</th></tr>';
        $("#benchTbl thead").append(thead1);
        for(let i=1;i<result['Data'].length;i++){
            rowStart = "<tr>";
            rowEnd = "</tr>";
            td = "<td>"+i+"</td>";
            var onclickData = "onclick=open_submodel('"+benchType+"','"+encodeURIComponent(result['Data'][i][0])+"')";
            td1 = "<td><a "+onclickData+">"+result['Data'][i][0]+"</a></td>";
            td2 = "<td>"+result['Data'][i][1]+"</td>";
            total = total+Number(result['Data'][i][1]);
            rowData += rowStart+td+td1+td2+rowEnd;
        }
        totalRow = "<tr style='background: #dedddd;'><td colSpan='2'>Total</td><td>"+total+"</td></tr>"
        contentHtml = rowData+totalRow;        
    }
    else{
        $("#benchTbl thead").empty();
        var thead1 = '<tr><th colspan="4" style="text-align: center;" id="tblTitle">Full Time Bench Resources</th></tr>';
        var thead2 = "<tr><th></th><th>Full Time</th><th>Part Time</th><th>Total</th></tr>";
        $("#benchTbl thead").append(thead1+thead2);
        var rowElemnt = "";
        var ttfullValue =0;
        var ttpartValue = 0;
        var ttValue =0;
        resourceItems.forEach(function(element){
            var rowStart = "<tr>";
            var rowEnd = "</tr>";
            var col1 = "<td>"+element+"</td>";
            var fullValue = 0;
            
            var partValue = 0;
            var totalValue = 0;
            var full = fullBenchData['Data'].filter(function(item) {
                if(item[0] == element){
                    return item;
                }            
              });
            var part = partBenchData['Data'].filter(function(item) {
                if(item[0] == element){
                    return item;
                }            
            });
            var col2;
            if(full.length >0){
                var onclickData = "onclick=open_submodel('full','"+encodeURIComponent(element)+"')"
                col2 ="<td><a "+onclickData+">"+full[0][1]+"</a></td>";
                fullValue = Number(full[0][1]);

            }
            else{
                col2 = "<td></td>";
                fullValue = 0;
            }
            var col3;
            if(part.length >0){
                var onclickData = "onclick=open_submodel('part','"+encodeURIComponent(element)+"')"
                col3 ="<td><a "+onclickData+">"+part[0][1]+"</a></td>";
                partValue = Number(part[0][1]);

            }
            else{
                col3 = "<td></td>";
                partValue = 0;
            }
            ttfullValue = ttfullValue+fullValue;
            ttpartValue = ttpartValue+partValue;
            totalValue = fullValue+partValue;
            ttValue = ttValue+totalValue;
            var col4 = "<td>"+totalValue.toFixed(2)+"</td>"

            rowElemnt+= rowStart+col1+col2+col3+col4+rowEnd;
        });
        var footer = "<tr style='background: #e8e8e8;'><td></td><td>"+ttfullValue+"</td><td>"+ttpartValue+"</td><td>"+ttValue+"</td></tr>";
        contentHtml = rowElemnt+footer;

    }
    $("#benchTbl tbody").append(contentHtml);
    $('#benchmodel').find('#tblTitle')[0]['textContent'] = title;
    $('#benchmodel').appendTo("body").modal('show');
}

function open_submodel(benchType,type) {
    var sheetID = "1URop7XuHOWaGbOhEbNyh0KorjNCvCY802BK9V5HNkvw";
    var range = "";
    if(benchType == "full"){
        range = "BenchSummary2!A:G";
      
    }
    else if(benchType == "part"){
        range = "BenchSummary2!J:S";
    }
    
    var result =  callgetSpreadSheetData(sheetID,range);
    // var result = {"Data":[["Technology","Name","Gap in Billable Hrs","Occupied","Lead","Backup Lead","Plan ","HR Comments","Billable Hours"],[".Net","Arun Prasad KK","130","160","Saravana","Dhanraj","Working 8 hours on CommonGoal to support Saravanan","","30"],[".Net","Munieswaran B ","80","80","Diviamon","Saravanan","Learn Xamarin","","80"],[".Net","Prasanth A","80","160","Diviamon","Christlin","He is assigned full time to the Project Connect Wise (GTG) for the SQL tasks. He will get support from Balaji & consultant for SQL tasks","","80"],[".Net","Prasanth s","20","160","Diviamon","Christlin","Learning new tech stack to support the upcoming interpix development","","140"],[".Net","Sritharan","20","160","Diviamon","Parry","Working 8 hours on GTG to support Saravanan ","","140"],[".Net","Suganth Kumar J","80","160","Diviamon","Nitheesh","Train on DevExtreme","","80"],["IMS","Devaraj","20","160","Syed Ali","Syed Ali","Doing a self-paced training on Azure ","","140"],["IMS","Gokul Krishnan\/ SA","20","160","Syed Ali","Syed Ali","Planned to move him to the project on Fazil, KT is going on","","140"],["IMS","Mohamed Azarudeen P S","20","160","Syed Ali","Syed Ali","Doing a self-paced training on VMware","","140"],["IMS","Raguraman A (Jack)","20","160","Syed Ali","Syed Ali","Doing a self-paced training on VMware","","140"],["IMS","Syedali M","40","160","Syed Ali","Diviamon","Involving in team management and to take new marketing calls. ","","120"],["Java","Dinesh M","60","100","Leejoy","Leejoy","Client said that the partial billing will be only for couple of months. Currently he is doing R&D on implementing DevOps and updating application to use Angular for Assist Cornerstone project.","","100"],["PHP","Aravindhan","140","20","Srinivasan","John Melchior","Learning React JS for new retainer project, profile submitted to Med49 client and looks positive to win\u000athis opportunity","","20"],["PHP","Balachandar","110","50","Srinivasan","Leejoy","Learning React Js & Working in the Internal Project (New Synergy)","","50"],["PHP","Bharath Kumar P","136","24","Srinivasan","Poobalan","Plan ","","24"],["PHP","John Melchior A","32","128","Srinivasan","Diviamon","Implementing svn\/git setup for our internal projects","","128"],["PHP","Kathiravan B","100","160","Vimal","Poobalan","Learning Angular and also working in the G2 Huddle customization","","60"],["PHP","Manoj kumar","100","60","Srinivasan","Vimal","Learning Joomla","","60"],["PHP","Mariappan","80","80","Srinivasan","John Melchior","Learning Node.js & ROR ","","80"],["PHP","Mohamed Ali","60","160","Vimal","Vimal","Learning Magento 2","","100"],["PHP","Murthi K","100","60","Srinivasan","Vimal","Learning Drupal 7 & 8","","60"],["PHP","Padmanaban","100","60","Srinivasan","Parry","Working on Synergy Dashboard","","60"],["PHP","Vijai Jerald","80","80","Srinivasan","John Melchior","Learning Angular latest with backend as node.js","","80"],["SEO","Anand P","40","120","Laura","Christlin","Working on Internal Project (G2 Book Keeping) &  Working on CG-Vak Site rework ","No comments","120"],["SEO","Mukesh K","80","80","Laura","Srinivasan","Doing SEO for all our G2 websites","","80"],["Testing","Arun Raja R","120","40","Sasi Kumar","Dhanraj","i.        Support to other projects – CommonGoals\u000aii.        Training plan in Selenium testing \u000aiii.        JAVA development training. \u000a","","40"],["Testing","Kannan M","80","80","Leejoy","Leejoy","Currently Kannan is testing PHP projects and reporting to Vimal. The Java team started development of Ample Organics - Phase 2(S2H) and as discussed with Sam hopefully Kannan will have his task after first sprint","","80"],["Testing","Manikandan A","120","40","Sasi Kumar","Saravanan","1) Testing the internal projects\u000a2) Self learning on Selenium from May 15, 2019.\u000a3) Writing test scripts for CG & GTG","","40"],["Testing","Naveen","80","80","Leejoy","Rajesh Kumar","Learning Automation","","80"],["Testing","Nikhila Delna","40","120","Kumar","Vimal","KT for Flexinet. Will be moved to this project in a week","","120"],["Testing","Thangaraj K","80","160","Diviamon","Christlin","Learning and doing CT script for Test Driven Application for GTG ","","80"],["Web Designer","Jegan S","130","50","Srinivasan","Nehemiah","Learning page builders familiarize & doing internal project like G2 BPO, G2 Test Lab & etc","","30"],["Web Designer","John Mercandro","40","120","Srinivasan","Nehemiah","Web Accessibility","","120"],["Web Designer","Nehemiah C","100","160","Srinivasan","Srinivasan","Treepl & DUDA CMS FOR CLIENT PROJECT LEARNING","","60"],["Web Designer","Rahul","140","20","Srinivasan","Nehemiah","Learning Wordpress ","","20"],["Web Designer","Rupa Dharsini","80","80","Srinivasan","Nehemiah","Learning page builders familiarize & doing internal project like G2 BPO, G2 Test Lab & etc","","80"],["Web Designer","Suresh Kumar G","100","60","Srinivasan","Nehemiah","Web Accessibility","","60"]],"IsSuccess":true,"Message":"Success"};
    var newArray = result['Data'].filter(function(item) {
        if(item[0] == type){
            return item;
        }            
      });
    $("#benchsubTbl").find('#normalHeader').empty();
    $("#benchsubTbl tbody").empty();
    var header = "<tr>";
    var headerComplete = "";
    var tbodyHtml ="";
    for(var i=0;i<result['Data'][0].length;i++){
        header+="<th>"+result['Data'][0][i]+"</th>"
    }
    for(var k=0;k<newArray.length;k++){
        var tbStart = "<tr>";
        var tbEnd = "</tr>";
        var tdHtml = "";
        newArray[k].forEach(function(element){
            tdHtml += "<td>"+element+"</td>";
          });
        tbodyHtml += tbStart+tdHtml+tbEnd;
    }
    $('#benchsubTbl').find('#subtblTitle')[0]['textContent'] = decodeURIComponent(type)+" Resources";
    headerComplete = header+"</tr>";
    $("#benchsubTbl").find('#normalHeader').append(headerComplete);
    $("#benchsubTbl tbody").append(tbodyHtml);
    $('#benchsubmodel').appendTo("body").modal('show');
}