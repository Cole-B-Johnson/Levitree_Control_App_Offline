import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <section>
      <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-y-5">
        <h1 className="from-primary-content via-secondary to-primary bg-gradient-to-l bg-clip-text text-9xl font-bold text-transparent">
          404
        </h1>
        <p className="text-neutral text-3xl font-medium">Page not found</p>
        <Link className="btn-primary-content btn px-16" to="/">
          Go back
        </Link>
      </div>
    </section>
  );
};

export default NoMatch;
