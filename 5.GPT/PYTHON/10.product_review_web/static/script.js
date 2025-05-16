    document.getElementById('reviewForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const reviewData = {
        rating: formData.get('rating'),
        review: formData.get('review')
      };

      try {
        const response = await fetch('/api/review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reviewData)
        });

        if (response.ok) {
          loadReviews();
          e.target.reset();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });

document.getElementById('aiSummaryBtn').addEventListener('click', async () => {
      try {
    const response = await fetch('/api/aisummary');
    const summary = await response.json();
    document.getElementById('aiSummary').textContent = summary.text;
      } catch (error) {
        console.error('Error:', error);
      }
});

async function loadReviews() {
const loadReviews = async () => {
  try {
    const response = await fetch('/api/review');
    const reviews = await response.json();

    const container = document.getElementById('reviewContainer');
    container.innerHTML = reviews.map(review => `
      <div class="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition duration-300">
        <div class="flex items-center justify-between mb-4">
          <div class="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full">
            평점: ${review.ratings}점 (${new Date(review.created_at).toLocaleString()})
          </div>
        </div>
        <div class="text-gray-700 text-base mb-2">
          ${review.review}
        </div>
      </div>
    `).join('');
    const reviews = await fetchReviews();
    renderReviews(reviews);
  } catch (error) {
    console.error('Error:', error);
    }
}

};

const fetchReviews = async () => {
  const response = await fetch('/api/review');
  return await response.json();
};

const deleteReview = async (reviewId) => {
  try {
    const response = await fetch(`/api/review/${reviewId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
    loadReviews();
    }
  } catch (error) {
    console.error('Error deleting review:', error);
  }
};

const renderReviews = (reviews) => {
  const container = document.getElementById('reviewContainer');
  container.innerHTML = reviews.map(review => `
    <div class="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition duration-300">
      <div class="flex items-center justify-between mb-4">
        <div class="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full">
          평점: ${review.ratings}점 (${new Date(review.created_at).toLocaleString()})
        </div>
        <button
          onclick="deleteReview('${review.id}')"
          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
        >
          삭제
        </button>
      </div>
      <div class="text-gray-700 text-base mb-2">
        ${review.review}
      </div>
    </div>
  `).join('');
};

loadReviews();
}

};

const fetchReviews = async () => {
  const response = await fetch('/api/review');
  return await response.json();
};

const deleteReview = async (reviewId) => {
  try {
    const response = await fetch(`/api/review/${reviewId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
    loadReviews();
