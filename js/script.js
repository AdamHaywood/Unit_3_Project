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


// trying to get the activity section to work with adding up
// the total but having trouble with it doing fibbonaci counting
// going from 100 > 300 > 600 with each of the clicks on the $100 classes


$activityBoxes.on('change', function(){
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
    $messageSpan.text("Total: " + activityTotal);
  } else {
    $messageSpan.hide()
  }
});



