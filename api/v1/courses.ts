import { Router } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const dataFilePath = path.join(__dirname, '../../public/data/courses.json');

router.route('/')
    .get(async (req, res) => {
        try {
            const fileContent = await fs.readFile(dataFilePath, 'utf-8');
            const coursesData = JSON.parse(fileContent);
            res.json(coursesData);
        } catch (e) {
            console.error("Error reading courses.json:", e);
            res.status(500).json({ message: 'Error fetching courses from file' });
        }
    })
    .post((req, res) => res.status(501).json({ message: 'Not Implemented: Create course is disabled while using file-based data.' }))
    .put((req, res) => res.status(501).json({ message: 'Not Implemented: Update course is disabled while using file-based data.' }))
    .delete((req, res) => res.status(501).json({ message: 'Not Implemented: Delete course is disabled while using file-based data.' }));

export default router;