const TwitterStream = require('twitter-stream-api')
const admin = require('firebase-admin')
const config = require('./config.json')

// ------ Firebase config ------
admin.initializeApp({
  credential: admin.credential.cert(config.firebase.service_account),
  databaseURL: config.firebase.database_url
})

const db = admin.database()

// ------ Twitter Sream client ------
const keys = config.twitter.keys;

let Twitter = new TwitterStream(keys, false)

Twitter.stream('statuses/filter', {
    track: config.twitter.filter
});


// ------ Listeners ------
Twitter.on('connection success', function (uri) {
  console.log('Connection Success!', uri);
});

Twitter.on('data', function (obj) {
  let tweet = JSON.parse(obj.toString())
  // Ignore retweets, replies and quotes
  if (!tweet.retweeted_status && !tweet.in_reply_to_status_id && !tweet.quoted_status_id)
    saveTweetOnFirebase(tweet)
});


// ------ Functions ------
function parseTweet(tweet) {
  return {
    text: tweet.text,
    user:
     { id: tweet.user.id,
       name: tweet.user.name,
       screen_name: tweet.user.screen_name,
       location: tweet.user.location,
       description: tweet.user.description,
       profile_image_url: tweet.user.profile_image_url
    },
    quote_count: tweet.quote_count,
    reply_count: tweet.reply_count,
    retweet_count: tweet.retweet_count,
    favorite_count: tweet.favorite_count,
    timestamp_ms: parseInt(tweet.timestamp_ms)
  }
}

function saveTweetOnFirebase(tweet) {
  var ref = db.ref("tweets/" + tweet.id)
  ref.set(parseTweet(tweet))
  console.log("Tweet saved on Firebase!", tweet.id)
}
