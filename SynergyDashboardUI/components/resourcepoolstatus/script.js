//tab click event
function opentabclickStatus(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("rps-tabConntent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("rps-tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

//consultant Model
function consultantModel()
{
	$('.form-control').removeClass('required_field');
      $('.error_message').html('');
      $('#consultantModel').appendTo("body").modal("show");
	clearconsultant();
}

//date format converter
function dateformat(EndDate){
	var edate = EndDate;
	      var ed = edate;
	      ed = ed.split(' ')[0];
	      var enddateChanged = ed.replace(/\//g, "-");
	      enddateChanged = enddateChanged.split('-');
		  enddateChanged = enddateChanged[2] + "-" + enddateChanged[1] + "-" + enddateChanged[0];
		  return enddateChanged;
}