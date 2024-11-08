import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { IGroup } from '../../services/group/get';
import { Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface GroupListModalProps {
  open: boolean;
  onClose: () => void;
  groups: IGroup[];
  subscribedGroupIds: number[];
  onSubscribe: (groupId: number) => void;
  onUnsubscribe: (groupId: number) => void;
}

const GroupListModal: React.FC<GroupListModalProps> = ({
  open,
  onClose,
  groups,
  subscribedGroupIds,
  onSubscribe,
  onUnsubscribe,
}) => {
  const handleToggleSubscription = (groupId: number) => {
    if (subscribedGroupIds.includes(groupId)) {
      onUnsubscribe(groupId);
    } else {
      onSubscribe(groupId);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle variant="h5" style={{ textAlign: 'center', padding: '0px', marginTop: '20px' }}>
                
        <Typography variant="h5" sx={{ marginBottom: '30px', color: 'black'}}>
          Grupos disponíveis:
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
          >
          <CloseIcon sx={{ color: 'black' }} />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <List>
          {groups.map((group) => (
            <ListItem key={`group-${group.groupId}`}>
              <ListItemAvatar>
                <Avatar src={group.description} alt={`${group.title} icon`} />
              </ListItemAvatar>
              <ListItemText primary={group.title} />
              <ListItemSecondaryAction>

                <Button
                  variant="outlined"
                  onClick={() => handleToggleSubscription(group.groupId)}
                  sx={{
                    color: "#ffffff",
                    backgroundColor: "#333333",
                    "&:hover": {
                      backgroundColor: "#000",
                    },
                    padding: '5px',         
                    borderRadius: '5px' 
                  }}
                >
                  {subscribedGroupIds.includes(group.groupId) ? 'Remover inscrição' : 'Inscrição'}
                </Button>

              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>

    </Dialog>
  );
};

export default GroupListModal;
