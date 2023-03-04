import { Faculty } from "../entities/Faculty";

class FacultyController {
  getFaculty = async (id: string): Promise<Faculty> => {
    const faculty = await Faculty.findOneBy({ id });
    if (!faculty) {
      throw new Error(`Faculty id ${id} not found`);
    }
    return faculty;
  };
}

export default FacultyController;
