// Simple client side form validation with HTML5 required attribute.
// By: Gary Von Schilling

// How to use:
// 1. Add "required" attribute to fields in a form
// 2. Call $('form').validate();
// 3. To change the message use $('form').validate({message: 'Your custom error message.'});

// For full featured form validation, try http://parsleyjs.org instead

(function($){
    var defaults = {
        message: 'Please fill in all required fields.',
        feedbackClass: 'feedback'
    };
    $.fn.validate = function(options) {
        options = $.extend(defaults, options||{});
        return this.each(function() {
            var $form = $(this);
            $form.bind('submit', function (e) {
                var valid = true;
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
                if (!valid) {
                    if (!$form.find('.' + options.feedbackClass).length) {
                        $form.prepend('<div class="' + options.feedbackClass + '"/>');
                    }
                    $form.find('.' + options.feedbackClass)
                         .html(options.message).fadeOut().fadeIn();
                    e.preventDefault(); return false;
                }
            });
        });
    };
})(jQuery);

// $('form:last').validate();
