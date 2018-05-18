var pageSize = 5;

var config = {
  apiKey: "AIzaSyAXnvCWKfZq-4SFtMfg2OSk2SiqCMFY8Q4",
  authDomain: "slack-channel.firebaseapp.com",
  databaseURL: "https://slack-channel.firebaseio.com",
  projectId: "slack-channel",
  storageBucket: "slack-channel.appspot.com",
  messagingSenderId: "143137641237"
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
