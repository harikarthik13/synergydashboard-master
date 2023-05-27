function funcSelectMode() {

    if (this.value == 'Telephone') {

        $("#rrm-Mode-Phone").show();
        $("#rrm-Mode-Skype").hide();
        $("#rrm-Mode-Gtm").hide();
        $("#txt-rrm-CandidatePhoneNumber").show();
        $("#txt-rrm-CandidateSkypeId").hide();
        $("#txt-rrm-CandidateGtmId").hide();

    } else if (this.value == 'Skype' || this.value == 'Machine') {
        $("#rrm-Mode-Phone").hide();
        $("#rrm-Mode-Skype").show();
        $("#rrm-Mode-Gtm").hide();
        $("#txt-rrm-CandidatePhoneNumber").hide();
        $("#txt-rrm-CandidateSkypeId").show();
        $("#txt-rrm-CandidateGtmId").hide();
    } else if (this.value == 'GTM') {
        $("#rrm-Mode-Phone").hide();
        $("#rrm-Mode-Skype").hide();
        $("#rrm-Mode-Gtm").show();
        $("#txt-rrm-CandidatePhoneNumber").hide();
        $("#txt-rrm-CandidateSkypeId").hide();
        $("#txt-rrm-CandidateGtmId").show();
    } else {
        $("#rrm-Mode-Phone").hide();
        $("#rrm-Mode-Skype").hide();
        $("#rrm-Mode-GTM").hide();
        $("#txt-rrm-CandidatePhoneNumber").hide();
        $("#txt-rrm-CandidateSkypeId").hide();
        $("#txt-rrm-CandidateGtmId").hide();
    }
}