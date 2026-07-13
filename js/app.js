import { MiniBlog } from "./miniBlog.js";

const postList = document.getElementById('posts-list');
const publishBtn = document.getElementById('publish-btn');

const blog = new MiniBlog(postList);

blog.renderPosts(blog.posts);