
function Todolist(){
    console.log("Todolist");
    return (
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    );
}

function uuidv4() {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
      (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
    );
  }
  
 export function todoFactory(title) {
    return {
      title,
      id: uuidv4(),
      done: false,
    };
  }


  export default Todolist