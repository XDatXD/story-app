

// import { useRef } from 'react';
// import { Button } from '@/components/ui/button';
// import { chapters } from '../[storyid]/page';
// import ReactToPdf from 'react-to-pdf';

// interface ExportPDFProps {
//     currentChapter: string;
//     fontSize: number;
//     fontFamily: string;
//     lineHeight: number;
//     textAlign: string;
// }

// const ExportPDF = ({ currentChapter, fontSize, fontFamily, lineHeight, textAlign } : ExportPDFProps) => {
//     const ref = useRef(null);

//     return (
//         <div className="my-4">
//             <div ref={ref} style={{ padding: 20, fontSize: fontSize, fontFamily: fontFamily, lineHeight: lineHeight, textAlign: textAlign }}>
//                 <h2 style={{ textAlign: 'center', marginBottom: 10 }}>Chương {currentChapter}</h2>
//                 <p>{chapters[currentChapter]}</p>
//             </div>
//             <ReactToPdf targetRef={ref} filename={`Chuong-${currentChapter}.pdf`}>
//                 {({ toPdf }) => (
//                     <Button variant="default" onClick={toPdf}>
//                         Xuất PDF
//                     </Button>
//                 )}
//             </ReactToPdf>
//         </div>
//     );
// };

// export default ExportPDF;
