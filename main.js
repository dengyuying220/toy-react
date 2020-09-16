import {createElement, TextWrapper, ElementWrapper, Component, render} from "./toy-react.js"

class MyComponent extends Component {
    constructor() {
        super();
        this.state = {
            a: 1,
            b: 2
        };
    }
    render() {
        return <div id = "a" class = "c">
            <h1>my component</h1>
            <button onClick={()=>{this.state.a++; this.rerender();}}>add</button>
            <span>{this.state.a.toString()}</span>
            {/* {this.children} */}
        </div>
        
    }
}

/* window.a = <MyComponent id = "a" class = "c" >
        <div>abc</div>
        <div></div>
        <div></div>
    </MyComponent>; */

render(<MyComponent  >
<div>a</div>
<div>b</div>
<div>c</div>
</MyComponent>,document.body);