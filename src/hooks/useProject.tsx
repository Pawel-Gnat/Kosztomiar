import UserContext from '@/store/user-context';
import { Project } from '@/types/types';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export const useProject = () => {
  const [project, setProject] = useState<Project>();
  const context = useContext(UserContext);

  const router = useRouter();
  const projectID = router.query.projektid;

  useEffect(() => {
    const filteredProject = context.projects.find(
      (project: Project) => project.id === projectID,
    );

    if (filteredProject) {
      setProject(filteredProject);
    }
  }, [projectID, context.projects]);

  return project;
};
