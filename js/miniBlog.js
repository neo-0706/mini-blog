import { Post } from "./post.js";
import { Validator } from "./validator.js";

export class MiniBlog {
    constructor(
        postList,
        form,
        titleInput,
        authorInput,
        contentInput
    ) {
        this.postList = postList;
        this.form = form;
        this.titleInput = titleInput;
        this.authorInput = authorInput;
        this.contentInput = contentInput;

        this.validator = new Validator();

        this.posts = [
            new Post(
                1,
                "test",
                "test title",
                "lorem ipsum",
                Date.now()
            ),
            new Post(
                2,
                "test",
                "another title",
                "lorem ipsum",
                Date.now()
            )
        ];
    }

    init() {
        this.renderPosts();
        this.bindEvents();
    }

    renderPosts() {
        this.postList.innerHTML = "";

        this.posts.forEach(post => this.renderPost(post));
    }

    renderPost(post) {
        const article = document.createElement("article");

        article.className = "post-card";

        article.innerHTML = `
            <div class="post-card__header">
                <div class="post-card__avatar">
                    ${post.author[0]}
                </div>

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
                <button
                    class="btn btn--edit"
                    data-action="edit"
                    data-post-id="${post.id}"
                >
                    ویرایش
                </button>

                <button
                    class="btn btn--delete"
                    data-action="delete"
                    data-post-id="${post.id}"
                >
                    حذف
                </button>
            </div>
        `;

        this.postList.appendChild(article);
    }

    addPost(post) {
        if (!(post instanceof Post)) {
            throw new Error("Invalid Post");
        }

        this.posts.push(post);

        this.renderPosts();
    }

    clearFields() {
        this.titleInput.value = "";
        this.authorInput.value = "";
        this.contentInput.value = "";
    }

    handleSubmit(e) {
        e.preventDefault();

        const title = this.titleInput.value.trim();
        const author = this.authorInput.value.trim();
        const content = this.contentInput.value.trim();

        const validation = this.validateForm(
            title,
            author,
            content
        );

        if (!validation.isValid) {
            alert(validation.message);
            return;
        }

        const post = new Post(
            this.posts.length + 1,
            author,
            title,
            content,
            new Date().toLocaleDateString("fa-IR")
        );

        this.addPost(post);

        this.clearFields();
    }

    bindEvents() {
        this.form.addEventListener(
            "submit",
            this.handleSubmit.bind(this)
        );
    }

    validateForm(title, author, content) {

        const titleValidation = this.validator.validate({
            value: title,
            fieldName: "Title",
            minLength: 5,
            maxLength: 40,
        });

        if (!titleValidation.isValid) {
            return titleValidation;
        }

        const authorValidation = this.validator.validate({
            value: author,
            fieldName: "Author",
            minLength: 3,
            maxLength: 30,
        });

        if (!authorValidation.isValid) {
            return authorValidation;
        }

        const contentValidation = this.validator.validate({
            value: content,
            fieldName: "Content",
            minLength: 15,
            maxLength: 280,
        });

        if (!contentValidation.isValid) {
            return contentValidation;
        }

        return this.validator.success();
    }
}