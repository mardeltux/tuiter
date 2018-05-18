function controlFeed() {
  // Código para pausar/reanudar el streaming de Tweets

}

document.addEventListener('newtweet', function(eventoEnCuestion){
  var tweet = eventoEnCuestion.detail.tweet;
  console.log(tweet)
})
