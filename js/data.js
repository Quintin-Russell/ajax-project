/* exported data */
const entries = [];
const drafts = [];

/* function Entry() {
  this.title = undefined;
  this.fiveThings = [];
  this.text = undefined;
  this.response = undefined;
  this.score = undefined;
  this.scoreNum = undefined;
}
*/
var previousEntries = localStorage.getItem('entries');
// eslint-disable-next-line no-unused-vars
previousEntries = JSON.parse(previousEntries);

var previousDrafts = localStorage.getItem('drafts');
// eslint-disable-next-line no-unused-vars
previousDrafts = JSON.parse(previousDrafts);

window.addEventListener('beforeunload', function (event) {
  const entriesJSON = JSON.stringify(entries);
  const draftsJSON = JSON.stringify(drafts);
  localStorage.setItem('entries', entriesJSON);
  localStorage.setItem('drafts', draftsJSON);
});
