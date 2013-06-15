/*jshint white:false, eqnull:true, immed:false, jquery:true, forin:false, globalstrict:true */
'use strict';

// Generated by CoffeeScript 1.6.3
/*!
* jQuery POP'n SocialButton v0.1.6
*
* http://github.com/ktty1220/jquery.popn-socialbutton
*
* 参考サイト
*
* - http://q.hatena.ne.jp/1320898356
* - http://stackoverflow.com/questions/5699270/how-to-get-share-counts-using-graph-api
* - http://stackoverflow.com/questions/8853342/how-to-get-google-1-count-for-current-page-in-php
* - http://hail2u.net/blog/coding/jquery-query-yql-plugin.html
* - http://hail2u.net/blog/coding/jquery-query-yql-plugin-supports-open-data-tables.html
*
* Copyright (c) 2013 ktty1220 ktty1220@gmail.com
* Licensed under the MIT license
*/

(function(jQuery) {
  'use strict';
  var $;
  $ = jQuery;
  return $.fn.popnSocialButton = function(services, options) {
    var dummyUA, exOptions, iconSize, idx, popnUp, sName, servicesProp, _addLink, _i, _len,
      _this = this;
    if (options == null) {
      options = {};
    }
    exOptions = $.extend({}, {
      url: location.href,
      text: $('title').html(),
      imgDir: './img',
      buttonSpace: 24,
      countPosition: {
        top: 32,
        right: -12
      },
      countColor: {
        text: '#ffffff',
        bg: '#cc0000',
        textHover: '#ffffff',
        bgHover: '#ff6666',
        border: '#ffffff'
      },
      countSize: 11
    }, options);
    exOptions.urlOrg = exOptions.url;
    exOptions.url = encodeURIComponent(exOptions.url);
    exOptions.text = encodeURIComponent(exOptions.text);
    iconSize = 44;
    popnUp = 4;
    dummyUA = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 5.1)';
    servicesProp = {
      twitter: {
        img: 'twitter_2x.png',
        alt: 'Twitter Share Button',
        shareUrl: "https://twitter.com/share?url=" + exOptions.url + "&text=" + exOptions.text,
        commentUrl: "https://twitter.com/search/?q=" + exOptions.url,
        countUrl: "http://urls.api.twitter.com/1/urls/count.json?url=" + exOptions.url,
        jsonpFunc: function(json, cb) {
          var _ref;
          return cb((_ref = json.count) != null ? _ref : 0);
        }
      },
      facebook: {
        img: 'facebook_2x.png',
        alt: 'Facebook Share Button',
        shareUrl: "http://www.facebook.com/sharer.php?u=" + exOptions.url + "&t=" + exOptions.text,
        countUrl: "https://graph.facebook.com/" + exOptions.url,
        jsonpFunc: function(json, cb) {
          /*
          * - Graph APIでsharesが取得できない場合はFQLでtotal_countを取得する
          * - Graph APIのlikes + FQLのtotal_countでいいねボタンと同じ件数になる模様(いくつかのケースを調べた結果)
          * - ほとんどのサイトではFQLのtotal_countだけでいいねボタンと同じ件数になる
          */

          var graphLikes, _ref;
          if (json.shares != null) {
            return cb(json.shares);
          }
          graphLikes = (_ref = json.likes) != null ? _ref : 0;
          return $.ajax({
            url: "https://graph.facebook.com/fql?q=" + (encodeURIComponent("SELECT total_count FROM link_stat WHERE url='" + exOptions.urlOrg + "'")),
            dataType: 'jsonp'
          }).done(function(json) {
            var fqlTotal, _ref1, _ref2;
            fqlTotal = (_ref1 = (_ref2 = json.data[0]) != null ? _ref2.total_count : void 0) != null ? _ref1 : 0;
            return cb(graphLikes + fqlTotal);
          });
        }
      },
      hatebu: {
        img: 'hatena_bookmark_2x.png',
        alt: 'Hatena Bookmark Share Button',
        shareUrl: "http://b.hatena.ne.jp/add?mode=confirm&url=" + exOptions.url + "&title=" + exOptions.text + "&mode=confirm",
        commentUrl: "http://b.hatena.ne.jp/entry/" + exOptions.urlOrg,
        countUrl: "http://api.b.st-hatena.com/entry.count?url=" + exOptions.url,
        jsonpFunc: function(json, cb) {
          return cb(json != null ? json : 0);
        }
      },
      gplus: {
        img: 'google+1_2x.png',
        alt: 'Google Plus Share Button',
        shareUrl: "https://plusone.google.com/share?url=" + exOptions.url,
        /*
        * - Google+1ボタンはシェア数に関するjsonpを提供していない(jsonすら提供していない)ので+1ボタンのhtmlを取得してその中から件数を取得する
        * - クロスドメインによる取得になるのでYQLを使用する
        * - ただしgoogleのサーバーに設置してあるrobots.txtはYQL(というかYahooのロボット全般？)のUAを拒否するのでOpen Data Tableのdata.headerプラグインを使用する
        */

        countUrl: "http://query.yahooapis.com/v1/public/yql?q=" + (encodeURIComponent("SELECT content FROM data.headers WHERE url='https://plusone.google.com/_/+1/fastbutton?hl=ja&url=" + exOptions.urlOrg + "' and ua='" + dummyUA + "'")) + "&env=http://datatables.org/alltables.env",
        jsonpFunc: function(json, cb) {
          var count, m, _ref;
          count = 0;
          if (((_ref = json.query) != null ? _ref.count : void 0) > 0) {
            m = json.results[0].match(/window\.__SSR = {c: ([\d]+)/);
            if (m != null) {
              count = m[1];
            }
          }
          return cb(count);
        }
      },
      github: {
        img: 'github_alt_2x.png',
        alt: 'GitHub Repository',
        shareUrl: "https://github.com/" + exOptions.githubRepo,
        commentUrl: "https://github.com/" + exOptions.githubRepo + "/stargazers",
        countUrl: "https://api.github.com/repos/" + exOptions.githubRepo,
        jsonpFunc: function(json, cb) {
          var _ref;
          return cb((_ref = json.data.watchers) != null ? _ref : 0);
        }
      }
    };
    _addLink = function(name, prop, idx) {
      var countTag, countTagType, imgTag, shareTag, wrapTag;
      wrapTag = $('<div/>').attr({
        "class": "popn-socialbutton-wrap " + name
      }).css({
        'float': 'left',
        position: 'relative',
        width: iconSize,
        height: iconSize,
        marginTop: popnUp
      });
      if (idx > 0) {
        wrapTag.css({
          marginLeft: exOptions.buttonSpace
        });
      }
      shareTag = $('<a/>').attr({
        href: prop.shareUrl,
        "class": 'popn-socialbutton-share',
        target: '_blank'
      }).css({
        outline: 'none',
        display: 'block',
        width: '100%',
        height: '100%'
      });
      imgTag = $('<img/>').attr({
        src: "" + exOptions.imgDir + "/" + prop.img,
        alt: prop.alt
      }).css({
        border: 'none'
      });
      countTagType = prop.commentUrl ? 'a' : 'span';
      countTag = $("<" + countTagType + "/>").attr({
        "class": 'popn-socialbutton-count'
      });
      if (countTagType === 'a') {
        countTag.attr({
          href: prop.commentUrl,
          target: '_blank'
        });
      } else {
        countTag.css({
          cursor: 'default'
        });
      }
      countTag.css($.extend({}, {
        display: 'none',
        position: 'absolute',
        color: exOptions.countColor.text,
        backgroundColor: exOptions.countColor.bg,
        border: "solid 2px " + exOptions.countColor.border,
        fontSize: exOptions.countSize,
        textDecoration: 'none',
        outline: 'none',
        fontWeight: 'bold',
        padding: '0 4px',
        borderRadius: 6,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
        zIndex: 1
      }, exOptions.countPosition));
      wrapTag.append(shareTag.append(imgTag)).append(countTag);
      $(_this).append(wrapTag);
      return $.ajax({
        url: prop.countUrl,
        dataType: 'jsonp'
      }).done(function(json) {
        return prop.jsonpFunc(json, function(count) {
          return countTag.show().text(count);
        });
      });
    };
    for (idx = _i = 0, _len = services.length; _i < _len; idx = ++_i) {
      sName = services[idx];
      if (servicesProp[sName] != null) {
        _addLink(sName, servicesProp[sName], idx);
      }
    }
    $(this).height(iconSize + popnUp);
    $(this).find('.popn-socialbutton-share').click(function() {
      var left, top;
      top = (screen.height / 2) - 180;
      left = (screen.width / 2) - 240;
      window.open(this.href, '', "width=520, height=400, top=" + top + ", left=" + left);
      return false;
    });
    $(this).find('a.popn-socialbutton-count').mouseenter(function() {
      return $(this).css({
        color: exOptions.countColor.textHover,
        backgroundColor: exOptions.countColor.bgHover
      });
    }).mouseleave(function() {
      return $(this).css({
        color: exOptions.countColor.text,
        backgroundColor: exOptions.countColor.bg
      });
    });
    return $(this).find('.popn-socialbutton-wrap').mouseenter(function() {
      return $(this).stop().animate({
        marginTop: 0
      }, 100, 'swing');
    }).mouseleave(function() {
      return $(this).stop().animate({
        marginTop: 4
      }, 100, 'swing');
    });
  };
})(jQuery);
