var pageSize = 5;

var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

firebase.initializeApp(config);
var database = firebase.database();

window.addEventListener("load", function(event) {
  listenToFirebase();
});

function listenToFirebase() {
  database.ref('/tweets')
  .orderByChild('timestamp_ms')
  .limitToLast(pageSize)
  .on('child_added', function(snapshot) {
    // Dispatch 'newteet' event
    var eventData = { detail: { id: snapshot.key, tweet: snapshot.val() } }
    var tweetEvent = new CustomEvent('newtweet', eventData)
    document.dispatchEvent(tweetEvent);
  });
}