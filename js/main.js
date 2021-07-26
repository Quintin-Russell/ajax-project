/* const $newJournalButton = document.querySelector('[button="new-journal"]');
const $draftButton = document.querySelector('[button="drafts"]');
const $graphButton = document.querySelector('[button="graph"]');
const $homeDiv = document.querySelector('[data-view = "home-screen"]');
const $gratefulDiv = document.querySelector('[data-view = "grateful"]');
const $5thingsForm = document.getElementById('five-things');
const $headerUl = document.querySelector('.header-list');
const $headerLogo = document.querySelector('#header-logo');
const $dateH2 = document.querySelector('[data="current-date"]');
const $saveDraftButton = document.querySelectorAll('[button = "save-draft"]');
const $nJContButton = document.querySelector('[button = "new-journal-cont"]');
const $grateful1 = document.getElementById('grateful1');
const $grateful2 = document.getElementById('grateful2');
const $grateful3 = document.getElementById('grateful3');
const $grateful4 = document.getElementById('grateful4');
const $grateful5 = document.getElementById('grateful5');
const $fiveThings = [$grateful1, $grateful2, $grateful3, $grateful4, $grateful5];
const $NJDiv = document.querySelector('[data-view="new-journal"]');
const $pgList = [$gratefulDiv, $NJDiv];
let date;

function showPage(show, hide) {
  show.setAttribute('class', 'container');
  hide.setAttribute('class', 'hidden');
}

function getDate() {
  const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  date = new Date();
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

$gratefulDiv.addEventListener('click', function (e) {
  for (const sm of $saveDraftButton) {
    if (e.target === sm) {
      const newEntry = new Entry();
      newEntry.title = date;
      for (const item of $fiveThings) {
        console.log(item);
        const txt = item.value;
        newEntry.fiveThings.push(txt);
      }
      drafts.push(newEntry);
      console.log('newEntry', newEntry);
      console.log(drafts);
      $5thingsForm.reset();
      showPage($homeDiv, $gratefulDiv);
      break;
    }
  }
  if (e.target === $nJContButton) {
    const newEntry = new Entry();
    newEntry.title = date;
    for (const item of $fiveThings) {
      const txt = item.value;
      newEntry.fiveThings.push(txt);
    }
    showPage($gratefulDiv, $NJDiv);
  }
});
$headerLogo.addEventListener('click', function (e) {
  const newEntry = new Entry();
  newEntry.title = date;
  for (const item of $fiveThings) {
    const txt = item.value;
    newEntry.fiveThings.push(txt);
  }
  drafts.push(newEntry);
  $5thingsForm.reset();
  for (const item of $headerUl.childNodes) {
    if (item !== $headerLogo) {
      $headerUl.removeChild(item);
      console.log(item);
    }
  }
  for (const page of $pgList) {
    showPage($homeDiv, page);
  }
  window.alert('Your journal entry was saved as a draft!');
});
/* $draftButton.addEventListener('click', function (e) {
  $homeDiv.setAttribute('class', 'hidden container');
  $draftDiv.setAttribute('class', 'flex container');
});

$graphButton.addEventListener('click', function (e) {
  $homeDiv.setAttribute('class', 'hidden container');
  $graphDiv.setAttribute('class', 'flex container');
});
*/
