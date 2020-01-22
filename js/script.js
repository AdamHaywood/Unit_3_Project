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


// save a variable for total of activities and one for
// adding the element to the html

const $activities = $('.activities')
const $activityBoxes = $('input[type=checkbox]')

$activityBoxes.on('change', function(){
  let $checkedActivities = $('input[type=checkbox]:checked');
  console.log($checkedActivities);
  let activityTotal = 0
  $checkedActivities.each(function(i){
    activityTotal += $(this).data('cost');  ;
  });
  let totalMessage = "<span>Total: " + activityTotal + "<span>"
  if (activityTotal >= 0 ) {
    $activities.append(totalMessage);
  }
});






//dataset: DOMStringMap
// cost: "200"