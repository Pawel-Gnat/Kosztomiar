import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import NewProjectForm from '@/components/project/NewProjectForm/NewProjectForm';
import { Text } from '@/components/ui/Text/Text';

export default function NowyProjektPage() {
  return (
    <DashboardLayout>
      <Text content="Nowy projekt" />
      <NewProjectForm />
    </DashboardLayout>
  );
}
