// import React, { Component } from 'react'

// export default class Test extends Component {
//     constructor(props){
//         super(props);
//         this.state={
//             count:0
//         }
//     }
//     render() {
//         return (
//             <div>
//                 <button onClick={()=>{this.setState(this.count+=1)}}>Clicked {this.state.count} Times</button>
//             </div>
//         )
//     }
// }



import React,{useState, useEffect} from 'react'

function Test() {

    let [count,setCount] = useState(0); //the zero is default value

    //let [cartItems, setCartItems] = useState(['2']);
    
    // function addItemsToCart(){
    //     setCartItems(prevState => prevState+'Iphone Pro');
    // }
    return (
        <div>
            <h1>hello world</h1>
            <button onClick={()=>setCount(count=count+1)}>Cliked {count} times</button>
            <p>Add Item: Iphone 11 pro</p>
            {/* <button onClick={addItemsToCart}>Add Item</button>
                 <div>
                Added Items in the cart are {cartItems.forEach(data=>{
                    return(<h1>{data}</h1>); 
                })}
            </div>  */}
        </div>
    )
}

export default Test
