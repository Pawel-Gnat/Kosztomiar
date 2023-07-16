import { ProjectLayout } from '@/components/layout/ProjectLayout/ProjectLayout';
import { DeleteModal } from '@/components/modal/DeleteModal';
import { ProjectCategoriesList } from '@/components/project/ProjectCategoriesList/ProjectCategoriesList';
import { Button } from '@/components/ui/Button/Button';
import {
  getProjectsFromLocalStorage,
  setProjectsToLocalStorage,
} from '@/utils/localStorageDatabase';
import { useModal } from '@/hooks/useModal';
import { useProject } from '@/hooks/useProject';
import { UserContext } from '@/store/user-context';
import { Project } from '@/types/types';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CiCircleRemove } from 'react-icons/ci';

export default function UstawieniaPage() {
  const project = useProject()!;
  const router = useRouter();
  const context = useContext(UserContext);
  const { isModalOpen, handleModal } = useModal();

  const deleteProjectHandler = (project: Project) => {
    deleteProject(project);
    hideModal();
  };

  const hideModal = () => {
    handleModal({ active: false, type: '', name: '' });
  };

  const deleteProject = async (currentProject: Project) => {
    const existingProjects = await getProjectsFromLocalStorage();
    const filteredProjects = existingProjects.filter(
      (project: Project) => JSON.stringify(project) !== JSON.stringify(currentProject),
    );

    if (filteredProjects) {
      await setProjectsToLocalStorage(filteredProjects);
      context.setProjects();
      router.push('/kreator');
    }
  };

  return (
    <>
      <ProjectLayout>
        <ProjectCategoriesList project={project} />
        <Button
          type="button"
          content="Usuń projekt"
          isSmall={false}
          accent={true}
          icon={<CiCircleRemove />}
          onClick={() => {
            handleModal({ active: true, type: 'projekt', name: project.name });
          }}
        />
      </ProjectLayout>
      {isModalOpen.active && (
        <DeleteModal
          type={isModalOpen.type}
          name={isModalOpen.name}
          handleCancel={hideModal}
          handleDelete={() => deleteProjectHandler(project)}
        />
      )}
    </>
  );
}
