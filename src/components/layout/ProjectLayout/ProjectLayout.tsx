import styles from './ProjectLayout.module.css';
import { ProjectNavbar } from '../ProjectNavbar/ProjectNavbar';
import { ReactNode } from 'react';

import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { useProject } from '@/hooks/useProject';

type Props = {
  children: ReactNode;
};

export const ProjectLayout = (props: Props) => {
  const project = useProject();

  return (
    <DashboardLayout>
      {project && (
        <>
          <ProjectNavbar name={project.name} id={project.id} />
          {props.children}
        </>
      )}
    </DashboardLayout>
  );
};
