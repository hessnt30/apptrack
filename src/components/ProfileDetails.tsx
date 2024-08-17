import { useAuth } from "@/hooks/useAuth";

export default function ProfileDetails() {
  const { user, signOut } = useAuth();

  return (
    <div className="fixed right-4 bg-lightergray p-2 border rounded border-lightergray ">
      <div className="flex flex-col items-start">
        <button className="w-full p-2 px-4 hover:bg-lightestgray border border-lightergray rounded">
          Profile
        </button>
        <hr className="w-5/6 ml-2 my-2 text-lightestgray" />
        <button
          onClick={signOut}
          className="w-full p-2 px-4 hover:bg-lightestgray border border-lightergray rounded"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
