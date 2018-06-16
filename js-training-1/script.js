window.onload = function () {
  const submit_button = document.getElementById('submit');

  /**
   * フォーム内のボタンをイベントリスナーに登録し、クリックを監視
   */
  submit_button.addEventListener('click', function () {
    const form = document.form1;
    const names = form.names.value;
    const orig_list = names.split(',');
    let list = orig_list;

    const count = form.num.value;
    let winners = [];

    if (names == "") {
      let alert = document.getElementById('alert');
      let li = document.createElement('li');
      li.innerText = "応募者を入力してください。"
      alert.appendChild(li)
    }

    if (count == 0) {
      let alert = document.getElementById('alert');
      let li = document.createElement('li');
      li.innerText = "当選者数を入力してください。"
      alert.appendChild(li)
    }

    // 指定された当選者数分だけ for で回す
    for (let i = 0; i < count; i++) {
      if (i > orig_list) {
        break;
      }
      /**
       * 乱数の取得に関して、このサイトがわかりやすいです。
       * https://www.sejuku.net/blog/22432
       */
      const chosen_index = Math.floor(Math.random() * list.length);
      // 当選者を当選者用配列に詰める
      winners.push(list[chosen_index]);

      // 応募者リストから、当選したメンバーを除外する
      list.splice(chosen_index, 1);
    }
    output(winners);
  });
};

/**
 * HTML タグを生成して出力する
 * @param winners array 当選者の配列
 */
function output(winners) {
  let elem = document.getElementById('js-list');
  elem.innerText = '';

  let ul = document.createElement('ul');
  for(let i = 0; i < winners.length; i++) {
    let li = document.createElement('li');
    li.innerText = winners[i];
    ul.appendChild(li);
  }

  elem.appendChild(ul);
}
