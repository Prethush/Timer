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
        let totalSeconds = hours * 3600 + minutes * 60 + seconds;
        console.log(minutes, seconds, hours);
        this.timer = setInterval(() => {
               if(!this.state.isPaused) {
                    totalSeconds -= 1;
                if(totalSeconds === 0 || totalSeconds < 0) {
                    alert("Count Down Ended");
                    this.setState({isPaused: true, countDownStart: true, countDownStop: false});
                    clearInterval(this.timer);
                }
                    
                    this.setState({
                        seconds: totalSeconds % 60,
                        minutes: Math.floor(totalSeconds / 60),
                        hours: Math.floor(minutes / 60),
                    })
                    minutes %= 60;
                    hours %= 60;
                }      
           
        }, 1000);
           
    }

    render() {
        let {minutes, seconds, hours} = this.state;
        return (
           <div className="bg-secondary text-white flex-custom relative inline-block">
                <i className="fas fa-times-circle" onClick={() => {
                        this.props.changeState("countdown")
                    }}></i>
               <h2>Countdown</h2>
               <div className="flex">
                    <h4>Hours:</h4>
                    <h4>Minutes:</h4>
                    <h4>Seconds:</h4>
               </div>
               <div>
                   <span><i className="fas fa-arrow-up" onClick={() =>
                       this.setState((prevState) => ({hours: prevState.hours + 1}))
                   }></i></span>
                   <span><i className="fas fa-arrow-up" onClick={() =>
                       this.setState((prevState) => ({minutes: prevState.minutes + 1}))
                   }></i></span>
                   <span><i className="fas fa-arrow-up" onClick={() =>
                       this.setState((prevState) => ({seconds: prevState.seconds + 1}))
                   }></i></span>
               </div>
               <div className="flex">
                    <span>{hours >= 10 ? hours : "0" + hours}:</span>
                    <span>{minutes >= 10 ? minutes : "0" + minutes}:</span>
                    <span>{seconds >= 10 ? seconds : "0" + seconds}</span>
               </div>
               <div>
                   <span><i className="fas fa-arrow-down" onClick={() =>
                       this.setState((prevState) => ({hours: prevState.hours !== 0 ? prevState.hours - 1: 0}))
                   }></i></span>
                   <span><i className="fas fa-arrow-down" onClick={() =>
                       this.setState((prevState) => ({minutes: prevState.minutes !== 0 ? prevState.minutes - 1: 0}))
                   }></i></span>
                   <span><i className="fas fa-arrow-down" onClick={() =>
                       this.setState((prevState) => ({seconds: prevState.seconds !== 0 ? prevState.seconds - 1 : 0}))
                   }></i></span>
               </div>

               <div className="flex">
                   <button onClick={() => {
                       minutes || hours || seconds ?  this.startCountDown() : alert("Enter some value")
                       this.setState({
                           isPaused: false, 
                           countDownStart: minutes || hours || seconds ? false : true,
                           countDownStop: minutes || hours || seconds ? true : false
                        })
                   }} className={this.state.countDownStart ? "visible": "hidden"}>Start</button>
                   <button onClick={() => {
                       this.setState({
                           isPaused: true,
                           countDownStop: false
                       })
                   }} className={this.state.countDownStop ? "visible": "hidden"}>Stop</button>

                   <button className={!this.state.countDownStart && !this.state.countDownStop? "visible": "hidden"} onClick={() => {
                                this.setState({
                                    isPaused: false
                                })
                            }}>Resume</button>
                            <button className={!this.state.countDownStop && !this.state.countDownStart? "visible": "hidden"} onClick={() => {
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