var background = [];

$(document).ready(function(){

  $('#btnHolder').hide();
  getSteamProfile('http://steamcommunity.com/profiles/76561198049310359');


});

function search(value)
{
  if(event.keyCode == 13) {
    $('#btnHolder').hide();
    getSteamProfile(value);
  }
}

function getSteamProfile(url)
{
  $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent(url) + '&callback=?', function(data){
  	getBackground(data.contents);
  });
}

function getBackground(contents)
{
  var el = document.createElement( 'html' );
  $(el).html(contents);
  url = $(el).find('.profile_background_image_content').css('background-image');
  $('.site-wrapper').css('background-image',url);
  $('.site-wrapper').css('background-size','cover');
  url = url.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
  setBackgroundObj(url);
}

function downloadBackground()
{
  window.open(background.url, '_blank');
}

function purchasebackground()
{
    window.open(background.purchaseUrl, '_blank');
}

function setBackgroundObj(url)
{

  var appId = url.split('/')[7];
  $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent('https://store.steampowered.com/api/appdetails?appids='+appId) + '&callback=?', function(data){
    gameInfo = JSON.parse(data.contents);
    gameName = gameInfo[Object.keys(gameInfo)[0]].data.name;
    background.url = url;
    background.purchaseUrl = 'http://steamcommunity.com/market/search?q=' + gameName + ' background'
    $('#btnHolder').show();
  });

}
