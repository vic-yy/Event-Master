import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { Group } from '../types/Group';

interface GroupListModalProps {
  open: boolean;
  onClose: () => void;
  groups: Group[];
  onSubscribe: (groupId: number) => void;
}

const GroupListModal: React.FC<GroupListModalProps> = ({ open, onClose, groups, onSubscribe }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Grupos Disponíveis</DialogTitle>
      <DialogContent>
        <List>
          {groups.map((group) => (
            <ListItem key={group.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemAvatar>
                <Avatar src={group.iconUrl} alt={`${group.name} icon`} />
              </ListItemAvatar>
              <ListItemText primary={group.name} />
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => onSubscribe(group.id)}
                sx={{ minWidth: '100px' }}
              >
                Inscrever
              </Button>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <Button onClick={onClose} color="primary" sx={{ margin: '16px' }}>
        Fechar
      </Button>
    </Dialog>
  );
};

export default GroupListModal;
