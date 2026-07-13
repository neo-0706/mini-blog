const postList = document.getElementById('posts-list');

const posts = [
  {
    id: 1,
    author: "رها احمدی",
    title: "شروع یک عادت جدید",
    content: "...",
    date: "۱۴ تیر ۱۴۰۴"
  },
  {
    id: 2,
    author: "آرمان کریمی",
    title: "طراحی مینیمال",
    content: "...",
    date: "۱۲ تیر ۱۴۰۴"
  }
];

function renderPost(post) {
  const article = document.createElement('article');
  article.className = 'post-card';

  article.innerHTML = `<div class="post-card__header">
            <div class="post-card__avatar" aria-hidden="true">${post.author[0]}</div>
            <div class="post-card__meta">
              <h3 class="post-card__author">${post.author}</h3>
              <span class="post-card__date">${post.date}</span>
            </div>
          </div>

          <h4 class="post-card__title">${post.title}</h4>
          <p class="post-card__excerpt">
            ${post.content}
          </p>

          <div class="post-card__actions">
            <button type="button" class="btn btn--edit" data-action="edit" data-post-id="${post.id}">
              <span class="btn__label">ویرایش</span>
            </button>
            <button type="button" class="btn btn--delete" data-action="delete" data-post-id="${post.id}">
              <span class="btn__label">حذف</span>
            </button>
          </div>`

  postList.appendChild(article);
}

function renderPosts(posts) {
  postList.innerHTML = "";

  posts.forEach(renderPost);
}

renderPosts(posts);