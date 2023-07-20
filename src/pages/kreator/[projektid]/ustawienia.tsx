import { ProjectLayout } from '@/components/layout/ProjectLayout/ProjectLayout';
import { DeleteModal } from '@/components/modal/DeleteModal';
import { ProjectCategoriesList } from '@/components/project/ProjectCategoriesList/ProjectCategoriesList';
import { Button } from '@/components/ui/Button/Button';
import { useModal } from '@/hooks/useModal';
import { useProject } from '@/hooks/useProject';
import { UserContext } from '@/store/user-context';
import { Project } from '@/types/types';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import { deleteProject } from '@/utils/deleteUtils';
import { useSession } from 'next-auth/react';

export default function UstawieniaPage() {
  const project = useProject()!;
  const { data: session, status } = useSession();
  const router = useRouter();
  const context = useContext(UserContext);
  const { isModalOpen, handleModal } = useModal();

  const deleteProjectHandler = async (project: Project) => {
    await deleteProject(project, session);
    hideModal();
    context.setProjects();
    router.push('/kreator');
  };

  const hideModal = () => {
    handleModal({ active: false, type: '', name: '' });
  };

  return (
    <>
      <ProjectLayout>
        <section>
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
        </section>
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
