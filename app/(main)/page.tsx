import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/enums";

const Home = async () => {
  const signoutHandler = async () => {
    "use server";
    await signOut({ redirectTo: ROUTES.SIGN_IN });
  };

  return (
    <div>
      <h1 className="p-5 dark:bg-dark-400">
        Helllo World From Next.js Application
      </h1>

      <form action={signoutHandler}>
        <Button className="mt-[100px]" type="submit">
          Sign Out
        </Button>
      </form>
    </div>
  );
};

export default Home;
