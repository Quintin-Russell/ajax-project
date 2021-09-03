/* exported data */

let entries = [];
let drafts = {
  drafts: [],
  renderedTitles: [],
  nextDraftNum: 0
};
// eslint-disable-next-line no-unused-vars
const quotes = {
  'P+': ['Begin at once to live, and count each separate day as a separate life.—Seneca', 'It looks like you have some momentum today! Keep it up! Do something today that your future self will thank you for!', "Spread the positivity you have: tell someone they look nice today, talk to that person you catch eyes with at the grocery store, help someone carry something heavy... Be a part of someone else's day!"],
  P: ['What man actually needs is not a tensionless state but rather the striving and struggling for some goal worthy of him.” – Viktor Frankl. What are you working toward today', ''],
  NEU: ["Luck is what happens when preparation meets opportunity.―Seneca. Don't forget to do something that your future self will thank you for"],
  N: ['Focus on what you can control, the rest will fall into place', 'If you want to improve, be content to be thought foolish and stupid.―Epictetus', "Remember what you're greatful for", "The winners don't let the haters effect their tragectory"],
  'N+': ['The key is to keep company only with people who uplift you, whose presence calls forth your best.―Epictetus...Call someone and tell them you love them, tell them about what you have going on in your life. Lean on those around you for support', '“You will never see me surrender, never see me cry, but you will often see me walk away. Turn around and just leave, without looking back.” – Charlotte Eriksson', "If you want to improve, be content to be thought foolish and stupid.―Epictetus. Some people aren't going to understand you, that doesn't mean that you have to listen to them when they tell you 'no'.", "Keep your head up. You've been through worse. Everything (even this is temporary)", "This too shall pass...Remember what your greatful for and that someone, somewhere would LOVE to have your 'bad day'"]
};

let currentObj = null; // eslint-disable-line no-unused-vars, prefer-const
// eslint-disable-next-line no-unused-vars
function Entry() {
  this.title = undefined;
  this.formattedDate = undefined;
  this.fiveThings = [];
  this.text = undefined;
  this.response = undefined;
  this.score = undefined;
  this.scoreNum = undefined;
  this.draftNum = undefined;
}

var previousEntries = localStorage.getItem('entries');
// eslint-disable-next-line no-unused-vars
entries = JSON.parse(previousEntries);

var previousDrafts = localStorage.getItem('drafts');
// eslint-disable-next-line no-unused-vars
drafts = JSON.parse(previousDrafts);

window.addEventListener('beforeunload', function (event) {
  const entriesJSON = JSON.stringify(entries);
  const draftsJSON = JSON.stringify(drafts);
  localStorage.setItem('entries', entriesJSON);
  localStorage.setItem('drafts', draftsJSON);
});
