import React, { useState } from 'react';
import GroupListModal from './GroupListModal';

interface FiltersProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

interface Group {
  id: number;
  name: string;
  iconUrl: string;
}

const Filters: React.FC<FiltersProps> = ({ activeCategory, setActiveCategory }) => {
  // Estado inicial com as categorias padrão
  const defaultCategories = ['DCC', 'ICEX', 'CC', 'SI', 'MatComp', 'Eng Sistemas', 'Eng Elétrica'];
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [openGroupModal, setOpenGroupModal] = useState(false);

  // Exemplo de grupos com ícones
  const groups: Group[] = [
    { id: 1, name: 'Fafich', iconUrl: '/path/to/fafich-icon.png' },
    { id: 2, name: 'Speed', iconUrl: '/path/to/speed-icon.png' },
    { id: 3, name: 'Maratona', iconUrl: '/path/to/maratona-icon.png' },
    { id: 4, name: 'LBD', iconUrl: '/path/to/lbd-icon.png' },
  ];

  const handleOpenGroupModal = () => setOpenGroupModal(true);
  const handleCloseGroupModal = () => setOpenGroupModal(false);

  const handleSubscribe = (groupId: number) => {
    const subscribedGroup = groups.find(group => group.id === groupId);
    if (subscribedGroup && !categories.includes(subscribedGroup.name)) {
      setCategories([...categories, subscribedGroup.name]); // Adiciona o nome do grupo como uma nova categoria
    }
    handleCloseGroupModal();
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
        onSubscribe={handleSubscribe} // Chama a função para adicionar o grupo como categoria
      />
    </div>
  );
};

export default Filters;
