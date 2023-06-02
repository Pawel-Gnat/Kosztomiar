import stylesButton from '../../../components/ui/Button/Button.module.css';
import { ProjectLayout } from '@/components/layout/ProjectLayout/ProjectLayout';
import { PDFDocument } from '@/components/pdf/PDFDocument';
import { useProject } from '@/hooks/useProject';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

export default function PodgladPage() {
  const project = useProject()!;

  const viewerStyle = {
    maxWidth: 1000,
    aspectRatio: '1/1',
  };

  return (
    <ProjectLayout>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PDFViewer style={viewerStyle} width={'100%'}>
          <PDFDocument data={project} />
        </PDFViewer>

        <PDFDownloadLink
          document={<PDFDocument data={project} />}
          fileName={project && project.name}
          className={stylesButton.button}
        >
          Pobierz w PDF
        </PDFDownloadLink>
      </div>
    </ProjectLayout>
  );
}
