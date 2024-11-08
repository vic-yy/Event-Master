import React, { useState, useEffect } from 'react';
import GroupListModal from '../../Grupos/GroupListModal';
import { getGroups, IGroup } from '../../../services/group/get';

interface FiltersProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ activeCategory, setActiveCategory }) => {
  const defaultCategories = ['DCC', 'ICEX', 'CC', 'SI', 'MatComp', 'Eng Sistemas', 'Eng Elétrica'];
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [subscribedGroupIds, setSubscribedGroupIds] = useState<number[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [openGroupModal, setOpenGroupModal] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getGroups();
        setGroups(data); 
      } catch (error) {
        console.error("Erro ao buscar grupos:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleOpenGroupModal = () => setOpenGroupModal(true);
  const handleCloseGroupModal = () => setOpenGroupModal(false);

  const handleSubscribe = (groupId: number) => {
    const subscribedGroup = groups.find(group => group.id === groupId);
    if (subscribedGroup && !categories.includes(subscribedGroup.title)) {
      setCategories([...categories, subscribedGroup.title]);
      setSubscribedGroupIds([...subscribedGroupIds, groupId]);
    }
  };

  const handleUnsubscribe = (groupId: number) => {
    const unsubscribedGroup = groups.find(group => group.id === groupId);
    if (unsubscribedGroup) {
      setCategories(categories.filter(category => category !== unsubscribedGroup.title));
      setSubscribedGroupIds(subscribedGroupIds.filter(id => id !== groupId));
    }
  };

  return (
    <div className="filters">
      {categories.map((category) => (
        <button 
          key={category}
          className={activeCategory === category ? 'active' : ''}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
      <button onClick={handleOpenGroupModal}>+</button>
      
      <GroupListModal 
        open={openGroupModal} 
        onClose={handleCloseGroupModal} 
        groups={groups} 
        subscribedGroupIds={subscribedGroupIds}
        onSubscribe={handleSubscribe} 
        onUnsubscribe={handleUnsubscribe} 
      />
    </div>
  );
};

export default Filters;
