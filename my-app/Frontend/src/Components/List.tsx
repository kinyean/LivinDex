import React from 'react';
import { data } from './ListItem';

interface ListProps {
    input: string;
  }
  

const List: React.FC<ListProps> = (props) => {
const filteredData = data.filter((el) => {
    //if no input the return the nothing
    if (props.input.trim() === '') {
      return ;
    }
    //return the item which contains the user input
      else {
        return el.name.toLowerCase().startsWith(props.input.trim().toLowerCase());
      }    
    })

  return (
    <ul>
      {filteredData.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

export default List;
