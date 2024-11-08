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
      <DialogTitle>Grupos Disponíveis</DialogTitle>
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
                  color={subscribedGroupIds.includes(group.groupId) ? 'secondary' : 'primary'}
                  onClick={() => handleToggleSubscription(group.groupId)}
                  sx={{ minWidth: '100px' }}
                >
                  {subscribedGroupIds.includes(group.groupId) ? 'Desinscrever' : 'Inscrever'}
                </Button>
              </ListItemSecondaryAction>
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
