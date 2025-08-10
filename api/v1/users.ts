import { Router } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const dataFilePath = path.join(__dirname, '../../public/data/users.json');

router.get('/', async (req, res) => {
    try {
        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        const users = JSON.parse(fileContent);
        res.json(users);
    } catch (error) {
        console.error("Error reading users.json:", error);
        res.status(500).json({ message: "Failed to fetch users from file" });
    }
});

export default router;