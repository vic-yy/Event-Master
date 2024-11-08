import React, { useState, useEffect } from 'react';
import GroupListModal from '../../Grupos/GroupListModal';
import { getGroups, IGroup } from '../../../services/group/get';

interface FiltersProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  onCategoriesChange: (categories: string[]) => void; // New prop
}

const Filters: React.FC<FiltersProps> = ({ activeCategory, setActiveCategory, onCategoriesChange }) => {
  const defaultCategories = ['All', 'DCC', 'ICEX', 'CC', 'SI', 'MatComp', 'Eng Sistemas', 'Eng Elétrica'];
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
    const subscribedGroup = groups.find(group => group.groupId === groupId);
    if (subscribedGroup) {
      setCategories(prevCategories => {
        const updatedCategories = !prevCategories.includes(subscribedGroup.title)
          ? [...prevCategories, subscribedGroup.title]
          : prevCategories;
        
        onCategoriesChange(updatedCategories); // Notify parent of new categories
        return updatedCategories;
      });
      setSubscribedGroupIds(prevIds => {
        if (!prevIds.includes(groupId)) {
          return [...prevIds, groupId];
        }
        return prevIds;
      });
    }
  };

  const handleUnsubscribe = (groupId: number) => {
    const unsubscribedGroup = groups.find(group => group.groupId === groupId);
    if (unsubscribedGroup) {
      setCategories(prevCategories => {
        const updatedCategories = prevCategories.filter(category => category !== unsubscribedGroup.title);
        onCategoriesChange(updatedCategories); // Notify parent of category removal
        return updatedCategories;
      });
      setSubscribedGroupIds(prevIds => prevIds.filter(id => id !== groupId));
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
