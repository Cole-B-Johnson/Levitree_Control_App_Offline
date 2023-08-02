import express from 'express';
import { readdir, readFile, writeFile, mkdir } from 'fs';
import { join } from 'path';

const app = express();

const createDirectoryIfNotExist = (dirPath) => {
    mkdir(dirPath, { recursive: true }, (err) => {
        if (err) {
            console.log('Error creating directory:', err);
        }
    });
};

app.get('/default/get_pump_pressure', function (req, res) {
    const base_path = '/home/levitree/Desktop/Live-Data-Pathways/Pump_Pressure/';
    createDirectoryIfNotExist(base_path);

    readdir(base_path, (err, files) => {
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
            const latestFilePath = join(base_path, latestFile.name);

            readFile(latestFilePath, 'utf8', (err, data) => {
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
    const base_path = `/home/levitree/Desktop/Live-Data-Pathways/${pump}/From_VFD`;
    createDirectoryIfNotExist(base_path);

    readdir(base_path, (err, files) => {
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
            const latestFilePath = join(base_path, latestFile.name);

            readFile(latestFilePath, 'utf8', (err, data) => {
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
    const base_path = `/home/levitree/Desktop/Live-Data-Pathways/${pump}/To_VFD`;
    createDirectoryIfNotExist(base_path);

    const filename = `command_${Math.floor(Date.now() / 1000)}.json`;
    const file_path = join(base_path, filename);

    let file_contents;

    if (req.query.speed !== undefined) {
        file_contents = { 'speed': req.query.speed };
    } else if (req.query.drive_mode !== undefined) {
        const drive_mode_value = req.query.drive_mode;
        if (!drive_mode_mapping[drive_mode_value]) {
            return res.status(500).json({ 'message': `Invalid drive_mode value: ${drive_mode_value}` });
        }
        file_contents = { 'drive_mode': drive_mode_mapping[drive_mode_value] }; 
    } else {
        return res.status(500).json({ 'message': 'Improper key (not speed or drive_mode)' });
    }

    writeFile(file_path, JSON.stringify(file_contents), (err) => {
        if (err) {
            console.log('Error writing file:', err);
            return res.status(500).json({ 'message': err.message });
        }
        res.json({ 'message': `Successfully wrote data to ${file_path}` });
    });
});

app.get('/default/get_pressure_data', function (req, res) {
    const base_path = '/home/levitree/Desktop/Live-Data-Pathways/Pipe_Pressure_Sensors/CubeCell';
    createDirectoryIfNotExist(base_path);

    let sensor_readings = [];

    for (let sensor_number = 1; sensor_number <= 6; sensor_number++) {
        const sensor_dir = join(base_path, String(sensor_number));
        createDirectoryIfNotExist(sensor_dir);

        readdir(sensor_dir, (err, files) => {
            if (err || files.length === 0) {
                sensor_readings.push(0.0);
            } else {
                const file_name = files.reduce((max, cur) => {
                    const cur_number = parseInt(cur.split('_')[1]);
                    return cur_number > parseInt(max.split('_')[1]) ? cur : max;
                });

                const file_content_path = join(sensor_dir, file_name);
                readFile(file_content_path, 'utf8', (err, file_content) => {
                    if (err) {
                        console.log('Error reading file:', err);
                        sensor_readings.push(0.0);
                    } else {
                        const data = JSON.parse(file_content);
                        const processed_data = Math.round(parseFloat(data) * 10) / 10;
                        sensor_readings.push(processed_data);
                    }
                });
            }
        });
    }

    res.json(sensor_readings);
});

app.get('/default/get_mix_tank_distance', function (req, res) {
    const base_path = '/home/levitree/Desktop/Live-Data-Pathways/Depth_Sensor';
    createDirectoryIfNotExist(base_path);

    let processed_data;

    readdir(base_path, (err, files) => {
        if (err || files.length === 0) {
            processed_data = 0.0;
        } else {
            const file_name = files.reduce((max, cur) => {
                const cur_number = parseInt(cur.split('_')[1]);
                return cur_number > parseInt(max.split('_')[1]) ? cur : max;
            });

            const file_content_path = join(base_path, file_name);
            readFile(file_content_path, 'utf8', (err, file_content) => {
                if (err) {
                    console.log('Error reading file:', err);
                    processed_data = 0.0;
                } else {
                    const data = JSON.parse(file_content);
                    processed_data = Math.round(parseFloat(data) * 10) / 10;
                }
            });
        }
    });

    res.json(processed_data);
});

app.listen(3000, function () {
  console.log('Local server is running on http://localhost:3000');
});
