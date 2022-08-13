import React from "react";
import CommonHeader from "components/Headers/CommonHeader.js";
import classnames from 'classnames';
import { withSnackbar } from "notistack";
import CONSTANTS from "../../variables/general.js";
import DateSearch from "../../components/Search/date-search.js"
import TaskList from "./task-list.js";

class TaskListByDate extends React.Component {

    render() {
        return (
            <>
                <CommonHeader />
                <DateSearch
                    submitLink={`${CONSTANTS.SERVER_URL}/api/task/`}
                    module="task" />
            </>
        )
    }

}


export default withSnackbar(TaskListByDate);