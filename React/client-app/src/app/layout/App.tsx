import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "./../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/daschboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

function App() {
  const [activities, setActivites] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivites(response.data);
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
    activity.id
      ? setActivites([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivites([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  }
  function handelDelete(id: string) {
    setActivites([...activities.filter((x) => x.id !== id)]);
  }
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
        />
      </Container>
    </>
  );
}

export default App;
