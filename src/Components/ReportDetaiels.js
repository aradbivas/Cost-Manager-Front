import React from "react";
import {useAuthContext} from "../hooks/useAuthContext";
import {useReportContext} from "../hooks/useReportContext";

const ReportDetails = (props) =>
{
    const {user} = useAuthContext();
    const {reports,dispatch} = useReportContext()
    const handleDelete = async () =>
    {
        const response = await fetch('http://localhost:4020/api/report/deleteItem', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`},
            body: JSON.stringify({itemId:props.reportId, year: props.year, month: props.month, category:props.category})
        })
        const json = await response.json();
        if(response.ok)
        {

            dispatch({type:"DELETE_REPORTS", payload:json})
        }

    }
    return (
        <div className='workout-details'>
            {props.category !== undefined &&
                <div>
                    <p><strong>Category: </strong>
                        {props.category}</p>
                    <p><strong>Description: </strong>{props.description}</p>
                    <p><strong>Price: </strong>{props.sum}</p>
                    <span className="span-update">UPDATE</span>

                    <span className="span-delete" onClick={handleDelete}>DELETE</span>
                </div>
            }

        </div>
    )
}

export default ReportDetails;