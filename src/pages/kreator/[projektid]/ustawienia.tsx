import { ProjectLayout } from '@/components/layout/ProjectLayout/ProjectLayout';
import { useProject } from '@/hooks/useProject';

export default function UstawieniaPage() {
  const project = useProject();

  return (
    <ProjectLayout>
      <p>UstawieniaPage</p>
      {project && <p>{project.name}</p>}
    </ProjectLayout>
  );
}
