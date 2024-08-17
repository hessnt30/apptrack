import MyApplications from "./MyApplications";
import Stage from "./Stage";

type AppTrackerProps = {
  handleCreateAppClicked: () => void;
};

export default function AppTracker({
  handleCreateAppClicked,
}: AppTrackerProps) {
  return (
    <>
      <div className="h-screen grid grid-cols-5 grid-flow-col gap-4 px-16 pt-8 pb-20">
        <Stage color="lightorange" title="Need to Apply">
          <MyApplications
            handleCreateAppClicked={handleCreateAppClicked}
            title="Need to Apply"
          />
        </Stage>
        <Stage color="dijon" title="Applied">
          <MyApplications
            handleCreateAppClicked={handleCreateAppClicked}
            title="Applied"
          />
        </Stage>
        <Stage color="lightbrown" title="Interview">
          <MyApplications
            handleCreateAppClicked={handleCreateAppClicked}
            title="Interview"
          />
        </Stage>
        <Stage color="cloud" title="Rejected">
          <MyApplications
            handleCreateAppClicked={handleCreateAppClicked}
            title="Rejected"
          />
        </Stage>
        <Stage color="grape" title="Accepted">
          <MyApplications
            handleCreateAppClicked={handleCreateAppClicked}
            title="Accepted"
          />
        </Stage>
      </div>
    </>
  );
}
