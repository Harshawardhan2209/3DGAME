import React from "react";
import UserClass from "./UserClass";

class About extends React.Component {

    constructor() {
        super();
        console.log("Parent constructor called");
    }

    componentDidMount() {
        console.log("Parent component is mounted");
    }

    render() {
        console.log("Parent render is called");
        return (
            <div className="p-4 m-4">
                {/* https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/ Render Phase, Commit phase 
                    About.js:9 Parent constructor called
                    About.js:17 Parent render is called
                    UserClass.js:6 First Child constructor is called
                    UserClass.js:17 First Child render is called
                    UserClass.js:6 Second Child constructor is called
                    UserClass.js:17 Second Child render is called
                    NewUser.js:6 New User Constructor called
                    NewUser.js:14 New User is rendered
                    UserClass.js:13 First Child component is mounted
                    UserClass.js:13 Second Child component is mounted
                    NewUser.js:10 New User is mounted
                    About.js:13 Parent component is mounted
                */}
                <UserClass/>
                {/* <UserClass name={"Second"} location={"Lohgaon, Newasa"}/> */}
            </div>
        );
    }
}

export default About;