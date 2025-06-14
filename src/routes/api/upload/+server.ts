import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from '@sveltejs/kit';

const execPromise = promisify(exec);

export const POST: RequestHandler = async ({ request }) => {
    console.log("Starting form submission");
    try {
        // Parse FormData
        const formData = await request.formData();
        const file = formData.get('file');

        if (!(file instanceof File)) {
            return new Response(JSON.stringify({ error: 'No valid file' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Log file metadata
        console.log('File Metadata:');
        console.log(`- Name: ${file.name} `);
        console.log(`- Size: ${file.size} bytes`);
        console.log(`- Type: ${file.type} `);
        console.log(`- Last Modified: ${new Date(file.lastModified).toISOString()} `);

        // Save file temporarily
        const tempDir = os.tmpdir();
        const tempFilePath = path.join(tempDir, `upload-${Date.now()}-${file.name}`);
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(tempFilePath, buffer);

        // Execute shell script
        const { stderr } = await execPromise(`./static/zipline-script-file.sh "${tempFilePath}" "${env.ZIPLINE_TOKEN}" "${env.ZIPLINE_URL}"`);
        if (stderr) {
            console.error('Shell script stderr:', stderr);
            return new Response(JSON.stringify({ message: "Internal Server Error" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Read response.json
        const responseJsonPath = path.join(process.cwd(), 'response.json'); // Adjust path if needed
        let responseData;
        try {
            const responseJson = await fs.readFile(responseJsonPath, 'utf-8');
            responseData = JSON.parse(responseJson);
        } catch (error) {
            console.error('Failed to read or parse response.json:', error);
            throw new Error('Failed to process Zipline response');
        } finally {
            // Clean up response.json and temp file
            await fs.unlink(responseJsonPath).catch(() => { });
            await fs.unlink(tempFilePath).catch(() => { });
        }

        console.log(responseData)
        // Validate response.json structure
        const { files } = responseData;

        // Return response based on status, message, and data
        return new Response(JSON.stringify({ files }), {
            status: 200, // Fallback to 200 if status is invalid
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Server error:', error);
        return new Response(JSON.stringify({ error: error.message || 'Server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
