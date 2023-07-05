import { Project } from '@/types/types';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { sumValueOfProjectElements } from '../utils/sumValueOfProjectElements';
import { totalSumOfProjectElements } from '../utils/totalSumOfProjectElements';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    flexDirection: 'column',
    padding: 50,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  table: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  tableHeading: {
    fontWeight: 'bold',
    padding: 5,
    borderBottom: '1px solid black',
  },
  tableColumns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableElement: {
    fontSize: 10,
    minWidth: 20,
    padding: 5,
    borderRight: '1px solid black',
    borderBottom: '1px solid black',
  },
  summary: { fontSize: 10, textAlign: 'right', marginTop: 5 },
});

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});

export const PDFDocument = (props: { data: Project }) => {
  const pdfData = props.data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{pdfData.name}</Text>

        {pdfData.data.map((el, index) => (
          <View key={index} style={styles.table}>
            <Text style={styles.tableHeading}>{el.category}</Text>
            <View style={styles.tableColumns}>
              <View style={{ flexGrow: 1 }}>
                <Text style={[styles.tableElement, { borderLeft: '1px solid black' }]}>
                  Nazwa
                </Text>
                {el.elements.map((item, index) => (
                  <Text
                    key={index}
                    style={[styles.tableElement, { borderLeft: '1px solid black' }]}
                  >
                    {item.name}
                  </Text>
                ))}
              </View>
              <View>
                <Text style={styles.tableElement}>Ilość</Text>
                {el.elements.map((item, index) => (
                  <Text key={index} style={styles.tableElement}>
                    {item.value}
                  </Text>
                ))}
              </View>
              <View>
                <Text style={styles.tableElement}>J.m.</Text>
                {el.elements.map((item, index) => (
                  <Text key={index} style={styles.tableElement}>
                    {item.unit}
                  </Text>
                ))}
              </View>

              {pdfData.price && (
                <View>
                  <Text style={styles.tableElement}>Cena</Text>
                  {el.elements.map((item, index) => (
                    <Text key={index} style={styles.tableElement}>
                      {item.price}
                    </Text>
                  ))}
                </View>
              )}
            </View>
            {pdfData.price && (
              <Text style={styles.summary}>
                Suma: {sumValueOfProjectElements(el.elements)} {pdfData.currency}
              </Text>
            )}
          </View>
        ))}
        {pdfData.price && (
          <Text style={styles.summary}>
            Suma całkowita: {totalSumOfProjectElements(pdfData.data)} {pdfData.currency}
          </Text>
        )}
      </Page>
    </Document>
  );
};
