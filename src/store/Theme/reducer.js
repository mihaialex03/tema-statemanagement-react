export const initialThemeState ={
    theme: 'light'
};
export function themeReducer(state,action){
    switch(action.type){
        case 'LIGHT':{
            // returnez noul state
            return{
                theme: 'light'
            }
        }
        case 'DARK':{
            return{
                theme: 'dark'
            }
        }
        default:{
            return state;
        }
    }
}