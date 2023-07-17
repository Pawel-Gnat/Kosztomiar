import { DashboardLayout } from '@/components/layout/DashboardLayout/DashboardLayout';
import { NewProjectForm } from '@/components/project/NewProjectForm/NewProjectForm';
import { LoadingProvider } from '@/store/loading-context';

export default function NowyProjektPage() {
  return (
    <DashboardLayout>
      <LoadingProvider>
        <NewProjectForm />
      </LoadingProvider>
    </DashboardLayout>
  );
}
