const schedule = require('node-schedule');
const { spawn } = require('child_process');
const path = require('path');

const batFilePath = 'run-robot.bat'; // Đường dẫn tương đối đến file .bat
const workingDirectory = path.join('..', 'robot-get-chapters-bns'); // Thư mục chứa file .bat

// Hàm thực thi file .bat
function runBatchFile() {
    console.log('Attempting to run the batch file...');

    const process = spawn('cmd.exe', ['/c', batFilePath], {
        cwd: workingDirectory, // Đặt thư mục làm việc cho tiến trình con
        stdio: 'inherit',      // Kết nối đầu ra của tiến trình con với đầu ra của tiến trình chính
        shell: true            // Chạy lệnh trong shell
    });

    process.on('error', (error) => {
        console.error(`Error executing file: ${error.message}`);
    });

    process.on('exit', (code) => {
        console.log(`Batch file executed with exit code ${code}`);
    });
}

// Thiết lập lịch
const job = schedule.scheduleJob('*/5 * * * *', function() {
    console.log('1');
    runBatchFile();
    console.log('end');
});
