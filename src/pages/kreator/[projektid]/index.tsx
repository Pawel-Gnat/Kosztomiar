import { ProjectLayout } from '@/components/layout/ProjectLayout/ProjectLayout';
import { ProjectContainer } from '@/components/project/ProjectContainer/ProjectContainer';
import { useProject } from '@/hooks/useProject';

export default function ProjektPage() {
  const project = useProject()!;

  return <ProjectLayout>{<ProjectContainer {...project} />}</ProjectLayout>;
}
