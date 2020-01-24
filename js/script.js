// variables to be called throughout first half of project
const $userName = $('#name');
const $jobRole = $('#title');
const $otherField = $('#other-title');
const $shirtDesign = $('#design');
const $color = $('#color');
let $colorOptions = $('#color option')
const $selectThemeOption = $('#design option:nth-child(1)');

// initial focus of name input
$userName.focus();

// initial hiding of other field for custom job title
$otherField.hide();

// function for showing and hiding other job title
$jobRole.on('change', function() {
  if ( $jobRole.val() === 'other') {
    $otherField.show();
  } else $otherField.hide();
});

// hiding color options and telling user to pick design option first
$colorOptions.hide();
$color.prepend('<option value="standard">Please select a T-shirt theme</option>')
$("option[value='standard']").attr('selected','selected')


//hides the select theme option in the options but is still shown when loading page
$selectThemeOption.hide();

// this function hides all shirt color options when the specified theme is chosen
// also will hide all previous colors when the theme is modified
$shirtDesign.on('change', function() {
  $colorOptions = $('#color option');
  if ($shirtDesign.val() === 'js puns') {
    $colorOptions.hide().removeAttr('selected');
    $('#color option:nth-child(2)').show().attr('selected', 'selected');
    $('#color option:nth-child(3)').show();
    $('#color option:nth-child(4)').show();
  } else if ($shirtDesign.val() === 'heart js') {
    $colorOptions.hide().removeAttr('selected');
    $('#color option:nth-child(5)').show().attr('selected', 'selected');
    $('#color option:nth-child(6)').show();
    $('#color option:nth-child(7)').show();
  } else {
    $colorOptions.hide().removeAttr('selected');
    $('#color option:nth-child(1)').show().attr('selected', 'selected');
  }
})

// for the sake of readability i will declare variables for the various
// functionality below to quick reference
// the below variables and actions are to set up the activity section
const $activities = $('.activities')
const $activityBoxes = $('input[type=checkbox]')

let activityTotal = 0;
let totalMessage = "<span>Total: " + activityTotal + "<span>";
$activities.append(totalMessage);
let $messageSpan = $('.activities span');
$messageSpan.hide();


// activity section validation function
const actError = '<sub class="invalid-act">Please select at least one Activity<sub>';
$('.activities legend').append(actError);
const $activityError = $('.invalid-act');
$activityError.hide();

checkActs = () => {
  $activityBoxes.each(function(i){
    if (activityTotal !== 0) {
      validActivity = true;
      $activityError.hide();
    } else {
      validActivity = false;
      $activityError.show();
    }
  })
}

// event handler and function below for totaling activity cost
$activityBoxes.on('change', function(){
  activityTotal = 0;
  let $checkedActivities = $('input[type=checkbox]:checked');
  $checkedActivities.each(function(i){
    if ($(this).prop('checked')) {
      activityTotal += $(this).data('cost');
    } else {
      activityTotal -= $(this).data('cost');
      console.log($(this));
    }
  })
  if (activityTotal >= 0) {
    $messageSpan.show();
    $messageSpan.text("Total: $" + activityTotal);
  } else {
    $messageSpan.hide()
  }
  checkActs();
});

// event handler and function for disabling concurrent times
$activityBoxes.on('change', function (event){
  let $currentCheckBox = $(event.target);
  console.log($currentCheckBox);
  $activityBoxes.each(function(i){
    if ($currentCheckBox.prop('checked') && $currentCheckBox.data('day-and-time') === $(this).data('day-and-time')) {
      $(this).prop('disabled', true);
      $currentCheckBox.prop('disabled', false);
    } else if ($currentCheckBox.prop('checked') === false && $currentCheckBox.data('day-and-time') === $(this).data('day-and-time')) {
        $(this).prop('disabled', false);
    }
  })
});

// payment section will hide paypal and bitcoin messages unless chosen
// initial declarations are for hiding by default and then using to determine
// which method to display
const $paymentChoice = $('#payment');
const $creditCard = $('#credit-card');
const $paypal = $('#paypal');
const $bitcoin = $('#bitcoin');

$paypal.hide();
$bitcoin.hide();
$('#payment [value="select method"]').hide();
$('#payment [value="credit card"]').attr('selected', 'selected')


$paymentChoice.on('change', function(event){
  if ($(this).val() === 'paypal') {
    $paypal.show();
    $bitcoin.hide();
    $creditCard.hide();
  } else if ($(this).val() === 'bitcoin') {
    $paypal.hide();
    $bitcoin.show();
    $creditCard.hide();
  } else {
    $paypal.hide();
    $bitcoin.hide();
    $creditCard.show()
  }
});

//validation begins below (aside from activity had to include it above)

let validName = false;
let validEmail = false;
let validActivity = false;
let validCreditCard = false;
let validZip = false;
let validCVV = false;

// name validation functions
$userName.on('focusout', function(){
  if ($(this).val() !== '') {
    validName = true;
    $userName.removeClass('invalid');
  } else {
    validName = false;
    $userName.addClass('invalid');
  }
})

checkName = () => {
  if (validName === 'false') {
    $userName.addClass('invalid');
  }
}

// mail validation functions
$('#mail').on('focusout', function(){
  const emailRegex = /^\w*@\w*\.\w*$/;
  if (emailRegex.test($(this).val())) {
    validEmail = true;
    $(this).removeClass('invalid');
  } else {
    validEmail = false;
    $(this).addClass('invalid');
  }
})

checkEmail = () => {
  if (validEmail === false) {
    $('#mail').addClass('invalid');
  }
}

// credit card validation function
checkCC = () => {
  const creditRegex = /^\d{13}\d?\d?\d?$/
  if ($paymentChoice.val() === 'paypal' || $paymentChoice.val() === 'bitcoin') {
    validCreditCard = true;
  } else if (creditRegex.test($('#cc-num').val())) {
    validCreditCard = true
    $('#cc-num').removeClass('invalid');
  } else {
    validCreditCard = false;
    $('#cc-num').addClass('invalid');
  }
}
$('#cc-num').on('focusout', function(){
  checkCC();
});


// zip validation function
checkZip = () => {
  const zipRegez = /^\d{5}$/
  if ($paymentChoice.val() === 'paypal' || $paymentChoice.val() === 'bitcoin') {
    validZip = true;
  } else if (zipRegez.test($('#zip').val())) {
    validZip = true;
    $('#zip').removeClass('invalid');
  } else {
    validZip = false;
    $('#zip').addClass('invalid');
  }
}
$('#zip').on('focusout', function(){
  checkZip();
});

// ccv validation check
checkCVV = () => {
  const cvvRegex = /^\d{3}$/
  if ($paymentChoice.val() === 'paypal' || $paymentChoice.val() === 'bitcoin') {
    validCVV = true;
  } else if (cvvRegex.test($('#cvv').val())) {
    validCVV = true;
    $('#cvv').removeClass('invalid');
  } else {
    validCVV = false;
    $('#cvv').addClass('invalid');
  }
}

$('#cvv').on('focusout', function(){
  checkCVV();
});


// final function in order to see if all 6 validations are true

$('form').on('submit', function(event){
  checkName();
  checkEmail();
  checkActs();
  checkCC();
  checkZip();
  checkCVV();
  if (validName === false
    || validEmail === false
    || validActivity === false
    || validCreditCard === false
    || validZip === false
    || validZip === false) {
    event.preventDefault();
  }
})


