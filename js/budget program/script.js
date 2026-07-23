const addexpenselist = ()=>{
    let data=''
     let addexpense = JSON.parse(localStorage.getItem('addexpense')) || []
     addexpense.map((items,index)=>{
        let {taskid,expenss,expdetais,} = items
        data += `
                    <tr>
                        <td>${taskid}</td>
                        <td>${expenss}</td>
                        <td>${expdetais}</td>
                    </tr>
                `
    })
    document.getElementById('record').innerHTML = data;
}
addexpenselist();
