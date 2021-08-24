import React from 'react';
import "../style/style.css";
import Stopwatch from './Stopwatch';
import Countdown from './Countdown';

class Main extends React.Component {
    constructor(props) {
        super();
        this.state = {
            stopwatch: false,
            countdown: false
        }
    }

    changeState = (value) => {
        this.setState({[value]: false})
    }

        render() {
            return (
                <main className="bg-primary h-screen">
                    <h1 className="text-center text-4xl font-bold text-white py-12">🚀 Timers 🚀</h1>
                    <section className="w-1/2 mx-auto bg-red-200">
                        {
                            !this.state.stopwatch ? <button onClick={() => this.setState({stopwatch: true})}>Show Stopwatch</button> : < Stopwatch {...this.state} changeState={this.changeState}/>
                           
                        }
                        {
                             !this.state.countdown ?  <button onClick={() => this.setState({countdown: true})}>Show Countdown</button> : < Countdown {...this.state} changeState={this.changeState}/>
                        }
                       
                    </section>
                </main>
            )
        }
    
}

export default Main;