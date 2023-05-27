var thisbtn = this;
var parent_fieldset = $(this).parents('fieldset');
// navigation steps / progress steps
var current_active_step = $(this).parents('.f1').find('.f1-step.active');
var progress_line = $(this).parents('.f1').find('.f1-progress-line');

if ($(thisbtn).hasClass('skillSetNext')) {
    ////console.log('Final Submit')
    location.href = '../index1.html';
    var skill = parent_fieldset.find('input[id="skill"]').val();
    var family = parent_fieldset.find('input[id="family"]').val();
    var data = [{
        "Method": "NewSyngeryskillset",
        "Data": {
            "skill": skill,
            "family": family
        }
    }];

    var postCall = PostDataCall(data);
    // ////console.log(postCall);
    if (postCall['IsSuccess'] == false) {
        next_step = true;
        ////console.log('in')

    } else {
        next_step = false;
        alert(postCall['Message']);
    }
}