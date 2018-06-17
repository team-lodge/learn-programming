/**
 * メンバーを抽選する
 */
function chooseMember() {
  const form = document.form1;
  const names = form.names.value;
  const orig_list = names.split(',');
  // 値渡しにする
  let list = orig_list.slice(0, orig_list.length);

  const count = form.num.value;

  let winners = [];

  if (validation(list, count)) {
    // 指定された当選者数分だけ for で回す
    for (let i = 0; i < count; i++) {
      if (i + 1 > orig_list.length) {
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
  }
}

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

/**
 * バリデーション
 * @param list Array 応募者一覧
 * @param count Int 当選者数
 * @returns {boolean}
 */
function validation(list, count) {
  let alert = document.getElementById('alert');
  alert.innerText = '';
  if (JSON.stringify(list) === JSON.stringify([""])) {
    let li = document.createElement('li');
    li.innerText = '応募者を入力してください';
    alert.appendChild(li);

    return false;
  }

  if (count < 1) {
    let li = document.createElement('li');
    li.innerText = '当選者数を入力してください';
    alert.appendChild(li);

    return false;
  }

  return true;
}
