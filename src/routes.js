/*!

=========================================================
Team Hell Fire's Multi tasking scheduler system
=========================================================

* Coded by Arun J & Brigis Roy

=========================================================

*/

/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import JobList from "views/jobs/job-list";
import JobCreate from "views/jobs/job-create";
import JobListByDate from "views/jobs/job-list-by-date"
import JobCreateBulk from "views/jobs/job-create-bulk";
import AlertConfig from "views/alerts/alerts"

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-indigo",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/create-job",
    name: "Schedule Job",
    icon: "fa-regular fa-clock text-green",
    component: JobCreate,
    layout: "/admin",
  },
  {
    path: "/create-job-bulk",
    name: "Schedule Bulk Job",
    icon: "fa-solid fa-file-import text-indigo",
    component: JobCreateBulk,
    layout: "/admin",
  },
  {
    path: "/list-jobs",
    name: "List Jobs",
    icon: "fa-solid fa-list-check text-yellow",
    component: JobList,
    layout: "/admin",
  },
  {
    path: "/list-jobs-by-date",
    name: "List Jobs By Date",
    icon: "ni ni-calendar-grid-58 text-orange",
    component: JobListByDate,
    layout: "/admin",
  },
  {
    path: "/list-tasks",
    name: "List Tasks",
    icon: "fa fa-solid fa-gears text-grey",
    component: JobList,
    layout: "/admin",
  },
  {
    path: "/list-tasks-by-date",
    name: "List Tasks By Date",
    icon: "ni ni-calendar-grid-58 text-blue",
    component: JobList,
    layout: "/admin",
  },
  {
    path: "/alert-config",
    name: "Alert Config",
    icon: "fa-regular fa-bell text-red",
    component: AlertConfig,
    layout: "/admin",
  },
];
export default routes;
