import stylesButton from '@/components/ui/Button/Button.module.css';
import { ProjectLayout } from '@/components/layout/ProjectLayout/ProjectLayout';
import { PDFDocument } from '@/components/pages/podgladpage/PDFDocument/PDFDocument';
import { useProject } from '@/hooks/useProject';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Loader } from '@/components/loader/Loader';
import { PDFContainer } from '@/components/pages/podgladpage/PDFContainer/PDFContainer';

export default function PodgladPage() {
  const project = useProject()!;

  const viewerStyle = {
    maxWidth: 1000,
    aspectRatio: '1/1',
  };

  const DownloadLink = (
    <PDFDownloadLink
      document={<PDFDocument data={project} />}
      fileName={project && project.name}
      className={stylesButton.button}
    >
      {({ loading }) => (loading ? <Loader /> : 'Pobierz dokument w PDF')}
    </PDFDownloadLink>
  );

  return (
    <ProjectLayout>
      <PDFContainer>
        <PDFViewer style={viewerStyle} width={'100%'}>
          <PDFDocument data={project} />
        </PDFViewer>
        {DownloadLink}
      </PDFContainer>
    </ProjectLayout>
  );
}
