import { Router } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import type { EnrolledCourse } from '../../types';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const dataFilePath = path.join(__dirname, '../../public/data/enrollments.json');


router.get('/', async (req, res) => {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ message: 'userId is required' });
    }

    try {
        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        const allEnrollments: (EnrolledCourse & { userId: string })[] = JSON.parse(fileContent);
        
        const userEnrollments = allEnrollments.filter(e => e.userId === userId);
        
        // The frontend expects an array of EnrolledCourse objects without the userId
        const responseData = userEnrollments.map(({ userId, ...rest }) => rest);

        res.json(responseData);
    } catch (error) {
        console.error("Enrollments API Error:", error);
        res.status(500).json({ message: 'Failed to fetch enrollments from file' });
    }
});

export default router;