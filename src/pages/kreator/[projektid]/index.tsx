import { ProjectLayout } from '@/components/layout/ProjectLayout/ProjectLayout';
import { useProject } from '@/hooks/useProject';

export default function ProjektPage() {
  const project = useProject();
  return (
    <ProjectLayout>
      <p>Project Page</p>
      {project && <p>{project.name}</p>}
    </ProjectLayout>
  );
}
