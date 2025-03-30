const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

// Determine if we're on Windows
const isWindows = os.platform() === 'win32';
const shell = isWindows ? true : false;

// Define commands
const clientCommand = isWindows ? 'npm run dev' : 'npm run dev';
const serverCommand = isWindows ? 'npm run dev' : 'npm run dev';

// Paths
const clientPath = path.join(__dirname, 'client');
const serverPath = path.join(__dirname, 'server');

// Colors for console output
const colors = {
  client: '\x1b[36m', // Cyan
  server: '\x1b[32m', // Green
  reset: '\x1b[0m'    // Reset
};

console.log(`${colors.client}Starting client...${colors.reset}`);
console.log(`${colors.server}Starting server...${colors.reset}`);

// Function to create a process
function startProcess(command, cwd, name) {
  const colorCode = name === 'client' ? colors.client : colors.server;
  
  let cmd, args;
  if (isWindows) {
    cmd = 'cmd.exe';
    args = ['/c', command];
  } else {
    cmd = 'sh';
    args = ['-c', command];
  }

  const process = spawn(cmd, args, { 
    cwd, 
    shell, 
    stdio: 'pipe'
  });

  process.stdout.on('data', (data) => {
    console.log(`${colorCode}[${name}] ${data.toString().trim()}${colors.reset}`);
  });

  process.stderr.on('data', (data) => {
    console.error(`${colorCode}[${name}] ${data.toString().trim()}${colors.reset}`);
  });

  process.on('close', (code) => {
    console.log(`${colorCode}[${name}] process exited with code ${code}${colors.reset}`);
  });

  return process;
}

// Start both processes
const clientProcess = startProcess(clientCommand, clientPath, 'client');
const serverProcess = startProcess(serverCommand, serverPath, 'server');

// Handle script termination
process.on('SIGINT', () => {
  console.log('\nGracefully shutting down...');
  clientProcess.kill();
  serverProcess.kill();
  process.exit(0);
});

console.log('Both client and server are starting. Press Ctrl+C to stop both processes.'); 