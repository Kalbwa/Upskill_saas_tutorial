/* global $, Stripe */
// Document ready 
$(document).on('turbolinks:loads', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('form-submit-btn');
  // set the stripe public key 
  Stripe.setPublishablekeys( $('meta[name="stripe-key"]'). attr('content'));
  // when user click form submit btn
  submitBtn.click(function(event){
    // prevent default submission behavior. 
    event.preventDefault();
    // Collect the credit card fields.
    var ccNumm = $('#card-number').val(),
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month'),
      expYear = $('#card_year');
    // send the card info to stripe 
    Stripe.createToken({
      number: ccNumm,
      CVC: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  });
  
  
   
  
  // Stripe will return a card token.
  // Inject card token as hidden field into form 
  // Submit form to our Rails app.
})