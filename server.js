const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// mimic the '/default/get_pump_pressure' endpoint
app.get('/default/get_pump_pressure', function (req, res) {
    const base_path = './Live-Data-Pathways/Pump_Pressure/';

    fs.readdir(base_path, (err, files) => {
        if (err || files.length === 0) {
            console.log('No files in directory:', err);
            res.json(0.0);
        } else {
            const fileNames = files.map(fileName => {
                return {
                    name: fileName,
                    number: parseInt(fileName.split('_').pop())
                }
            });
            
            const latestFile = fileNames.reduce((a, b) => a.number > b.number ? a : b);
            const latestFilePath = path.join(base_path, latestFile.name);

            fs.readFile(latestFilePath, 'utf8', (err, data) => {
                if (err) {
                    console.log('Error reading file:', err);
                    res.json(0.0);
                } else {
                    res.json(parseFloat(data).toFixed(1));
                }
            });
        }
    });
});

app.get('/default/vfd_output', function (req, res) {
    const pump = req.query.pump;
    const base_path = `./Live-Data-Pathways/${pump}/From_VFD`;

    fs.readdir(base_path, (err, files) => {
        if (err || files.length === 0) {
            console.log('No files in directory:', err);
            res.json([]);
        } else {
            const fileNames = files.map(fileName => {
                return {
                    name: fileName,
                    number: parseInt(fileName.split('_').pop())
                }
            });
            
            const latestFile = fileNames.reduce((a, b) => a.number > b.number ? a : b);
            const latestFilePath = path.join(base_path, latestFile.name);

            fs.readFile(latestFilePath, 'utf8', (err, data) => {
                if (err) {
                    console.log('Error reading file:', err);
                    res.json([]);
                } else {
                    const jsonData = JSON.parse(data);
                    res.json(Object.values(jsonData));
                }
            });
        }
    });
});

app.get('/default/vfd_input', function (req, res) {
    const drive_mode_mapping = {"on": "fwd", "off": "rev", "null": "stop"}; // mapping dictionary

    const pump = req.query.pump;
    const base_path = `./Live-Data-Pathways/${pump}/To_VFD`;

    // Generate the file name based on the current UTC time
    const filename = `command_${Math.floor(Date.now() / 1000)}.json`;
    const file_path = path.join(base_path, filename);

    let file_contents;

    // The contents to be written to the file
    if (req.query.speed !== undefined) {
        file_contents = { 'speed': req.query.speed };
    } else if (req.query.drive_mode !== undefined) {
        const drive_mode_value = req.query.drive_mode;
        if (!drive_mode_mapping[drive_mode_value]) {
            return res.status(500).json({ 'message': `Invalid drive_mode value: ${drive_mode_value}` });
        }
        file_contents = { 'drive_mode': drive_mode_mapping[drive_mode_value] }; // use the mapping dictionary here
    } else {
        return res.status(500).json({ 'message': 'Improper key (not speed or drive_mode)' });
    }

    fs.writeFile(file_path, JSON.stringify(file_contents), (err) => {
        if (err) {
            console.log('Error writing file:', err);
            return res.status(500).json({ 'message': err.message });
        }
        res.json({ 'message': `Successfully wrote data to ${file_path}` });
    });
});

app.get('/default/get_pressure_data', function (req, res) {
    const base_path = './Live-Data-Pathways/Pipe_Pressure_Sensors/CubeCell';
    let sensor_readings = [];

    // Loop over each sensor
    for (let sensor_number = 1; sensor_number <= 6; sensor_number++) {
        const sensor_dir = path.join(base_path, String(sensor_number));
        try {
            // Get the list of files in the directory
            const files = fs.readdirSync(sensor_dir);

            if (files.length == 0) {
                throw new Error('No files in directory');
            }

            // Find the file with the largest number after 'sensor_data_'
            const file_name = files.reduce((max, cur) => {
                const cur_number = parseInt(cur.split('_')[1]);
                return cur_number > parseInt(max.split('_')[1]) ? cur : max;
            });

            // Get the contents of the file
            const file_content = fs.readFileSync(path.join(sensor_dir, file_name), 'utf8');

            // Assume the decoded content is a JSON object that needs processing
            const data = JSON.parse(file_content);

            // Convert the data to float and round it to the first decimal place
            const processed_data = Math.round(parseFloat(data) * 10) / 10;

            sensor_readings.push(processed_data);
        } catch (e) {
            // If the directory does not exist or there are no files, assign 0.0 to the sensor
            sensor_readings.push(0.0);
        }
    }

    res.json(sensor_readings);
});

app.get('/default/get_mix_tank_distance', function (req, res) {
    const base_path = './Live-Data-Pathways/Depth_Sensor';
    let processed_data;

    try {
        // Get the list of files in the directory
        const files = fs.readdirSync(base_path);

        if (files.length === 0) {
            throw new Error('No files in directory');
        }

        // Find the file with the largest number after 'sensor_data_'
        const file_name = files.reduce((max, cur) => {
            const cur_number = parseInt(cur.split('_')[1]);
            return cur_number > parseInt(max.split('_')[1]) ? cur : max;
        });

        // Get the contents of the file
        const file_content = fs.readFileSync(path.join(base_path, file_name), 'utf8');

        // Assume the decoded content is a JSON object that needs processing
        const data = JSON.parse(file_content);

        // Convert the data to float and round it to the first decimal place
        processed_data = Math.round(parseFloat(data) * 10) / 10;
    } catch (e) {
        // If the directory does not exist or there are no files, assign 0.0 to the sensor
        processed_data = 0.0;
    }

    res.json(processed_data);
});

// start the server
app.listen(3000, function () {
  console.log('Local server is running on http://localhost:3000');
});
