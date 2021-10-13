import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import User from "flarum/common/models/User";


app.initializers.add('justoverclock/user-country-info', () => {
  extend(CommentPost.prototype, 'oncreate', function () {

    let FindUser = app.store
      .find('users')
      .then((UserList) => {
        this.members = UserList;
        console.log(UserList)
        m.redraw();
      })

    const post = this.attrs.post;
    const postAuthor = post.user().id();
    console.log(postAuthor)
    let user = app.session.user;
    if (User) {
      let giveMeInfo = fetch("https://ipinfo.io/json?token=dd2f6ac5f2e4d0")
        .then((response) => response.json())
        .then((data) => {
          this.ipInfo = data;
          m.redraw();

          const setCountryCode = document.getElementById('countryCode').innerText = 'Country: ';
          const flagImage = 'http://purecatamphetamine.github.io/country-flag-icons/3x2/' + data.country.toUpperCase() + '.svg';
          const couFlag = document.createElement('img');
          couFlag.setAttribute('class', 'countryFlag');
          couFlag.setAttribute('width', '20px');
          couFlag.setAttribute('height', '20px');
          couFlag.src = flagImage;
          document.getElementById('countryCode').appendChild(couFlag);
        })
    }
  })
  extend(CommentPost.prototype, 'headerItems', function (items) {
      items.add(
        "ipinfo",
        <div className="ipinfo" id="countryCode"/>
      )
  })
});
