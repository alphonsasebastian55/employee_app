import { useState, useEffect } from 'react';
export default ()=>{
    const [table, setTable] = useState();
    useEffect(()=>{
        if(table){
            $(table).DataTable({
                pageLength:2,
                processing: true,
                serverSide: true,
                ajax:'api/employee',
                "columns": [
                    { "data": "name" },
                    { "data": "email" },
                    { "data": "image_path" },
                    { "data": "designation.name" },
                    {
                        mRender: function (data, type, row) {
                            return '<a class="table-edit" data-id="' + row[0] + '">EDIT</a>'
                        }
                    }
                    ,{
                        mRender: function (data, type, row) {
                            return '<a class="table-delete" data-id="' + row[0] + '">DELETE</a>'
                        }
                    },  
                ]
            });
        }
    },[table])

    return (<table ref={setTable} id="example" className="display" style={{width:"100%", padding:"20px"}}>
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Photo</th>
            <th>Designation</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>);
}