import { Post } from "./post.js";

export class MiniBlog {
    constructor(postList) {
        this.postList = postList;

        this.posts = [
            new Post (
                1,
                'test',
                'test title',
                'lorem ipsum',
                Date.now(),
            ),
            new Post (
                1,
                'test',
                'test title',
                'lorem ipsum',
                Date.now(),
            )
        ];
    }


    renderPost(post) {
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

        this.postList.appendChild(article);
    }

    renderPosts(posts) {
        this.postList.innerHTML = "";

        posts.forEach(post => this.renderPost(post));
    }

    addPost(post) {
        if (!(post instanceof Post)) {
            throw new Error("Invalid Post");
        }
        this.posts.push(post);
        this.renderPosts(this.posts);
    }
}