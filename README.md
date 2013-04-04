# jQuery POP'n SocialButton - Twitter, Facebook, はてなブックマークのカスタムシェアボタンを表示するjQueryプラグイン

![example](example.png)

上記のようなちょっと変わったシェアボタンを表示できます。

それぞれのボタンにマウスカーソルを合わせると、ボタンがピョコっと浮き上がります。

今のところの対応サービスは、日本でシェアボタンの主流になっている3サービス(Twitter, Facebook, はてなブックマーク)のみです(というか他のサービスのシェア数の取得方法が分からないだけだったりする)。

他のサービスのシェア数の取得方法とシェアリンクのURL・パラメータの情報を提供頂ければ追加するかもしれません。

## 使用方法

1. 同梱のjsディレクトリとimgディレクトリをサーバーに設置します(jsディレクトリ内の.coffeeファイルは必要ありません)。

2. HTML内でjquery.jsとjquery.popn-socialbutton.jsを読み込みます。

        <script type="text/javascript" src="/path/to/jquery.js"></script>
        <script type="text/javascript" src="/path/to/jquery.popn-socialbutton.js"></script>

3. HTML内にシェアボタンを表示させたい空のエレメントを用意します。

        <div id="social-button"></div>

4. Javascript内で上記エレメントに対して`popnSocialButton()`を実行します。

        $('#social-button').popnSocialButton([ 'twitter', 'facebook', 'hatebu' ]);

## $(_element_).popnSocialButton(services[, options])

* services

    表示させたいシェアボタンのサービス名を配列で指定します。

    配列で指定した順番にシェアボタンを表示します。

    __サービス名一覧__

    * twitter
    * facebook
    * hatebu

* options (省略可能)

    表示をカスタマイズするオプションの連想配列を指定します。

    * url

        シェアするURLです。デフォルトは現在のページのURLです。

    * text

        シェア内容に付加するテキストです。デフォルトは現在のページのタイトルです。

    * imgDir

        シェアボタンの画像があるディレクトリの場所を変更します。デフォルトは`'./img'`です。

    * buttonSpace

        シェアボタンの表示間隔をpx単位で指定します。デフォルトは`12`です。

    * countPos

        シェア数の表示位置を連想配列で指定します(`top` or `bottom` と `left` or `right`の組み合わせ)。デフォルトは`{ top: 32, right: -12 }`です。

    * countSize

        シェア数のフォントサイズを指定します。デフォルトは`10`です。

    * countForeColor

        シェア数の文字色を指定します。デフォルトは`'#ffffff'`です。

    * countBackColor

        シェア数の背景色を指定します。デフォルトは`'#cc0000'`です。

    * countBorderColor

        シェア数の枠色を指定します。デフォルトは`'#ffffff'`です。

    シェア数に関してさらにカスタマイズをしたい場合はCSSで別途指定してください。

            #social-button small {
              border-radius: 0px !important;
              box-shadow: none !important;
              border-width: 1px !important;
            }

    また、具体的な使用例は[example.html](example.html)をご覧ください。

## その他

内部で指定しているCSSのベンダープレフィックスはjQueryに任せています。

jQueryが自動でベンダープレフィックスを追加するようになったのはバージョン1.8からなので、それ以前のjQueryと合わせて使用する場合は利用者側でCSSで指定する必要があるかもしれません。

## 対応ブラウザ

* モダンブラウザ
* IE6以上([IETester](http://my-debugbar.com/wiki/IETester/HomePage)で確認)

ただしIE8以下では丸角や影を使用できないので見た目はあまり良くありません。

## 謝辞

* 各種サービスのシェア数取得に関しては<http://q.hatena.ne.jp/1320898356>を参考にさせて頂きました。

* 各種サービスのアイコンは[ヴォルフロッシュ様のミニ・ソーシャル・アイコン](http://wolfrosch.com/works/webdesign/socialicons)から利用させて頂きました。

## Changelog

### 0.1.0 (2013-04-04)

* 初版リリース

## ライセンス

[MIT license](http://www.opensource.org/licenses/mit-license)で配布します。

&copy; 2013 [ktty1220](mailto:ktty1220@gmail.com)
