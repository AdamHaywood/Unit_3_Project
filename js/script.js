// variables to be called throughout project
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


// the below variables and actions are to set up the activity
// section of the project before the event listener works on the change

const $activities = $('.activities')
const $activityBoxes = $('input[type=checkbox]')

let activityTotal = 0;
let totalMessage = "<span>Total: " + activityTotal + "<span>";
$activities.append(totalMessage);
let $messageSpan = $('.activities span');
$messageSpan.hide();


// event handler and function below for totaling activty cost

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
  });
  if (activityTotal >= 0) {
    $messageSpan.show();
    $messageSpan.text("Total: $" + activityTotal);
  } else {
    $messageSpan.hide()
  }
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

$paymentChoice.on('change', function(event){
  console.log($(this).val());
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

//validation begins below

