import galleryData from './Data';

export default function galleryReducer(state = {allGalleries: galleryData, slideshow: 0}, action){
    switch(action.type){
        case 'NEXT_SLIDESHOW':
            return {...state, slideshow: state.slideshow + 1};
        case 'RESET_SLIDESHOW':
                return {...state, slideshow: 1}
        default: 
            return state;
    }
}