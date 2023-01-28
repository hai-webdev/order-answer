import "./index.less";
import data from "./data.json";
class Subject {
  constructor(dom, eventDom) {
    this.dom = $(dom);
    this.render();
    this.eventDom = $(eventDom);
    this.event();
  }
  // 生成题目
  render() {
    this.dom.html("");
    const subjectData = data.subject;
    for (const item of subjectData) {
      const listBox = $(`<div class='subject-list'>`);
      const title = $(`<h2 class="title">${item.title}</h2>`);
      const ul = $("<ul class='subject-select'>");
      if (item.option) {
        for (const subItem of item.option) {
          const list = $(
            `<li class="subject-option" data-id="${item.id}" data-index="${subItem.id}">${subItem.title}</li>`
          );
          ul.append(list);
        }
      }
      listBox.append(title).append(ul);
      this.dom.append(listBox);
    }
  }
  changeSubject(dom, index) {
    const len = $(dom).length;
    if (len === index + 1) {
      // 生成联系方式
      renderContactView("ul.contact-wrapper");
      $(".subject").fadeOut();
      $(".contact-wrapper").fadeIn().css("display", "flex");
      return false;
    }
    $(dom).eq(index).slideUp();
    $(dom)
      .eq(index + 1)
      .slideDown();
  }
  event() {
    const _this = this;
    this.eventDom.on("click", function () {
      const index = $(this).attr("data-id");
      const text = $(this).text();
      const id = Number($(this).attr("data-index"));
      const subject = data.subject[index];
      const res = subject.option;
      for (let i = 0; i < res.length; i++) {
        const el = res[i];
        console.log(text, el.title);
        if (id === subject.correct) {
          $(this).addClass("success");
          setTimeout(() => {
            _this.changeSubject(".subject-list", subject.id);
          }, 500);
          return false;
        } else {
          $(this).addClass("error");
          return false;
        }
      }
    });
  }
  // 切换题目
}

// 同意协议
agree(".agree span");
// 生成题目

new Subject(".subject-content", ".subject-option");

// 切换到题目
$("button.agree").on("click", function () {
  $("section.notice-container").fadeOut();
  $("section.subject").fadeIn().css("display", "flex");
});

// 
/**
 *
 * @param {String} dom Jquery元素
 */
function agree(dom) {
  let time = $(dom).text().replace(/\D/g, "");
  let times = setInterval(() => {
    time--;
    $(dom).text(`(${time}s)`);
    if (!time) {
      $(dom).parent().prop("disabled", false);
      clearInterval(times);
      $(dom).remove();
    }
  }, 1000);
}

/**
 * 生成联系方式
 * @param {String} dom jquery元素
 */
function renderContactView(dom) {
  const items = data.contactInfo;
  for (const item of items) {
    const li = `
        <li class="contact-item">
            <span class="contact-title">${item.title}:</span>
            <span class="contact-info">${item.info}</span>
        </li>
        `;
    $(dom).append(li);
  }
}

function openQQ(qq){
  var pc = `tencent://message/?uin=${qq}&Site=http://vps.shuidazhe.com&Menu=yes`;
  var phone = `mqqwpa://im/chat?chat_type=wpa&uin=${qq}&version=1&src_type=web&web_src=oicqzone.com`
    if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
      location.href = phone;
  }else{
    location.href = pc;
  }
}

$(".click").on("click", function(){
  openQQ(2745947856)
})