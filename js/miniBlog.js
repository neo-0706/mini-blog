import { Post } from "./post.js";
import { Validator } from "./validator.js";

export class MiniBlog {
    constructor(
        postList,
        form,
        titleInput,
        authorInput,
        contentInput,
        fieldError
    ) {
        this.postList = postList;
        this.form = form;

        this.titleInput = titleInput;
        this.authorInput = authorInput;
        this.contentInput = contentInput;

        this.fieldError = fieldError;

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

        this.fields = [
            {
                input: this.titleInput,
                field: "title",
                min: 5,
                max: 40
            },

            {
                input: this.authorInput,
                field: "author",
                min: 3,
                max: 30
            },

            {
                input: this.contentInput,
                field: "content",
                min: 10,
                max: 280
            }
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

        // پاک کردن خطاهای قبلی
        this.fieldError.clearAll();

        const formData = {
            title: this.titleInput.value.trim(),
            author: this.authorInput.value.trim(),
            content: this.contentInput.value.trim(),
        };

        const validation = this.validateForm(formData);

        if (!validation.isValid) {
            this.fieldError.show(
                validation.field,
                validation.message
            );

            return;
        }

        const post = new Post(
            this.posts.length + 1,
            formData.author,
            formData.title,
            formData.content,
            new Date().toLocaleDateString("fa-IR")
        );

        this.addPost(post);

        this.clearFields();

        // this.showSuccess();
    }

    bindEvents() {
        this.form.addEventListener(
            "submit",
            this.handleSubmit.bind(this)
        );

        this.fields.forEach(field => {
            field.input.addEventListener(
                "input",
                () => {
                    this.validateField(
                        field.input,
                        field.field,
                        field.min,
                        field.max
                    )
                }
            )
        })
    }

    validateForm(formData) {

        const authorValidation = this.validator.validate({
            value: formData.author,
            fieldName: "Author",
            minLength: 3,
            maxLength: 30,
        });

        if (!authorValidation.isValid) {
            return {
                ...authorValidation,
                field: "author",
            };
        }

        const titleValidation = this.validator.validate({
            value: formData.title,
            fieldName: "Title",
            minLength: 5,
            maxLength: 40,
        });

        if (!titleValidation.isValid) {
            return {
                ...titleValidation,
                field: "title",
            };
        }

        const contentValidation = this.validator.validate({
            value: formData.content,
            fieldName: "Content",
            minLength: 10,
            maxLength: 280,
        });

        if (!contentValidation.isValid) {
            return {
                ...contentValidation,
                field: "content",
            };
        }

        return this.validator.success();
    }

    validateField(input, fieldName, minLength, maxLength) {
        const value = input.value.trim();
        const result = this.validator.validate({
            value: value,
            fieldName: fieldName,
            minLength: minLength,
            maxLength: maxLength,
        });

        if (result.isValid) {
            this.fieldError.clear(fieldName);
        } else {
            this.fieldError.show(fieldName, result.message);
        }
    }
}