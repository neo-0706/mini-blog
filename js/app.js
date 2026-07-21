import { MiniBlog } from "./miniBlog.js";
import { FieldError } from "./fieldError.js";
import { Notification } from "./notification.js";

const notification = new Notification(
    document.getElementById("notification-container")
);

const blog = new MiniBlog(
    document.getElementById("posts-list"),
    document.getElementById("post-form"),
    document.getElementById("title-input"),
    document.getElementById("author-input"),
    document.getElementById("content-input"),
    document.getElementById('content-counter'),
    document.getElementById('posts-count'),
    notification,
    new FieldError({
        title: {
            input: document.getElementById("title-input"),
            error: document.querySelector('[data-error="title"]'),
        },

        author: {
            input: document.getElementById("author-input"),
            error: document.querySelector('[data-error="author"]'),
        },

        content: {
            input: document.getElementById("content-input"),
            error: document.querySelector('[data-error="content"]'),
        }
    })
);

blog.init();