// $('#data_table').DataTable({
//     responsive: true
// });
// $("#data_table").click(function(){
//     var row = $(this).closest('tr');
//     var next = row.next();
//     var prev = row.prev().find('td');
//     //console.log(prev)
// });
$('#addbutton_event_listner').hide()
$('#addbutton_event').on('click' , () => {
    $('#addbutton_event_listner').click()  
})
//the below method will hide the save button while loading
$('.save').hide()
//the below function edit the row
function edit_row(no)
{

    //the below will hide the edit button and show the save button while editing
    document.getElementById("edit_button"+no).style.display="none";
    document.getElementById("save_button"+no).style.display="block";

	//the below will store the table data's in to the variable 
    var day=document.getElementById("dayrow"+no);
    var videos=document.getElementById("videosrow"+no);
    var duration=document.getElementById("durationrow"+no);
    var task=document.getElementById("taskrow"+no);
    var hours=document.getElementById("hoursrow"+no);

	//the below will store the table data values into variable for appending them into input field for editing
  var day_data=day.innerHTML;
  var videos_data=videos.innerHTML;
  var duration_data=duration.innerHTML;
  var task_data=task.innerHTML;
  var hours_data=hours.innerHTML;
   
    
    //the below will append the values into input fields
    day.innerHTML="<input type='number' class='dayfield' min='1' id='day_text"+no+"' value='"+day_data+"'><br/><small class='dayerrormessage"+no+" text-danger'></small>";
    videos.innerHTML="<input type='text' id='videos_text"+no+"' value='"+videos_data+"'><br/><small class='videoerrormessage"+no+" text-danger'></small>";
    duration.innerHTML="<input type='time' step='01' class='timesum"+no+"' id='duration_text"+no+"' value='"+duration_data+"' required><br/><small class='durationerrormessage"+no+" text-danger'></small>";
    task.innerHTML="<input type='text' id='task_text"+no+"' value='"+task_data+"'><br/><small class='taskerrormessage"+no+" text-danger'></small>";
    hours.innerHTML="<input type='time' step='01' class='timesum"+no+"'  id='hours_text"+no+"' value='"+hours_data+"' required><br/><small class='hourserrormessage"+no+" text-danger'></small>";
    // $(`#cumulativedurationrow${no}`).on('change', () => {
    //     alert($(`#cumulativedurationrow${no}`).html())
    // }) 
    $(`.timesum${no}`).on('change', () => {
     
      var duration = $(`#duration_text${no}`).val()? $(`#duration_text${no}`).val(): '00:00:00';
      var hours = $(`#hours_text${no}`).val()?$(`#hours_text${no}`).val(): '00:00:00';
      var cumulativeduration = sum(duration , hours )
      $(`#cumulativedurationrow${no}`).text(cumulativeduration)
    })

}
//the below will save the edited rows
function save_row(no)
{ 
    //the below will get the values from the edited input field and store it to the variable
    var day_val=document.getElementById("day_text"+no).value;
    var videos_val=document.getElementById("videos_text"+no).value;
    var duration_val=document.getElementById("duration_text"+no).value;
    var task_val=document.getElementById("task_text"+no).value;
    var hours_val=document.getElementById("hours_text"+no).value;

    var cumulativeduration = sum(duration_val , hours_val )
    var previouscumalativeduration = cumulativedurationsumdata(day_val,no)
    // alert(previouscumalativeduration)
     if(previouscumalativeduration !== -1) {
        
         var cumulativedurationsum = sum(cumulativeduration , previouscumalativeduration)
     } else {
        
         var cumulativedurationsum = cumulativeduration 
     }

    // if(parseInt(no)!== 1) {
    //     // alert('hello')
    //     var previouscumalativeduration = document.getElementById(`cumulativedurationrow${no-1}`).innerHTML 
    //     var cumulativedurationsum = sum(cumulativeduration , previouscumalativeduration)
    // } 
    // else {
    //     var cumulativedurationsum = cumulativeduration
    // }
    // // if(previouscumalativeduration == null)
    // // {
        // alert(typeof no)
    // // }
    

    //the below if checks the mandatory fields are filled or not 
    //if it is true it store the values 
    //else it will return the error message
    if(day_val !== '' && videos_val !== '' && duration_val !== '' && task_val !== '' && hours_val !== '') {
        // //the below will call the sum method and return the date sums
        // var cumulativeduration = sum(duration_val , hours_val )
        //the below will append the input values into table data cells text
        document.getElementById("dayrow"+no).innerHTML=day_val;
        document.getElementById("videosrow"+no).innerHTML=videos_val;
        document.getElementById("durationrow"+no).innerHTML=duration_val;
        document.getElementById("taskrow"+no).innerHTML=task_val;
        document.getElementById("hoursrow"+no).innerHTML=hours_val;
        document.getElementById("cumulativedurationrow"+no).innerHTML=cumulativedurationsum;
        //the below will hide the save button and show the edit button
        document.getElementById("edit_button"+no).style.display="block";
        document.getElementById("save_button"+no).style.display="none";
        //the below alert triggered while the values saved successfully
         swal({
            title: "Success!",
            text: "Saved Successfully!",
            icon: "success",
            button: "ok!",
        })

    } else {
        // the below if conditions checks the input fileds if fields are filled with values means it wont show error messages 
        //otherwise it will shows the error message
        if(day_val == '') {
            $('.dayerrormessage'+no).text('Day field is required')
        } else {
            $('.dayerrormessage'+no).text('')
        }

        if(videos_val == '') {
            
            $('.videoerrormessage'+no).text('Videos field is required')
        } else {
            $('.videoerrormessage'+no).text('')
        }

        if(duration_val == '') {
            $('.durationerrormessage'+no).text('Duration field is required')
        } else {
            $('.durationerrormessage'+no).text('')
        }

        if(task_val == '') {
            $('.taskerrormessage'+no).text('Task field is required')
        } else {
            $('.taskerrormessage'+no).text('')
        }

        if(hours_val == '') {
            $('.hourserrormessage'+no).text('Hours field is required')

        } else {
            $('.hourserrormessage'+no).text('')
        }
    }

}

//the function for deleting the row 
function delete_row(no)
{
    //the below alert triggered while the values get into delete
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            document.getElementById("row"+no+"").outerHTML="";
           
        } 
      })
}


//the below function used to sum duration and hours
function sum(startTime, endTime){

    var times = [ 0, 0, 0 ]
    var max = times.length
  
    var a = (startTime || '').split(':')
    var b = (endTime || '').split(':')
  
    // normalize time values
    for (var i = 0; i < max; i++) {
      a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
      b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
    }
  
    // store time values
    for (var i = 0; i < max; i++) {
      times[i] = a[i] + b[i]
    }
  
    var hours = times[0]
    var minutes = times[1]
    var seconds = times[2]
  
    if (seconds >= 60) {
      var m = (seconds / 60) << 0
      minutes += m
      seconds -= 60 * m
    }
  
    if (minutes >= 60) {
      var h = (minutes / 60) << 0
      hours += h
      minutes -= 60 * h
    }
  
    return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)

}

// need to call this function and loop it while cumulativedurationrow td change event using setinterval method
//need to work on it
const cumulativedurationsumeditdata = (choosedrow_day, row_id = null) => {

    var table=document.getElementById("data_table");

   
    var table_len = (table.rows.length)-1;

    var last_val = parseInt(document.getElementById(`dayrow${table_len-1}`).innerHTML)
   
    if(row_id != table_len && choosedrow_day == last_val) {
        var data = []
        for(let i=table_len-1 ;i>0 ; i--)
        {
            if(choosedrow_day == parseInt(document.getElementById(`dayrow${i}`).innerHTML)) {
                data.push(document.getElementById(`cumulativedurationrow${i}`).innerHTML)                 
            }
        }
        if(data.length == 0) {
          
            return -1;
        } else {
            var output = data[0];
            // var output = data.filter( (time) => {
            //     return 
            // })
            // alert(typeof output)
            return output;
        }
    } else {
        return -1;
    }
}

const cumulativedurationsumdata = (new_day, length_val = null) => {

    var table=document.getElementById("data_table");

    if(length_val) {
         var table_len = length_val
    } else {
        var table_len=(table.rows.length)-1;
    }
   
    //console.log(table_len)
    if(table_len != 1) {
        var data = []
        for(let i=1 ;i<table_len ; i++)
        {
            if(new_day == parseInt(document.getElementById(`dayrow${i}`).innerHTML)) {
                data.push(document.getElementById(`cumulativedurationrow${i}`).innerHTML)                 
            }
        }
        if(data.length == 0) {
          
            return -1;
        } else {
            var output = data[data.length-1];
            // alert(typeof output)
            return output;
        }
    } else {
        // return -1;
    }
}



//the below function is used to add a new row into table
function add_row()
{
    //the below will get the values from the edited input field and store it to the variable
    var new_day=document.getElementById("new_day").value;
    var new_video=document.getElementById("new_video").value;
    var new_duration=document.getElementById("new_duration").value;
    var new_task=document.getElementById("new_task").value;
    var new_hours=document.getElementById("new_hours").value;
       // var cumulativeduration = sum(new_duration , new_hours )
       var table=document.getElementById("data_table");
       var table_len=(table.rows.length)-1;
       
       
    

    //the below will call the sum method and return the date sums
    var cumulativeduration = sum(new_duration , new_hours )
    var previouscumalativeduration = cumulativedurationsumdata(new_day,null)
//    alert(typeof cumulativeduration)
    if(previouscumalativeduration !== -1) {
       
        var cumulativedurationsum = sum(cumulativeduration , previouscumalativeduration)
    } else {
       
        var cumulativedurationsum = cumulativeduration 
    }
        // var previouscumalativeduration = document.getElementById(`cumulativedurationrow${table_len-1}`).innerHTML
    
    //the below if checks the mandatory fields are filled or not 
    //if it is true it store the values 
    //else it will return the error message
    if(new_day !== '' && new_video !== '' && new_duration !== '' && new_task !== '' && new_hours !== '') {
     
        // the below will append a new row into table
        var row = table.insertRow(table_len).outerHTML=
            `<tr id='row${table_len}'>
                <td id='dayrow${table_len}'>${new_day}</td>
                <td id='videosrow${table_len}'>${new_video}</td>
                <td id='durationrow${table_len}'>${new_duration}</td>
                <td id='taskrow${table_len}'>${new_task}</td>
                <td id='hoursrow${table_len}'>${new_hours}</td>
                <td id='cumulativedurationrow${table_len}'>${cumulativedurationsum}</td>
                <td>
                    <div class="row">
                        <div class="col-sm-3 col-sm-offset-1">
                            <button id="edit_button${table_len}" class="edit btn btn-primary" onclick="edit_row(${table_len})"><i class='far fa-edit'> </i></button>
                            <button id="save_button${table_len}" style="display: none;"  class="save btn btn-success save" onclick="save_row(${table_len})"><i class="far fa-save"></i></button>
                        </div>
                        <div class="col-sm-3 col-sm-offset-1">
                            <button class="delete btn btn-danger" onclick="delete_row(${table_len})"><i class="far fa-trash-alt"></i></button>
                        </div>
                    </div>

                </td>
            </tr>`;
        
        //the below will empty the add row input fields after adding the values intotable
        document.getElementById("new_day").value="";
        document.getElementById("new_video").value="";
        document.getElementById("new_duration").value="";
        document.getElementById("new_task").value="";
        document.getElementById("new_hours").value="";

        $('.newdayerrormessage').text('')
        $('.newvideoerrormessage').text('')
        $('.newdurationerrormessage').text('')
        $('.newtaskerrormessage').text('')
        $('.newhourserrormessage').text('')
        $('#new_cumulativeduration').text('')
        //the below will hide the save button
        $('.save').eq(table_len).hide()
        
    }  else {
        // the below if conditions checks the input fileds if fields are filled with values means it wont show error messages 
        //otherwise it will shows the error message
        if(new_day == '') {

            $('.newdayerrormessage').text('Day field is required')
        } else {
            $('.newdayerrormessage').text('')
           
        }

        if(new_video == '') {
            
            $('.newvideoerrormessage').text('Videos field is required')
        } else {
            $('.newvideoerrormessage').text('')
        }

        if(new_duration == '') {
            $('.newdurationerrormessage').text('Duration field is required')
        } else {
            $('.newdurationerrormessage').text('')
        }

        if(new_task == '') {
            $('.newtaskerrormessage').text('Task field is required')
        } else {
            $('.newtaskerrormessage').text('')
        }

        if(new_hours == '') {
            $('.newhourserrormessage').text('Hours field is required')

        } else {
            $('.newhourserrormessage').text('')
        }
    }
  
}

$(`.new_timesum`).on('change', () => {
  // alert('dsfs')
  var duration = $('#new_duration').val()? $('#new_duration').val(): '00:00:00'
  var hours = $('#new_hours').val()?$('#new_hours').val(): '00:00:00';
  var cumulativeduration = sum(duration , hours )
  $('#new_cumulativeduration').text(cumulativeduration)
})

// $('#data_table tr').each(function() {
//     var lasttd=  $(this).find(':last-child').html()
//     alert(lasttd)
//     //your code
//   });

// const sumcumulativeduration = () => {
//     var table=document.getElementById("data_table");
//     var table_len=(table.rows.length)-1;
//     $(`cumulativedurationrow${table_len}`)
// }
// sumcumulativeduration()