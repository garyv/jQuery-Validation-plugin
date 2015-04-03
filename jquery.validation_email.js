// Simple client side form validation with HTML5 required attribute.
// By: Gary Von Schilling

/* How to use:

  1. Add "required" attribute to fields in a form
  2. Use inputs with type="email" attribute in a form
  3. Call $('form').validate();
  
  Optional: passing an object to the validate function overrides defaults
    $('form').validate({
        message: "Your custom error message for blank values",
        emailMessage: "Your custom error message for invalid emails",
        feedbackClass: 'custom-feedback-class-for-styling'
    });
*/

(function($){
    var defaults = {
       message: 'Please fill in all required fields.',
       emailMessage: 'Please enter a valid email address',
       emailPattern: /\S+@\S+\.\S+/,
       feedbackClass: 'feedback'
    };
    $.fn.validate = function(options) {
        options = $.extend(defaults, options||{});
        return this.each(function() {
            var $form = $(this);
            $form.bind('submit', function (e) {
                var valid = true, validEmail = true;
                // check required fields
                $form.find('[required]').each(function(i, field) {
                    if (valid && !field.value) {
                        valid = false;
                        $(field).trigger('focus').fadeOut().fadeIn();
                        if (field.id) {
                            $form.find('label[for="' + field.id + '"]')
                                 .fadeOut().fadeIn();
                        }
                    }
                });
                // check email fields
                valid && $form.find("[type='email']").each(function(i, field) {
                    if (valid && field.value && !field.value.match(options.emailPattern)) {
                        valid = validEmail = false;
                        $(field).trigger('focus').fadeOut().fadeIn();
                        if (field.id) {
                            $form.find('label[for="' + field.id + '"]')
                                .fadeOut().fadeIn();
                        }
                    }
                });
                // stop form submission and insert feedback unless valid
                if (!valid) {
                    if (!$form.find('.' + options.feedbackClass).length) {
                        $form.prepend('<div class="' + options.feedbackClass + '"/>');
                    }
                    $form.find('.' + options.feedbackClass)
                         .html(validEmail? options.message: options.emailMessage).fadeOut().fadeIn();
                    e.preventDefault(); return false;
                }
            });
        });
    };
})(jQuery);
