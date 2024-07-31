document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    populateCountrySelect(); // Populate the country dropdown

    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();  // Prevent the default form submission
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://127.0.0.1:5000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    document.cookie = `token=${data.access_token}; path=/; Secure; SameSite=Strict`;
                    window.location.href = 'index.html';
                } else {
                    const errorData = await response.json();
                    alert(`Login failed: ${errorData.msg || response.statusText}`);
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    // Check if the user is authenticated and display places
    checkAuthentication();
    
    // Country filter handling
    document.getElementById('country-select').addEventListener('change', (event) => {
        const selectedCountry = event.target.value;
        filterPlacesByCountry(selectedCountry);
    });
});

// Function to get the value of a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Check authentication status and fetch places if authenticated
async function checkAuthentication() {
    const token = getCookie('token');
    const loginLink = document.querySelector('.login-button');

    if (!token) {
        loginLink.style.display = 'block';
    } else {
        loginLink.style.display = 'none';
        await fetchPlaces(token); // Fetch places data if the user is authenticated
    }
}

// Filter places by selected country
document.addEventListener('DOMContentLoaded', () => {
	const select = document.getElementById('country-select');
	const cards = document.querySelectorAll('.apartment-card');

	select.addEventListener('change', () => {
		const selectedCountry = select.value;

		cards.forEach(card => {
			if (selectedCountry === 'all' || card.getAttribute('data-country') === selectedCountry) {
				card.style.display = 'block';
			} else {
				card.style.display = 'none';
			}
		});
	});
});
