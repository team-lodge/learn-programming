/**
 * メンバーを抽選する
 */
function chooseMember() {
  const form = document.form1;
  const names = form.names.value;
  const orig_list = names.split(',');
  const base_list = removeEmptyStringValueFromArray(orig_list);
  // 値渡しにする
  let list = base_list.slice(0, base_list.length);

  // フォーム内の不要なカンマを削除する
  form.names.value = list.join(',');
  const count = form.num.value;
  let winners = [];

  if (validation(list, count)) {
    // 指定された当選者数分だけ for で回す
    for (let i = 0; i < count; i++) {
      if (i + 1 > base_list.length) {
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
 * 配列内にある空文字列の要素を削除する
 * @param {string[]} array - 空文字列を含む配列
 * @returns {string[]} list - 空文字列要素を削除した配列
 */
function removeEmptyStringValueFromArray(array) {
  let list = [];

  for (let i = 0, l = array.length; i < l; i++) {
    if (array[i] !== '' ) {
      list.push(array[i]);
    }
  }

  return list;
}

/**
 * HTML タグを生成して出力する
 * @param {string[]} winners 当選者の配列
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
 * @param {string[]} list 応募者一覧
 * @param {number} count 当選者数
 * @returns {boolean}
 */
function validation(list, count) {
  let alert = document.getElementById('alert');
  alert.innerText = '';
  if (list.length === 0) {
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
