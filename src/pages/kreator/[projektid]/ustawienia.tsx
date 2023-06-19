import { ProjectLayout } from '@/components/layout/ProjectLayout/ProjectLayout';
import { ProjectCategoriesList } from '@/components/project/ProjectCategoriesList/ProjectCategoriesList';
import { Button } from '@/components/ui/Button/Button';
import {
  getProjectsFromLocalStorage,
  setProjectsToLocalStorage,
} from '@/components/utils/localStorageDatabase';
import { useProject } from '@/hooks/useProject';
import UserContext from '@/store/user-context';
import { Project } from '@/types/types';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CiCircleRemove } from 'react-icons/ci';

export default function UstawieniaPage() {
  const project = useProject()!;
  const router = useRouter();
  const context = useContext(UserContext);

  async function deleteProject(currentProject: Project) {
    const existingProjects = await getProjectsFromLocalStorage();
    const filteredProjects = existingProjects.filter(
      (project: Project) => JSON.stringify(project) !== JSON.stringify(currentProject),
    );

    if (filteredProjects) {
      await setProjectsToLocalStorage(filteredProjects);
      context.setProjects();
      router.push('/kreator');
    }
  }

  return (
    <ProjectLayout>
      <ProjectCategoriesList project={project} />
      <Button
        type="button"
        content="Usuń projekt"
        isSmall={true}
        accent={true}
        icon={<CiCircleRemove />}
        onClick={() => deleteProject(project)}
      />
    </ProjectLayout>
  );
}
