import React from 'react';
import "../style/style.css";

class Stopwatch extends React.Component {
    constructor(props) {
        super();
        this.state = {
            ms: 0,
            seconds: 0,
            minutes: 0,
            hours: 0,
            timerStart: true,
            timerStop: false,
            isPaused: false
        }
        this.timer = null;
    }

   componentDidUpdate = () => {
    let {ms, seconds, minutes, hours} = this.state;
        if(minutes === 60) {
            this.setState((prevState) => ({hours: prevState.hours + 1}));
            this.setState({minutes: 0});
        }
        if(seconds === 60) {
            this.setState((prevState) => ({minutes: prevState.minutes + 1}));
            this.setState({seconds: 0});
        }
        if(ms === 100) {
            this.setState((prevState) => ({seconds: prevState.seconds + 1}));
            this.setState({ms: 0});
        }
   }

    startTimer = () => {
        
            this.timer = setInterval(() => {
                if(!this.state.isPaused){
                    this.setState((prevState) => {
                        return (
                            {
                                ms: prevState.ms + 1
                            }
                        )
                    })
            }
            }, 10)
        
    }

    componentWillUnmount = () => {
        clearInterval(this.timer);
    }

    render() {
        let {ms, seconds, minutes, hours} = this.state;
        return (
           
            <div className="bg-secondary text-white relative inline-block h-96 w-96 self-start p-8 rounded-md  border-2 border-white">
                <h2 className="text-4xl text-center font-bold my-3">Stopwatch</h2>

                <div className="flex my-6 justify-center text-4xl">
                    <i className="fas fa-times-circle text-xl absolute right-4 top-3 text-red-500" onClick={() => {
                        this.props.changeState("stopwatch")
                    }}></i>
                    <span>{hours >= 10 ? hours : "0" + hours} : </span>
                    <span className="ml-2">{minutes >= 10 ? minutes : "0" + minutes} : </span>
                    <span className="ml-2">{seconds >= 10 ? seconds : "0" + seconds} : </span>
                    <span className="ml-2">{ms >= 10 ? ms : "0" + ms}</span>
                </div>
                <div className="flex justify-center mt-16">
                    
                       <button className={this.state.timerStart ? "visible bg-blue-500 text-white font-bold py-2 rounded-md px-6": "hidden"} onClick={() => {
                           this.startTimer();
                           this.setState({
                               timerStart: false,
                               timerStop: true,
                               isPaused: false
                           })
                           
                       }}>Start</button> 
                    
                    
                        <button className={this.state.timerStop ? "visible bg-red-500 text-white font-bold py-2 rounded-md px-6": "hidden"} onClick={() => {
                            this.setState((prevState) => {
                                return (
                                    {
                                        timerStop: !prevState.timerStop,
                                        isPaused: !prevState.isPaused
                                    }
                                )
                            })
                        }}>Stop</button>
                    
                            <button className={!this.state.timerStop && !this.state.timerStart? "visible bg-blue-500 text-white font-bold py-2 rounded-md px-6": "hidden"} onClick={() => {
                                this.setState((prevState) => ({isPaused: !prevState.isPaused, timerStop: !prevState.timerStop}))
                            }}>Resume</button>
                            <button className={!this.state.timerStop && !this.state.timerStart? "visible bg-blue-500 text-white font-bold py-2 rounded-md px-6 ml-4": "hidden"} onClick={() => {
                                this.setState({
                                    ms: 0,
                                    seconds: 0,
                                    hours: 0,
                                    minutes: 0,
                                    isPaused: true,
                                    timerStart: true
                                })
                            }}>Reset</button>
                        
                        
                    
                </div>
            </div>
        )
    }
}


export default Stopwatch;