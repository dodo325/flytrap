
let Services = [];

Services = [{
      url: "https://www.facebook.com",
      path: "/login.php?next=http://www.facebook.com/favicon.ico",
      name: "Facebook",
      login: "/login.php"
  }, {
      url: "https://twitter.com",
      path: "/login?redirect_after_login=%2Ffavicon.ico",
      name: "Twitter",
      login: "/login"
  }, {
      url: "https://vk.com",
      path: "/login?u=2&to=ZmF2aWNvbi5pY28-",
      name: "Vkontakte",
      login: "/login"
  }, {
      url: "https://www.reddit.com",
      path: "/login?dest=https%3A%2F%2Fwww.reddit.com%2Ffavicon.ico",
      name: "Reddit",
      login: "/login"
  }, {
      url: "https://accounts.google.com",
      path: "/ServiceLogin?passive=true&continue=https%3A%2F%2Fwww.google.com%2Ffavicon.ico&uilel=3&hl=en&service=mail",
      name: "Gmail",
      login: "/ServiceLogin"
  }, {
      url: "https://www.spotify.com",
      path: "/en/login/?forward_url=https%3A%2F%2Fwww.spotify.com%2Ffavicon.ico",
      name: "Spotify",
      login: "/en/login/"
  }, {
      url: "https://www.tumblr.com",
      path: "/login?redirect_to=%2Ffavicon.ico",
      name: "Tumblr",
      login: "/login"
  }, {
      url: "https://www.dropbox.com",
      path: "/login?cont=https%3A%2F%2Fwww.dropbox.com%2Fstatic%2Fimages%2Fabout%2Fdropbox_logo_glyph_2015.svg",
      name: "Dropbox",
      login: "/login"
  }, {
      url: "https://www.amazon.com",
      path: "/ap/signin/178-4417027-1316064?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=10000000&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Ffavicon.ico",
      name: "Amazon",
      login: "/ap/signin/"
  }, {
      url: "https://github.com",
      path: "/login?return_to=https%3A%2F%2Fgithub.com%2Ffavicon.ico%3Fid%3D1",
      name: "Github",
      login: "/login"
  }, {
      url: "https://medium.com",
      path: "/m/signin?redirect=https%3A%2F%2Fmedium.com%2Ffavicon.ico&loginType=default",
      name: "Medium",
      login: "/m/signin"
  }, {
      url: "https://www.paypal.com",
      path: "/signin?returnUri=https://t.paypal.com/ts?v=1.0.0",
      name: "Paypal",
      login: "/account/signin/"
  }, {
      url: "https://bitbucket.org",
      path: "/account/signin/?next=/favicon.ico",
      name: "BitBucket",
      login: "/account/signin/"
  }, {
      url: "https://www.instagram.com",
      path: "/accounts/login/?next=%2Ffavicon.ico",
      name: "Instagram",
      login: "/accounts/login/"
  }, {
      url: "https://foursquare.com",
      path: "/login?continue=%2Ffavicon.ico",
      name: "Foursquare",
      login: "/login"
  }, {
      url: "https://www.airbnb.com",
      path: "/login?redirect_params[action]=favicon.ico&redirect_params[controller]=home",
      name: "Airbnb",
      login: "/login"
  }, {
      url: "https://news.ycombinator.com",
      path: "/login?goto=y18.gif",
      name: "Hackernews",
      login: "/login"
  }, {
      url: "https://slack.com",
      path: "/checkcookie?redir=https%3A%2F%2Fslack.com%2Ffavicon.ico%23",
      name: "Slack",
      login: "/signin"
  }, {
      url: "https://squareup.com",
      path: "/login?return_to=%2Ffavicon.ico",
      name: "Square",
      login: "/login"
  }, {
      url: "https://squareup.com",
      path: "/login?return_to=%2Ffavicon.ico",
      name: "Square",
      login: "/login"
  }, {
      url: "https://disqus.com",
      path: "/profile/login/?next=https%3A%2F%2Fdisqus.com%2Ffavicon.ico",
      name: "Disqus",
      login: "/profile/login"
  }, {
      url: "https://www.meetup.com",
      path: "/login/?returnUri=https%3A%2F%2Fwww.meetup.com%2Fimg%2Fajax_loader_trans.gif",
      name: "Meetup",
      login: "/login"
  }, {
      url: "https://www.udemy.com",
      path: "/join/login-popup/?next=/staticx/udemy/images/v6/favicon.ico",
      name: "Udemy",
      login: "/join/login-popup/"
  }, {
      url: "https://www.patreon.com",
      path: "/login?ru=/images/profile_default.png",
      name: "Patreon",
      login: "/login"
  }, {
      url: "https://accounts.google.com",
      path: "/ServiceLogin?passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Ffavicon.ico&uilel=3&hl=en&service=youtube",
      name: "Youtube",
      login: "/ServiceLogin"
  }, {
      url: "https://accounts.snapchat.com",
      path: "/accounts/login?continue=https://accounts.snapchat.com/accounts/static/images/favicon/favicon.png",
      name: "Snapchat",
      login: "/accounts/login"
  }, {
      url: "https://www.messenger.com",
      path: "/login.php?next=http://www.messenger.com/favicon.ico",
      name: "Messenger",
      login: "/login.php"
  }, {
      url: "https://www.khanacademy.org",
      path: "/login?continue=/favicon.ico",
      name: "Khanacademy",
      login: "/login"
  }, {
      url: "https://www.eventbrite.com",
      path: "/signin/?referrer=https://www.eventbrite.com/favicon.ico",
      name: "Eventbrite",
      login: "/signin"
  }, {
      url: "https://www.etsy.com",
      path: "/signin?from_page=https://www.etsy.com/favicon.ico",
      name: "Etsy",
      login: "/signin"
  }, {
      url: "https://www.twitch.tv",
      path: "/login?redirect_on_login=/favicon.ico",
      name: "Twitch",
      login: "/login"
  }];

  $.each(Services, function(index, val) {
       urlServices[val.name.toLowerCase()] = val.url + val.login;
  });


// https://www.jstage.jst.go.jp/article/transinf/E103.D/2/E103.D_2019INP0012/_pdf

 // https://www.grepular.com/Abusing_HTTP_Status_Codes_to_Expose_Private_Information
 function workWithNetworks(callback){
    $.each(Services, function(index, network) {
        var img = document.createElement("img");
        img.src = network.url + network.path;
        img.onload = function() {
        //   console.log("onload = " + network.name);
          callback({"name": network.name});
        };
        img.onerror = function() {
            // console.log("onerror = " + network.name);
        };
    });
}
