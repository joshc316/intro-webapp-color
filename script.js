$(document).ready(function () {
    // Manejar cambios en el selector de color
    $('#colorPicker').change(function () {
        var selectedColor = $(this).val();
        updateColorFromHex(selectedColor);
    });

    // Actualiza la vista previa del color al cambiar los controles
    $('input[type="range"]').change(updateColor);
    $('input[type="number"]').change(updateColor);

    // Función para actualizar la vista previa del color desde un valor hexadecimal
    function updateColorFromHex(hexColor) {
        // Convierte el valor hexadecimal a valores RGB
        var rgbValues = hexToRgb(hexColor);

        // Actualiza los controles y la vista previa del color
        $('#redRange').val(rgbValues.red);
        $('#greenRange').val(rgbValues.green);
        $('#blueRange').val(rgbValues.blue);

        $('#redInput').val(rgbValues.red);
        $('#greenInput').val(rgbValues.green);
        $('#blueInput').val(rgbValues.blue);

        $('#colorDisplay').css('background-color', hexColor);
        $('#hexCode').text(hexColor);
    }

    // Función para convertir valor hexadecimal a valores RGB
    function hexToRgb(hex) {
        // Elimina el símbolo "#" si está presente
        hex = hex.replace(/^#/, '');

        // Divide el valor hexadecimal en componentes RGB
        var bigint = parseInt(hex, 16);
        var red = (bigint >> 16) & 255;
        var green = (bigint >> 8) & 255;
        var blue = bigint & 255;

        return { red: red, green: green, blue: blue };
    }

    // Función para actualizar la vista previa del color
    function updateColor() {
        var redValue = parseInput($('#redRange').val() || $('#redInput').val());
        var greenValue = parseInput($('#greenRange').val() || $('#greenInput').val());
        var blueValue = parseInput($('#blueRange').val() || $('#blueInput').val());

        // Actualiza los controles y la vista previa del color
        $('#redRange').val(redValue);
        $('#greenRange').val(greenValue);
        $('#blueRange').val(blueValue);

        $('#redInput').val(redValue);
        $('#greenInput').val(greenValue);
        $('#blueInput').val(blueValue);

        var hexCode = rgbToHex(redValue, greenValue, blueValue);

        $('#colorDisplay').css('background-color', 'rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')');
        $('#hexCode').text(hexCode);
    }

    // Función para convertir la entrada en decimal o hexadecimal a un número
    function parseInput(input) {
        if (input.startsWith('0x')) {
            // Si la entrada comienza con '0x', se trata de un valor hexadecimal
            return parseInt(input, 16);
        } else {
            // De lo contrario, se trata de un valor decimal
            return parseInt(input, 10);
        }
    }

    // Función para convertir valores RGB a código hexadecimal
    function rgbToHex(red, green, blue) {
        var redHex = ('0' + red.toString(16)).slice(-2);
        var greenHex = ('0' + green.toString(16)).slice(-2);
        var blueHex = ('0' + blue.toString(16)).slice(-2);
        return '#' + redHex + greenHex + blueHex;
    }
});
