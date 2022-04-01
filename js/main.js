/*eslint-disable */

// const $newJournalButton = document.querySelector('[button = "new-journal"]');
const $newJournalButton = $("[button='new-journal']")

// const $draftButton = document.querySelector('[button = "drafts"]');
const $draftButton = $('[button = "drafts"]')

// const $graphButton = document.querySelectorAll('[button = "view-moodgraph"]');
const $graphButton = $('[button = "view-moodgraph"]')

// const $homeDiv = document.querySelector('[data-view = "home-screen"]');
const $homeDiv = $('[data-view = "home-screen"]');

// const $gratefulDiv = document.querySelector('[data-view = "grateful"]');
const $gratefulDiv = $('[data-view = "grateful"]');

// const $5thingsForm = document.getElementById('five-things');
const $5thingsForm = $('#five-things');

// const $journalTextForm = document.querySelector('#journal-cont');
const $journalTextForm = $('#journal-cont');

// const $headerUl = document.querySelector('.header-list');
const $headerUl = $('.header-list').first();

// const $headerLogo = document.querySelector('[data = "header-logo"]');
const $headerLogo = $('[data = "header-logo"]')

// const $dateH2 = document.querySelectorAll('[data="date"]');
const $dateH2 = $('[data="date"]');

// const $saveDraftButton = document.querySelectorAll('[button = "save-draft"]');
const $saveDraftButton = $('[button = "save-draft"]');

// const $nJContButton = document.querySelector('[button = "new-journal-cont"]');
const $nJContButton = $('[button = "new-journal-cont"]');

// const $grateful1 = document.getElementById('grateful1');
// const $grateful2 = document.getElementById('grateful2');
// const $grateful3 = document.getElementById('grateful3');
// const $grateful4 = document.getElementById('grateful4');
// const $grateful5 = document.getElementById('grateful5');
// const $fiveThings = [$grateful1, $grateful2, $grateful3, $grateful4, $grateful5];
const $5things = $("ul#grateful-ul li")

// const $NJDiv = document.querySelector('[data-view="new-journal"]');
const $NJDiv = $('[data-view="new-journal"]').first();

// const $NJTextCont = document.querySelector('#journal-cont-text');
const $NJTextCont = $('#journal-cont-text');

// const $doneButton = document.querySelector('[button="done"]');
const $doneButton = $('[button="done"]');

// const $modalDiv = document.querySelector('[data-view="done-modal"]');
const $modalDiv = $('[data-view="done-modal"]');

// const $scoreH1 = document.querySelector('[data="modal-score"]');
const $scoreH1 = $('[data="modal-score"]');

// const $modalQuoteP = document.querySelector('[data="modal-quote"]');
const $modalQuoteP = $('[data="modal-quote"]');

// const $homeButton = document.querySelectorAll('[button="home"]');
const $homeButton = $('[button="home"]');

// const $graphDiv = document.querySelector('[data-view ="graph"]');
const $graphDiv = $('[data-view ="graph"]');

// const $graphCanv = document.querySelector('#myChart');
const $graphCanv = $('#myChart');

// const $draftDiv = document.querySelector('[data-view = "draft"]');
const $draftDiv = $('[data-view = "draft"]');

// const $draftUl = document.querySelector('[data="draft-ul"]');
const $draftUl = $('[data="draft-ul"]');

// const $draftDivList = document.querySelector('[data="draft-list"]');
const $draftDivList = $('[data="draft-list"]');

// const $draftDeleteModal = document.querySelector('[data="draft-delete-modal"]');
const $draftDeleteModal = $('[data="draft-delete-modal"]');

// const $draftDeleteModalCont = document.querySelector('[data="draft-delete-cont"]');
const $draftDeleteModalCont = $('[data="draft-delete-cont"]');

const $pgList = [$gratefulDiv, $NJDiv, $modalDiv, $graphDiv, $draftDiv, $draftDeleteModalCont, $draftDeleteModal];

const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let currentObj = null;
let date;
let formattedDate;

const showPage = (show, hide) => {
  $(show).attr('class','container');
  $(hide).attr('class', 'hidden');
}

const setHeaderID = () => {
  $($headerLogo).attr('id', 'header-logo');
}

const removeHeaderID = () => {
  $($headerLogo).attr('id', null);
}

const getDate = () => {
  date = new Date();
  let month = date.getMonth();
  month = monthArr[month];
  let day = date.getDate();
  day = day.toString();
  let year = date.getFullYear();
  year = year.toString();
  formattedDate = `${month} ${day}, ${year}`;
}

const removePageID = () => {
  if (($($headerUl).children.length) > 3) {
    const $pgID = $('[data = "pg-ID"]');
    $headerUl.remove($pgID);
  }
}

const getScoreNum = (score) => {
  if (score === 'P+') {
    currentObj.scoreNum = 2;
  } else if (score === 'P') {
    currentObj.scoreNum = 1;
  } else if (score === 'NEU') {
    currentObj.scoreNum = 0;
  } else if (score === 'N') {
    currentObj.scoreNum = -1;
  } else if (score === 'N+') {
    currentObj.scoreNum = -2;
  } else {
    score = "NEU"
    currentObj.scoreNum = 0;
  }
}

const randQuote = (score) => {
  let quote = '';
  for (const key in quotes) {
    if (key === score) {
      const quoteArr = quotes[key];
      const index = Math.floor(Math.random() * (quoteArr.length - 1));
      quote = quoteArr[index];
      return quote;
    }
  }
}

const afterAPI = () => {
  $5thingsForm.reset();
  $journalTextForm.reset();
  getScoreNum(currentObj.score);
  const modalScore = `Your Score: ${currentObj.scoreNum}`;
  const quote = randQuote(currentObj.score);
  $($scoreH1).text(modalScore);
  $($modalQuoteP).text(quote);
  removePageID();
  entries.push(currentObj);
  currentObj = null;
  showPage($modalDiv, $NJDiv);
}

const sendGraphAPI = (entries) => {
  const xlabels = [];
  const ylabels = [];
  for (const ent of entries) {
    xlabels.push(ent.formattedDate);
    ylabels.push(ent.scoreNum);
  }
  const scatterChart = new Chart($graphCanv, {
    type: 'line',
    data: {
      labels: xlabels,
      datasets: [{
        label: 'Daily MoodScore',
        data: ylabels,
        fill: false,
        backgroundColor: '#292929',
        borderColor: '#B5CDA3'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            suggestedMin: -2,
            suggestedMax: 2,
            stepSize: 1,
            callback: tickVal => {
              const vals = ['N+', 'N', 'Neu', 'P', 'P+'];
              if (tickVal === -2) {
                return vals[0];
              } else if (tickVal === -1) {
                return vals[1];
              } else if (tickVal === 0) {
                return vals[2];
              } else if (tickVal === 1) {
                return vals[3];
              } else {
                return vals[4];
              }
            }
          }
        }]
      }
    }
  });
}

const saveDraft = (event, arrPush) => {
//  const hL = document.getElementById('header-logo');
      if (drafts.editing === null) {
        event.preventDefault();
        currentObj = new Entry();
        currentObj.draftNum = drafts.nextDraftNum
        drafts.nextDraftNum++
        currentObj.title = date;
        currentObj.formattedDate = formattedDate;
        for (const item of $fiveThings) {
          const txt = item.value;
          currentObj.fiveThings.push(txt);
        }
        if ($journalTextForm.value !== undefined) {
          currentObj.text = $journalTextForm.value;
        }
        if (arrPush !== null) {
          arrPush.push(currentObj);
        }
      } else if (drafts.editing !== null) {
        for (let i = 0; i < ($fiveThings.length - 1); i++) {
          const txt = $fiveThings[i].value;
          drafts.editing.fiveThings[i] = txt;
        }
        if ($NJTextCont.value.length > 0) {
          drafts.editing.text = $NJTextCont.value;
        }
        for (let dr of drafts.drafts) {
          if (dr.draftNum === drafts.editing.draftNum) {
            dr = drafts.editing
          }
        }

      }
}

const sendMoodReq = (text) => {
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
      currentObj.response = responseJSON;
      currentObj.score = currentObj.response.score_tag;
      afterAPI();
      currentObj = null;
    })
    .catch(error =>
      window.alert("We don't know what happened there, but something went wrong. Please try to submit again"));
}

const makeDraftBox = (draft) => {
  // const $draftImgDiv = document.createElement('div');


  // const $draftImg = document.createElement('img');
  // $draftImg.setAttribute('class', 'item-img');
  // $draftImg.setAttribute('src', 'images/ajax-logo.jpg');
  // $draftImg.setAttribute('alt', 'ajax-logo');
  // const $draftImg = $('<img></img>')
  //   .attr({
  //     src: 'images/ajax-logo.jpg',
  //     alt, 'ajax-logo'
  //   }).addClass('item-img');

  // $draftImgDiv.appendChild($draftImg);
  // const $draftImgDiv = $('<div></div>')
  //   .append($draftImg);



  // const $draftH2 = document.createElement('h2');
  // $draftH2.setAttribute('class', 'header-logo work-sans');
  // $draftH2.textContent = `Date: ${draft.formattedDate}`;
  // const $draftH2 = $('<h2></h2>')
  //   .addClass('header-logo work-sans')
  //   .text(`Date: ${draft.formattedDate}`)

  // const $draftDivH2 = document.createElement('div');
  // $draftDivH2.setAttribute('class', 'container');
  // $draftDivH2.appendChild($draftH2);
  // const $draftDivH2 = $('<div></div>')
  //   .addClass('container')
  //   .append($draftH2)

  // const $draftIt = document.createElement('i');
  // $draftIt.setAttribute('class', 'fas fa-trash-alt');
  // $draftIt.setAttribute('data', draft.draftNum)
  // $draftIt.setAttribute('funct', 'delete')
  // const $draftIt = $('<i></></i>')
  //   .addClass('fas fa-trash-alt')
  //   .attr({
  //     data: `${draft.draftNum}`,
  //     funct: 'delete'
  //   })

  // const $draftIp = document.createElement('i');
  // $draftIp.setAttribute('class', 'fas fa-pen-fancy')
  // $draftIp.setAttribute('data', draft.draftNum)
  // $draftIp.setAttribute('funct', 'edit')
  // const $draftIp = $('<i></></i>')
  //   .addClass('fas fa-pen-fancy')
  //   .attr({
  //     data: `${draft.draftNum}`,
  //     funct: 'edit'
  //   })

  // const $draftOptionsDiv = document.createElement('div');
  // $draftOptionsDiv.setAttribute('class', 'row div-background small-margin')
  // $draftOptionsDiv.appendChild($draftIt);
  // $draftOptionsDiv.appendChild($draftIp);
  // const $draftOptionsDiv = $('<div></div>')
  //   .addClass('row div-background small-margin')
  //   .append()

  // const $draftContDiv = document.createElement('div');
  // $draftContDiv.setAttribute('class', 'row div-background');
  // $draftContDiv.appendChild($draftImgDiv);
  // $draftContDiv.appendChild($draftDivH2);

  // const $draftFullContDiv = document.createElement('div');
  // $draftFullContDiv.setAttribute('class', 'container');
  // $draftFullContDiv.appendChild($draftContDiv);
  // $draftFullContDiv.appendChild($draftOptionsDiv);

  // const $draftLi = document.createElement('li');
  // $draftLi.setAttribute('class', 'container draft-li');
  // const draftId = draft.draftNum;
  // $draftLi.setAttribute('data', draftId);
  // $draftLi.appendChild($draftFullContDiv);

  const $draftLi = `
    <li class="container draft-li"
    data=${draft.draftNum}>
      <div class="container">
        <div class="row div-background">
          <div>
            <img
              class="item-img"
              src="images/ajax-logo.jpg"
              alt="ajax-logo"
            />
          </div>
          <div class="container">
            <h2 class="header-logo work-sans">
              Date: ${draft.formattedDate}
            </h2>
          </div>
        </div>
          <div class="row div-background small-margin">
            <i class="fas fa-trash-alt"
              funct="delete"
              data=${draft.draftNum}
            ></i>
            <i class="fas fa-pen-fancy"
            funct="edit"
            data=${draft.draftNum}
            ></i>
        </div>
      </div>
    </li>
  `

  return $draftLi
}

const journalContExists = () => {
  for (const item of $5things) {
    if ($(item).text().length > 0) {
      return true
    }
  }
  if (($($NJTextCont).text().length > 0)) {
    return true;
  }
  return false
}

const compileDraftBoxes = () => {
  if (drafts.drafts.length > 0) {
    const $noDraft = $('[data="no-drafts"]');
    if ($noDraft) {
      $($draftUl)
        .remove($noDraft);
    }
    for (const dr of drafts.drafts) {
      if (!drafts.renderedTitles.includes(dr.draftNum)) {
      const $draftLi = makeDraftBox(dr, dr.draftNum);
      drafts.renderedTitles.push(dr.draftNum)
      $($draftUl)
        .append($draftLi);
    }
    }
  } else {
    // let $noDraftP = document.createElement('p');
    // $noDraftP.setAttribute('class', 'roboto');
    // $noDraftP.textContent = "There are no saved drafts yet";

    // const $noDraftLi = document.createElement('li');
    // $noDraftLi.setAttribute('data', 'no-drafts')

    // $noDraftLi.appendChild($noDraftP);
    // $draftUl.appendChild($noDraftLi)

    $($draftUl)
      .append(`
        <li data="no-drafts">
          <p className="roboto">There are no saved drafts yet</p>
        </li>
        `
        )

  }
}

const editDraft = (draft) => {
  let count = 0;
    for (const txtBox of $fiveThings) {
      txtBox.textContent = draft.fiveThings[count];
      count++
    }
    $NJTextCont.textContent = drafts.editing.text
    for ($dtH2 of $dateH2) {
      $dtH2.textContent = draft.formattedDate;
    }
  }

const deleteDraft = (draft) => {
  const drNum = draft.draftNum;
  // const $drLi = document.querySelector(`[data="${drNum}"]`);
  const $drLi = $(`[data="${drNum}"]`);
  const COIndexDr = drafts.drafts.indexOf(draft);
  const COIndexRT = drafts.renderedTitles.indexOf(drNum);
  if ((COIndexDr > -1) && (COIndexRT > -1)) {
    drafts.drafts.splice(COIndexDr,1);
    drafts.renderedTitles.splice(COIndexRT,1);
    $($draftUl).remove($drLi)
  }
}

$(window).click((e) => {
  for (const sm of $saveDraftButton) {
    if (e.target === sm) {
      const contExists = journalContExists();
        if (contExists === true){
          saveDraft(e, drafts.drafts);
        drafts.editing = null
        currentObj = null;
        for (const pg of $pgList) {
          removeHeaderID();
          removePageID();
          showPage($homeDiv, pg);
        }
        $journalTextForm.reset();
        $5thingsForm.reset();
            break
        } else {
          window.alert(`There is nothing to save! We'll take you back to the home page so you can come back to this later`)
        }
    }
  }
});

$($headerLogo).click((e) => {
  const event = e;
  const hL = $('#header-logo');
  if ((hL !== null) && ($($graphDiv).attr('class') === 'hidden')) {
    if (journalContExists() === true) {
    window.alert('Your journal entry was saved as a draft!');
     saveDraft(event, drafts.drafts)
      drafts.editing = null
      currentObj = null;
      for (const pg of $pgList) {
        removeHeaderID();
        removePageID();
        showPage($homeDiv, pg);
      }
      $journalTextForm.reset();
      $5thingsForm.reset();
    } else {
      for (const page of $pgList) {
        showPage($homeDiv, page);
      }
    }

  }
  });

$(window).click((e) => {
  for (const gr of $graphButton){
    if (e.target == gr) {
    for (const pg of $pgList) {
    removeHeaderID();
    removePageID();
    showPage($graphDiv, pg);
  }
  showPage($graphDiv, $homeDiv)
  setHeaderID();
  // const $nJHeaderH2 = document.createElement('h2');
  // $nJHeaderH2.textContent = 'MoodGraph';
  // $nJHeaderH2.setAttribute('class', 'new-journal-header work-sans');



  // const $nJHeader = document.createElement('li');
  // $nJHeader.setAttribute('data', 'pg-ID');
  // $nJHeader.appendChild($nJHeaderH2);



  // $headerUl.appendChild($nJHeader);

  $($headerUl).append(`
    <li data="pg-ID">
      <h2 class='new-journal-header work-sans'>MoodGraph</h2>
    </li>
    `
  )

  // $headerLogo.setAttribute('class', 'header-logo work-sans');
  $($headerLogo).attr('header-logo work-sans')
  // eslint-disable-next-line no-undef
  sendGraphAPI(entries);
  }
    }
});

$(window).click((e) => {
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

// home page eventListeners
$($newJournalButton).click((e) => {
  showPage($gratefulDiv, $homeDiv);
  setHeaderID();
  // $headerUl.appendChild($nJHeader);
  $($headerUl).append(`
    <li data='pg-ID'>
      <h2 class='new-journal-header work-sans'>New Journal Entry</h2>
    </li>
    `
  )
  // const $nJHeader = document.createElement('li');
  //   $nJHeader.setAttribute('data', 'pg-ID');
  //   $nJHeader.appendChild($nJHeaderH2);

  // const $nJHeaderH2 = document.createElement('h2');
  //  $nJHeaderH2.textContent = 'New Journal Entry';
  //   $nJHeaderH2.setAttribute('class', 'new-journal-header work-sans');
  getDate();

  $($headerLogo).attr('class', 'header-logo work-sans');

  for (let item of $dateH2) {
    $(item).text(`Date: ${formattedDate}`);
  }
  for (const item of $5things) {
    $(item).text("");
  }
});



$($draftButton).click((e) => {
  showPage($draftDiv, $homeDiv);
  $($headerUl).append(`
    <li data='pg-ID'>
      <h2 class='new-journal-header work-sans'>Drafts</h2>
    </li>
    `
  );

  // const $draftHeader = document.createElement('li');
  // $draftHeader.setAttribute('data', 'pg-ID');
  // $draftHeader.appendChild($draftHeaderH2);

  // const $draftHeaderH2 = document.createElement('h2');
  // $draftHeaderH2.textContent = 'Drafts';
  // $draftHeaderH2.setAttribute('class', 'new-journal-header work-sans');


  $($headerLogo).attr('class', 'header-logo work-sans');

  setHeaderID();
  compileDraftBoxes();
});

// gratefulDiv eventListeners
$($nJContButton).click((e) => {
  e.preventDefault();
  showPage($NJDiv, $gratefulDiv);
  saveDraft(e, null)
  if ((currentObj === null) && (drafts.editing !== null)) {
    currentObj = drafts.editing
  }
  });

$($doneButton).click((e) => {
  if (($($NJTextCont).text().length) > 0) {
    e.preventDefault();
    if (drafts.editing !== null) {
      currentObj = drafts.editing;
    }
    // eslint-disable-next-line no-undef
    currentObj.text = $($NJTextCont).text();
    // eslint-disable-next-line no-undef
    sendMoodReq(currentObj.text);
    deleteDraft(drafts.editing)
    drafts.editing = null;
    removeHeaderID();
  } else {
    window.alert("It looks like you forgot to write something. Tell us what's on your mind! (or save it as a draft for later)");
  }
});

// draftDiv eventListeners

$($draftUl).click((e) => {
  const tar = e.target;
  if ($(tar).attr('data') && $(tar).attr('funct')) {
  let tarNum = $(tar).attr('data')
  tarNum = parseInt(tarNum)
  const tarFunct = $(tar).attr('funct')
    for (const d of drafts.drafts) {
      if (d.draftNum === tarNum) {
        drafts.editing = d
        break
      }
  }
    if ((tarFunct === 'edit') && (drafts.editing !== null)) {
      editDraft(drafts.editing);
      showPage($gratefulDiv,$draftDiv);
  } else if ((tarFunct === 'delete') && (drafts.editing !== null)){
    showPage($draftDeleteModal,$draftDivList);
    const $modalDelBut = $('[data="draftmodal-delete-but"]');
    const $modalCanBut = $('[data="draftmodal-cancel-but"]');
    $($draftDeleteModal).attr('class', 'overlay')
    $($draftDeleteModalCont).attr('class', 'container modal')
      .click((event2) => {
      if ((event2.target === $modalDelBut) || (event2.target === $modalCanBut)) {
        if (event2.target === $modalDelBut) {
          deleteDraft(drafts.editing);
          showPage($draftDivList,$draftDeleteModal);
          $($draftDeleteModalCont).attr('class', 'hidden');
          drafts.editing = null
        } else {
          showPage($draftDivList, $draftDeleteModal);
          $($draftDeleteModalCont).attr('class', 'hidden');
          currentObj = null;
        }
      }
    })

}
  }
})
