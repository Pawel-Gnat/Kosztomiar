import styles from './ProjectLayout.module.css';
import { ProjectNavbar } from '../ProjectNavbar/ProjectNavbar';
import { FC, ReactNode } from 'react';
import { DashboardLayout } from '../DashboardLayout/DashboardLayout';
import { useProject } from '@/hooks/useProject';

export const ProjectLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const project = useProject();

  return (
    <DashboardLayout>
      {project && (
        <>
          <ProjectNavbar name={project.name} id={project.id} />
          {children}
        </>
      )}
    </DashboardLayout>
  );
};
