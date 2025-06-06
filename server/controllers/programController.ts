import { Request, Response } from 'express';
import { poolPromise } from '../config/database';

interface Program {
    ProgramID: number;
    EventName: string;
    Date: Date;
    Description: string | null;
    Organizer: string;
    ImageUrl: string | null;
    IsDisabled: boolean;
}

export const getAllPrograms = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Fetching all programs from database...");
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT 
                ProgramID,
                EventName,
                Date,
                Description,
                Organizer,
                ImageUrl,
                IsDisabled
            FROM CommunityProgram
            WHERE IsDisabled = 0
            ORDER BY Date DESC
        `);
        console.log("Programs fetched:", result.recordset);
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error("Error fetching programs:", error);
        res.status(500).json({ message: "Error occurred when fetching programs" });
    }
};

export const getProgramById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        console.log(`Fetching program with ID: ${id}...`);
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', id)
            .query(`
                SELECT 
                    ProgramID,
                    EventName,
                    Date,
                    Description,
                    Organizer,
                    ImageUrl,
                    IsDisabled
                FROM CommunityProgram
                WHERE ProgramID = @id AND IsDisabled = 0
            `);
        if (result.recordset.length === 0) {
            res.status(404).json({ message: "Program not found" });
            return;
        }
        console.log("Program fetched:", result.recordset[0]);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error("Error fetching program:", error);
        res.status(500).json({ message: "Error occurred when fetching program" });
    }
};