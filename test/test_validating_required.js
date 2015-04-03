describe("Validating forms with required fields", function() {

  describe("Login form has two required fields", function() {
    var form = $('#login');

    it("loaded a form", function() {
      expect(form.length).toBe(1);
      expect(form.filter('form').length).toBe(1);
    });

    it("has at least one required field", function() {
      var requiredInputs = form.find('[required]');
      expect(requiredInputs.length).toBeGreaterThan(0);
    });

    it("has two fields with required attribute", function(){
      var requiredInputs = form.find('[required]');
      expect(requiredInputs.length).toBe(2);
    });
  });

  describe("Login form has not been submitted", function() {
    var form = $('#login');
    var formAction = form.attr('action');
    var currentUrl = location.href;
    
    it("has a current location different than the form's submit action", function(){
      expect(location.href).not.toContain(formAction);
    });
  });

  describe("Comment form has not been submitted", function() {
    var form = $('#comment');
    var formAction = form.attr('action');
    var currentUrl = location.href;
    
    it("has a current location different than the form's submit action", function(){
      expect(location.href).not.toContain(formAction);
    });
  });

  describe("Validating form with two required fields", function() {
    var form, requiredInputs, submitCallback, formAction, currentLocation;

    beforeEach(function() {
      form = $('#login');
      requiredInputs = form.find('[required]');
      formAction = form.attr('action');
      currentLocation = location.href;

      // set all required inputs to blank value
      requiredInputs.each( function(i) {
        this.value = '';   
      });
    });
    afterEach(function(){
      form.find('.feedback').remove();
    });
   
    it("stops submission with all required atttributes blank", function(){
      form.submit();
      expect(currentLocation).not.toContain(formAction);
    });

    it("stops submission when one required is blank, and one required filled in", function(){
      requiredInputs[0].value = 'Johnny';
      requiredInputs[1].value = ''; // blank 
      form.submit();
      expect(currentLocation).not.toContain(formAction);
    }); 

    it("gives polite feedback after trying to submit an invalid form", function(){
      expect( form.text() ).not.toContain("Please");
      form.submit();
      expect( form.text() ).toContain("Please");
    });
  });

  describe("Validating form with one required input, one optional input", function(){
    var form, requiredInput, formAction, currentLocation;;

    beforeEach(function() {
      form = $('#comment');
      requiredInput = form.find('[required]');
      formAction = form.attr('action');
      currentLocation = location.href;
    });
    afterEach(function(){
      form.find('.feedback').remove();
    });

    it("loads a form", function() {
      expect(form.length).toBe(1);
      expect(form.filter('form').length).toBe(1);
    });

    it("has two inputs", function(){
      var formInputs = form.find('input,textarea').not('[type="submit"]');
      expect(formInputs.length).toBe(2);
    });

    it("has one required input", function() {
      expect(requiredInput.length).toBe(1);
    });

    it("is not valid when missing required value", function() {
      requiredInput.val('');
      expect( form.html() ).not.toContain("feedback");
      form.submit();
      expect(currentLocation).not.toContain(formAction);
      expect( form.html() ).toContain("feedback");
    });

    it("is valid when optional value is blank, and required value is not blank", function() {
      // prevent actual form submission
      form.submit(function(){ 
        return false; 
      });
      // fill in required input, expect no feedback
      requiredInput.val("name@example.com");
      form.submit();
      expect( form.html() ).not.toContain("feedback");

      // make required input blank, expect feedback
      requiredInput.val('');
      form.submit();
      expect( form.html() ).toContain("feedback");
    });

  });
});