const formateRelative = (createdAt) => {
    const time = new Date(createdAt);
    const now = new Date();
    const diff = (now.getTime() - time.getTime()) / 1000;

    if (diff < 60) {
        return "just now";
    }
    if (diff < 3600) {
        return Math.floor(diff / 60) + " minutes ago"
    }
    if (diff < 86400) {
        return Math.floor(diff / 3600) + " hours ago"
    }
    if (diff < 604800) {
        return Math.floor(diff / 86400) + " days ago"
    }
    if (diff < 31536000) {
        return Math.floor(diff / 604800) + " mounths ago"
    }
    if (diff < 315360000) {
        return Math.floor(diff / 31536000) + " years ago"
    }

    return time.toLocaleString();
}


export {formateRelative}
