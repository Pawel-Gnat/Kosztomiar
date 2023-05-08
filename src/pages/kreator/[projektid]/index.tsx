import DashBoardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import UserContext from '@/store/user-context';
import { Project } from '@/types/types';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export default function ProjektIDPage() {
  const [project, setProject] = useState([]);
  const context = useContext(UserContext);

  const router = useRouter();
  const projectID = router.query.projektid;

  useEffect(() => {
    const filteredProject = context.projects.filter(
      (project: Project) => project.id === projectID,
    );
    setProject(filteredProject);
  }, [projectID, context.projects]);

  useEffect(() => {
    console.log(project);
  }, [project]);

  return (
    <DashBoardLayout>
      <p>ProjektIDPage</p>
      <p>{project[0]?.name}</p>
    </DashBoardLayout>
  );
}
