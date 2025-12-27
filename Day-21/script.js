const apiKey = '21522e2f4b5ad1c9e55779e001af7f28';

// Header icon
const headerIcon = lucide.createIcon('cloud-sun');
document.getElementById('header-icon').appendChild(headerIcon);

// Render static icons
lucide.createIcons();

async function getWeatherByLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation not supported');
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            document.getElementById('location').innerText =
                `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').innerText =
                `Temperature: ${data.main.temp}°C`;
            document.getElementById('description').innerText =
                data.weather[0].description;

            const weatherId = data.weather[0].id;
            let iconName = 'sun';

            if (weatherId >= 200 && weatherId < 300) iconName = 'zap';
            else if (weatherId >= 300 && weatherId < 600) iconName = 'cloud-rain';
            else if (weatherId >= 600 && weatherId < 700) iconName = 'cloud-snow';
            else if (weatherId >= 700 && weatherId < 800) iconName = 'cloud-fog';
            else if (weatherId === 800) iconName = 'sun';
            else if (weatherId > 800) iconName = 'cloud';

            const iconContainer = document.getElementById('icon');
            iconContainer.innerHTML = '';

            const weatherIcon = lucide.createIcon(iconName);
            iconContainer.appendChild(weatherIcon);

        } catch (error) {
            alert('Error fetching weather data');
        }
    });
}














