// Taken from js

const fs = require("fs");
const path = require("path");

function appendSuffix(directory) {
  fs.readdirSync(directory).forEach((file) => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      appendSuffix(filePath);
    } else {
      const newFilePath = path.join(directory, `${file}v1`);
      fs.renameSync(filePath, newFilePath);
    }
  });

  const newDirectoryPath = `${directory}v1`;
  fs.renameSync(directory, newDirectoryPath);
}

const directory = "./OLD";
appendSuffix(directory);
