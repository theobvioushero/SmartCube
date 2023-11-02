document.addEventListener('DOMContentLoaded', (event) => {
    const connectButton = document.getElementById('connect');
    const logElement = document.getElementById('log');

    // Function to append messages to the log
    function log(message) {
        logElement.textContent += message + '\n';
    }

    // Function to handle cube moves
    function handleCubeMove(data) {
        // Process and log the cube move data
        // The exact processing will depend on how the GAN Cube transmits its moves.
        // This is a placeholder for where you would interpret the data.
        log('Cube moved: ' + data);
    }

    // Function to connect to the cube
    async function connectToCube() {
        try {
            log('Requesting Bluetooth Device...');
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['battery_service'] }],
                optionalServices: ['your_gan_cube_service_id']
            });

            log('Connecting to GAN Cube...');
            const server = await device.gatt.connect();

            log('Getting GAN Cube Service...');
            const service = await server.getPrimaryService('your_gan_cube_service_id');

            log('Getting Characteristic...');
            const characteristic = await service.getCharacteristic('your_gan_cube_characteristic_id');

            log('Starting Notifications...');
            await characteristic.startNotifications();

            characteristic.addEventListener('characteristicvaluechanged',
                (event) => {
                    const value = event.target.value;
                    handleCubeMove(value);
                });

            log('Connected and listening for cube moves...');
        } catch (error) {
            log('Error: ' + error);
        }
    }

    connectButton.addEventListener('click', () => {
        connectToCube();
    });
});
