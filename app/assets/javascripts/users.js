/* global $, Stripe */
// Document ready 
$(document).on('turbolinks:loads', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('form-sign_up-btn');
  // set the stripe public key 
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content'));
  // when user click form submit btn
  submitBtn.click(function(event){
    // prevent default submission behavior. 
    event.preventDefault();
    submitBtn.val("Processing").prop("disabled", true);
    
    // Collect the credit card fields.
    var ccNumm = $('#card_number').val(),
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
      
    // Use stripe js library to check for card errors.
    var error = false;
    
    // Validate card number
    if(!Stripe.card.validateCardNumber(ccNumm)) {
      error = true;
      alert('The credit card number appears to be invalid');
    }
    
    // Validate CVC number
    if(!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC appears to be invalid');
    }
    
    // Validate expiration date
    if(!Stripe.card.validateExpiry(expMonth,expYear)) {
      error = true;
      alert('The expiration date appears to be invalid');
    }
    
    if (error) {
    // send the card info to stripe 
      submitBtn.prop('disabled', false).val("Sign Up");
    }else{
      Stripe.createToken({
        number: ccNumm,
        CVC: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    return false;
  });
  
  // Stripe will return a card token.
  function stripeResponseHandler(status, response){
    // get the token from the response
    var token = response.id;
    
    // Inject card token as hidden field into form
    theForm.append($('<input type="hidden" name="user[stripe_card_token]">').val(token) );
  
    // Submit form to our Rails app.
    theForm.get(0).submit();
  }
});