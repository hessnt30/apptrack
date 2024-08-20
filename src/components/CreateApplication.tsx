import { Application } from "@/types/types";
import { supabase } from "@/utils/supabaseClient";
import { useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { useMyApps } from "@/hooks/useMyApps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type CreateApplicationProps = {
  closeModal: () => void;
};

export default function CreateApplication({
  closeModal,
}: CreateApplicationProps) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [application_date, setApplication_Date] = useState("");
  const [stage, setStage] = useState("");
  const [last_updated, setLast_Updated] = useState("");
  const [is_favorite, setIs_Favorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { fetchMyApps } = useMyApps();

  async function createApplication(application: Application) {
    try {
      const { data, error } = await supabase
        .from("applications")
        .insert([application]);

      if (error) {
        console.error("Error creating application:", error.message);
        setIsLoading(false);
        return null;
      }

      closeModal();
      fetchMyApps();
      return data;
    } catch (error) {
      console.error("Unexpected error:", (error as Error).message);
      setIsLoading(false);
      return null;
    }
  }

  async function handleCreateApplication(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase.auth.getUser();

    const user = data.user;

    if (!user) {
      console.error("User is not authenticated");
      setIsLoading(false);
      return;
    }

    if (error) {
      console.error("Error:", error);
      setIsLoading(false);
      return;
    }

    const newApplication: Application = {
      title: title,
      company: company,
      description: description,
      application_date: application_date,
      stage: stage,
      is_favorite: is_favorite,
      user_id: user.id,
    };

    const createdApplication = await createApplication(newApplication);

    if (createdApplication) {
      console.log("Successfully created new application", createdApplication);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray p-8 rounded-lg shadow-lg w-1/2">
          <div className="flex justify-between">
            <h1 className="text-2xl mb-4">New Application</h1>
            <button>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={closeModal}
                className="text-2xl"
              />
            </button>
          </div>
          <div className="flex items-center justify-center">
            <form
              onSubmit={handleCreateApplication}
              className="flex flex-col w-80 text-black-500"
            >
              <label className="pb-2">Job Title</label>
              <input
                type="text"
                placeholder="Software Engineer..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 mb-4 border border-gray rounded text-white bg-lightgray"
                required
              />
              <label className="pb-2">Company</label>
              <input
                type="text"
                placeholder="Application Tracker, Inc..."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="p-2 mb-4 border border-gray rounded text-white bg-lightgray"
                required
              />
              <label className="pb-2">Description</label>
              <input
                type="text"
                placeholder="Description here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 mb-4 border border-gray rounded text-white bg-lightgray"
                required
              />
              <label className="pb-2">Application Date</label>
              <input
                type="date"
                value={application_date}
                onChange={(e) => setApplication_Date(e.target.value)}
                className="p-2 mb-4 border border-gray rounded text-white bg-lightgray"
                required
              />
              <label className="pb-2">Application Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="p-2 mb-4 border border-gray rounded text-white bg-lightgray"
                required
              >
                <option value="">Select Stage...</option>
                <option value="Need to Apply">Need to Apply</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
                <option value="Accepted">Accepted</option>
              </select>

              <label className="inline-flex items-center cursor-pointer">
                <span className="mb-8 text-gray-900 dark:text-gray-300">
                  Favorite
                </span>
                <input
                  type="checkbox"
                  checked={is_favorite}
                  onChange={() => setIs_Favorite(!is_favorite)}
                  className="sr-only peer"
                />
                <div className="mb-8 ms-4 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>

              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded mb-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {isLoading && <LoadingOverlay />}
    </>
  );
}
