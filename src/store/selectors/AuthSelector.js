export const tokenSelector = (state) => state.auth.token;

export const incidentSelector = (state) => state.incident.incidents;

export const workRequestSelector = (state) => state.incident.workRequests;

export const loggedUserSelector = (state) => state.auth.currentlyLogged;

export const callSelector = (state) => state.incident.calls;

export const unapprovedUsersSelector = (state) => state.auth.unapprovedUsers;

export const devicesSelector = (state) => state.incident.devices;

export const editIncidentSelector = (state) => state.incident.editIncident;

export const editResolutionSelector = (state) => state.incident.currentResolution;

export const NotificationSelector = (state) => state.incident.Notifications

export const CrewSelector = (state) => state.incident.Crews;

export const CurrentCrewSelector = (state) => state.incident.CurrentCrew;

export const DocumentsSelector = (state) => state.incident.Documents;

export const ClanoviSelector = (state) => state.incident.ClanoviEkipe;

export const DashboardSelector = (state) => state.incident.Dashboard;