import { ProjectLayout } from '@/components/layout/ProjectLayout/ProjectLayout';
import {
  getProjectsFromLocalStorage,
  setProjectsToLocalStorage,
} from '@/components/utils/localStorageDatabase';
import { useProject } from '@/hooks/useProject';
import UserContext from '@/store/user-context';
import { Project } from '@/types/types';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export default function UstawieniaPage() {
  const project = useProject()!;
  const router = useRouter();
  const context = useContext(UserContext);

  async function deleteProject(project: Project) {
    const existingProjects = await getProjectsFromLocalStorage();
    const filteredProjects = existingProjects.filter(
      (existingProject: Project) =>
        JSON.stringify(existingProject) !== JSON.stringify(project),
    );

    if (filteredProjects) {
      await setProjectsToLocalStorage(filteredProjects);
      context.setProjects();
      router.push('/kreator');
    }
  }

  return (
    <ProjectLayout>
      <p>UstawieniaPage</p>
      {project && <p>{project.name}</p>}
      <button onClick={(event) => deleteProject(project)}>Usuń projekt</button>
    </ProjectLayout>
  );
}
