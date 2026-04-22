import React, { Component } from "react";
import '../styles/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name1: "",
            name2: "",
            result: ""
        };
    }

    calculateFlames = () => {
        const { name1, name2 } = this.state;

        if (name1.trim() === "" || name2.trim() === "") {
            this.setState({ result: "Please Enter valid input" });
            return;
        }

        const removeCommonChars = (str1, str2) => {
            let arr1 = str1.split('');
            let arr2 = str2.split('');
            
            let freq1 = {};
            let freq2 = {};
            
            for (let char of arr1) {
                freq1[char] = (freq1[char] || 0) + 1;
            }
            
            for (let char of arr2) {
                freq2[char] = (freq2[char] || 0) + 1;
            }
            
            let remaining1 = [];
            let remaining2 = [];
            
            for (let char of arr1) {
                if (freq2[char] && freq2[char] > 0) {
                    freq2[char]--;
                } else {
                    remaining1.push(char);
                }
            }
            
            for (let char of arr2) {
                if (freq1[char] && freq1[char] > 0) {
                    freq1[char]--;
                } else {
                    remaining2.push(char);
                }
            }
            
            return remaining1.length + remaining2.length;
        };

        const remainingCount = removeCommonChars(name1, name2);
        const resultIndex = remainingCount % 6;

        const relationshipMap = {
            1: "Friends",
            2: "Love",
            3: "Affection",
            4: "Marriage",
            5: "Enemy",
            0: "Siblings"
        };

        this.setState({ result: relationshipMap[resultIndex] });
    };

    clearForm = () => {
        this.setState({
            name1: "",
            name2: "",
            result: ""
        });
    };

    handleName1Change = (e) => {
        this.setState({ name1: e.target.value });
    };

    handleName2Change = (e) => {
        this.setState({ name2: e.target.value });
    };

    render() {
        const { name1, name2, result } = this.state;

        return (
            <div id="main">
            
                <input
                    type="text"
                    data-testid="input1"
                    name="name1"
                    value={name1}
                    onChange={this.handleName1Change}
                    placeholder="Enter first name"
                />
                <br />
                <input
                    type="text"
                    data-testid="input2"
                    name="name2"
                    value={name2}
                    onChange={this.handleName2Change}
                    placeholder="Enter second name"
                />
                <br />
                <button
                    data-testid="calculate_relationship"
                    name="calculate_relationship"
                    onClick={this.calculateFlames}
                >
                    Calculate Relationship Future
                </button>
                <br />
                <button
                    data-testid="clear"
                    name="clear"
                    onClick={this.clearForm}
                >
                    Clear
                </button>
                <br />
                <h3 data-testid="answer">{result}</h3>
            </div>
        );
    }
}

export default App;