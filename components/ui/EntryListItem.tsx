import { DragEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';

import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"

import { Entry } from "../../interfaces"
import { UIContext } from '../../context/ui/UIContext';

interface Props {
  entry: Entry;
};

export const EntryListItem: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);
  const router = useRouter();

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text',entry._id);
    startDragging();
  };
  
  const onDragEnds = () => {
    endDragging();
  };

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  }

  return (
    <Card 
      onClick={onClick}
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={ onDragEnds }
    >
       <CardActionArea>
         <CardContent>
            <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.description }</Typography>
         </CardContent>
         <CardActions sx={{ justifyContent: 'end', display: 'flex', paddingRight: '2' }}>
            <Typography>30 min ago...</Typography>
         </CardActions>
       </CardActionArea>
    </Card>    
  )
}
