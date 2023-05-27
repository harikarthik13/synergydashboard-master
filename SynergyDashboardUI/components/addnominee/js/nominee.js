$(document).ready(function(){
    // alert('Hi');
  var nominationDate = new Date();
  var nominationYear = nominationDate.getFullYear();
  var option = `<option value="${nominationYear}" selected>${nominationYear}</option>`;
//    alert(option);
    //$('#nominationYear').append($('<option>').val(nominationYear).text(nominationYear));
    $('#nominationYear').html(option );

    $('#nominationMonth').change(function(){
        var month=$('#nominationMonth').val();
        var nominationDate = new Date();
        var nominationYear = nominationDate.getFullYear();
        if(month=='December')
        {
            var option = `<option value="${nominationYear-1}">${nominationYear-1}</option>
            <option value="${nominationYear}">${nominationYear}</option>`;
            $('#nominationYear').html(option );
        }
        else
        {
            var option = `<option value="${nominationYear}" selected>${nominationYear}</option>`;
            $('#nominationYear').html(option );
        }
    });

   
});