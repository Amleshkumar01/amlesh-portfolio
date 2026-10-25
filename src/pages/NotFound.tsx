import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="text-center max-w-md">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">This page could not be found.</p>
        <Link to="/" className="btn-hero inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Return to Amlesh's portfolio</Link>
      </div>
    </main>
  );
};

export default NotFound;
