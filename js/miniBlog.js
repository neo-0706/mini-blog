import { Post } from "./post.js";
import { Validator } from "./validator.js";
export class MiniBlog {
    constructor(
        postList,
        form,
        titleInput,
        authorInput,
        contentInput,
        characterCounter,
        postsCount,
        submitButton,
        cancelEditButton,
        notification,
        fieldError
    ) {
        this.postList = postList;
        this.form = form;

        this.titleInput = titleInput;
        this.authorInput = authorInput;
        this.contentInput = contentInput;

        this.notification = notification;

        this.characterCounter = characterCounter;

        this.postsCount = postsCount;

        this.fieldError = fieldError;

        this.editingPostId = null;

        this.submitButton = submitButton;

        this.cancelEditButton = cancelEditButton;

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
        this.updatePostsCount();
        this.updateCharacterCounter();
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

        this.refreshUI();
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

        if (this.editingPostId !== null) {
            this.updatePost(
                this.editingPostId,
                formData
            );
        } else {
            const post = new Post(
                this.posts.length + 1,
                formData.author,
                formData.title,
                formData.content,
                new Date().toLocaleDateString("fa-IR")
            );

            this.addPost(post);
            this.setCreateMode();
            this.clearFields();

            this.notification.success("پست با موفقیت ایجاد شد.");
        }

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
        });

        this.contentInput.addEventListener("input", () => {
            this.updateCharacterCounter();
        });

        this.postList.addEventListener(
            'click',
            this.handlePostActions.bind(this)
        )

        this.cancelEditButton.addEventListener("click", () => {
            this.editingPostId = null;
            this.clearFields();
            this.updateCharacterCounter();
            this.setCreateMode();
            this.notification.info("ویرایش لغو شد.");
        });
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

    updateCharacterCounter() {
        const text = this.contentInput.value;
        const lengthText = text.length;
        this.characterCounter.textContent = `${lengthText} / 280`;
        this.characterCounter.classList.remove("warning", "error");
        if (lengthText >= 280) {
            this.characterCounter.classList.add('error');
        } else if (lengthText >= 224) {
            this.characterCounter.classList.add('warning');
        }
    }

    updatePostsCount() {
        const numberOfPosts = this.posts.length;
        this.postsCount.textContent = `(${numberOfPosts})`;
    }

    deletePost(id) {
        this.posts = this.posts.filter(post => post.id !== id);

        this.refreshUI();
    }

    refreshUI() {
        this.renderPosts();
        this.updatePostsCount();
        this.updateCharacterCounter();
    }

    handlePostActions(e) {
        const button = e.target.closest("button");

        if (!button) return;

        const action = button.dataset.action;
        const postId = Number(button.dataset.postId);

        if (action === "delete") {
            this.deletePost(postId);
            this.notification.success("پست با موفقیت حذف شد.");
        }

        if (action === "edit") {
            this.editPost(postId);
        }
    }

    editPost(id) {
        const post = this.posts.find(post => post.id === id);

        this.authorInput.value = post.author;
        this.titleInput.value = post.title;
        this.contentInput.value = post.content;
        this.notification.info("اطلاعات پست برای تغییر در فیلد ها قرار داده شد!");

        this.editingPostId = post.id;

        this.setEditMode();
    }

    updatePost(id, formData) {
        const post = this.posts.find(post => post.id === id);
        post.author = formData.author;
        post.title = formData.title;
        post.content = formData.content;

        this.refreshUI();
        this.notification.success('پست با موفقیت تغییر کرد');
        this.editingPostId = null;

        this.clearFields();
        this.updateCharacterCounter();

        this.setCreateMode();
    }

    setEditMode() {
        this.submitButton.textContent = "ذخیره تغییرات";
        this.cancelEditButton.classList.remove("hidden");
    }

    setCreateMode() {
        this.submitButton.textContent = "انتشار پست";
        this.cancelEditButton.classList.add('hidden');
    }
}