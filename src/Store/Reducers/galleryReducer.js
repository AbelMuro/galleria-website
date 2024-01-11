import galleryData from './Data';

export default function galleryReducer(state = {allGalleries: galleryData, currentGallery: 1}, action){
    switch(action.type){
        case 'NEXT_GALLERY':
            return {allGalleries: state.allGalleries, currentGallery: state.currentGallery + 1};
        case 'PREV_GALLERY':
            return {allGalleries: state.allGalleries, currentGallery: state.currentGallery - 1};
        case 'SET_GALLERY':
            return {allGalleries: state.allGalleries, currentGallery: action.id};
        default: 
            return state;
    }
}