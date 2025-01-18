import Link from "next/link"

const Home = () => {
  return ( 
    <div className="flex min-h-screen items-center justify-center bg-gray-600">
      Click 
        <Link href="/documents/123"> 
          &nbsp; 
          <span className="text-blue-500 underline">here</span>
          &nbsp;
        </Link> 
      to go to DocumentsIdPage
    </div>
   );
}

export default Home;