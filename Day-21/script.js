const apiKey = '21522e2f4b5ad1c9e55779e001af7f28';

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
                `${data.main.temp}°C`;

            // Weather description as ICON only
            const weatherId = data.weather[0].id;
            let iconName = 'sun';

            if (weatherId >= 200 && weatherId < 300) iconName = 'zap';            // Thunderstorm
            else if (weatherId >= 300 && weatherId < 600) iconName = 'cloud-rain'; // Rain
            else if (weatherId >= 600 && weatherId < 700) iconName = 'cloud-snow'; // Snow
            else if (weatherId >= 700 && weatherId < 800) iconName = 'cloud-fog';  // Fog
            else if (weatherId === 800) iconName = 'sun';                          // Clear
            else if (weatherId > 800) iconName = 'cloud';                          // Cloudy

            const iconContainer = document.getElementById('icon');
            iconContainer.innerHTML = '';

            const icon = lucide.createIcon(iconName);
            iconContainer.appendChild(icon);

        } catch (error) {
            alert('Error fetching weather');
        }
    });
}















