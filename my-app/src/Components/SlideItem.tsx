import userImg from '../Assets/Unknown User.jpg';

export interface SlideItem {
    id: number;
    image: string;
    name: string;
  }
  
  export const data: SlideItem[] = [
    { id: 1, image: userImg, name: "Tech" },
    { id: 2, image: userImg, name: "Hardware" },
    { id: 3, image: userImg, name: "Coffee" },
    { id: 4, image: userImg, name: "Test4" }
  ];
