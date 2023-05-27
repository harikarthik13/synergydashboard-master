var TaskNo=1;
$(document).ready(function(){
    $('#TaskIssueBoardTodo,#TaskIssueBoardInprogress,#TaskIssueBoardCompleted').sortable({
        connectWith: '#TaskIssueBoardTodo,#TaskIssueBoardInprogress,#TaskIssueBoardCompleted',
    });

    $('#TaskIssueBoardTodo').sortable({
        receive:function(event, ui) {
            ui.item.find("#taskstate").html("<i class='fa fa-circle text-danger'></i> To Do")
        }
    });

    $('#TaskIssueBoardInprogress').sortable({
        receive:function(event, ui) {
            ui.item.find("#taskstate").html("<i class='fa fa-circle text-primary'></i> In Progress")
        }
    });

    $('#TaskIssueBoardCompleted').sortable({
        receive:function(event, ui) {
            ui.item.find("#taskstate").html("<i class='fa fa-circle text-success'></i> Completed")
        }
    }); 
    
    $("#searchInputTodo").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#TaskIssueBoardTodo li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

function ProjectTaskModal()
{
 $('#ProjectTaskModal').appendTo('body').modal('show')
}

function showSearchInput()
{
   $("#searchTaskTodo").toggle();
   $("#searchInputTodo").val("");
   $("#searchInputTodo").focus();
   $("#TaskIssueBoardTodo li").filter(function() {
   $(this).toggle($(this).text().toLowerCase().indexOf("") > -1)});
}

function showAddNewTask()
{
   $("#addnewTask").toggle();
   $("#ProjectTaskName").val("");
   $("#ProjectTaskName").focus();
}

function addnewTask()
{
   let ProjectTaskName = $("#ProjectTaskName").val()
   if(ProjectTaskName != "")
   {
      let TodoCard = "<li id='TaskCard"+TaskNo+"'><div><i class='fa fa-clipboard text-success'></i><span> <b>"+TaskNo+"</b> "+ProjectTaskName+"</span><span class='assignbtn pull-right fa fa-ellipsis-v' onclick=assignbtnclick() title='Select Assignee'></span></div>";
      TodoCard +="<div id='dropdownassign'><select class='form-control' id='dlassign' onchange=assignchange("+TaskNo+")><option value='0'>Select Assignee</option><option value='1'>Employee 1</option><option value='2'>Employee 2</option><option value='3'>Employee 3</option><option value='4'>Employee 4</option></select></div>";
      TodoCard +="<p id='AssignedEmployee'></p><div><span>State</span><span class='pull-right' id='taskstate'><i class='fa fa-circle text-danger'></i> To do</span></div></li>";
      $("#TaskIssueBoardTodo").append(TodoCard);
      TaskNo++;
   }
   showAddNewTask();
}

function assignbtnclick()
{
   $("#dropdownassign").toggle();
   $("#dlassign").val("0");
   $("#dlassign").focus();
}

function assignchange(taskNo)
{
   if($('#TaskCard'+taskNo+' #dlassign').val()>0)
   {
      $('#TaskCard'+taskNo+' #AssignedEmployee').html("<span><small>Assigned To : </small><span class='fa fa-user' aria-hidden='true'> </span> "+$('#sortableTask #TaskCard'+taskNo+' #dlassign :selected').text()+"</span>");
      $("#dropdownassign").toggle();      
   }
}