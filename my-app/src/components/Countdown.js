import React from 'react';

class Countdown extends React.Component {
    constructor(props) {
        super();

        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            isPaused: false,
            countDownStart: true,
            countDownStop: false
        }
        this.timer = null;
    }

    componentDidUpdate = () => {
        let {hours, minutes, seconds} = this.state;
       
        if(seconds === 60){
            this.setState((prevState) => ({minutes: prevState.minutes + 1}));
            this.setState({seconds: 0});
        }
        if(minutes === 60) {
            this.setState((prevState) => ({hours: prevState.hours + 1}));
            this.setState({minutes: 0});
        }
        
    }

    startCountDown = () => {
        let {minutes, hours, seconds, isPaused} = this.state;
        let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        console.log(totalSeconds);
        this.timer = setInterval(() => {
            
               if(!this.state.isPaused) {
                    totalSeconds -= 1;
                if(totalSeconds === 0) {
                    alert("Count Down Ended");
                    this.setState({isPaused: true, countDownStart: true, countDownStop: false});
                    clearInterval(this.timer);
                }
                    
                    this.setState({
                        seconds: totalSeconds % 60,
                        minutes: Math.floor(totalSeconds / 60),
                        hours: Math.floor(this.state.minutes / 60),
                    })
                   minutes %= 60;
                   hours %= 60;
                }      
           
        }, 1000);
           
    }

    render() {
        let {minutes, seconds, hours} = this.state;
        return (
           <div className="bg-secondary text-white relative inline-block h-88 w-96 self-start p-8 rounded-md border-2 border-white">
                <i className="fas fa-times-circle text-xl absolute right-4 top-3 text-red-500" onClick={() => {
                        this.props.changeState("countdown")
                    }}></i>
               <h2 className="text-4xl text-center font-bold my-3">Countdown</h2>
               <div className="flex my-6 justify-center text-xl">
                    <h4>Hours :</h4>
                    <h4 className="ml-1">Minutes :</h4>
                    <h4 className="ml-1">Seconds</h4>
               </div>
               <div className="flex justify-center">
                   <span className="mx-6 py-2 px-3 bg-gray-500"><i className="fas fa-arrow-up" onClick={() =>
                       this.setState((prevState) => ({hours: prevState.hours + 1}))
                   }></i></span>
                   <span  className="mx-6 py-2 px-3 bg-gray-500"><i className="fas fa-arrow-up" onClick={() =>
                       this.setState((prevState) => ({minutes: prevState.minutes + 1}))
                   }></i></span>
                   <span  className="mx-6 py-2 px-3 bg-gray-500"><i className="fas fa-arrow-up" onClick={() =>
                       this.setState((prevState) => ({seconds: prevState.seconds + 1}))
                   }></i></span>
               </div>
               <div className="flex justify-center my-2">
                    <span className="text-3xl mx-4">{hours >= 10 ? hours : "0" + hours} :</span>
                    <span className="text-3xl mx-4">{minutes >= 10 ? minutes : "0" + minutes} :</span>
                    <span className="text-3xl mx-4">{seconds >= 10 ? seconds : "0" + seconds}</span>
               </div>
               <div className="flex justify-center">
                   <span className="mx-6 py-2 px-3 bg-gray-500"><i className="fas fa-arrow-down" onClick={() =>
                       this.setState((prevState) => ({hours: prevState.hours !== 0 ? prevState.hours - 1: 0}))
                   }></i></span>
                   <span className="mx-6 py-2 px-3 bg-gray-500"><i className="fas fa-arrow-down" onClick={() =>
                       this.setState((prevState) => ({minutes: prevState.minutes !== 0 ? prevState.minutes - 1: 0}))
                   }></i></span>
                   <span className="mx-6 py-2 px-3 bg-gray-500"><i className="fas fa-arrow-down" onClick={() =>
                       this.setState((prevState) => ({seconds: prevState.seconds !== 0 ? prevState.seconds - 1 : 0}))
                   }></i></span>
               </div>

               <div className="flex justify-center mt-8">
                   <button onClick={() => {
                       minutes || hours || seconds ?  this.startCountDown() : alert("Enter some value")
                       this.setState({
                           isPaused: false, 
                           countDownStart: minutes || hours || seconds ? false : true,
                           countDownStop: minutes || hours || seconds ? true : false
                        })
                   }} className={this.state.countDownStart ? "visible bg-blue-500 text-white font-bold py-2 rounded-md px-6": "hidden"}>Start</button>
                   <button onClick={() => {
                       this.setState({
                           isPaused: true,
                           countDownStop: false
                       })
                   }} className={this.state.countDownStop ? "visible bg-red-500 text-white font-bold py-2 rounded-md px-6": "hidden"}>Stop</button>

                   <button className={!this.state.countDownStart && !this.state.countDownStop? "visible bg-blue-500 text-white font-bold py-2 rounded-md px-6": "hidden"} onClick={() => {
                                this.setState({
                                    isPaused: false
                                })
                            }}>Resume</button>
                            <button className={!this.state.countDownStop && !this.state.countDownStart? "visible bg-blue-500 text-white font-bold py-2 rounded-md px-6 ml-4": "hidden"} onClick={() => {
                                this.setState({
                                    seconds: 0,
                                    hours: 0,
                                    minutes: 0,
                                    isPaused: true,
                                    countDownStart: true
                                })
                            }}>Reset</button>
               </div>
           </div>
        )
    }
}


export default Countdown;