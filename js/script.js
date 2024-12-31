// nav bar script
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


// why choose us script
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".stat-number");

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText.replace("+", ""); 
            const increment = target / 100; 

            if (count < target) {
                counter.innerText = `${Math.ceil(count + increment)}+`;
                setTimeout(updateCount, 50); 
            } else {
                counter.innerText = `${target}+`; 
            }
        };

        updateCount();
    });
});

function playVideo(videoUrl) {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
    
    // Set video source
    videoPlayer.src = videoUrl;
    
    // Show modal
    videoModal.show();
    
    // Play video when modal is shown
    document.getElementById('videoModal').addEventListener('shown.bs.modal', function () {
        videoPlayer.play();
    });
    
    // Pause video when modal is closed
    document.getElementById('videoModal').addEventListener('hide.bs.modal', function () {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    });
}