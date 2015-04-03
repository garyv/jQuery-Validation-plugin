describe("Validating a form with required email input", function(){

  describe("Register form has email and one other required input", function() {
    var form = $('#register'),
        emailInput = form.find("input[type='email']");

    it("loaded a form", function() {
      expect(form.length).toBe(1);
      expect(form.filter('form').length).toBe(1);
    });

    it("has at least one email input", function() {
      expect(emailInput.length).toBeGreaterThan(0);
    });
    it("has at least one required email input", function() {
      var requiredEmailInput = emailInput.filter('[required]')
      expect(requiredEmailInput.length).toBeGreaterThan(0);
    });

    it("has two fields with required attribute", function(){
      var requiredInputs = form.find('input[required]');
      expect(requiredInputs.length).toBe(2);
    });
  });

  describe("Register form has not been submitted", function() {
    var form = $('#register');
    var formAction = form.attr('action');
    var currentUrl = location.href;
    
    it("has a current location different than form submit action", function(){
      expect(location.href).not.toContain(formAction);
    });
  });

  describe("Register form is invalid with non-email value", function() {
    var form, emailInput, otherInput, stubSubmit;

    beforeEach(function() {
      form = $('#register');
      emailInput = form.find("input[type='email']");
      otherInput = form.find("input[type!='email']").filter("[type!='submit']");
      stubSubmit = function(){ 
        return false; 
      };
      form.on('submit', stubSubmit);
      form.find("input[type!='submit'],textarea").val(''); // set blank
    });

    afterEach(function(){
      form.find('.feedback').remove();
      form.off('submit', stubSubmit);
      emailInput.add(otherInput).val('');
    });

    it("has no initial feedback", function(){
      expect( form.html() ).not.toContain("feedback");
    });

    it("gives feedback after submitting with two blank inputs", function(){
      form.submit();
      expect( form.html() ).toContain("feedback");
    });

    it("gives no feedback with valid inputs", function(){
      emailInput.val('robin@sherwood.org');
      otherInput.val('herioc outlaw');
      form.submit();
      expect( form.html() ).not.toContain("feedback");
    });

    it("gives feedback when required email input has non-email value", function(){
      emailInput.val('123 Fake Street');
      otherInput.val('free style');
      form.submit();
      expect( form.html() ).toContain("feedback");
    });

    it("feedback given for invalid email has the word 'email' in it", function(){
      emailInput.val('123 Fake Street');
      otherInput.val('free style');
      form.submit();
      var feedback = form.find('.feedback');
      expect( feedback.text() ).toMatch(/email/);
    });
  });
});

describe("Validating a form with a non-required email input", function(){
  var form, emailInput, otherInput, stubSubmit;

  beforeEach(function() {
    form = $('#signup');
    emailInput = form.find("input[type='email']");
    otherInput = form.find("input[type!='email']").filter("[type!='submit']");
    stubSubmit = function(){ 
      return false; 
    };
    form.on('submit', stubSubmit);
    form.find("input[type!='submit'],textarea").val(''); // set blank
  });
  
  afterEach(function(){
    form.find('.feedback').remove();
    form.off('submit', stubSubmit);
    emailInput.add(otherInput).val('');
  });

  it("has one email input", function() {
    expect(emailInput.length).toBe(1);
  });

  it("does not give feedback when all optional values are left blank", function(){
    form.submit();
    expect( form.html() ).not.toContain("feedback");
  });

  it("does give feedback when non-email value is set for email input", function(){
    emailInput.val('not v@lid email address.');
    form.submit();
    expect( form.html() ).toContain("feedback");
  });

  it("feedback for nonvalid email mentions the word 'email'", function() {
    emailInput.val('not v@lid email address.');
    form.submit();
    feedback = form.find('.feedback');
    expect( feedback.text() ).toMatch(/email/);
  });
});