$(function(){

// イベント設定ゾーン


    // カードの上にカーソルがきたらボーダーで囲む
    $('.card-box').on('mouseover',function(){
      $(this).addClass('mouseover')
    });

    // カードの上にあったカーソルが離れたらボーダーを消す
    $('.card-box').on('mouseout',function(){
      $(this).removeClass('mouseover')
    });

    // モーダルウィンドウ部分の「Close」ボタンをクリック時に、fadeOutメソッドでHTML要素を非表示にする
    $('#close').on('click', function() {
      $('#overlay, #modalWindow').fadeOut();
    });

    // カードがクリックされた際の動きの設定。長い。
    var n = 0; // nはカードクリックが奇数回目か偶数回目か判断するための変数
    var okPair = 0; // okPairはそろえた組が何組あるかカウントする変数
    $('.card-box').on('click',function(){
      n += 1;
      // n（クリック回数）が奇数なら,裏面('uraクラス')をけして,振られた番号を表示.
      // 表示された番号を取得し,空の配列に入れる。
      if(n % 2 != 0){
        $(this).removeClass('ura').addClass('show');
        $(this).children('p').css('visibility', 'visible');
        numbers = [];
        tempNum = $(this).text();
        numbers.push(tempNum);
      }else{
        // n(クリック回数)が偶数なら,奇数回と同様の処理をした後,
        // 表示されてる二枚の番号が同じかどうかで処理を分岐
        $('.card-box').addClass('click-cancel');
        $(this).removeClass('ura').addClass('show');
        $(this).children('p').css('visibility', 'visible');
        tempNum = $(this).text();
        numbers.push(tempNum);

        if(numbers[0] != numbers[1]){
          setTimeout(function(){
            $('.card-box').removeClass('click-cancel');
            $('.show').children('p').css('visibility', 'hidden');
            $('.show').addClass('ura').removeClass('show');
          },1000);
        }else{
          setTimeout(function(){
            $('.card-box').removeClass('click-cancel');
            $('.show').css('visibility','hidden');
            $('.show').children('p').css('visibility','hidden');
            okPair += 1;

            if(okPair === 5){
              console.log('OK');
              setTimeout(function(){
                $('#overlay, #modalWindow').fadeIn();
              },500);
            }
          },1000);
        }

      // 気づいたこと!!
        // if文とかの中に書いた処理は後回しで実行されるっぽい？(rubyと違うかも？)
        // 例えばif文の中で変数 n を動した場合、
        // if文の後にconsole.log(n)を書いても、if文処理前のnの値が出力される。

      // 改善点！！
        // toggleClassを使えばaddClassとか書いてるとこ減らせそう
        // fadeIn,Outを使えばjsでvisibilityいじらなくてもよさそう
        // 偶数回目のクリック押されたたらcard-boxクラスにclicl-cancelクラスを一時的に与えるようにしたが
        // サーバーのラグとかで偶数回目と奇数回目のクリック同時に届いたりすると三枚とか一気に消える気がする
        // そこまで考えたほうがいいのか？
      }
    })


// 以下はページ起動時に実行される処理（一回のみ実行）


    // カードの枚数に合わせたペアの数字をランダムに並べた配列をつくって、
    // カードのそれぞれに番号をふる
    arr = makeArr();
    $('.card-box').each(function(index){
      $(this).html(`<p>${arr[index]}</p>`)
    })
  
    // モーダルウィンドウを中央配置するための初期値を設定する
    locateCenter();
    // ウィンドウのリサイズに合わせて、モーダルウィンドウの配置を変える
    $(window).resize(locateCenter);


// 以下は関数ゾーン


      // モーダルウィンドウをオーバーレイの中央に配置するための配置場所を計算する関数
    　   // オーバレイとは、HTML要素の上に表示する層。(今回は周りを灰色してるのがオーバレイ部分。)
  　     // モーダルウィンドウとは、親windowから子windowを表示する（今回は「clear!」と「homeへ」を表示してる部分）
      function locateCenter() {
        let w = $(window).width();
        let h = $(window).height();
        let cw = $('#modalWindow').outerWidth();
        let ch = $('#modalWindow').outerHeight();

        $('#modalWindow').css({
          'left': ((w - cw) / 2) + 'px',
          'top': ((h - ch) / 2) + 'px'
        });
      }

    // カードの表部分の数字をランダムに決めるための関数
    // この関数でカード枚数にあわせた数字のペアの配列をつくる。
    function makeArr() {
      // とりあえず今回はカード１０枚なので１～５の数字を
      // 二つずつ配列arrにいれてく
      var arr = [];
      for (var i = 1; i <= 5; i++){
        arr.push(i);
        arr.push(i);
      }

      // 配列arr内の要素のシャッフル
      // ランダムなインデックス番号(変数rand)と
      // 0~9までのインデックス番号を選んで入れ替える
      for (var i = arr.length - 1; i >= 0; i--){
        var rand = Math.floor(Math.random() * (i + 1));
        [arr[i],arr[rand]] = [arr[rand],arr[i]]
      }
    console.log(arr)
    return arr
    }

});
