

$(function () {
    try {
        $('#sponsorForm input,#sponsorForm textarea').jqBootstrapValidation({
            preventSubmit: true,
            submitError: function ($form, event, errors) {
                // additional error messages or events
            },
            submitSuccess: function ($form, event) {
                event.preventDefault(); // prevent default submit behaviour
                // get values from FORM
                var name = $('input#nameS').val();
                var email = $('input#emailS').val();
                var phone = $('input#cNameS').val();
                var firstName = name; // For Success/Failure Message
                // Check for white space in name for Success/Fail message
                if (firstName.indexOf(' ') >= 0) {
                    firstName = name
                        .split(' ')
                        .slice(0, -1)
                        .join(' ');
                }
                $this = $('#sendSponsorButton');
                $this.prop('disabled', true); // Disable submit button until AJAX call is complete to prevent duplicate messages
                $.ajax({
                    url: 'http://localhost:3000/email',
                    type: 'POST',
                    data: {
                        name: name,
                        cName: cName,
                        email: email
                    },
                    cache: false,
                    success: function () {
                        // Success message
                        $('#success').html("<div class='alert alert-success'>");
                        $('#success > .alert-success')
                            .html(
                                "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                            )
                            .append('</button>');
                        $('#success > .alert-success').append('<strong>Your message has been sent. </strong>');
                        $('#success > .alert-success').append('</div>');
                        //clear all fields
                        $('#sponsorForm').trigger('reset');
                    },
                    error: function () {
                        // Fail message
                        $('#success').html("<div class='alert alert-danger'>");
                        $('#success > .alert-danger')
                            .html(
                                "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                            )
                            .append('</button>');
                        $('#success > .alert-danger').append(
                            $('<strong>').text(
                                'Sorry ' +
                                firstName +
                                ', it seems that my mail server is not responding. Please try again later!'
                            )
                        );
                        $('#success > .alert-danger').append('</div>');
                        //clear all fields
                        $('#sponsorForm').trigger('reset');
                    },
                    complete: function () {
                        setTimeout(function () {
                            $this.prop('disabled', false); // Re-enable submit button when AJAX call is complete
                        }, 1000);
                    }
                });
            },
            filter: function () {
                return $(this).is(':visible');
            }
        });

        $('a[data-toggle="tab"]').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
    } catch (error) { alert(error.message); }
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function () {
    $('#success').html('');
});
