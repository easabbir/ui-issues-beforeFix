const { exec } = require('node:child_process');
const path = require('node:path');

require('dotenv').config({
    path: path.resolve(
        process.cwd(),
        'src/environments',
        `.env.${process.env.NODE_ENV}`
    ),
});

const port = process.env.PORT || 5000;

exec(
    `pnpm build && cd dist && pnpm dlx serve -l ${port}`,
    (err, stdout, stderr) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Stdout: ${stdout}`);
    }
);
