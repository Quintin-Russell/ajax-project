const $newJournalButton = document.querySelector('[button="new-journal"]');
// const $draftButton = document.querySelector('[button="drafts"]');
// const $graphButton = document.querySelector('[button="graph"]');
const $homeDiv = document.querySelector('[data-view = "home-screen"]');
const $gratefulDiv = document.querySelector('[data-view = "grateful"]');

$newJournalButton.addEventListener('click', function (e) {
  $homeDiv.setAttribute('class', 'hidden container');
  $gratefulDiv.setAttribute('class', 'flex container');
});
/*
$draftButton.addEventListener('click', function (e) {
  $homeDiv.setAttribute('class', 'hidden container');
  $draftDiv.setAttribute('class', 'flex container');
});

$graphButton.addEventListener('click', function (e) {
  $homeDiv.setAttribute('class', 'hidden container');
  $graphDiv.setAttribute('class', 'flex container');
});
*/
