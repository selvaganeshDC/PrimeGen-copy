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

// Our Department Section
$(document).ready(function(){
    $('#departmentSlider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});

// slick slider for Specialists section
$(document).ready(function(){
    $('#specialistsSlider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
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

