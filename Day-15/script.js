const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const resultDiv = document.getElementById("result");

function calculateBMI() {
  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  if (height > 0 && weight > 0) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const roundedBmi = bmi.toFixed(2);

    let status = "";
    if (bmi < 18.5) status = "Underweight";
    else if (bmi < 25) status = "Normal weight";
    else if (bmi < 30) status = "Overweight";
    else status = "Obese";

    resultDiv.innerHTML = `
      Your BMI is: <strong>${roundedBmi}</strong><br />
      Status: <strong>${status}</strong>
    `;
  } else {
    resultDiv.textContent = "";
  }
}

// Calculate BMI on input change
heightInput.addEventListener("input", calculateBMI);
weightInput.addEventListener("input", calculateBMI);

