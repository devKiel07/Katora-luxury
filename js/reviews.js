// reviews.js - Handles customer reviews functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get reviews from local storage or use default reviews if none exist
    const savedReviews = localStorage.getItem('katoraReviews');
    let reviews = savedReviews ? JSON.parse(savedReviews) : [
        {
            name: "Sophie Anderson",
            date: "March 15, 2025",
            rating: 5,
            product: "Diamond Necklace",
            content: "Absolutely stunning piece! The craftsmanship is impeccable, and it arrived in luxurious packaging. Perfect for special occasions."
        },
        {
            name: "James Wilson",
            date: "February 28, 2025",
            rating: 4,
            product: "Black Jacket",
            content: "Great quality material and excellent fit. The attention to detail is impressive. Would definitely recommend to friends."
        },
        {
            name: "Emma Thompson",
            date: "April 2, 2025",
            rating: 5,
            product: "Omega Constellation Watch",
            content: "This watch exceeded my expectations. The elegance and precision are remarkable. Definitely worth the investment!"
        }
    ];

    // Initialize the review form if we're on the write-review page
    if (document.getElementById('reviewForm')) {
        initReviewForm();
    }

    // Display reviews if we're on the homepage
    if (document.getElementById('customer-reviews-container')) {
        displayReviews();
    }

    // Handle the star rating selection
    function initReviewForm() {
        const stars = document.querySelectorAll('#ratingSelect i');
        const ratingInput = document.getElementById('rating');
        const reviewForm = document.getElementById('reviewForm');
        const successMessage = document.getElementById('successMessage');

        // Set up star rating functionality
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                ratingInput.value = rating;
                
                // Reset all stars
                stars.forEach(s => s.classList.remove('active'));
                
                // Highlight selected stars and previous ones
                for (let i = 0; i < rating; i++) {
                    stars[i].classList.add('active');
                }
            });
        });

        // Handle form submission
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const rating = parseInt(document.getElementById('rating').value);
            const product = document.getElementById('productSelect').value;
            const content = document.getElementById('reviewContent').value;
            
            // Validate form
            if (!name || !email || !rating || !product || !content) {
                alert('Please fill out all fields and provide a rating.');
                return;
            }
            
            // Format current date
            const today = new Date();
            const month = today.toLocaleString('default', { month: 'long' });
            const date = `${month} ${today.getDate()}, ${today.getFullYear()}`;
            
            // Create new review object
            const newReview = {
                name,
                date,
                rating,
                product,
                content
            };
            
            // Add to reviews array and save to local storage
            reviews.unshift(newReview); // Add to beginning of array
            localStorage.setItem('katoraReviews', JSON.stringify(reviews));
            
            // Show success message
            successMessage.style.display = 'block';
            
            // Reset form
            reviewForm.reset();
            stars.forEach(s => s.classList.remove('active'));
            ratingInput.value = 0;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        });
    }

    // Display reviews on the homepage
    function displayReviews() {
        const reviewsContainer = document.getElementById('customer-reviews-container');
        if (!reviewsContainer) return;

        // Clear existing content
        reviewsContainer.innerHTML = '';
        
        // Create reviews HTML
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review-card';
            
            // Generate stars HTML
            let starsHTML = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= review.rating) {
                    starsHTML += '<i class="fas fa-star"></i>';
                } else {
                    starsHTML += '<i class="far fa-star"></i>';
                }
            }
            
            reviewElement.innerHTML = `
                <div class="review-header">
                    <div class="reviewer-info">
                        <h4>${review.name}</h4>
                        <p class="review-date">${review.date}</p>
                    </div>
                    <div class="review-rating">
                        ${starsHTML}
                    </div>
                </div>
                <p class="review-product"><strong>Product:</strong> ${review.product}</p>
                <p class="review-content">${review.content}</p>
            `;
            
            reviewsContainer.appendChild(reviewElement);
        });
    }
});