export class Notification {
    constructor(notificationContainer) {
        this.notificationContainer = notificationContainer;
    }

    create(typeClass, title, message) {
        const article = document.createElement("article");

        article.className = `notification ${typeClass}`;

        article.innerHTML = `
        <span class="notification__icon">
            ${this.getIcon(typeClass)}
        </span>

        <div class="notification__content">
            <strong>${title}</strong>
            <p>${message}</p>
        </div>

        <button
            type="button"
            class="notification__close"
            aria-label="بستن اعلان"
        >
            ✕
        </button>
    `;

        const closeButton =
            article.querySelector(".notification__close");

        this.notificationContainer.appendChild(article);

        const timer = setTimeout(() => {
            this.remove(article);
        }, 4000);

        closeButton.addEventListener("click", () => {
            clearTimeout(timer);
            this.remove(article);
        });

        return article;
    }

    success(message) {
        return this.create(
            "notification--success",
            "موفق",
            message
        );
    }

    error(message) {
        return this.create(
            "notification--error",
            "خطا",
            message
        );
    }

    warning(message) {
        return this.create(
            "notification--warning",
            "هشدار",
            message
        );
    }

    info(message) {
        return this.create(
            "notification--info",
            "اطلاع",
            message
        );
    }

    remove(notificationElement) {
        if (notificationElement.classList.contains("hide")) {
            return;
        }

        notificationElement.classList.add("hide");

        notificationElement.addEventListener(
            "animationend",
            () => {
                notificationElement.remove();
            },
            { once: true }
        );
    }

    getIcon(type) {
        const icons = {
            "notification--success": "✓",
            "notification--error": "✖",
            "notification--warning": "⚠",
            "notification--info": "ℹ"
        };

        return icons[type] ?? "•";
    }
}