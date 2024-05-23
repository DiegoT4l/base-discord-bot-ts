const fs = require('fs');

module.exports = (directory: string, foldersOnly: boolean = false): string[] => {
    const path = require('path');

    const fileNames: string[] = [];
    const files = fs.readdirSync(directory, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(directory, file.name);

        if (foldersOnly) {
            if (file.isDirectory()) {
                fileNames.push(filePath);
            }
        } else {
            if (file.isFile()) {
                fileNames.push(filePath);
            }
        }
    }

    return fileNames;
};