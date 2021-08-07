const $newJournalButton = document.querySelector('[button = "new-journal"]');
// const $draftButton = document.querySelector('#drafts');
const $graphButton = document.querySelector('[button = "view-moodgraph"]');
const $homeDiv = document.querySelector('[data-view = "home-screen"]');
const $gratefulDiv = document.querySelector('[data-view = "grateful"]');
const $5thingsForm = document.getElementById('five-things');
const $journalTextForm = document.querySelector('#journal-cont');
const $headerUl = document.querySelector('.header-list');
const $headerLogo = document.querySelector('[data = "header-logo"]');
const $dateH2 = document.querySelectorAll('[data="date"]');
const $saveDraftButton = document.querySelectorAll('[button = "save-draft"]');
const $nJContButton = document.querySelector('[button = "new-journal-cont"]');
const $grateful1 = document.getElementById('grateful1');
const $grateful2 = document.getElementById('grateful2');
const $grateful3 = document.getElementById('grateful3');
const $grateful4 = document.getElementById('grateful4');
const $grateful5 = document.getElementById('grateful5');
const $fiveThings = [$grateful1, $grateful2, $grateful3, $grateful4, $grateful5];
const $NJDiv = document.querySelector('[data-view="new-journal"]');
const $NJTextCont = document.querySelector('#journal-cont-text');
const $doneButton = document.querySelector('[button="done"]');
const $modalDiv = document.querySelector('[data-view="done-modal"]');
const $scoreH1 = document.querySelector('[data="modal-score"]');
const $modalQuoteP = document.querySelector('[data="modal-quote"]');
const $homeButton = document.querySelectorAll('[button="home"]');
const $graphDiv = document.querySelector('[data-view ="graph"]');
const $graphCanv = document.querySelector('#myChart');
const $pgList = [$gratefulDiv, $NJDiv, $modalDiv, $graphDiv];
let date;
let formattedDate;

function showPage(show, hide) {
  show.setAttribute('class', 'container');
  hide.setAttribute('class', 'hidden');
}

function setHeaderID() {
  $headerLogo.setAttribute('id', 'header-logo');
}

function removeHeaderID() {
  $headerLogo.setAttribute('id', null);
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
  formattedDate = month + ' ' + day + ', ' + year;
}

function removePageID() {
  if (($headerUl.childNodes.length) > 3) {
    const $pgID = document.querySelector('[data = "pg-ID"]');
    $headerUl.removeChild($pgID);
  }
}

function getScoreNum(score) {
  if (score === 'P+') {
    // eslint-disable-next-line no-undef
    currentObj.scoreNum = 2;
  } else if (score === 'P') {
    // eslint-disable-next-line no-undef
    currentObj.scoreNum = 1;
  } else if (score === 'NEU') {
    // eslint-disable-next-line no-undef
    currentObj.scoreNum = 0;
  } else if (score === 'N') {
    // eslint-disable-next-line no-undef
    currentObj.scoreNum = -1;
  } else if (score === 'N+') {
    // eslint-disable-next-line no-undef
    currentObj.scoreNum = -2;
  } else {
    // eslint-disable-next-line no-undef
    currentObj.scoreNum = null;
  }
}

function randQuote(score) {
  let quote = '';
  // eslint-disable-next-line no-undef
  for (const key in quotes) {
    if (key === score) {
      // eslint-disable-next-line no-undef
      const quoteArr = quotes[key];
      const index = Math.floor(Math.random() * (quoteArr.length - 1));
      quote = quoteArr[index];
      return quote;
    }
  }
}

function afterAPI() {
  $5thingsForm.reset();
  $journalTextForm.reset();
  // eslint-disable-next-line no-undef
  getScoreNum(currentObj.score);
  // eslint-disable-next-line no-undef
  const modalScore = `Your Score: ${currentObj.scoreNum}`;
  // eslint-disable-next-line no-undef
  const quote = randQuote(currentObj.score);
  $scoreH1.textContent = modalScore;
  $modalQuoteP.textContent = quote;
  removePageID();
  // eslint-disable-next-line no-undef
  entries.push(currentObj);
  showPage($modalDiv, $NJDiv);
}
// eslint-disable-next-line no-unused-vars
function sendGraphAPI(entries) {
  // eslint-disable-next-line no-undef
  const moodChart = new Chart($graphCanv, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'MoodGraph',
        data: []
      }]
    },
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  }
  );
  for (const ent of entries) {
    const coords = {};
    coords.x = ent.formattedDate;
    coords.y = ent.scoreNum;
    let datas = moodChart.data.datasets[0];
    datas = datas.data;
    datas.push(coords);
  }
  // $graphCanv.appendChild(moodChart);
}

function sendMoodReq(text) {
  const formdata = new FormData();
  formdata.append('key', 'e599b98b4c266944eb2b0f2ada2724cc');
  formdata.append('txt', text);
  formdata.append('lang', 'auto');

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch('https://api.meaningcloud.com/sentiment-2.1', requestOptions)
    .then(response => response.json())
    .then(responseJSON => {
      // eslint-disable-next-line no-undef
      currentObj.response = responseJSON;
      // eslint-disable-next-line no-undef
      currentObj.score = currentObj.response.score_tag;
      afterAPI();
      // eslint-disable-next-line no-undef
      currentObj = null;
    })
    // eslint-disable-next-line node/handle-callback-err
    .catch(error => window.alert("Don't know what happened there, but something went wrong. Please try to submit again"));
}

// home page eventListeners
$newJournalButton.addEventListener('click', function (e) {
  showPage($gratefulDiv, $homeDiv);
  setHeaderID();
  const $nJHeader = document.createElement('li');
  const $nJHeaderH2 = document.createElement('h2');
  getDate();
  $nJHeaderH2.textContent = 'New Journal Entry';
  $nJHeader.setAttribute('data', 'pg-ID');
  $nJHeader.appendChild($nJHeaderH2);
  $headerUl.appendChild($nJHeader);
  $nJHeaderH2.setAttribute('class', 'new-journal-header work-sans');
  $headerLogo.setAttribute('class', 'header-logo work-sans');
  let item;
  for (item of $dateH2) {
    item.textContent = 'Date: ' + formattedDate;
  }
});

$graphButton.addEventListener('click', function (e) {
  showPage($graphDiv, $homeDiv);
  setHeaderID();
  const $nJHeader = document.createElement('li');
  const $nJHeaderH2 = document.createElement('h2');
  $nJHeaderH2.textContent = 'MoodGraph';
  $nJHeader.setAttribute('data', 'pg-ID');
  $nJHeader.appendChild($nJHeaderH2);
  $headerUl.appendChild($nJHeader);
  $nJHeaderH2.setAttribute('class', 'new-journal-header work-sans');
  $headerLogo.setAttribute('class', 'header-logo work-sans');
  // eslint-disable-next-line no-undef
  sendGraphAPI(entries);
});
/* $draftButton.addEventListener('click', function (e) {
  $homeDiv.setAttribute('class', 'hidden container');
  $draftDiv.setAttribute('class', 'flex container');
});
*/

// gratefulDiv eventListeners
$gratefulDiv.addEventListener('click', function (e) {
  for (const sm of $saveDraftButton) {
    if (e.target === sm) {
      e.preventDefault();
      // eslint-disable-next-line no-undef
      const newEntry = new Entry();
      newEntry.title = date;
      for (const item of $fiveThings) {
        const txt = item.value;
        newEntry.fiveThings.push(txt);
        newEntry.formattedDate = formattedDate;
      }
      // eslint-disable-next-line no-undef
      drafts.push(newEntry);
      showPage($homeDiv, $gratefulDiv);
      $5thingsForm.reset();
      break;
    }
  }
});

$nJContButton.addEventListener('click', function (e) {
  e.preventDefault();
  showPage($NJDiv, $gratefulDiv);
  // eslint-disable-next-line no-undef
  const newEntry = new Entry();
  newEntry.title = date;
  newEntry.formattedDate = formattedDate;
  for (const item of $fiveThings) {
    const txt = item.value;
    newEntry.fiveThings.push(txt);
  }
  // eslint-disable-next-line no-undef
  currentObj = newEntry;
});

$headerLogo.addEventListener('click', function (e) {
  const hL = document.getElementById('header-logo');
  if ((hL !== null) && ($graphDiv.attributes.class.value === 'hidden')) {
  // eslint-disable-next-line no-undef
    const newEntry = new Entry();
    newEntry.title = date;
    newEntry.formattedDate = formattedDate;
    for (const item of $fiveThings) {
      const txt = item.value;
      newEntry.fiveThings.push(txt);
    }
    // eslint-disable-next-line no-undef
    drafts.push(newEntry);
    $5thingsForm.reset();
    removePageID();
    removeHeaderID();
    for (const page of $pgList) {
      showPage($homeDiv, page);
    }
    window.alert('Your journal entry was saved as a draft!');
  } else {
    for (const pg of $pgList) {
      removeHeaderID();
      removePageID();
      showPage($homeDiv, pg);
    }
  }
});

$doneButton.addEventListener('click', function (e) {
  if (($NJTextCont.value.length) > 0) {
    e.preventDefault();
    // eslint-disable-next-line no-undef
    currentObj.text = $NJTextCont.value;
    // eslint-disable-next-line no-undef
    sendMoodReq(currentObj.text);
    removeHeaderID();
  } else {
    window.alert("It looks like you forgot to write something. Tell us what's on your mind! (or save it as a draft for later)");
  }
});

window.addEventListener('click', function (e) {
  for (const but of $homeButton) {
    if (e.target === but) {
      for (const pg of $pgList) {
        removeHeaderID();
        removePageID();
        showPage($homeDiv, pg);
      }
      break;
    }
  }
});
