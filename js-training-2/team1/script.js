/**
 * メンバーを抽選する
 * participantList:参加者一覧
 */
function chooseMember() {
  const form = document.form1;
  const participant = form.participant.value;
  const participantList = participant.split('\n');
  let list = removeEmptyStringValueFromArray(participantList);
  form.participant.value = list.join('\n');
  const teamNum = form.team.value;
  let resultList = [];
  const subtitle = document.getElementById('sub_title');
  let participantsNum = list.length;

  subtitle.innerText = "参加者" + participantsNum + "人中、" + teamNum + "チームに分ける";

  if (validation(list, teamNum)) {
    const groupArray = getGroupMembers(teamNum, participantsNum);

    // 指定されたチーム数分だけ for で回す
    for (let i = 0; i < teamNum; i++) {
      let members = [];

      for (let j = 0; j < groupArray[i]; j++ ) {
        /**
         * 乱数の取得に関して、このサイトがわかりやすいです。
         * https://www.sejuku.net/blog/22432
         */

        const chosenIndex = Math.floor(Math.random() * list.length);
        // 当選者を当選者用配列に詰める
        members.push(list[chosenIndex]);
        // 参加者リストから、選んだメンバーを除外する
        list.splice(chosenIndex, 1);
      }
      resultList.push(members);
    }
    output(resultList);
  }
}

/**
 * チームごとの人数の配列を返す
 * @param {Number} teamNum - チーム数
 * @param {Number} total - 合計人数
 * @returns {Array} - チームごとの人数の配列
 */
function getGroupMembers(teamNum, total) {
  let surplus = total % teamNum;
  let teamMembers = Math.floor(total / teamNum);
  let groups = [];

  for (let i = 0; i < teamNum; i++ ) {
    groups.push(teamMembers);
  }
  for (let i = 0; i < surplus; i++ ) {
    groups[i] += 1;
  }
  return groups;
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
 * @param {string[]} resultList 当選者の配列
 */
function output(resultList) {
  let elem = document.getElementById('js-list');
  elem.innerText = '';
  let ol = document.createElement('ol');
  for (let i = 0; i < resultList.length; i++) {
    let li = document.createElement('li');
    li.innerText = resultList[i];
    ol.appendChild(li);
  }
  elem.appendChild(ol);
}

/**
 * バリデーション
 * @param {string[]} list 応募者一覧
 * @param {number} teamNum チーム数
 * @returns {boolean}
 */
function validation(list, teamNum) {
  let alert = document.getElementById('alert');
  alert.innerText = '';
  if (list.length === 0) {
    let li = document.createElement('li');
    li.innerText = '参加者を入力してください';
    alert.appendChild(li);
    return false;
  }

  if (teamNum < 1) {
    let li = document.createElement('li');
    li.innerText = 'チーム数を入力してください';
    alert.appendChild(li);
    return false;
  }

  if (list.length < teamNum) {
    let li = document.createElement('li');
    li.innerText = '適切なグループ数を入力してください';
    alert.appendChild(li);
    return false;
  }
  return true;
}
