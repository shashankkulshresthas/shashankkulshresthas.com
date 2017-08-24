//Site\HTML Slide\js

var QuizType = 0;
try {
    QuizType = $("#jsref").attr('src').split('?')[1].split('=')[1];
} catch (e) {
    QuizType = 0;
}


$('.panel1').show();
$('.panel2').hide();
$("#extdiv").hide();

$("#headerdiv").addClass("col-sm-12");
$("#headerdiv").removeClass("col-sm-20");


if (QuizType == 3) {
   

    $('.qcq-input .input-group').each(function (index) {
        $('.qcq-input .input-group:eq(' + index + ')').hover(function () {

            if ($('.qcq-input .input-group:eq(0) input[type="text"]').val() != '') {
                $('.qcq-input .input-group:eq(0)').addClass('unreadQuestion');
                $('.qcq-input .input-group:eq(0) input[type="text"]').addClass('unreadQuestion');
                $('.qcq-input .input-group:eq(0) input[type="text"]').attr('disabled', false);
            }
            if ($('.qcq-input .input-group:eq(0) input[type="text"]').val() != '') {
                $('.qcq-input .input-group:eq(1)').addClass('unreadQuestion');
                $('.qcq-input .input-group:eq(1) input[type="text"]').addClass('unreadQuestion');
                $('.qcq-input .input-group:eq(1) input[type="text"]').removeAttr('disabled');
            }

            if ($('.qcq-input .input-group:eq(1) input[type="text"]').val() != '') {
                $('.qcq-input .input-group:eq(2)').addClass('unreadQuestion');
                $('.qcq-input .input-group:eq(2) input[type="text"]').addClass('unreadQuestion');
                $('.qcq-input .input-group:eq(2) input[type="text"]').removeAttr('disabled');


            }

            if ($('.qcq-input .input-group:eq(0) input[type="text"]').val() && ($('.qcq-input .input-group:eq(1) input[type="text"]').val() != '') && ($('.qcq-input .input-group:eq(2) input[type="text"]').val() != '')) {
                $('#btnSubmit').removeAttr('disabled');
            } else {
                $('#btnSubmit').attr('disabled', 'disabled');
            }



        }, function () {

            if ($('.qcq-input .input-group:eq(0) input[type="text"]').val() != '') {
                $('.qcq-input .input-group:eq(0)').removeClass('unreadQuestion');
                $('.qcq-input .input-group:eq(0) input[type="text"]').removeClass('unreadQuestion');
                $('.qcq-input .input-group:eq(0) input[type="text"]').attr('disabled', 'disabled');
            }
            if ($('.qcq-input .input-group:eq(0) input[type="text"]').val() != '') {
                $('.qcq-input .input-group:eq(1)').removeClass('unreadQuestion');
                $('.qcq-input .input-group:eq(1) input[type="text"]').removeClass('unreadQuestion');
                $('.qcq-input .input-group:eq(1) input[type="text"]').attr('disabled', 'disabled');
            }

            if ($('.qcq-input .input-group:eq(1) input[type="text"]').val() != '') {
                $('.qcq-input .input-group:eq(2)').removeClass('unreadQuestion');
                $('.qcq-input .input-group:eq(2) input[type="text"]').removeClass('unreadQuestion');
                $('.qcq-input .input-group:eq(2) input[type="text"]').attr('disabled', 'disabled');

            }

            if ($('.qcq-input .input-group:eq(0) input[type="text"]').val() && ($('.qcq-input .input-group:eq(1) input[type="text"]').val() != '') && ($('.qcq-input .input-group:eq(2) input[type="text"]').val() != '')) {
                $('#btnSubmit').removeAttr('disabled');
            } else {
                $('#btnSubmit').attr('disabled', 'disabled');
            }


        });
    });
}
else if (QuizType == 2) {
    $('.qcq-input .input-group').each(function (index) {        
        $('.qcq-input .input-group:eq(' + index + ')').hover(function () {

            if ($('.qcq-input .input-group:eq(0) input[type="text"]').val() != '') {
                $('.qcq-input .input-group:eq(0)').addClass('unreadQuestion');
                $('.qcq-input .input-group:eq(0) input[type="text"]').addClass('unreadQuestion');
                $('.qcq-input .input-group:eq(0) input[type="text"]').attr('disabled', false);
            }

            if ($('.qcq-input .input-group:eq(0) input[type="text"]').val() != '') {
                $('.qcq-input .input-group:eq(1)').addClass('unreadQuestion');
                $('.qcq-input .input-group:eq(1) input[type="text"]').addClass('unreadQuestion');
                $('.qcq-input .input-group:eq(1) input[type="text"]').removeAttr('disabled');
            }
           

            if ($('.qcq-input .input-group:eq(0) input[type="text"]').val() && ($('.qcq-input .input-group:eq(1) input[type="text"]').val() != '')) {
                $('#btnSubmit').removeAttr('disabled');
            } else {
                $('#btnSubmit').attr('disabled', 'disabled');
            }



        }, function () {

            if ($('.qcq-input .input-group:eq(0) input[type="text"]').val() != '') {
                $('.qcq-input .input-group:eq(0)').removeClass('unreadQuestion');
                $('.qcq-input .input-group:eq(0) input[type="text"]').removeClass('unreadQuestion');
                $('.qcq-input .input-group:eq(0) input[type="text"]').attr('disabled', 'disabled');
            }

            if ($('.qcq-input .input-group:eq(0) input[type="text"]').val() != '') {
                $('.qcq-input .input-group:eq(1)').removeClass('unreadQuestion');
                $('.qcq-input .input-group:eq(1) input[type="text"]').removeClass('unreadQuestion');
                $('.qcq-input .input-group:eq(1) input[type="text"]').attr('disabled', 'disabled');
            }
            

            if ($('.qcq-input .input-group:eq(0) input[type="text"]').val() && ($('.qcq-input .input-group:eq(1) input[type="text"]').val() != '')) {
                $('#btnSubmit').removeAttr('disabled');
            } else {
                $('#btnSubmit').attr('disabled', 'disabled');
            }


        });
    });
}
else if (QuizType == 1) {
    //(QuizType)   

    $('#form76').hover(function () {

        if ($('#form76').val() != '') {
            $('#form76').addClass('unreadQuestion');
            //$('#form76').attr('disabled', false);
        }

        if ($('#form76').val()) {
            $('#btnSubmit').removeAttr('disabled');
        } else {
            $('#btnSubmit').attr('disabled', 'disabled');
        }



    }, function () {

        if ($('#form76').val() != '') {
            $('#form76').removeClass('unreadQuestion');
            //$('#form76').attr('disabled', 'disabled');
        }


        if ($('#form76').val()) {
            $('#btnSubmit').removeAttr('disabled');
        } else {
            $('#btnSubmit').attr('disabled', 'disabled');
        }


    });

}

function display() {
    $('.panel2').show();
    $('.panel1').hide();

    $("#extdiv").show();
    $("#headerdiv").removeClass("col-sm-12");
    $("#headerdiv").addClass("col-sm-20");


    $('.qcq-input .input-group:eq(3) input[type="text"]').val($('.qcq-input .input-group:eq(0) input[type="text"]').val())
    $('.qcq-input .input-group:eq(4) input[type="text"]').val($('.qcq-input .input-group:eq(1) input[type="text"]').val())
    $('.qcq-input .input-group:eq(5) input[type="text"]').val($('.qcq-input .input-group:eq(2) input[type="text"]').val())


}

function display3() {
    $('.panel2').show();
    $('.panel1').hide();

    $("#extdiv").show();
    $("#headerdiv").removeClass("col-sm-12");
    $("#headerdiv").addClass("col-sm-20");


    $('.qcq-input .input-group:eq(2) input[type="text"]').val($('.qcq-input .input-group:eq(0) input[type="text"]').val())
    $('.qcq-input .input-group:eq(3) input[type="text"]').val($('.qcq-input .input-group:eq(1) input[type="text"]').val())
    



}

function display2() {
    $('.panel2').show();
    $('.panel1').hide();

    $("#extdiv").show();
    $("#headerdiv").removeClass("col-sm-12");
    $("#headerdiv").addClass("col-sm-20");


    $('#form77').val($('#form76').val())
    


}
