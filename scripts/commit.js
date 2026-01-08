const { execSync } = require('node:child_process');
const readline = require('node:readline/promises');
const path = require('node:path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m',
};

const log = {
  red: (msg) => console.log(`${colors.red}${msg}${colors.reset}`),
  green: (msg) => console.log(`${colors.green}${msg}${colors.reset}`),
  yellow: (msg) => console.log(`${colors.yellow}${msg}${colors.reset}`),
  blue: (msg) => console.log(`${colors.blue}${msg}${colors.reset}`),
  magenta: (msg) => console.log(`${colors.magenta}${msg}${colors.reset}`),
  gray: (msg) => console.log(`${colors.gray}${msg}${colors.reset}`),
};

async function getChangedFiles() {
  try {
    const stdout = execSync('git status --short -uall', { encoding: 'utf8' });
    if (!stdout) return [];

    return stdout.split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => {
        const status = line.slice(0, 2);
        const filePath = line.slice(3).trim();
        return { status, path: filePath };
      });
  } catch (e) {
    return [];
  }
}

async function selectFromList(message, choices) {
  console.log(`\n${message}`);
  choices.forEach((choice, index) => {
    console.log(`${index + 1}. ${choice}`);
  });

  while (true) {
    const answer = await rl.question(`Select (1-${choices.length}): `);
    const index = parseInt(answer) - 1;
    if (index >= 0 && index < choices.length) {
      return choices[index];
    }
    console.log(colors.red + 'Invalid selection, try again.' + colors.reset);
  }
}

async function run() {
  try {
    log.yellow('Resetting staging area...');
    try {
      execSync('git reset');
    } catch (e) {}

    let files = await getChangedFiles();
    if (files.length === 0) {
      log.green('No changes found.');
      process.exit(0);
    }

    log.blue(`Found ${files.length} changed files, processing one by one...\n`);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      let checkStatus = '';
      try {
        checkStatus = execSync(`git status --short "${file.path}"`, { encoding: 'utf8' });
      } catch (e) {
        continue;
      }
      if (!checkStatus.trim()) continue;

      log.gray(`\n[${i + 1}/${files.length}] --------------------------------`);
      log.magenta(`File path: ${file.path}`);

      const actionIdx = await selectFromList('How to handle this change?', [
        'Commit this file',
        'Commit all files in the same directory',
        'Skip',
        'Exit process'
      ]);

      if (actionIdx === 'Exit process') break;
      if (actionIdx === 'Skip') continue;

      let filesToCommit = [file.path];
      let targetDisplay = file.path;

      if (actionIdx === 'Commit all files in the same directory') {
        const dir = path.dirname(file.path);
        const sameDirFiles = files.filter(f => path.dirname(f.path) === dir);
        filesToCommit = sameDirFiles.map(f => f.path);
        targetDisplay = `${dir}${path.sep}* (${filesToCommit.length} files)`;
      }

      const module = await selectFromList('Select module type:', [
        '后端引擎',
        '前端开发',
        '视觉算法',
        '业务任务',
        '资源配置',
        '文档更新',
        '故障修复',
        '新增脚本',
      ]);

      let description = '';
      while (true) {
        description = await rl.question(`Enter description for ${targetDisplay}: `);
        if (description.trim()) break;
        console.log(colors.red + 'Description cannot be empty' + colors.reset);
      }

      const commitMsg = `[${module}] ${description}`;

      log.blue(`Committing...`);
      for (const f of filesToCommit) {
        try {
          execSync(`git add "${f}"`);
        } catch (e) {}
      }

      try {
        execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`);
      } catch (e) {
        log.red('Commit failed.');
      }
    }

    const pushAnswer = await rl.question('\nProcessing finished, push to remote repository? (Y/n): ');
    if (pushAnswer.toLowerCase() !== 'n') {
      log.blue('Pushing...');
      try {
        execSync('git push', { stdio: 'inherit' });
        log.green('All pushed successfully!');
      } catch (e) {
        log.red('Push failed.');
      }
    }

  } catch (error) {
    log.red(`\nError: ${error.message}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

run();
