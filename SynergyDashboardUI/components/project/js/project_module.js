function displayAddedProjectModules(){
    let SavedProjectModules = GetAddedProjectModules();
    HTML = generateProjectModules(SavedProjectModules);
    $("#projectModule").html(HTML);
}

function GetAddedProjectModules() {
    let filter_val = JSON.stringify({
      "IsActive": true,
      "ProjectId": "1",
    });

    let result = callgetlist('GetProjectModules', filter_val);
    return result;
  
  }

  function generateProjectModules(SavedProjectModules) {
    let s_no=1;
    let html="";
    if($("#dlClientProjectType :selected").text() != 'fixedbid') {
      $('#addNewProjectModule').show();
    } else {
      $('#addNewProjectModule').hide();
    }
    if (SavedProjectModules.length == 0) {
      html += "<h4>No Records Found</h4>";
    } else {
      SavedProjectModules.forEach(function (key, item) {
        // let projectId = key.ProjectId;
        html += "<div class='panel panel-default'>"
        html += "<div class='panel-heading'><h4><b>"+s_no+": "+ key.ModuleTitle+"</b></h4></div>"
        html += "<div class='panel-body'>"
        html += "<div class='row'>"
        html +="<div class='col-sm-8'>"
        html +="<h4><span class='project-module-title'>Header title: </span>"+key.ModuleHeaderTitle+"</h4>"
        html +="<p class='project-module-title'>Description:</p><div>"+key.ModuleDescription+"</div></div>"
        html +="<div class='col-sm-4'><form><div class='form-group'><label>Estimated hours:</label>"
        html +="<div class='txtEstimatedHours'><input type='text' class='form-control estimated_hours' maxlength='6' value='"+key.ModuleEstimatedHours+"'></div></div>"
        html +="</form></div></div></div>"
        html += "</div>";
        s_no++;
      });
  
    }  
    return html;
  }

  function projectModuleValidation()
  {
    $('.project-fourth-step').children('#projectModule').find('input').keyup(function(evt){
      validateProjectModules();
    })

    $('.project-fourth-step').children('#projectModule').find('input').on("input", function(evt) {
        var val = $(this).val();
        if(isNaN(val)){
            val = val.replace(/[^0-9\.]/g,'');
            if(val.split('.').length>2) 
                val =val.replace(/\.+$/,"");
        }
        $(this).val(val); 
    });
  }