import { useMyApps } from "@/hooks/useMyApps";
import { Application } from "@/types/types";
import { supabase } from "@/utils/supabaseClient";
import { useState } from "react";

type ConfirmDeleteProps = {
  app: Application;
  closeDeleteModal: () => void;
  closeModal: () => void;
};

export default function ConfirmDelete({
  app,
  closeDeleteModal,
  closeModal,
}: ConfirmDeleteProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchMyApps } = useMyApps();
  const handleDelete = async () => {
    setIsLoading(true);
    const { data, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error("Error getting user:", authError.message);
      setIsLoading(false);
      return;
    }

    const user = data.user;

    if (!user) {
      console.error("User is not authenticated");
      setIsLoading(false);
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from("applications")
        .delete()
        .match({ id: app.id });

      if (deleteError) {
        console.error("Error deleting application:", deleteError.message);
        setIsLoading(false);
        return;
      }

      console.log("Successfully deleted application with id", app.id);
      closeDeleteModal();
      closeModal();
      fetchMyApps();
    } catch (error) {
      console.error("Unexpected error:", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div className="bg-gray pt-8 pb-0 rounded-lg shadow-lg w-1/4 flex justify-center items-center flex-col">
          <p className="text-2xl font-bold mb-4">Confirm delete?</p>
          <div className="flex flex-row justify-center items-center">
            <p>{`${app.title} @ ${app.company}`}</p>
          </div>
          <div className="w-full border border-t-white border-l-gray border-b-gray border-r-gray flex justify-around items-center mt-8">
            <button
              type="button"
              onClick={closeDeleteModal}
              className="w-full h-full p-2 border border-r-white border-t-gray border-b-gray border-l-gray hover:bg-lightestgray"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="h-full w-full p-2 text-red-200 hover:bg-lightestgray"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
