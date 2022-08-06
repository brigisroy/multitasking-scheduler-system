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

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/create-job",
    name: "Schedule Job",
    icon: "ni ni-bold-right text-green",
    component: JobCreate,
    layout: "/admin",
  },
  {
    path: "/list-jobs",
    name: "List Jobs",
    // <FontAwesomeIcon icon="fa-solid fa-rectangle-history" />
    // icon: "fa fa-solid fa-rectangle-history",
    icon: "ni ni-folder-17 text-yellow",
    component: JobList,
    layout: "/admin",
  },
  {
    path: "/list-jobs-by-date",
    name: "List Jobs by date",
    icon: "ni ni-calendar-grid-58 text-orange",
    component: JobListByDate,
    layout: "/admin",
  }
];
export default routes;
