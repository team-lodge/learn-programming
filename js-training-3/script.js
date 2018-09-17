let form = new Vue({
  el: '#form',
  data: {
    input: '',
    count: 1
  },
  methods: {
    member_list: function () {
      original_list = this.input.split('\n');
      let list = this.removeEmptyStringValueFromArray(original_list);

      const count = this.count;
      let winners = [];
      if (this.validation(list, count)) {
        const group_array = this.getGroupMembers(count, list.length);

        // 指定されたチーム数分だけ for で回す
        for (let i = 0; i < count; i++) {
          let members = [];

          for (let j = 0; j < group_array[i]; j++) {
            /**
             * 乱数の取得に関して、このサイトがわかりやすいです。
             * https://www.sejuku.net/blog/22432
             */
            const chosen_index = Math.floor(Math.random() * list.length);
            // 当選者を当選者用配列に詰める
            members.push(list[chosen_index]);

            // 参加者リストから、選んだメンバーを除外する
            list.splice(chosen_index, 1);
          }

          winners.push(members);
        }
        return this.output(winners);
      }
    },
    /**
     * 配列内にある空文字列の要素を削除する
     * @param {string[]} array - 空文字列を含む配列
     * @returns {string[]} list - 空文字列要素を削除した配列
     */
    removeEmptyStringValueFromArray: function (array) {
      let list = [];

      for (let i = 0, l = array.length; i < l; i++) {
        if (array[i] !== '' ) {
          list.push(array[i]);
        }
      }

      return list;
    },
    /**
     * バリデーション
     * @param {string[]} list 応募者一覧
     * @param {number} count 当選者数
     * @returns {boolean}
     */
    validation: function (list, count) {
      let notifications = document.getElementById('notifications');
      notifications.innerText = '';
      if (list.length === 0) {
        let li = document.createElement('li');
        li.innerText = '応募者を入力してください';
        notifications.appendChild(li);

        return false;
      }

      if (count < 1) {
        let li = document.createElement('li');
        li.innerText = '当選者数を入力してください';
        notifications.appendChild(li);

        return false;
      }

      if (list.length < count) {
        let li = document.createElement('li');
        li.innerText = '適切なグループ数を入力してください';
        notifications.appendChild(li);

        return false;
      }

      return true;
    },
    /**
     * チームごとの人数の配列を返す
     * @param {Number} group_num - チーム数
     * @param {Number} total - 合計人数
     * @returns {Array} - チームごとの人数の配列
     */
    getGroupMembers: function (group_num, total) {
      let surplus = total % group_num;
      let group_members = Math.floor(total / group_num);
      let groups = [];

      for (let i = 0; i < group_num; i++ ) {
        groups.push(group_members);

      }
      for (let i = 0; i < surplus; i++ ) {
        groups[i] += 1;
      }

      return groups;
    },
    /**
     * HTML タグを生成して出力する
     * @param {string[]} winners 当選者の配列
     */
    output: function (winners) {
      let elem = document.getElementById('js-list');
      elem.innerText = '';

      let ol = document.createElement('ol');
      for(let i = 0; i < winners.length; i++) {
        let li = document.createElement('li');
        li.innerText = winners[i];
        ol.appendChild(li);
      }

      elem.appendChild(ol);
    }
  }
})