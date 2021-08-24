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
                    <h1 className="text-center text-5xl font-bold text-white py-12">🚀 Timers 🚀</h1>
                    <section className="flex justify-between h-5/6 px-80 py-12">
                        {
                            !this.state.stopwatch ? <button className="self-start bg-green-500 p-2 rounded-md text-white font-bold" onClick={() => this.setState({stopwatch: true})}>Show Stopwatch</button> : < Stopwatch {...this.state} changeState={this.changeState}/>
                           
                        }
                        {
                             !this.state.countdown ?  <button className="self-start bg-green-500 p-2 rounded-md text-white font-bold" onClick={() => this.setState({countdown: true})}>Show Countdown</button> : < Countdown {...this.state} changeState={this.changeState}/>
                        }
                       
                    </section>
                </main>
            )
        }
    
}

export default Main;