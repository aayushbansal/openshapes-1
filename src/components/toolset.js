import React from 'react';
import items from '../coco.json';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import Objects from './objects';
import {connect} from 'react-redux';
import {changeBrushSize, selectBackground, changeDrawingMode} from '../redux/actions';

/*
Toolset
*/

var nonThings = items.filter((item) =>
    {return item.isthing !== 1;}
);

class Toolset extends React.Component {

    componentDidMount(){
        this.props.selectBackground("road", [128, 64, 128]);
    }

    getBrushStyle(i){
        var borderWidth = this.props.brushSize === i? "3px": "1px";
        var background = this.props.brushSize === i? "#4e73df": "none";
        return {
            height: i +"px",
            width: i +"px",
            borderWidth,
            background
        }
    }

    getButtonStyle(name){
        return this.props.selectedBackground === name? "btn btn-hollow btn-sm item-button": "btn btn-outline-primary btn-sm item-button"
    }

    render(){
        
        return(
            <div id="toolset" className="top-margin-20">
                <p><b>Choose</b></p>

                <Tabs>
                    <TabList>
                    <Tab onClick={() => this.props.changeDrawingMode("background")}><b>Backgrounds</b></Tab>
                    <Tab onClick={() => this.props.changeDrawingMode("object")}><b>Objects</b></Tab>
                    </TabList>

                    <TabPanel>
                        <div id="backgrounds">
                            <div id="brushSizes">
                                <p>Brush Size</p>
                                {[10, 20, 30, 50, 120].map((i) => 
                                <div key={i} className="brushSize" style={this.getBrushStyle(i)} onClick={() => this.props.changeBrushSize(i)}/>
                                )}
                            </div>
                            
                        
                            {nonThings.map((item) =>
                            <button key={item.name} className={this.getButtonStyle(item.name)} onClick={() => this.props.selectBackground(item.name, item.color)} >
                                {item.name}
                            </button>    
                            )}
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <Objects/>
                    </TabPanel>
                </Tabs>

            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        selectedBackground: state.ui.selectedBackground,
        brushSize: state.ui.brushSize,
        brushColor: state.ui.brushColor
    }
}

export default connect(
    mapStateToProps,
    {changeBrushSize, selectBackground, changeDrawingMode}
)(Toolset)