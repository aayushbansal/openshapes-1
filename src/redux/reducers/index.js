import { ADD_OBJECT, MOVE_OBJECT, TRANSFORM_OBJECT, REQUEST_DRAWING, FETCH_DRAWING, CHANGE_BRUSH_SIZE, CHANGE_BRUSH_COLOR, DRAW_LINE } from "../actionTypes";

const initialState = {
  requestingDrawing: false,
  selectedItem: "road",
  brushSize: 5,
  brushColor: [0,0,0],
  canvasItems: [],
  resultImages: []
};

function rootReducer(state= initialState, action) {
  
  console.log(action);
      
  switch(action.type){
    
    case ADD_OBJECT:
      const objectItem = {
        itemType: "object",
        id: action.payload.id,
        src: action.payload.url,
        x: 0,
        y: 0,
        rotation:0,
        scaleX: 0,
        scaleY: 0
      }
      return {
        ...state,
        canvasItems: [...state.canvasItems, objectItem]
      }

    case MOVE_OBJECT:
      
      var canvasItems = [];
      for(var i = 0; i < state.canvasItems.length;i++){
        
        let item = state.canvasItems[i];

        if(item.id === action.payload.id){
          item.x = action.payload.x;
          item.y = action.payload.y;
        }

        canvasItems.push(item);
      }

      return {
        ...state,
        canvasItems
      }
    
    case TRANSFORM_OBJECT:
      
      var canvasItems = [];
      for(var i = 0; i < state.canvasItems.length;i++){
        
        let item = state.canvasItems[i];

        if(item.id === action.payload.id){
          item.x = action.payload.x;
          item.y = action.payload.y;
          item.rotation = action.payload.rotation;
          item.scaleX = action.payload.scaleX;
          item.scaleY = action.payload.scaleY;
        }

        canvasItems.push(item);
      }

      return {
        ...state,
        canvasItems
      }
    
    case DRAW_LINE:
      const lineItem = {
        itemType: "line",
        id: action.payload.id,
        points: action.payload.points,
        brushSize: state.brushSize,
        brushColor: state.brushColor
      }

      return {
        ...state,
        canvasItems: [...state.canvasItems, lineItem]
      }
    
    case REQUEST_DRAWING:
      return {
        ...state,
        requestingDrawing: true
      }

    case FETCH_DRAWING:
      var resultImages = []
      for(var i = 0; i < 5;i++){
        resultImages.push(action.payload.results[i].url)
      }
      return{
        ...state,
        requestingDrawing: false,
        resultImages
      }

    case CHANGE_BRUSH_SIZE:
      const {brushSize} = action.payload;
      return {
        ...state,
        brushSize
      }

    case CHANGE_BRUSH_COLOR:
        const {brushColor} = action.payload;
        return {
          ...state,
          brushColor
        }

    default: 
      return state;
  }
  
};

export default rootReducer;