import { getSessions } from "@/lib/actions/neuranote.actions";
import NeuranoteList from "@/components/NeuranoteList";
import Profile from "@/components/Profile";

const profilePage = async () => {
  let recentSession = [];

   try {
      recentSession = await getSessions(10);;
    } catch (error) {
      console.log(`Error loading notes:${error}`);
      return (
        <main className="p-4 text-center mt-10">
          <h1 className="text-xl font-semibold text-red-600">
            Failed to load sessions
          </h1>
          <p className="mt-2 text-muted-foreground">
            Please check your internet connection and try again.
          </p>
        </main>
      );
    }
  

  return (
    <main>
      <section className="home-section mt-10">
        <NeuranoteList
          title="Your Recent sessions"
          neuranotes={recentSession}
          classNames="w-2/3 max-lg:w-full"
        />
        <Profile />
      </section>
    </main>
  );
};

export default profilePage;
