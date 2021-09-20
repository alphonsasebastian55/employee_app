import { useState, useEffect } from 'react';
export default ()=>{
    const [table, setTable] = useState();
    useEffect(()=>{
        if(table){
            const dataTable = $(table).DataTable({
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
                            return '<button  class="table-edit" data-id="' + row.id + '">EDIT</button>'
                        }
                    }
                    ,{
                        mRender: function (data, type, row) {
                            return '<button  class="table-delete" data-id="' + row.id + '">DELETE</button>'
                        }
                    },  
                ]
            });
            
            const deleteEmployee = (employee_id) => {
                axios.delete(`/api/employees/${employee_id}`).then(response => {
                    alert("Deleted Successfully");
                    dataTable.ajax.reload();
                })
            }
            $(document).on('click',".table-delete",function(){
                const id = $(this).attr("data-id");
                deleteEmployee(id);
            })
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
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>);
}