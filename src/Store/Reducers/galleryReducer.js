import galleryData from './Data';

export default function galleryReducer(state = {allGalleries: galleryData, slideshow: false}, action){
    switch(action.type){
        case 'START_SLIDESHOW': 
            return {...state, slideshow: true};
        case 'STOP_SLIDESHOW':
                return {...state, slideshow: false}
        default: 
            return state;
    }
}