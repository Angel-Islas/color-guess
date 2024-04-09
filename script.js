document.addEventListener("DOMContentLoaded", function() {
    const colorDisplay = document.getElementById("colorDisplay");
    const colorPicker = document.getElementById("colorPicker");
    const checkButton = document.getElementById("checkButton");
    const resultDiv = document.getElementById("result");
    const resetButton = document.getElementById("resetButton");

    let targetColor;

    // Función para generar un color aleatorio
    function generateRandomColor() {
        const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        colorDisplay.style.backgroundColor = randomColor;
        targetColor = randomColor;
    }

    // Función para calcular el porcentaje de similitud entre dos colores
    function calculateSimilarity(color1, color2) {
        // Convertir colores a formato RGBA
        const color1RGBA = hexToRGBA(color1);
        const color2RGBA = hexToRGBA(color2);

        // Calcular la diferencia en cada componente de color
        const diffR = Math.abs(color1RGBA.r - color2RGBA.r);
        const diffG = Math.abs(color1RGBA.g - color2RGBA.g);
        const diffB = Math.abs(color1RGBA.b - color2RGBA.b);

        // Calcular el promedio de las diferencias
        const avgDiff = (diffR + diffG + diffB) / 3;

        // Calcular el porcentaje de similitud (100% - promedio de diferencias)
        const similarityPercentage = 100 - (avgDiff / 255) * 100;

        return similarityPercentage.toFixed(2);
    }

    // Función para convertir formato hexadecimal a formato RGBA
    function hexToRGBA(hex) {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return { r, g, b };
    }

    // Evento al hacer clic en el botón "Comprobar"
    checkButton.addEventListener("click", function() {
        const userColor = colorPicker.value;
        const similarityPercentage = calculateSimilarity(targetColor, userColor);
        resultDiv.textContent = `¡Porcentaje de similitud: ${similarityPercentage}%!`;
    });

    // Evento al hacer clic en el botón "Jugar Otra Vez"
    resetButton.addEventListener("click", function() {
        generateRandomColor();
        resultDiv.textContent = "";
    });

    // Generar un color aleatorio al cargar la página
    generateRandomColor();
});
