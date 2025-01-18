import {Editor} from './editor';

interface DocumentsIdPageProps {
    params: Promise<{ documentId: string }>;
}

const DocumentsIdPage = async ({params}: DocumentsIdPageProps) => {
    const awaitedParams = await params;
    const documentId    = awaitedParams.documentId;

    return ( 
        <div>
            <h1>Document ID Page: {documentId}</h1>
            <Editor />
        </div>
     );
}
 
export default DocumentsIdPage;