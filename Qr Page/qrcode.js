function copyLink() {
    const linkInput = document.querySelector('.link-box input');
    linkInput.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
}
