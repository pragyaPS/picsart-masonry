import { Photo } from "../types";

type ArrangeHeightBalance = (
    photos: Photo[], 
    NUM_COLUMN?: number,
    gap?: number,
    COL_WIDTH?: number
  ) =>  Array<Photo & {top: number; left:number; width: number}>; 


export const arrangeHeightBalance:ArrangeHeightBalance = (photos, NUM_COLS = 3, GAP=10, COL_WIDTH=70) => {
  const columnHeights = Array(NUM_COLS).fill(0);

  // For each photo, add the position data.
  return photos.map((photo) => {
const height = photo.height/20;
    // Find the shortest column.
    let shortestCol = 0;
    for (let i = 1; i < NUM_COLS; i++) {
      if (columnHeights[i] < columnHeights[shortestCol]) {
        shortestCol = i;
      }
    }

    // Calculate the `left` value of the current pin.
    const left = shortestCol * COL_WIDTH + Math.max(shortestCol, 0) * GAP;
    // Calculate the `top` value of the current pin.
    const top = GAP + columnHeights[shortestCol];
    // Update the column height.
    columnHeights[shortestCol] = top + height;

    

     return {
      ...photo,
      left,
      top,
      height,
      width: COL_WIDTH
     }

  })
    



}