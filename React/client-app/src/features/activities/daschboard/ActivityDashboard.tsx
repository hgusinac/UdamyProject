import React from "react";
import { Grid, List } from "semantic-ui-react";
import ActivityForm from "../form/ActivityForm";
import { Activity } from "./../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "./details/ActivityDetails";

interface Props {
  activities: Activity[];
}
export default function ActivityDashboard({ activities }: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} />
      </Grid.Column>
      <Grid.Column width="6">
        {activities[0] && <ActivityDetails activity={activities[0]} />}
        <ActivityForm />
      </Grid.Column>
    </Grid>
  );
}