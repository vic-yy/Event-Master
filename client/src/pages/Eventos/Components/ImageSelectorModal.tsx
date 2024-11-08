import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, TextField, Grid, Card, CardMedia, Radio, FormControlLabel } from '@mui/material';

interface ImageSelectorModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (image: string) => void;
}

const ImageSelectorModal: React.FC<ImageSelectorModalProps> = ({ open, onClose, onSelect }) => {
    interface IImage { id: number; src: string; alt: string; };
    
    const [selectedImage, setSelectedImage] = useState<IImage | null>(null);

  const images = [
    { id : 0, src : "coffeeBreak.jpg", alt : "coffeeBreak"},
    { id : 1, src : "competition.jpg", alt : "competition" },
    { id : 2, src : "compilers.png" , alt : "compilers"},
    { id : 3, src : "dcc.png", alt : "dcc"},
    { id : 4, src : "funny.jpg", alt : "funny"},
    { id : 5, src : "meeting.jpg", alt : "meeting"},
    { id : 6, src : "robot.jpg", alt : "robot"},
    { id : 7, src : "science.jpg", alt : "science"},
    { id : 8, src : "sports.jpg", alt : "sports"},
    { id : 9, src : "study.jpg", alt: "study"},
    { id : 10, src : "trex.png", alt: "trex" },
  ] as IImage[];

  const handleSelect = (image: IImage) => {
    setSelectedImage(image);
    onSelect(image.src);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Select an Image</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {images.map((image) => (
            <Grid item xs={4} key={image.id}>
              <Card
                sx={{
                  border: selectedImage?.id == image.id ? '2px solid blue' : '2px solid transparent',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                onClick={() => handleSelect(image)}
              >
                <FormControlLabel
                  control={<Radio checked={selectedImage?.id === image.id} />}
                  label=""
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                />
                <CardMedia component="img" image={"../../" + image.src} alt={image.alt} height="140" />
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <Button onClick={onClose} sx={{ mt: 2 }}>Close</Button>
    </Dialog>
  );
};

export default ImageSelectorModal;