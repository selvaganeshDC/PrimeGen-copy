
// Package data
const packagesData = {
    "packages": [
        {
            "id": "Thyroid Profile",
            "name": "Thyroid Profile",
            "price": 250,
            "description": "Complete thyroid function test",
            "duration": "24 hours"
        },
        {
            "id": "Lipid Profile",
            "name": "Lipid Profile",
            "price": 800,
            "description": "Comprehensive lipid panel test",
            "duration": "12 hours"
        },
        {
            "id": "Preliminary Health Checkup",
            "name": "Preliminary Health Checkup",
            "price": 2000,
            "description": "Basic health screening",
            "duration": "48 hours"
        },
        {
            "id": "Liver Function Test",
            "name": "Liver Function Test",
            "price": 2000,
            "description": "Basic health screening",
            "duration": "48 hours"
        }, {
            "id": "Liver Function Test",
            "name": "Liver Function Test",
            "price": 2000,
            "description": "Basic health screening",
            "duration": "48 hours"
        },
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const packageSelect = document.getElementById('packageSelect');
    const selectedPackagesContainer = document.getElementById('selectedPackages');
    const addressForm = document.getElementById('addressForm');
    const locationBtn = document.querySelector('.btn-location');
    let selectedPackages = new Set();

    // Populate dropdown from packagesData
    function initializePackages() {
        packageSelect.innerHTML = '<option value="" selected disabled>Choose a package</option>';
        packagesData.packages.forEach(package => {
            packageSelect.innerHTML += `
                <option value="${package.id}">${package.name} - ₹${package.price}</option>
            `;
        });
    }

    // Initialize packages
    initializePackages();

    // Package selection handler
    packageSelect.addEventListener('change', function () {
        const selectedValue = this.value;
        if (selectedValue && !selectedPackages.has(selectedValue)) {
            selectedPackages.add(selectedValue);
            updateSelectedPackages();
        }
        this.selectedIndex = 0; // Reset select to default option
    });

    // Update selected packages display
    function updateSelectedPackages() {
        if (selectedPackages.size === 0) {
            selectedPackagesContainer.innerHTML = '<div class="text-muted text-center py-2">No packages selected</div>';
            return;
        }

        let packagesHTML = '';
        let totalPrice = 0;

        selectedPackages.forEach(packageId => {
            const package = packagesData.packages.find(p => p.id === packageId);
            totalPrice += package.price;
            packagesHTML += `
                <div class="package-item">
                    <span class="package-name">${package.name}</span>
                    <div>
                        <span class="package-price me-3">₹${package.price}</span>
                        <button type="button" class="remove-package" data-package="${packageId}">×</button>
                    </div>
                </div>
            `;
        });

        packagesHTML += `
            <div class="total-price">
                Total: ₹${totalPrice}
            </div>
        `;

        selectedPackagesContainer.innerHTML = packagesHTML;

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-package').forEach(button => {
            button.addEventListener('click', function () {
                const packageId = this.getAttribute('data-package');
                selectedPackages.delete(packageId);
                updateSelectedPackages();
            });
        });
    }

    // Form submission handler
    addressForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        // Append selected packages as a JSON string
        formData.append("packages", JSON.stringify(Array.from(selectedPackages)));

        try {
            const response = await fetch(form.action, {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  body: new URLSearchParams(formData),
                // body : formData
            });
            // console.log(response);
            const result = await response.json();
            
            if (result.response.status === "success") {
                alert("Booking submitted successfully!");
                form.reset();
                selectedPackages.clear(); // Reset selected packages
                updateSelectedPackages(); // Clear the displayed packages
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("Failed to submit the booking.");
        }
    });

    // Location functionality
    if (locationBtn) {
        locationBtn.addEventListener('click', function (e) {
            e.preventDefault();
            getLocation();
        });
    }

    function getLocation() {
        if (navigator.geolocation) {
            locationBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v8M8 12h8"/>
                </svg>
                Getting location...
            `;

            navigator.geolocation.getCurrentPosition(
                position => reverseGeocode(position.coords.latitude, position.coords.longitude),
                error => handleLocationError(error)
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function reverseGeocode(latitude, longitude) {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'YourAppName'
            }
        })
            .then(response => response.json())
            .then(data => {
                fillAddressForm(data.address);
                resetLocationButton();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to get address details. Please enter manually.');
                resetLocationButton();
            });
    }

    function fillAddressForm(address) {
        if (address.road) document.getElementById('street').value = address.road;
        if (address.suburb) document.getElementById('area').value = address.suburb;
        if (address.city) document.getElementById('city').value = address.city;
        if (address.postcode) document.getElementById('pincode').value = address.postcode;
        if (address.amenity) document.getElementById('landmark').value = address.amenity;
    }

    function handleLocationError(error) {
        let message;
        switch (error.code) {
            case error.PERMISSION_DENIED:
                message = "Location permission denied. Please enable location access.";
                break;
            case error.POSITION_UNAVAILABLE:
                message = "Location information unavailable.";
                break;
            case error.TIMEOUT:
                message = "Location request timed out.";
                break;
            default:
                message = "An unknown error occurred.";
        }
        alert(message);
        resetLocationButton();
    }

    function resetLocationButton() {
        locationBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v8M8 12h8"/>
            </svg>
            Pick current location
        `;
    }
});
