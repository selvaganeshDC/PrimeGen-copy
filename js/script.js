document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    document.querySelector('.mobile-menu').classList.add('active');
    document.querySelector('.mobile-overlay').style.display = 'block';
});

document.getElementById('closeMenu').addEventListener('click', function() {
    document.querySelector('.mobile-menu').classList.remove('active');
    document.querySelector('.mobile-overlay').style.display = 'none';
});

document.querySelector('.mobile-overlay').addEventListener('click', function() {
    document.querySelector('.mobile-menu').classList.remove('active');
    this.style.display = 'none';
});