import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "./../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/daschboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "./../../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivites] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setActivites(activities);
      setLoading(false);
    });
  }, []);

  function handelSelectActivity(id: String) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }

  function handelCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  function handelFormOpen(id?: string) {
    id ? handelSelectActivity(id) : handelCancelSelectedActivity();
    setEditMode(true);
  }

  function handelFormClose() {
    setEditMode(false);
  }

  function handelCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivites([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivites([...activities, activity]);
      });
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    }
  }

  function handelDelete(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivites([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  if (loading) return <LoadingComponent content="Loading app" />;

  return (
    <>
      <NavBar openForm={handelFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handelSelectActivity}
          cancelSelectActivity={handelCancelSelectedActivity}
          editMode={editMode}
          openForm={handelFormOpen}
          closeForm={handelFormClose}
          createOrEdit={handelCreateOrEditActivity}
          deleteActivity={handelDelete}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
