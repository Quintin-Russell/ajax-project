// const $newJournalButton = document.querySelector('#new-journal');
// const $draftButton = document.querySelector('#drafts');
// const $graphButton = document.querySelector('#graph');
// const $homeDiv = document.querySelector('[data-view = "home-screen"]');
// const $gratefulDiv = document.querySelector('[data-view = "grateful"]');
// const $5thingsForm = document.getElementById('five-things');
// const $journalTextForm = document.querySelector('#journal-cont');
// const $headerUl = document.querySelector('.header-list');
// const $headerLogo = document.querySelector('#header-logo');
// const $dateH2 = document.querySelectorAll('[data="date"]');
// const $saveDraftButton = document.querySelectorAll('[button = "save-draft"]');
// const $nJContButton = document.querySelector('[button = "new-journal-cont"]');
// const $grateful1 = document.getElementById('grateful1');
// const $grateful2 = document.getElementById('grateful2');
// const $grateful3 = document.getElementById('grateful3');
// const $grateful4 = document.getElementById('grateful4');
// const $grateful5 = document.getElementById('grateful5');
// const $fiveThings = [$grateful1, $grateful2, $grateful3, $grateful4, $grateful5];
// const $NJDiv = document.querySelector('[data-view="new-journal"]');
// const $NJTextCont = document.querySelector('#journal-cont-text');
// const $doneButton = document.querySelector('[button="done"]');
// const $pgList = [$gratefulDiv, $NJDiv];
// let date;
// let formattedDate;

// function showPage(show, hide) {
//   show.setAttribute('class', 'container');
//   hide.setAttribute('class', 'hidden');
// }

// function getDate() {
//   const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   date = new Date();
//   let month = date.getMonth();
//   month = monthArr[month];
//   let day = date.getDate();
//   day = day.toString();
//   let year = date.getFullYear();
//   year = year.toString();
//   formattedDate = month + ' ' + day + ', ' + year;
// }

// function removePageID() {
//   if (($headerUl.childNodes) > 3) {
//     const $pgID = document.querySelector('[data = "pg-ID"]');
//     $headerUl.removeChild($pgID);
//   }
// }

// function getScoreNum(score) {
//   if (score === 'P+') {
//     currentObj.scoreNum = 2;
//   } else if (score === 'P') {
//     currentObj.scoreNum = 1;
//   } else if (score === 'NEU') {
//     currentObj.scoreNum = 0;
//   } else if (score === 'N') {
//     currentObj.scoreNum = -1;
//   } else if (score === 'N+') {
//     currentObj.scoreNum = -2;
//   } else {
//     currentObj.scoreNum = null;
//   }
// }

// function sendMoodReq(text) {
//   const formdata = new FormData();
//   formdata.append('key', 'e599b98b4c266944eb2b0f2ada2724cc');
//   formdata.append('txt', text);
//   formdata.append('lang', 'auto');

//   const requestOptions = {
//     method: 'POST',
//     body: formdata,
//     redirect: 'follow'
//   };

//   const response = fetch('https://api.meaningcloud.com/sentiment-2.1', requestOptions)
//     .then(response => response.json())
//     .then(responseJSON => {
//       currentObj.response = responseJSON;
//       return responseJSON;
//     })
//     .catch(error => window.alert("Don't know what happened there, but something went wrong. Please try to submit again"));
// }

// // home page eventListeners
// $newJournalButton.addEventListener('click', function (e) {
//   showPage($gratefulDiv, $homeDiv);
//   const $nJHeader = document.createElement('li');
//   const $nJHeaderH2 = document.createElement('h2');
//   getDate();
//   $nJHeaderH2.textContent = 'New Journal Entry';
//   $nJHeader.setAttribute('data', 'pg-ID');
//   $nJHeader.appendChild($nJHeaderH2);
//   $headerUl.appendChild($nJHeader);
//   $nJHeaderH2.setAttribute('class', 'new-journal-header work-sans');
//   $headerLogo.setAttribute('class', 'header-logo work-sans');
//   let item;
//   for (item of $dateH2) {
//     item.textContent = 'Date: ' + formattedDate;
//   }
// });
// /* $draftButton.addEventListener('click', function (e) {
//   $homeDiv.setAttribute('class', 'hidden container');
//   $draftDiv.setAttribute('class', 'flex container');
// });

// $graphButton.addEventListener('click', function (e) {
//   $homeDiv.setAttribute('class', 'hidden container');
//   $graphDiv.setAttribute('class', 'flex container');
// });
// */
// // gratefulDiv eventListeners
// $gratefulDiv.addEventListener('click', function (e) {
//   for (const sm of $saveDraftButton) {
//     if (e.target === sm) {
//       e.preventDefault();
//       const newEntry = new Entry();
//       newEntry.title = date;
//       for (const item of $fiveThings) {
//         const txt = item.value;
//         newEntry.fiveThings.push(txt);
//         newEntry.formattedDate = formattedDate;
//       }
//       drafts.push(newEntry);
//       showPage($homeDiv, $gratefulDiv);
//       $5thingsForm.reset();
//       break;
//     }
//   }
// });

// $nJContButton.addEventListener('click', function (e) {
//   e.preventDefault();
//   showPage($NJDiv, $gratefulDiv);
//   const newEntry = new Entry();
//   newEntry.title = date;
//   newEntry.formattedDate = formattedDate;
//   for (const item of $fiveThings) {
//     const txt = item.value;
//     newEntry.fiveThings.push(txt);
//   }
//   currentObj = newEntry;
// });

// $headerLogo.addEventListener('click', function (e) {
//   const newEntry = new Entry();
//   newEntry.title = date;
//   newEntry.formattedDate = formattedDate;
//   for (const item of $fiveThings) {
//     const txt = item.value;
//     newEntry.fiveThings.push(txt);
//   }
//   drafts.push(newEntry);
//   $5thingsForm.reset();
//   removePageID();
//   for (const page of $pgList) {
//     showPage($homeDiv, page);
//   }
//   window.alert('Your journal entry was saved as a draft!');
// });

// // add function that submits API req
// $doneButton.addEventListener('click', function (e) {
//   if (($NJTextCont.value.length) > 0) {
//     e.preventDefault();
//     currentObj.text = $NJTextCont.value;
//     console.log('currentObj.response', currentObj.response);
//     const score = currentObj.response.score_tag;
//     console.log('score', score);
//     currentObj.scoreNum = getScoreNum(score);
//     currentObj.score = score;
//     console.log(currentObj);
//     $5thingsForm.reset();
//     $journalTextForm.reset();
//   } else {
//     window.alert("It looks like you forgot to write something. Tell us what's on your mind! (or save it as a draft for later)");
//   }
// });
