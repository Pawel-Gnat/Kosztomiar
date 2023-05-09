import { ProjectLayout } from '@/components/layout/ProjectLayout/ProjectLayout';
import { useProject } from '@/hooks/useProject';

export default function PodgladPage() {
  const project = useProject();

  return (
    <ProjectLayout>
      <p>PodgladPage</p>
      {project && <p>{project.name}</p>}
    </ProjectLayout>
  );
}
