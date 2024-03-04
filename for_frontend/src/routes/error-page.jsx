import { useRouteError } from "react-router-dom";
import { Header } from "../components/_index";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex flex-col items-center justify-center h-screen">
      <Header />
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="text-lg mb-2">Sorry, an unexpected error has occurred.</p>
      <p className="italic">{error?.statusText || error?.message}</p>
    </div>
  );
}
