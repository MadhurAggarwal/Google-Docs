interface DocumentsIdPageProps {
    params: Promise<{ documentId: string }>;
}

const DocumentsIdPage = async ({params}: DocumentsIdPageProps) => {
    const awaitedParams = await params;
    const documentId    = awaitedParams.documentId;

    return ( 
        <div>
            <h1>Document ID Page: {documentId}</h1>
        </div>
     );
}
 
export default DocumentsIdPage;