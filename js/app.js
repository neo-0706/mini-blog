import { MiniBlog } from "./miniBlog.js";

const postList = document.getElementById('posts-list');
const publishBtn = document.getElementById('publish-btn');
const form = document.getElementById('post-form')
const title = document.getElementById('title-input');
const author = document.getElementById('author-input');
const content = document.getElementById('content-input');

const blog = new MiniBlog(postList, form, title, author, content);

blog.init();


