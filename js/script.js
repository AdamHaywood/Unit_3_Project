// variables to be called throughout project
const $userName = $('#name');
const $jobRole = $('#title');
const $otherField = $('#other-title')
const $shirtDesign = $('#design')

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


console.log($shirtDesign.val());






