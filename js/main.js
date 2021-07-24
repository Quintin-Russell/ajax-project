const $newJournalButton = document.querySelector('[button="new-journal"]');
// const $draftButton = document.querySelector('[button="drafts"]');
// const $graphButton = document.querySelector('[button="graph"]');
const $homeDiv = document.querySelector('[data-view = "home-screen"]');
const $gratefulDiv = document.querySelector('[data-view = "grateful"]');
const $headerUl = document.querySelector('.header-list');
const $headerLogo = document.querySelector('#header-logo');
const $dateH2 = document.querySelector('[data="current-date"]');

function showPage(show, hide) {
  show.setAttribute('class', 'container');
  hide.setAttribute('class', 'hidden');
}

function getDate() {
  const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date();
  let month = date.getMonth();
  month = monthArr[month];
  let day = date.getDate();
  day = day.toString();
  let year = date.getFullYear();
  year = year.toString();
  const formattedYear = month + ' ' + day + ', ' + year;
  return formattedYear;
}

$newJournalButton.addEventListener('click', function (e) {
  showPage($gratefulDiv, $homeDiv);
  const $nJHeader = document.createElement('li');
  const $nJHeaderH2 = document.createElement('h2');
  $nJHeaderH2.textContent = 'New Journal Entry';
  $nJHeader.appendChild($nJHeaderH2);
  $headerUl.appendChild($nJHeader);
  $nJHeaderH2.setAttribute('class', 'new-journal-header work-sans');
  $headerLogo.setAttribute('class', 'header-logo work-sans');
  $dateH2.textContent = 'Date: ' + getDate();
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
