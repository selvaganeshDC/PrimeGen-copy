// nav bar script
document.getElementById('mobileMenuBtn').addEventListener('click', function () {
    document.querySelector('.mobile-menu').classList.add('active');
    document.querySelector('.mobile-overlay').style.display = 'block';
});

document.getElementById('closeMenu').addEventListener('click', function () {
    document.querySelector('.mobile-menu').classList.remove('active');
    document.querySelector('.mobile-overlay').style.display = 'none';
});

document.querySelector('.mobile-overlay').addEventListener('click', function () {
    document.querySelector('.mobile-menu').classList.remove('active');
    this.style.display = 'none';
});

// Our Department Section
$(document).ready(function () {
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
$(document).ready(function () {
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

/* Packages test section  */
document.querySelectorAll('.btn-link').forEach(button => {
    button.addEventListener('click', function () {
        const indicator = this.querySelector('.collapse-indicator svg');
        if (this.classList.contains('collapsed')) {
            indicator.style.transform = 'rotate(-90deg)';
        } else {
            indicator.style.transform = 'rotate(0deg)';
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll("#testPackages .card");
    const viewMoreBtn = document.getElementById("view-more-btn");

    const cardsToShow = 6; // Number of cards to show initially
    let showingAll = false;

    // Initially show the first 6 cards
    cards.forEach((card, index) => {
        if (index < cardsToShow) {
            card.classList.add("visible");
        }
    });

    // Handle "View More" button click
    viewMoreBtn.addEventListener("click", () => {
        showingAll = !showingAll;

        if (showingAll) {
            cards.forEach((card) => card.classList.add("visible"));
            viewMoreBtn.textContent = "View Less";
        } else {
            cards.forEach((card, index) => {
                if (index >= cardsToShow) {
                    card.classList.remove("visible");
                }
            });
            viewMoreBtn.textContent = "View More";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const cards = document.querySelectorAll("#testPackages .card");
    const noResults = document.getElementById("no-results");

    searchInput.addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase();
        let matches = 0;

        cards.forEach((card) => {
            const testName = card.getAttribute("data-test-name");
            if (testName && testName.toLowerCase().includes(query)) {
                card.classList.remove("hidden");
                matches++;
            } else {
                card.classList.add("hidden");
            }
        });

        // Toggle "No results found" message
        if (matches === 0) {
            noResults.classList.remove("hidden");
        } else {
            noResults.classList.add("hidden");
        }
    });
});

document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: formData,
        });

        const result = await response.json();
        if (result.status === "success") {
            alert("Email sent successfully!");
            form.reset();
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        alert("Failed to send email.");
    }
});
