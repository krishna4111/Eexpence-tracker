var amountval=document.getElementById('amount');
var descriptionval=document.getElementById('desc');
var catagoryval=document.getElementById('cata');

var btn=document.getElementById('btn');
console.log(btn)

btn.addEventListener('click',addEvent);


function addEvent(e){
    e.preventDefault();
    const amount=amountval.value;
    const description=descriptionval.value;
    const catagory=catagoryval.value;
    obj={
        amount,
        description,
        catagory
    }
    //instead of storing this in the local storage you can make a network call in here by using crudcrud
    //localStorage.setItem(obj.description,JSON.stringify(obj));
    axios.post('https://crudcrud.com/api/fed3828f5c294e50a0c10407f749d5dd/expenceData',obj)
    .then((response)=>{
        console.log(response);
    })
    .catch((err)=>{
        console.log(err);
    })
    shoeExpences(obj);
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get('https://crudcrud.com/api/fed3828f5c294e50a0c10407f749d5dd/expenceData')
    .then((res)=>{
        console.log(res);
        for(var i=0;i<res.data.length;i++){
            shoeExpences(res.data[i]);
        }
        
    })
    .catch((err)=>{
        console.log(err);
    })
})

function shoeExpences(obj){
    const parent=document.getElementById('showing');
    const child=document.createElement('li');
    child.textContent=obj.amount+'-'+obj.description+'-'+obj.catagory;
    

    const deleteBtn=document.createElement('input');
    deleteBtn.setAttribute('class','btn btn-danger');
    deleteBtn.style.cssText="margin-left:15px; margin-right:15px; margin-top:5px; padding:2px"
    deleteBtn.type='button';
    deleteBtn.value='Delete';
    deleteBtn.onclick= ()=>{
        //localStorage.removeItem(obj.description);
        axios.delete(`https://crudcrud.com/api/fed3828f5c294e50a0c10407f749d5dd/expenceData/${obj._id}`)
        .then((res)=>{
            parent.removeChild(child);
            console.log(res);
            console.log(obj.id);
        })
        .catch((err)=>{
            console.log(err);
        })
       
    }  

    const edit=document.createElement('input');
    edit.setAttribute('class','btn btn-success');
    edit.style.cssText="padding:2px;  margin-top:5px;"
    edit.value='Edit';
    edit.type='button';
    edit.onclick=()=>{
        localStorage.removeItem(obj.description)
        parent.removeChild(child);
        document.getElementById('desc').value=obj.description.value;
        document.getElementById('amount').value=obj.amount.value;
        document.getElementById('cata').value=obj.catagory.value;
        localStorage.setItem(object.description,JSON.stringify(obj));
    }
    child.appendChild(deleteBtn);
    child.appendChild(edit);
    parent.appendChild(child);
}